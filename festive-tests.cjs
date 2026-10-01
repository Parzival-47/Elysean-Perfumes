'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const root = __dirname;
const publicRoot = path.join(root, 'public');
const { products } = require('./catalog');
const { products: regularProducts } = require('./legacy-catalog');
const { SHIPPING_TIERS, shippingForBottles, OFFER_DEADLINE } = require('./shop-config');
const { customerTemplate, ownerTemplate } = require('./email');
const { normalizeLocker } = require('./pudo');

assert.equal(products.length, 292);
assert.equal(new Set(products.map((product) => product.id)).size, products.length);
assert(regularProducts.length > 300);
assert.equal(OFFER_DEADLINE, '2026-12-31T23:59:59+02:00');
assert.equal(SHIPPING_TIERS.length, 2);
assert.equal(shippingForBottles(2).customerChargeCents, 7900);
assert.equal(shippingForBottles(4).code, 'XS');
assert.equal(shippingForBottles(6).customerChargeCents, 10400);
assert.equal(shippingForBottles(8).code, 'S');
assert.throws(() => shippingForBottles(9));

const normalized = normalizeLocker({
  lockerCode: 'ABC123', lockerName: 'Test Centre', streetAddress: '1 Main Road', suburb: 'Central', town: 'George', postalCode: '6529',
});
assert.equal(normalized.code, 'ABC123');
assert.equal(normalized.name, 'Test Centre');
assert.match(normalized.address, /George/);

const order = {
  order_number: 'EPB-20261001-0123456789ABCDEF', order_type: 'bogo',
  customer: { firstName: 'Test', lastName: 'Customer', email: 'test@example.com', phone: '0771234567' },
  items: [{ productId: 164, reference: 'Black Opium', variant: 'Elysean Impression', quantity: 1, lineTotalCents: 38400 }],
  locker: { code: 'LOCKER1', name: 'Paddagat', address: 'George' },
  shipping_tier: 'XS', subtotal_cents: 38400, shipping_cents: 7900, total_cents: 46300,
  checkout_id: 'checkout_test', payment_id: 'payment_test',
};
const customerEmail = customerTemplate(order);
const ownerEmail = ownerTemplate(order);
for (const html of [customerEmail, ownerEmail]) {
  assert.match(html, /EPB-20261001-0123456789ABCDEF/);
  assert.match(html, /077 463 8001|Test Customer/);
  assert(!html.includes('064 857'));
}
assert.match(customerEmail, /7–10 business days/);
assert.match(ownerEmail, /New paid Festive BOGO order/);

const tracking = fs.readFileSync(path.join(publicRoot, 'tracking.js'), 'utf8');
assert(tracking.includes("'1084792373896315'"));
assert(tracking.includes("'1723955528897231'"));
assert(tracking.includes("const GA = 'G-NT5SEGTN2N'"));
assert.match(tracking, /add_to_cart:\s*\['AddToCart'/);
assert.match(tracking, /initiate_checkout:\s*\['InitiateCheckout'/);
assert.match(tracking, /No Purchase, payment webhook or Conversions API is added/);

const promo = fs.readFileSync(path.join(publicRoot, 'promo.html'), 'utf8');
const app = fs.readFileSync(path.join(publicRoot, 'app.js'), 'utf8');
assert.match(promo, /FESTIVE BOGO/);
assert.match(promo, /Continue to secure checkout/);
assert(!/October BOGO|31 October 2026/i.test(promo));
assert.match(app, /api\/catalog\/availability/);
assert.match(app, /bogo-checkout\.html/);
assert.match(app, /add_to_cart/);
assert(!app.includes('continue-whatsapp'));

for (const file of ['privacy-policy.html', 'shipping-info.html', 'returns-policy.html']) {
  const html = fs.readFileSync(path.join(publicRoot, file), 'utf8');
  assert.match(html, /Last updated: 1 October 2026/);
}

for (const file of ['promo.html', 'bogo-checkout.html', 'bogo-success.html', 'stock-admin.html']) {
  const html = fs.readFileSync(path.join(publicRoot, file), 'utf8');
  for (const match of html.matchAll(/(?:src|href)="([^"?#]+)(?:[?#][^"]*)?"/g)) {
    const target = match[1];
    if (/^(?:https?:|mailto:|tel:|#)/.test(target)) continue;
    const local = path.join(publicRoot, target.replace(/^\//, ''));
    assert(fs.existsSync(local), `${file}: missing local asset ${target}`);
  }
}

for (const file of ['index.js', 'db.js', 'email.js', 'pudo.js', 'catalog.js', 'legacy-catalog.js', 'public/app.js', 'public/bogo-checkout.js', 'public/bogo-success.js', 'public/stock-admin.js', 'public/tracking.js']) {
  execFileSync(process.execPath, ['--check', path.join(root, file)], { stdio: 'pipe' });
}

for (const file of fs.readdirSync(publicRoot)) {
  if (!/\.(?:html|js|css)$/.test(file)) continue;
  const content = fs.readFileSync(path.join(publicRoot, file), 'utf8');
  assert(!content.includes('27648570979'), `${file} still contains the retired WhatsApp number`);
  assert(!content.includes('064 857 0979'), `${file} still contains the retired WhatsApp number`);
}

const webhookSecret = crypto.randomBytes(32);
process.env.YOCO_WEBHOOK_SECRET = `whsec_${webhookSecret.toString('base64')}`;
const { verifyWebhookSignature, customerFrom } = require('./index');
const timestamp = String(Math.floor(Date.now() / 1000));
const webhookId = 'evt_test';
const rawBody = JSON.stringify({ id: webhookId, type: 'payment.succeeded' });
const signature = crypto.createHmac('sha256', webhookSecret).update(`${webhookId}.${timestamp}.${rawBody}`).digest('base64');
assert.equal(verifyWebhookSignature(webhookId, timestamp, rawBody, `v1,${signature}`), true);
assert.equal(verifyWebhookSignature(webhookId, timestamp, `${rawBody}x`, `v1,${signature}`), false);
assert.equal(customerFrom({ firstName: 'A', lastName: 'B', email: 'a@example.com', phone: '077 123 4567' }).email, 'a@example.com');
assert.throws(() => customerFrom({ firstName: 'A', lastName: 'B', email: 'bad', phone: '123' }));

console.log('PASS: Festive catalog, shipping tiers, PUDO normalization, emails, assets, policies, tracking, syntax, customer validation and Yoco signature verification.');
