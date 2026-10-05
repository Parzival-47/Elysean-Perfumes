# Elysean local-delivery deployment

## What changed

Perfume orders now use Elysean's own Garden Route delivery service. Free George collection and three trusted server-side zones are available: George R79, extended coastal areas R99, and Mossel Bay/Knysna routes R159. National courier delivery has been removed.

## Deploy

1. Back up the current repository and Render environment variables.
2. Replace the project files with this package, but keep your private `.env` file and Render secrets.
3. Run `npm install` and `npm test` locally.
4. Commit and push to the GitHub branch connected to Render.
5. Wait for the Render deployment and confirm `/health` reports a connected database.
6. Old courier API variables may be deleted from Render; this build does not use them. No new environment variable is required.

## Required checks

1. Open `promo.html`, choose a fragrance and continue to checkout.
2. Verify free George collection and the R79, R99 and R159 zones.
3. Verify that address fields are required for delivery and hidden for collection.
4. Complete one Yoco test payment and confirm both Brevo emails contain the area, address, fee and local schedule.
5. Test the regular shop checkout and both Discovery bundle sizes.
6. Confirm the stock-admin page still changes availability.
7. Confirm Meta test events reach both configured pixels and GA4 remains consent-aware.

## Existing services

Neon remains the stock and order database. Existing database columns are reused safely, so no manual migration is required. Yoco, Brevo, both Meta Pixels, GA4, Render and the stock-admin credentials are unchanged.

## Delivery schedule

- George: weekdays after 17:00, or Saturday/selected public holidays before 13:00.
- Zone 2 and Zone 3: scheduled Saturday or selected public-holiday routes before 13:00.
- No Sunday deliveries.
