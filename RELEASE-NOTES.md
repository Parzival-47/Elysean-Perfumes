# Festive BOGO checkout release — 1 October 2026

## Customer-facing changes

- October BOGO renamed and extended to **Festive BOGO**, ending 31 December 2026.
- Landing-page layout and premium light theme retained.
- Product availability now loads from the server; unavailable scents are labelled and cannot be selected.
- Selected BOGO fragrances now continue to a dedicated checkout instead of WhatsApp.
- New checkout supports up to four BOGO sets/eight physical bottles.
- Customer selects a PUDO destination locker before payment.
- Delivery is calculated automatically: R79 for 1–4 physical bottles, R104 for 5–8.
- Yoco remains the secure hosted card-payment provider.
- New payment confirmation page waits for the signed Yoco webhook before showing a paid order.
- Privacy, shipping and returns pages reflect the new checkout, providers, timing and delivery tiers.
- Retired WhatsApp number removed from public website files. The active number is 077 463 8001.

## Business operations

- New private stock manager at `/stock-admin.html`.
- All 292 BOGO products start as available in Neon and can be changed individually.
- Stock is enforced in the browser and rechecked by the server before checkout.
- Orders and webhook events are stored in Neon instead of a local JSON file.
- Customer and owner emails are sent through Brevo only after a verified successful payment.
- Customer and owner email completion are stored separately to reduce duplicates during webhook retries.
- PUDO shipment booking remains manual after preparation; the chosen destination locker is included in the owner email.

## Tracking

- Existing Meta Pixels `1084792373896315` and `1723955528897231` are retained.
- Existing GA4 property `G-NT5SEGTN2N` is retained.
- Consent behavior is unchanged.
- BOGO funnel events now include `ViewContent`, `AddToCart` and `InitiateCheckout`/`begin_checkout`.
- No Meta or GA4 `Purchase`, payment-success or refund event was added.

## Added files

- `.env.example`
- `DEPLOYMENT-GUIDE.md`
- `RELEASE-NOTES.md`
- `catalog.js`
- `legacy-catalog.js`
- `shop-config.js`
- `db.js`
- `pudo.js`
- `email.js`
- `festive-tests.cjs`
- `public/bogo-checkout.html`
- `public/bogo-checkout.css`
- `public/bogo-checkout.js`
- `public/bogo-success.html`
- `public/bogo-success.css`
- `public/bogo-success.js`
- `public/stock-admin.html`
- `public/stock-admin.css`
- `public/stock-admin.js`

## Main updated files

- `index.js`
- `package.json`
- `package-lock.json`
- `public/promo.html`
- `public/promo.css`
- `public/app.js`
- `public/tracking.js`
- `public/privacy-policy.html`
- `public/shipping-info.html`
- `public/returns-policy.html`
- `public/home-page.html`
- `public/product-page.html`
- `public/cart-page.html`
- `register-webhook.js`
- `tests.cjs`
- `INSTALL.txt`

See `DEPLOYMENT-GUIDE.md` before deploying.
