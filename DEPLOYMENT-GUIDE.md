# Elysean Festive BOGO — deployment guide

This package adds a direct, server-verified Festive BOGO checkout to the existing Elysean website. It keeps the normal website checkout, both Meta Pixels, GA4 and the consent manager in place.

## What is included

- Festive BOGO offer through **31 December 2026 at 23:59 SAST**.
- Live fragrance availability from Neon PostgreSQL.
- Private stock manager at `/stock-admin.html`.
- Direct BOGO cart and checkout at `/bogo-checkout.html`.
- PUDO destination-locker search using the server-side PUDO API key.
- Server-calculated product and delivery prices.
- Yoco hosted payment checkout.
- Signed Yoco webhook verification, payment idempotency and database-backed orders.
- Premium customer confirmation and internal new-order emails through Brevo.
- Payment-status confirmation page at `/bogo-success.html`.
- Updated privacy, returns and shipping pages.
- No Meta or GA4 `Purchase` event. Successful payments remain in Yoco and the order database only.

## Shipping rules in this build

| BOGO sets | Physical bottles | PUDO tier | Customer delivery charge |
|---:|---:|---|---:|
| 1–2 | 2–4 | XS | R79 |
| 3–4 | 6–8 | S | R104 |

Online BOGO orders are capped at four sets/eight physical bottles until real packed dimensions have been confirmed for larger tiers.

## 1. Upload the code to GitHub

Replace the deployed project files with this package, while keeping your repository's `.git` folder. Do not upload `node_modules` or any local `.env` file. Commit and push the changed files to the branch connected to Render.

Important new server files include:

- `db.js`
- `catalog.js`
- `legacy-catalog.js`
- `shop-config.js`
- `pudo.js`
- `email.js`

Important new public pages include:

- `public/bogo-checkout.html`
- `public/bogo-success.html`
- `public/stock-admin.html`

## 2. Add the Render environment variables

Open **Render Dashboard → your Elysean web service → Environment**. Add or verify all of the following. Never put secret values into HTML, JavaScript in `public/`, GitHub, screenshots or messages.

| Variable | What to enter |
|---|---|
| `NODE_ENV` | `production` |
| `PUBLIC_BASE_URL` | `https://elyseanperfumes.co.za` |
| `DATABASE_URL` | The complete Neon pooled connection string; you already added this |
| `YOCO_SECRET_KEY` | Your Yoco live secret key |
| `YOCO_WEBHOOK_SECRET` | The signing secret for the Yoco webhook registered below |
| `BREVO_API_KEY` | Your Brevo API key |
| `BREVO_SENDER_EMAIL` | `order@elyseanperfumes.co.za` |
| `BREVO_SENDER_NAME` | `Elysean Perfumes` |
| `BREVO_REPLY_TO` | `elyseanperfumes@gmail.com` |
| `OWNER_EMAIL` | `elyseanperfumes@gmail.com` |
| `STOCK_ADMIN_PASSWORD` | A new long, unique password used only for the stock page |
| `SESSION_SECRET` | A random secret of at least 48 characters |
| `PUDO_API_KEY` | The approved production API key from PUDO |
| `PUDO_API_URL` | `https://api-pudo.co.za` unless PUDO supplied a different production base URL |
| `PUDO_LOCKERS_PATH` | `lockers-data` unless PUDO supplied a different locker endpoint |

To generate a session secret locally, use `openssl rand -base64 48`. Store the generated value only in Render.

After saving environment variables, choose **Manual Deploy → Deploy latest commit** if Render does not deploy automatically.

## 3. Confirm Neon startup

The server creates the required `inventory`, `orders` and `webhook_events` tables automatically at startup. All 292 BOGO fragrances are inserted as available the first time.

After deployment, open:

`https://elyseanperfumes.co.za/health`

The correct response is similar to:

```json
{"status":"ok","database":"connected","time":"..."}
```

If it says `database: disconnected`, verify the full `DATABASE_URL` in Render. It must include the `postgresql://` prefix, username, password, host, database name and `?sslmode=require` portion supplied by Neon.

## 4. Configure and test the stock manager

Open:

`https://elyseanperfumes.co.za/stock-admin.html`

Sign in with `STOCK_ADMIN_PASSWORD`. Search the catalogue and mark scents unavailable according to Scent Lab. Changes save immediately. The public BOGO page disables unavailable fragrances, and the server checks availability again before it creates a Yoco checkout.

Do not share the stock page password. Changing `STOCK_ADMIN_PASSWORD` or `SESSION_SECRET` in Render invalidates old access.

## 5. Confirm PUDO locker search

Open the BOGO page, choose a fragrance and continue to checkout. Search for a destination such as `George`, `Knysna`, a suburb, or a shopping centre.

If the locker search reports that it is unavailable:

1. Check that `PUDO_API_KEY` is the approved production key.
2. Confirm the production base URL and locker-data path in PUDO's approval email/dashboard.
3. Update `PUDO_API_URL` or `PUDO_LOCKERS_PATH` in Render if PUDO supplied different values.
4. Redeploy and test again.

This build selects and saves the customer's destination locker. It does not automatically purchase or book the shipment. After preparation, create the locker-to-locker booking in PUDO manually, using your Paddagat/St Georges Square origin locker and the destination shown in the new-order email.

## 6. Register the Yoco webhook

In the Yoco portal, register or verify this live webhook URL:

`https://elyseanperfumes.co.za/webhook`

Subscribe to at least:

- `payment.succeeded`
- `payment.failed`

Copy that webhook's signing secret into Render as `YOCO_WEBHOOK_SECRET`. The code verifies the signature and timestamp before changing an order to paid. A customer reaching the success URL alone does **not** mark an order paid.

If an older Elysean deployment already uses the same `/webhook` URL, keep only the current registered endpoint/secret pair and update the Render secret to match it.

## 7. Perform one controlled live test

Yoco test keys and live keys must not be mixed. Before sending ad traffic:

1. Mark one fragrance available in the stock manager.
2. Open `promo.html` in a private/incognito window.
3. Choose the fragrance and continue to checkout.
4. Add customer details and select a real PUDO destination locker.
5. Verify the price and shipping tier.
6. Complete one small live Yoco payment.
7. Wait on the confirmation page until it reports the order as paid.
8. Confirm the customer email reaches the test customer.
9. Confirm the new-order email reaches `elyseanperfumes@gmail.com`.
10. Confirm the order and `payment.succeeded` webhook appear in Neon/Yoco logs.
11. Refund the controlled transaction from Yoco if appropriate for the test.

The site intentionally does not send a Meta/GA4 `Purchase` event. Use Yoco and Neon orders as the source of truth for paid orders.

## 8. Final public checks

- `promo.html`: unavailable products are disabled and available ones open the BOGO checkout.
- `bogo-checkout.html`: quantities, R79/R104 delivery, PUDO locker and Yoco redirect work on mobile.
- `bogo-success.html`: waits for the signed Yoco webhook and then confirms the paid order.
- `shipping-info.html`, `returns-policy.html`, `privacy-policy.html`: new wording is visible.
- WhatsApp uses only `077 463 8001`.
- Meta Pixels `1084792373896315` and `1723955528897231`, plus GA4 `G-NT5SEGTN2N`, remain in `public/tracking.js`.

## Operational routine

- Check supplier availability weekly and update `/stock-admin.html`.
- After each paid order, source ingredients, blend and pack within the stated process.
- Create the PUDO locker-to-locker booking manually after preparation.
- Keep the Yoco, Brevo, PUDO, Neon and stock-admin secrets only in Render.
- Review Render logs if a payment confirmation or email does not appear.

