'use strict';

const OFFER_DEADLINE = '2026-12-31T23:59:59+02:00';
const MAX_BOGO_SETS = 4;

const SHIPPING_TIERS = Object.freeze([
  Object.freeze({ code: 'XS', maxBottles: 4, customerChargeCents: 7900, dimensions: '60 × 17 × 8 cm', maxWeightKg: 2 }),
  Object.freeze({ code: 'S', maxBottles: 8, customerChargeCents: 10400, dimensions: '60 × 41 × 8 cm', maxWeightKg: 5 }),
]);

function isOfferActive(now = new Date()) {
  return now.getTime() <= new Date(OFFER_DEADLINE).getTime();
}

function shippingForBottles(bottleCount) {
  const tier = SHIPPING_TIERS.find((item) => bottleCount <= item.maxBottles);
  if (!tier) {
    throw new Error(`Orders above ${SHIPPING_TIERS.at(-1).maxBottles} bottles are not available in one checkout yet`);
  }
  return tier;
}

module.exports = {
  OFFER_DEADLINE,
  MAX_BOGO_SETS,
  SHIPPING_TIERS,
  isOfferActive,
  shippingForBottles,
};
