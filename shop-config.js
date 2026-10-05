'use strict';

const OFFER_DEADLINE = '2026-12-31T23:59:59+02:00';
const MAX_BOGO_SETS = 4;
const delivery = require('./public/delivery-config');

function isOfferActive(now = new Date()) {
  return now.getTime() <= new Date(OFFER_DEADLINE).getTime();
}

module.exports = {
  OFFER_DEADLINE,
  MAX_BOGO_SETS,
  isOfferActive,
  delivery,
};
