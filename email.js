'use strict';

const fetch = require('node-fetch');

const BRAND = {
  burgundy: '#7f2f49',
  burgundyDark: '#3b1623',
  gold: '#d9aa4e',
  cream: '#fbf6ef',
  ink: '#241a17',
  muted: '#74635c',
};

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function money(cents) {
  return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(Number(cents || 0) / 100);
}

async function sendEmail({ to, toName, subject, htmlContent }) {
  if (!process.env.BREVO_API_KEY) throw new Error('BREVO_API_KEY is not configured');
  const senderEmail = process.env.BREVO_SENDER_EMAIL || 'order@elyseanperfumes.co.za';
  const senderName = process.env.BREVO_SENDER_NAME || 'Elysean Perfumes';
  const replyEmail = process.env.BREVO_REPLY_TO || 'elyseanperfumes@gmail.com';

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'api-key': process.env.BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: to, name: toName }],
      replyTo: { email: replyEmail, name: senderName },
      subject,
      htmlContent,
    }),
    timeout: 15_000,
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`Brevo HTTP ${response.status}: ${JSON.stringify(body)}`);
  return body;
}

function productRows(items, orderType = 'bogo') {
  return items.map((item) => `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid #eadfd5;vertical-align:top">
        <strong style="display:block;color:${BRAND.ink};font-size:15px">Elysean No. ${String(item.productId).padStart(3, '0')} · ${escapeHtml(item.reference)}</strong>
        <span style="display:block;color:${BRAND.muted};font-size:12px;margin-top:4px">${orderType === 'bogo'
          ? `${escapeHtml(item.variant)} · ${item.quantity} paid + ${item.quantity} complimentary · ${item.quantity * 2} × 100 ml`
          : `${escapeHtml(item.variant)} · Quantity ${item.quantity}`}</span>
      </td>
      <td style="padding:14px 0;border-bottom:1px solid #eadfd5;text-align:right;vertical-align:top;white-space:nowrap;color:${BRAND.ink};font-weight:700">${money(item.lineTotalCents)}</td>
    </tr>`).join('');
}

function customerTemplate(order) {
  const customer = order.customer;
  const delivery = order.delivery || order.locker || {};
  const name = `${customer.firstName} ${customer.lastName}`.trim();
  const isBogo = order.order_type === 'bogo';
  return `<!doctype html>
  <html><body style="margin:0;background:${BRAND.cream};font-family:Montserrat,Arial,sans-serif;color:${BRAND.ink}">
    <div style="max-width:640px;margin:0 auto;padding:24px 12px">
      <div style="background:#fff;border:1px solid #eadfd5;border-radius:22px;overflow:hidden;box-shadow:0 16px 45px rgba(59,22,35,.08)">
        <div style="padding:34px 28px;text-align:center;background:linear-gradient(135deg,${BRAND.burgundyDark},${BRAND.burgundy})">
          <div style="color:${BRAND.gold};font-family:Georgia,serif;font-size:30px;letter-spacing:5px">ELYSEAN</div>
          <div style="color:#fff;font-size:9px;letter-spacing:5px;margin-top:7px">PERFUMES</div>
        </div>
        <div style="padding:34px 28px">
          <p style="margin:0;color:${BRAND.gold};font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase">Payment confirmed</p>
          <h1 style="font-family:Georgia,serif;font-size:31px;line-height:1.1;margin:10px 0 16px;color:${BRAND.burgundyDark}">Thank you, ${escapeHtml(customer.firstName)}.</h1>
          <p style="font-size:14px;line-height:1.75;color:${BRAND.muted};margin:0 0 24px">Your ${isBogo ? 'Festive BOGO ' : ''}order has been received and payment has been confirmed. Your fragrances will now move into sourcing and preparation.</p>

          <div style="background:${BRAND.cream};border-radius:14px;padding:18px;margin-bottom:24px">
            <div style="font-size:10px;color:${BRAND.burgundy};font-weight:700;letter-spacing:1.5px;text-transform:uppercase">Order reference</div>
            <div style="font-family:Georgia,serif;font-size:24px;color:${BRAND.burgundyDark};margin-top:6px">${escapeHtml(order.order_number)}</div>
          </div>

          <table style="width:100%;border-collapse:collapse">${productRows(order.items, order.order_type)}</table>

          <table style="width:100%;border-collapse:collapse;margin:22px 0">
            <tr><td style="padding:5px 0;color:${BRAND.muted};font-size:13px">Fragrances</td><td style="text-align:right">${money(order.subtotal_cents)}</td></tr>
            <tr><td style="padding:5px 0;color:${BRAND.muted};font-size:13px">${escapeHtml(delivery.zoneName || 'Local delivery')}</td><td style="text-align:right">${money(order.shipping_cents)}</td></tr>
            <tr><td style="padding:14px 0 0;border-top:1px solid #eadfd5;font-weight:700">Total paid</td><td style="padding:14px 0 0;border-top:1px solid #eadfd5;text-align:right;font-size:19px;font-weight:700;color:${BRAND.burgundy}">${money(order.total_cents)}</td></tr>
          </table>

          <div style="border-left:3px solid ${BRAND.gold};padding:4px 0 4px 16px;margin:24px 0">
            <strong style="display:block;margin-bottom:6px">${delivery.method === 'collection' ? 'Collection details' : 'Local delivery details'}</strong>
            <span style="font-size:13px;line-height:1.6;color:${BRAND.muted}">${escapeHtml(delivery.areaName || 'George collection')}<br>${delivery.method === 'collection' ? 'We will arrange collection with you when the order is ready.' : [delivery.addressLine1, delivery.addressLine2, delivery.suburb, delivery.postalCode].filter(Boolean).map(escapeHtml).join('<br>')}</span>
          </div>

          <p style="font-size:13px;line-height:1.75;color:${BRAND.muted}"><strong style="color:${BRAND.ink}">Preparation:</strong> Each fragrance is made to order. Please allow approximately 7–10 business days for ingredient sourcing, blending and preparation.</p>
          <p style="font-size:13px;line-height:1.75;color:${BRAND.muted}"><strong style="color:${BRAND.ink}">Delivery:</strong> ${escapeHtml(delivery.schedule || 'We will contact you to arrange delivery after your order is ready.')} We will confirm the delivery date with you. No Sunday deliveries.</p>

          <div style="margin-top:28px;padding-top:22px;border-top:1px solid #eadfd5;font-size:12px;line-height:1.7;color:${BRAND.muted}">
            Questions? Reply to this email or contact us on <a href="https://wa.me/27774638001" style="color:${BRAND.burgundy};font-weight:700">WhatsApp 077 463 8001</a>.<br>
            Customer: ${escapeHtml(name)} · ${escapeHtml(customer.email)}
          </div>
        </div>
      </div>
      <p style="text-align:center;color:#9a8981;font-size:11px;line-height:1.6;margin:18px">Elysean Perfumes · George, Western Cape, South Africa<br>Independent fragrance house · 20% Eau de Parfum</p>
    </div>
  </body></html>`;
}

function ownerTemplate(order) {
  const customer = order.customer;
  const delivery = order.delivery || order.locker || {};
  const isBogo = order.order_type === 'bogo';
  return `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#222;max-width:720px;margin:0 auto;padding:24px">
    <h1 style="margin:0 0 8px">New paid ${isBogo ? 'Festive BOGO ' : ''}order</h1>
    <p style="margin:0 0 20px"><strong>${escapeHtml(order.order_number)}</strong> · ${money(order.total_cents)}</p>
    <h2>Customer</h2>
    <p>${escapeHtml(customer.firstName)} ${escapeHtml(customer.lastName)}<br>${escapeHtml(customer.email)}<br>${escapeHtml(customer.phone)}</p>
    <h2>Fragrances</h2>
    <table style="width:100%;border-collapse:collapse">${productRows(order.items, order.order_type)}</table>
    <h2>${delivery.method === 'collection' ? 'Collection details' : 'Local delivery details'}</h2>
    <p><strong>${escapeHtml(delivery.areaName || 'George collection')}</strong><br>Zone: ${escapeHtml(delivery.zoneName || order.delivery_zone || order.shipping_tier || '')}<br>${delivery.method === 'collection' ? 'Customer will collect by arrangement.' : [delivery.addressLine1, delivery.addressLine2, delivery.suburb, delivery.postalCode].filter(Boolean).map(escapeHtml).join('<br>')}<br>Instructions: ${escapeHtml(delivery.instructions || 'None')}<br>Schedule: ${escapeHtml(delivery.schedule || '')}</p>
    <h2>Totals</h2>
    <p>Fragrances: ${money(order.subtotal_cents)}<br>Delivery: ${money(order.shipping_cents)}<br><strong>Total paid: ${money(order.total_cents)}</strong></p>
    <p>Yoco checkout: ${escapeHtml(order.checkout_id || '')}<br>Payment: ${escapeHtml(order.payment_id || '')}</p>
  </body></html>`;
}

async function sendCustomerEmail(order) {
  const customer = order.customer;
  const customerName = `${customer.firstName} ${customer.lastName}`.trim();
  return sendEmail({
    to: customer.email,
    toName: customerName,
    subject: `Payment confirmed — ${order.order_number} | Elysean Perfumes`,
    htmlContent: customerTemplate(order),
  });
}

async function sendOwnerEmail(order) {
  const ownerEmail = process.env.OWNER_EMAIL || 'elyseanperfumes@gmail.com';
  return sendEmail({
    to: ownerEmail,
    toName: 'Elysean Perfumes',
    subject: `New paid order ${order.order_number} — ${money(order.total_cents)}`,
    htmlContent: ownerTemplate(order),
  });
}

async function sendOrderEmails(order) {
  await sendCustomerEmail(order);
  await sendOwnerEmail(order);
}

module.exports = { sendOrderEmails, sendCustomerEmail, sendOwnerEmail, customerTemplate, ownerTemplate, money, escapeHtml };
