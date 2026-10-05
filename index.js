'use strict';

require('dotenv').config();

const crypto = require('crypto');
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const db = require('./db');
const { products, productsById } = require('./catalog');
const { productsById: regularProductsById } = require('./legacy-catalog');
const { sendCustomerEmail, sendOwnerEmail } = require('./email');
const { OFFER_DEADLINE, MAX_BOGO_SETS, isOfferActive, delivery } = require('./shop-config');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const PUBLIC_BASE_URL = String(process.env.PUBLIC_BASE_URL || 'https://elyseanperfumes.co.za').replace(/\/$/, '');
const BUSINESS_PHONE = '077 463 8001';
const BUSINESS_PHONE_E164 = '27774638001';

function timingSafeTextEqual(left, right) {
  const a = crypto.createHash('sha256').update(String(left || '')).digest();
  const b = crypto.createHash('sha256').update(String(right || '')).digest();
  return crypto.timingSafeEqual(a, b);
}

function cookieMap(header = '') {
  return Object.fromEntries(header.split(';').map((part) => {
    const index = part.indexOf('=');
    return index < 0 ? ['', ''] : [part.slice(0, index).trim(), decodeURIComponent(part.slice(index + 1).trim())];
  }).filter(([key]) => key));
}

function adminToken() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET is not configured');
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + 12 * 60 * 60 * 1000 })).toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

function verifyAdminToken(token) {
  try {
    const [payload, suppliedSignature] = String(token || '').split('.');
    if (!payload || !suppliedSignature || !process.env.SESSION_SECRET) return false;
    const expected = crypto.createHmac('sha256', process.env.SESSION_SECRET).update(payload).digest('base64url');
    if (!timingSafeTextEqual(suppliedSignature, expected)) return false;
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return Number(decoded.exp) > Date.now();
  } catch (_) {
    return false;
  }
}

function requireAdmin(req, res, next) {
  const token = cookieMap(req.headers.cookie).elysean_stock_admin;
  if (!verifyAdminToken(token)) return res.status(401).json({ error: 'Authentication required' });
  return next();
}

function rateLimiter({ windowMs, max }) {
  const requests = new Map();
  return (req, res, next) => {
    const key = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const current = requests.get(key);
    if (!current || current.resetAt <= now) {
      requests.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }
    current.count += 1;
    if (current.count > max) return res.status(429).json({ error: 'Too many attempts. Please wait and try again.' });
    return next();
  };
}

const adminLoginLimit = rateLimiter({ windowMs: 15 * 60 * 1000, max: 8 });
const checkoutLimit = rateLimiter({ windowMs: 10 * 60 * 1000, max: 12 });

function verifyWebhookSignature(webhookId, webhookTimestamp, rawBody, signatureHeader) {
  if (!process.env.YOCO_WEBHOOK_SECRET || !webhookId || !webhookTimestamp || !signatureHeader) return false;
  const timestamp = Number(webhookTimestamp);
  if (!Number.isFinite(timestamp) || Math.abs(Math.floor(Date.now() / 1000) - timestamp) > 180) return false;

  const secretBytes = Buffer.from(process.env.YOCO_WEBHOOK_SECRET.replace(/^whsec_/, ''), 'base64');
  const expected = crypto.createHmac('sha256', secretBytes)
    .update(`${webhookId}.${webhookTimestamp}.${rawBody}`)
    .digest('base64');

  return String(signatureHeader).split(' ').some((entry) => {
    const [version, signature] = entry.split(',');
    if (version !== 'v1' || !signature) return false;
    try {
      return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
    } catch (_) {
      return false;
    }
  });
}

async function sendEmailsOnce(order) {
  const claimed = await db.claimEmails(order.id);
  if (!claimed) return;
  try {
    if (!claimed.customer_email_sent_at) {
      await sendCustomerEmail(claimed);
      await db.markCustomerEmailSent(claimed.id);
    }
    if (!claimed.owner_email_sent_at) {
      await sendOwnerEmail(claimed);
      await db.markOwnerEmailSent(claimed.id);
    }
    await db.finishEmails(claimed.id);
    console.log(`Order emails sent for ${claimed.order_number}`);
  } catch (error) {
    await db.finishEmails(claimed.id, error.message);
    console.error(`Order email failure for ${claimed.order_number}:`, error.message);
  }
}

// Yoco requires the unmodified request bytes, so this route must precede express.json().
app.post('/webhook', express.raw({ type: 'application/json', limit: '256kb' }), async (req, res) => {
  try {
    const rawBody = req.body.toString('utf8');
    const valid = verifyWebhookSignature(
      req.headers['webhook-id'],
      req.headers['webhook-timestamp'],
      rawBody,
      req.headers['webhook-signature'],
    );
    if (!valid) return res.status(401).send('Invalid signature');

    const event = JSON.parse(rawBody);
    const payment = event.payload || {};
    const checkoutId = payment.metadata?.checkoutId;
    await db.recordWebhook(event, checkoutId, payment.id);

    if (!checkoutId) {
      console.warn(`Verified Yoco event ${event.id} has no checkoutId`);
      return res.sendStatus(200);
    }

    if (event.type === 'payment.succeeded') {
      if (payment.status !== 'succeeded' || payment.currency !== 'ZAR') {
        console.error(`Rejected inconsistent payment payload for checkout ${checkoutId}`);
        return res.sendStatus(200);
      }
      const order = await db.markPaid(checkoutId, payment);
      if (!order) {
        console.error(`No matching order/amount for successful checkout ${checkoutId}`);
        return res.sendStatus(200);
      }
      await sendEmailsOnce(order);
    } else if (event.type === 'payment.failed') {
      await db.markPaymentFailed(checkoutId, payment.id);
    }

    return res.sendStatus(200);
  } catch (error) {
    console.error('Webhook processing error:', error);
    return res.status(500).send('Webhook processing failed');
  }
});

app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
});
app.use(express.json({ limit: '128kb' }));
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'], maxAge: '1h' }));

function text(value, max = 160) {
  return String(value || '').trim().replace(/\s+/g, ' ').slice(0, max);
}

function validEmail(value) {
  const email = text(value, 254).toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : '';
}

function validPhone(value) {
  const phone = text(value, 30);
  return /^\+?[0-9][0-9\s()-]{7,20}$/.test(phone) ? phone : '';
}

function customerFrom(body) {
  const customer = body && typeof body === 'object' ? body : {};
  const result = {
    firstName: text(customer.firstName, 60),
    lastName: text(customer.lastName, 60),
    email: validEmail(customer.email),
    phone: validPhone(customer.phone),
  };
  if (!result.firstName || !result.lastName || !result.email || !result.phone) {
    throw new Error('Please provide a valid name, email address and telephone number');
  }
  return result;
}

function deliveryFrom(body) {
  const supplied = body && typeof body === 'object' ? body : {};
  const verified = delivery.quote(text(supplied.areaId, 60));
  const result = {
    areaId: verified.areaId,
    areaName: verified.areaName,
    zoneCode: verified.zoneCode,
    zoneName: verified.zoneName,
    method: verified.method,
    schedule: verified.schedule,
    addressLine1: text(supplied.addressLine1, 120),
    addressLine2: text(supplied.addressLine2, 120),
    suburb: text(supplied.suburb, 80),
    postalCode: text(supplied.postalCode, 12),
    instructions: text(supplied.instructions, 240),
  };
  if (result.method !== 'collection' && (!result.addressLine1 || !result.suburb || !result.postalCode)) {
    throw new Error('Please provide the complete local delivery address');
  }
  return result;
}

function cleanAttribution(value) {
  const source = value && typeof value === 'object' ? value : {};
  return Object.fromEntries(['source', 'medium', 'campaign', 'content', 'term']
    .map((key) => [key, text(source[key], 100)])
    .filter(([, item]) => item));
}

function orderNumber(prefix = 'EP') {
  const day = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Johannesburg', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date()).replaceAll('-', '');
  return `${prefix}-${day}-${crypto.randomBytes(8).toString('hex').toUpperCase()}`;
}

async function bogoQuote(rawItems, deliveryAreaId = '') {
  if (!isOfferActive()) throw new Error('The Festive BOGO offer has ended');
  if (!Array.isArray(rawItems) || !rawItems.length || rawItems.length > MAX_BOGO_SETS) {
    throw new Error('Choose at least one fragrance');
  }

  const combined = new Map();
  rawItems.forEach((raw) => {
    const productId = Number(raw.productId);
    const quantity = Number(raw.quantity);
    if (!Number.isInteger(productId) || !Number.isInteger(quantity) || quantity < 1 || quantity > MAX_BOGO_SETS) {
      throw new Error('The order contains an invalid fragrance or quantity');
    }
    combined.set(productId, (combined.get(productId) || 0) + quantity);
  });

  const totalSets = [...combined.values()].reduce((sum, quantity) => sum + quantity, 0);
  if (totalSets > MAX_BOGO_SETS) throw new Error(`A maximum of ${MAX_BOGO_SETS} BOGO sets is available per checkout`);

  const statuses = await db.inventoryMap();
  const items = [...combined].map(([productId, quantity]) => {
    const product = productsById.get(productId);
    const stock = statuses.get(productId);
    if (!product) throw new Error('A selected fragrance no longer exists');
    if (!stock || stock.status !== 'available') throw new Error(`${product.reference} is temporarily unavailable`);
    return {
      productId,
      reference: product.reference,
      variant: product.variant,
      unitPriceCents: product.price100 * 100,
      quantity,
      complimentaryQuantity: quantity,
      physicalBottles: quantity * 2,
      lineTotalCents: product.price100 * 100 * quantity,
    };
  });

  const bottleCount = totalSets * 2;
  const deliveryQuote = deliveryAreaId ? delivery.quote(deliveryAreaId) : null;
  const subtotalCents = items.reduce((sum, item) => sum + item.lineTotalCents, 0);
  return {
    items,
    totalSets,
    bottleCount,
    deliveryAreaId: deliveryQuote?.areaId || null,
    deliveryAreaName: deliveryQuote?.areaName || null,
    deliveryZone: deliveryQuote?.zoneCode || null,
    deliveryZoneName: deliveryQuote?.zoneName || null,
    shippingCents: deliveryQuote?.customerChargeCents ?? null,
    subtotalCents,
    totalCents: subtotalCents + (deliveryQuote?.customerChargeCents || 0),
  };
}

function regularQuote(rawCart, deliveryAreaId) {
  if (!Array.isArray(rawCart) || !rawCart.length || rawCart.length > 30) throw new Error('Your cart is empty or invalid');
  let itemCount = 0;
  const items = rawCart.map((raw) => {
    const product = regularProductsById.get(Number(raw.id));
    const quantity = Number(raw.qty);
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 10) throw new Error('Your cart contains an invalid item');
    const size = product.sizes.find((entry) => String(entry.ml) === String(raw.size));
    if (!size) throw new Error('Your cart contains an invalid size');
    itemCount += quantity;
    return {
      productId: Number(product.id), reference: String(product.name), variant: String(size.ml),
      unitPriceCents: Number(size.price) * 100, quantity, complimentaryQuantity: 0,
      physicalBottles: quantity, lineTotalCents: Number(size.price) * 100 * quantity,
    };
  });
  if (itemCount > 30) throw new Error('This order is too large for one checkout');
  const subtotalCents = items.reduce((sum, item) => sum + item.lineTotalCents, 0);
  const deliveryQuote = delivery.quote(deliveryAreaId);
  const shippingCents = deliveryQuote.customerChargeCents;
  return {
    items,
    deliveryAreaId: deliveryQuote.areaId,
    deliveryAreaName: deliveryQuote.areaName,
    deliveryZone: deliveryQuote.zoneCode,
    deliveryZoneName: deliveryQuote.zoneName,
    subtotalCents,
    shippingCents,
    totalCents: subtotalCents + shippingCents,
  };
}

async function createYocoCheckout(order, { successPath, cancelPath }) {
  if (!process.env.YOCO_SECRET_KEY) throw new Error('YOCO_SECRET_KEY is not configured');
  const response = await fetch('https://payments.yoco.com/api/checkouts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.YOCO_SECRET_KEY}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': order.id,
    },
    body: JSON.stringify({
      amount: order.totalCents,
      currency: 'ZAR',
      successUrl: `${PUBLIC_BASE_URL}${successPath}`,
      cancelUrl: `${PUBLIC_BASE_URL}${cancelPath}`,
      failureUrl: `${PUBLIC_BASE_URL}${cancelPath}`,
      metadata: { orderNumber: order.orderNumber },
      clientReferenceId: order.orderNumber,
      externalId: order.orderNumber,
      subtotalAmount: order.totalCents,
    }),
    timeout: 20_000,
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || !body.id || !body.redirectUrl) {
    throw new Error(`Yoco checkout failed with HTTP ${response.status}`);
  }
  return body;
}

app.get('/health', async (_req, res) => {
  try {
    await db.getPool().query('SELECT 1');
    res.json({ status: 'ok', database: 'connected', time: new Date().toISOString() });
  } catch (_) {
    res.status(503).json({ status: 'unavailable', database: 'disconnected' });
  }
});

app.get('/api/catalog/availability', async (_req, res) => {
  const statuses = await db.inventoryMap();
  const inventory = Object.fromEntries(products.map((product) => {
    const stock = statuses.get(product.id);
    return [product.id, { status: stock?.status || 'unavailable', note: stock?.note || '' }];
  }));
  res.setHeader('Cache-Control', 'public, max-age=60');
  res.json({ inventory, updatedAt: new Date().toISOString() });
});

app.get('/api/delivery/areas', (_req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.json(delivery.publicConfig());
});

app.post('/api/bogo/quote', async (req, res) => {
  try {
    const quote = await bogoQuote(req.body.items, text(req.body.deliveryAreaId, 60));
    res.json({ ...quote, offerDeadline: OFFER_DEADLINE });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/bogo/checkout', checkoutLimit, async (req, res) => {
  let localOrder;
  try {
    if (req.body.termsAccepted !== true) throw new Error('Please accept the checkout terms');
    const deliveryDetails = deliveryFrom(req.body.delivery);
    const quote = await bogoQuote(req.body.items, deliveryDetails.areaId);
    const customer = customerFrom(req.body.customer);

    localOrder = {
      id: crypto.randomUUID(), orderNumber: orderNumber('EPB'), orderType: 'bogo', customer,
      items: quote.items, delivery: deliveryDetails, attribution: cleanAttribution(req.body.attribution),
      deliveryZone: quote.deliveryZone, subtotalCents: quote.subtotalCents,
      shippingCents: quote.shippingCents, totalCents: quote.totalCents,
    };
    await db.createOrder(localOrder);
    const encoded = encodeURIComponent(localOrder.orderNumber);
    const checkout = await createYocoCheckout(localOrder, {
      successPath: `/bogo-success.html?order=${encoded}`,
      cancelPath: `/bogo-checkout.html?payment=cancelled&order=${encoded}`,
    });
    await db.attachCheckout(localOrder.id, checkout.id);
    res.json({ redirectUrl: checkout.redirectUrl, orderNumber: localOrder.orderNumber });
  } catch (error) {
    if (localOrder?.id) await db.markCheckoutFailed(localOrder.id, error.message).catch(() => {});
    console.error('BOGO checkout error:', error.message);
    res.status(400).json({ error: error.message || 'Payment could not be started' });
  }
});

// Existing main-shop checkout retained, but prices are now rebuilt from the server catalogue.
app.post('/create-checkout', checkoutLimit, async (req, res) => {
  let localOrder;
  try {
    const deliveryDetails = deliveryFrom(req.body.delivery);
    const quote = regularQuote(req.body.cart, deliveryDetails.areaId);
    const customer = customerFrom(req.body.customerInfo);
    localOrder = {
      id: crypto.randomUUID(), orderNumber: orderNumber('EP'), orderType: 'regular', customer,
      items: quote.items,
      delivery: deliveryDetails,
      attribution: {}, deliveryZone: quote.deliveryZone, subtotalCents: quote.subtotalCents,
      shippingCents: quote.shippingCents, totalCents: quote.totalCents,
    };
    await db.createOrder(localOrder);
    const checkout = await createYocoCheckout(localOrder, {
      successPath: `/cart-page.html?success=true&order=${encodeURIComponent(localOrder.orderNumber)}`,
      cancelPath: '/checkout.html?payment=cancelled',
    });
    await db.attachCheckout(localOrder.id, checkout.id);
    res.json({ redirectUrl: checkout.redirectUrl });
  } catch (error) {
    if (localOrder?.id) await db.markCheckoutFailed(localOrder.id, error.message).catch(() => {});
    console.error('Regular checkout error:', error.message);
    res.status(400).json({ error: error.message || 'Payment could not be started' });
  }
});

app.get('/api/orders/:orderNumber/status', async (req, res) => {
  const value = text(req.params.orderNumber, 50).toUpperCase();
  if (!/^EPB?-\d{8}-[A-F0-9]{16}$/.test(value)) return res.status(404).json({ error: 'Order not found' });
  const order = await db.publicOrder(value);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.setHeader('Cache-Control', 'no-store');
  res.json(order);
});

app.post('/api/admin/login', adminLoginLimit, (req, res) => {
  const expected = process.env.STOCK_ADMIN_PASSWORD;
  if (!expected) return res.status(503).json({ error: 'Stock administration is not configured' });
  if (!timingSafeTextEqual(req.body.password, expected)) return res.status(401).json({ error: 'Incorrect password' });
  res.cookie('elysean_stock_admin', adminToken(), {
    httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict',
    path: '/', maxAge: 12 * 60 * 60 * 1000,
  });
  return res.json({ authenticated: true });
});

app.post('/api/admin/logout', requireAdmin, (_req, res) => {
  res.clearCookie('elysean_stock_admin', { path: '/', sameSite: 'strict' });
  res.json({ authenticated: false });
});

app.get('/api/admin/inventory', requireAdmin, async (_req, res) => {
  const statuses = await db.inventoryMap();
  res.setHeader('Cache-Control', 'no-store');
  res.json({
    products: products.map((product) => ({
      ...product,
      status: statuses.get(product.id)?.status || 'unavailable',
      note: statuses.get(product.id)?.note || '',
      updatedAt: statuses.get(product.id)?.updated_at || null,
    })),
  });
});

app.patch('/api/admin/inventory/:productId', requireAdmin, async (req, res) => {
  const productId = Number(req.params.productId);
  const status = req.body.status;
  const note = text(req.body.note, 200);
  if (!productsById.has(productId) || !['available', 'unavailable'].includes(status)) {
    return res.status(400).json({ error: 'Invalid product or stock status' });
  }
  const updated = await db.setInventory(productId, status, note);
  res.json({ inventory: updated });
});

app.get('/', (_req, res) => res.sendFile(path.join(__dirname, 'public', 'home-page.html')));

app.use((error, _req, res, _next) => {
  console.error('Unhandled request error:', error);
  res.status(500).json({ error: 'Something went wrong. Please try again.' });
});

async function start() {
  await db.initDatabase(products.map((product) => product.id));
  app.listen(PORT, () => {
    console.log(`Elysean server listening on port ${PORT}`);
    console.log(`Festive BOGO ends ${OFFER_DEADLINE}; business WhatsApp ${BUSINESS_PHONE} (+${BUSINESS_PHONE_E164})`);
  });
}

if (require.main === module) {
  start().catch((error) => {
    console.error('Server startup failed:', error);
    process.exit(1);
  });
}

module.exports = { app, start, bogoQuote, regularQuote, verifyWebhookSignature, customerFrom, deliveryFrom };
