'use strict';

const fetch = require('node-fetch');

const CACHE_MS = 6 * 60 * 60 * 1000;
let cached = { expires: 0, lockers: [] };

function compact(parts) {
  return [...new Set(parts.map((value) => String(value || '').trim()).filter(Boolean))].join(', ');
}

function normalizeLocker(raw) {
  const addressObject = raw.address || raw.physical_address || raw.physicalAddress || {};
  const city = raw.city || raw.town || addressObject.city || addressObject.town || raw.local_area || raw.localArea || addressObject.local_area || addressObject.localArea || '';
  const address = compact([
    raw.street_address || raw.streetAddress || raw.address_line || raw.addressLine || addressObject.street_address || addressObject.streetAddress,
    raw.suburb || addressObject.suburb,
    raw.local_area || raw.localArea || addressObject.local_area || addressObject.localArea,
    city,
    raw.postal_code || raw.postalCode || addressObject.postal_code || addressObject.postalCode || addressObject.code,
  ]);

  return {
    code: String(raw.code || raw.locker_code || raw.lockerCode || raw.terminal_id || raw.terminalId || raw.id || ''),
    name: String(raw.name || raw.locker_name || raw.lockerName || raw.business_name || raw.businessName || raw.title || 'PUDO locker'),
    address,
    city: String(city),
    latitude: Number(raw.latitude ?? raw.lat ?? addressObject.latitude ?? addressObject.lat) || null,
    longitude: Number(raw.longitude ?? raw.lng ?? addressObject.longitude ?? addressObject.lng) || null,
    openingHours: Array.isArray(raw.openinghours) ? raw.openinghours : (Array.isArray(raw.openingHours) ? raw.openingHours : []),
  };
}

async function getLockers({ force = false } = {}) {
  if (!force && cached.expires > Date.now() && cached.lockers.length) return cached.lockers;

  const apiKey = process.env.PUDO_API_KEY;
  if (!apiKey) throw new Error('PUDO_API_KEY is not configured');

  const baseUrl = String(process.env.PUDO_API_URL || 'https://api-pudo.co.za').replace(/\/$/, '');
  const lockersPath = `/${String(process.env.PUDO_LOCKERS_PATH || 'lockers-data').replace(/^\/+/, '')}`;
  const response = await fetch(`${baseUrl}${lockersPath}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    timeout: 15_000,
  });

  if (!response.ok) {
    throw new Error(`PUDO locker request failed with HTTP ${response.status}`);
  }

  const body = await response.json();
  const records = Array.isArray(body) ? body
    : [body.data, body.lockers, body.locations, body.results, body.data?.lockers, body.data?.locations]
      .find((value) => Array.isArray(value)) || [];
  const lockers = records.map(normalizeLocker).filter((locker) => locker.code && locker.name);
  if (!lockers.length) throw new Error('PUDO returned no lockers');

  cached = { expires: Date.now() + CACHE_MS, lockers };
  return lockers;
}

async function findLocker(code) {
  const lockers = await getLockers();
  return lockers.find((locker) => locker.code.toLowerCase() === String(code || '').toLowerCase()) || null;
}

async function searchLockers(query) {
  const term = String(query || '').trim().toLowerCase();
  if (term.length < 2) return [];
  const lockers = await getLockers();
  return lockers
    .filter((locker) => `${locker.name} ${locker.address} ${locker.city} ${locker.code}`.toLowerCase().includes(term))
    .slice(0, 40);
}

module.exports = { getLockers, findLocker, searchLockers, normalizeLocker };
