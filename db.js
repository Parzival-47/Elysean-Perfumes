'use strict';

const { Pool } = require('pg');

let pool;

function getPool() {
  if (!pool) {
    if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not configured');
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
    });
    pool.on('error', (error) => console.error('Unexpected PostgreSQL pool error:', error));
  }
  return pool;
}

async function initDatabase(productIds) {
  const db = getPool();
  await db.query(`
    CREATE TABLE IF NOT EXISTS inventory (
      product_id INTEGER PRIMARY KEY,
      status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'unavailable')),
      note TEXT NOT NULL DEFAULT '',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS orders (
      id UUID PRIMARY KEY,
      order_number TEXT NOT NULL UNIQUE,
      order_type TEXT NOT NULL DEFAULT 'bogo' CHECK (order_type IN ('bogo', 'regular')),
      status TEXT NOT NULL CHECK (status IN ('creating_checkout', 'pending_payment', 'paid', 'payment_failed', 'checkout_failed', 'cancelled')),
      customer JSONB NOT NULL,
      items JSONB NOT NULL,
      locker JSONB NOT NULL,
      attribution JSONB NOT NULL DEFAULT '{}'::jsonb,
      shipping_tier TEXT NOT NULL,
      subtotal_cents INTEGER NOT NULL CHECK (subtotal_cents >= 0),
      shipping_cents INTEGER NOT NULL CHECK (shipping_cents >= 0),
      total_cents INTEGER NOT NULL CHECK (total_cents > 0),
      checkout_id TEXT UNIQUE,
      payment_id TEXT UNIQUE,
      payment_mode TEXT,
      email_status TEXT NOT NULL DEFAULT 'pending' CHECK (email_status IN ('pending', 'sending', 'sent', 'failed')),
      email_error TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      paid_at TIMESTAMPTZ,
      emails_sent_at TIMESTAMPTZ,
      customer_email_sent_at TIMESTAMPTZ,
      owner_email_sent_at TIMESTAMPTZ
    );

    ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_type TEXT NOT NULL DEFAULT 'bogo';
    ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_email_sent_at TIMESTAMPTZ;
    ALTER TABLE orders ADD COLUMN IF NOT EXISTS owner_email_sent_at TIMESTAMPTZ;

    CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders (created_at DESC);
    CREATE INDEX IF NOT EXISTS orders_status_idx ON orders (status);

    CREATE TABLE IF NOT EXISTS webhook_events (
      event_id TEXT PRIMARY KEY,
      event_type TEXT NOT NULL,
      checkout_id TEXT,
      payment_id TEXT,
      payload JSONB NOT NULL,
      received_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await db.query(
    `INSERT INTO inventory (product_id)
     SELECT DISTINCT product_id FROM UNNEST($1::int[]) AS product_id
     ON CONFLICT (product_id) DO NOTHING`,
    [productIds],
  );
}

async function inventoryMap() {
  const { rows } = await getPool().query('SELECT product_id, status, note, updated_at FROM inventory');
  return new Map(rows.map((row) => [Number(row.product_id), row]));
}

async function setInventory(productId, status, note = '') {
  const { rows } = await getPool().query(
    `UPDATE inventory
       SET status = $2, note = $3, updated_at = NOW()
     WHERE product_id = $1
     RETURNING product_id, status, note, updated_at`,
    [productId, status, note],
  );
  return rows[0] || null;
}

async function createOrder(order) {
  const { rows } = await getPool().query(
    `INSERT INTO orders (
       id, order_number, order_type, status, customer, items, locker, attribution,
       shipping_tier, subtotal_cents, shipping_cents, total_cents
     ) VALUES ($1, $2, $3, 'creating_checkout', $4, $5, $6, $7, $8, $9, $10, $11)
     RETURNING *`,
    [order.id, order.orderNumber, order.orderType || 'bogo', order.customer, JSON.stringify(order.items), order.delivery,
      order.attribution || {}, order.deliveryZone, order.subtotalCents, order.shippingCents, order.totalCents],
  );
  return rows[0];
}

async function attachCheckout(orderId, checkoutId) {
  const { rows } = await getPool().query(
    `UPDATE orders SET checkout_id = $2, status = 'pending_payment', updated_at = NOW()
     WHERE id = $1 RETURNING *`,
    [orderId, checkoutId],
  );
  return rows[0] || null;
}

async function markCheckoutFailed(orderId, message) {
  await getPool().query(
    `UPDATE orders SET status = 'checkout_failed', email_error = $2, updated_at = NOW() WHERE id = $1`,
    [orderId, String(message || '').slice(0, 800)],
  );
}

async function recordWebhook(event, checkoutId, paymentId) {
  await getPool().query(
    `INSERT INTO webhook_events (event_id, event_type, checkout_id, payment_id, payload)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (event_id) DO NOTHING`,
    [event.id, event.type, checkoutId || null, paymentId || null, event],
  );
}

async function markPaid(checkoutId, payment) {
  const { rows } = await getPool().query(
    `UPDATE orders
       SET status = 'paid', payment_id = COALESCE(payment_id, $2), payment_mode = $3,
           paid_at = COALESCE(paid_at, NOW()), updated_at = NOW()
     WHERE checkout_id = $1 AND total_cents = $4
       AND status IN ('pending_payment', 'paid')
     RETURNING *`,
    [checkoutId, payment.id, payment.mode || null, Number(payment.amount)],
  );
  return rows[0] || null;
}

async function markPaymentFailed(checkoutId, paymentId) {
  const { rows } = await getPool().query(
    `UPDATE orders SET status = 'payment_failed', payment_id = COALESCE(payment_id, $2), updated_at = NOW()
     WHERE checkout_id = $1 AND status <> 'paid' RETURNING *`,
    [checkoutId, paymentId || null],
  );
  return rows[0] || null;
}

async function claimEmails(orderId) {
  const { rows } = await getPool().query(
    `UPDATE orders SET email_status = 'sending', email_error = NULL, updated_at = NOW()
     WHERE id = $1 AND status = 'paid' AND (
       email_status IN ('pending', 'failed') OR
       (email_status = 'sending' AND updated_at < NOW() - INTERVAL '10 minutes')
     ) RETURNING *`,
    [orderId],
  );
  return rows[0] || null;
}

async function finishEmails(orderId, error = null) {
  await getPool().query(
    `UPDATE orders SET email_status = $2, email_error = $3,
       emails_sent_at = CASE WHEN $2 = 'sent' THEN NOW() ELSE emails_sent_at END,
       updated_at = NOW() WHERE id = $1`,
    [orderId, error ? 'failed' : 'sent', error ? String(error).slice(0, 1000) : null],
  );
}

async function markCustomerEmailSent(orderId) {
  await getPool().query(
    `UPDATE orders SET customer_email_sent_at = COALESCE(customer_email_sent_at, NOW()), updated_at = NOW() WHERE id = $1`,
    [orderId],
  );
}

async function markOwnerEmailSent(orderId) {
  await getPool().query(
    `UPDATE orders SET owner_email_sent_at = COALESCE(owner_email_sent_at, NOW()), updated_at = NOW() WHERE id = $1`,
    [orderId],
  );
}

async function publicOrder(orderNumber) {
  const { rows } = await getPool().query(
    `SELECT order_number, status, items, locker AS delivery, shipping_tier AS delivery_zone,
            subtotal_cents, shipping_cents, total_cents, created_at, paid_at
       FROM orders WHERE order_number = $1`,
    [orderNumber],
  );
  return rows[0] || null;
}

module.exports = {
  getPool,
  initDatabase,
  inventoryMap,
  setInventory,
  createOrder,
  attachCheckout,
  markCheckoutFailed,
  recordWebhook,
  markPaid,
  markPaymentFailed,
  claimEmails,
  finishEmails,
  markCustomerEmailSent,
  markOwnerEmailSent,
  publicOrder,
};
