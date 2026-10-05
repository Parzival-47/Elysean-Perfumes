(() => {
  'use strict';
  const CART_KEY = 'elysean-bogo-cart-v1';
  const DELIVERY_KEY = 'elysean-delivery-v1';
  const ATTRIBUTION_KEY = 'elysean-bogo-attribution-v1';
  const products = new Map((window.ELYSEAN_PRODUCTS || []).map((product) => [Number(product.id), product]));
  const deliveryApi = window.ElyseanDelivery;
  const state = { cart: readCart(), quote: null, delivery: readJson(DELIVERY_KEY) || {}, busy: false };
  const $ = (selector) => document.querySelector(selector);
  const money = (cents) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(Number(cents || 0) / 100);
  const escapeHtml = (value) => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
  function readJson(key) { try { return JSON.parse(localStorage.getItem(key)); } catch (_) { return null; } }
  function readCart() {
    const raw = readJson(CART_KEY);
    if (!Array.isArray(raw)) return [];
    return raw.filter((item) => products.has(Number(item.productId)) && Number.isInteger(Number(item.quantity)) && Number(item.quantity) > 0)
      .map((item) => ({ productId: Number(item.productId), quantity: Math.min(4, Number(item.quantity)) }));
  }
  function writeCart() { localStorage.setItem(CART_KEY, JSON.stringify(state.cart)); }
  function totalSets() { return state.cart.reduce((sum, item) => sum + item.quantity, 0); }
  function showError(message) { const box = $('#checkout-error'); box.textContent = message; box.hidden = !message; if (message) box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
  function renderCart() {
    const container = $('#checkout-items');
    if (!state.cart.length) { container.innerHTML = ''; $('#empty-cart').hidden = false; $('#checkout-form').hidden = true; updateSummary(); return; }
    $('#empty-cart').hidden = true; $('#checkout-form').hidden = false;
    container.innerHTML = state.cart.map((item) => {
      const product = products.get(item.productId);
      return `<article class="checkout-item" data-product-id="${item.productId}"><div><h3>Elysean No. ${String(product.id).padStart(3, '0')} · ${escapeHtml(product.reference)}</h3><p>${escapeHtml(product.variant)} · 20% Eau de Parfum</p><span class="item-offer">${item.quantity} PAID + ${item.quantity} FREE · ${item.quantity * 2} × 100 ML</span></div><div class="item-price"><strong>${money(product.price100 * 100 * item.quantity)}</strong><div class="quantity"><button type="button" data-action="decrease" aria-label="Decrease quantity">−</button><output>${item.quantity}</output><button type="button" data-action="increase" aria-label="Increase quantity">+</button></div><button type="button" class="remove-item" data-action="remove">Remove</button></div></article>`;
    }).join('');
    container.querySelectorAll('[data-action]').forEach((button) => button.addEventListener('click', () => {
      const item = state.cart.find((entry) => entry.productId === Number(button.closest('[data-product-id]').dataset.productId));
      if (!item) return;
      if (button.dataset.action === 'increase') { if (totalSets() >= 4) return showError('A maximum of 4 BOGO sets can be purchased in one checkout.'); item.quantity += 1; }
      else if (button.dataset.action === 'decrease') { item.quantity -= 1; if (item.quantity < 1) state.cart = state.cart.filter((entry) => entry !== item); }
      else state.cart = state.cart.filter((entry) => entry !== item);
      writeCart(); state.quote = null; showError(''); renderCart(); requestQuote();
    }));
  }
  function selectedArea() { return deliveryApi?.getArea($('#delivery-area')?.value); }
  function deliveryPayload() { return { areaId: $('#delivery-area').value, addressLine1: $('#address-line-1').value.trim(), addressLine2: $('#address-line-2').value.trim(), suburb: $('#suburb').value.trim(), postalCode: $('#postal-code').value.trim(), instructions: $('#delivery-instructions').value.trim() }; }
  function saveDelivery() { state.delivery = deliveryPayload(); localStorage.setItem(DELIVERY_KEY, JSON.stringify(state.delivery)); }
  function renderDelivery() {
    const match = selectedArea(); const note = $('#delivery-note'); const address = $('#address-fields');
    if (!match) { note.hidden = true; address.hidden = true; }
    else { note.innerHTML = `<strong>${escapeHtml(match.zone.name)} · ${money(match.zone.customerChargeCents)}</strong>${escapeHtml(match.zone.schedule)}`; note.hidden = false; address.hidden = match.zone.method === 'collection'; ['#address-line-1', '#suburb', '#postal-code'].forEach((selector) => { $(selector).required = match.zone.method !== 'collection'; }); }
    saveDelivery(); requestQuote(); updatePayButton();
  }
  function populateAreas() {
    $('#delivery-area').insertAdjacentHTML('beforeend', deliveryApi.areas.map((area) => { const zone = deliveryApi.getArea(area.id).zone; return `<option value="${area.id}">${escapeHtml(area.name)} — ${money(zone.customerChargeCents)}</option>`; }).join(''));
    if (deliveryApi.getArea(state.delivery.areaId)) $('#delivery-area').value = state.delivery.areaId;
    [['#address-line-1','addressLine1'],['#address-line-2','addressLine2'],['#suburb','suburb'],['#postal-code','postalCode'],['#delivery-instructions','instructions']].forEach(([selector,key]) => { $(selector).value = state.delivery[key] || ''; });
    renderDelivery();
  }
  function updateSummary() {
    $('#summary-subtotal').textContent = state.quote ? money(state.quote.subtotalCents) : '—';
    $('#summary-shipping').textContent = state.quote && state.quote.shippingCents !== null ? money(state.quote.shippingCents) : '—';
    $('#summary-total').textContent = state.quote && state.quote.shippingCents !== null ? money(state.quote.totalCents) : '—';
    $('#shipping-label').textContent = state.quote?.deliveryZoneName || 'Local delivery'; updatePayButton();
  }
  async function requestQuote() {
    if (!state.cart.length) { state.quote = null; updateSummary(); return; }
    try {
      const response = await fetch('/api/bogo/quote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: state.cart, deliveryAreaId: $('#delivery-area')?.value || '' }) });
      const body = await response.json(); if (!response.ok) throw new Error(body.error || 'Could not verify this order'); state.quote = body; updateSummary();
      if (body.shippingCents !== null && !sessionStorage.getItem('elysean-bogo-checkout-tracked')) { sessionStorage.setItem('elysean-bogo-checkout-tracked', '1'); window.ElyseanTracking?.track('initiate_checkout', { source: 'festive_bogo_checkout', value: body.totalCents / 100, currency: 'ZAR', num_items: body.bottleCount, content_ids: body.items.map((item) => String(item.productId)), items: body.items.map((item) => ({ item_id: String(item.productId), item_name: item.reference, price: item.unitPriceCents / 100, quantity: item.quantity })), offer: 'Festive BOGO' }); }
    } catch (error) { state.quote = null; if ($('#delivery-area')?.value) showError(error.message); updateSummary(); }
  }
  function updatePayButton() {
    const area = selectedArea(); const button = $('#pay-button'); const enabled = Boolean(state.cart.length && state.quote && state.quote.shippingCents !== null && area && !state.busy); button.disabled = !enabled;
    $('#pay-label').textContent = state.busy ? 'Opening secure payment…' : !state.cart.length ? 'Choose a fragrance first' : !area ? 'Choose your delivery area' : !state.quote ? 'Checking order…' : `Pay ${money(state.quote.totalCents)} securely`;
  }
  async function submitOrder(event) {
    event.preventDefault(); showError(''); if (!event.currentTarget.reportValidity()) return; if (!state.quote || state.quote.shippingCents === null) return showError('Please choose a delivery area.');
    saveDelivery(); state.busy = true; updatePayButton();
    try {
      const response = await fetch('/api/bogo/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: state.cart, customer: { firstName: $('#first-name').value.trim(), lastName: $('#last-name').value.trim(), email: $('#email').value.trim(), phone: $('#phone').value.trim() }, delivery: state.delivery, termsAccepted: $('#terms').checked, attribution: readJson(ATTRIBUTION_KEY) || {} }) });
      const body = await response.json(); if (!response.ok || !body.redirectUrl) throw new Error(body.error || 'Payment could not be started'); window.location.assign(body.redirectUrl);
    } catch (error) { state.busy = false; updatePayButton(); showError(error.message); }
  }
  document.addEventListener('DOMContentLoaded', () => {
    if (!deliveryApi) return showError('Delivery options could not be loaded. Please refresh the page.');
    if (new URLSearchParams(location.search).get('payment') === 'cancelled') $('#payment-notice').hidden = false;
    renderCart(); populateAreas(); requestQuote(); $('#delivery-area').addEventListener('change', renderDelivery);
    ['#address-line-1','#address-line-2','#suburb','#postal-code','#delivery-instructions'].forEach((selector) => $(selector).addEventListener('input', saveDelivery));
    $('#checkout-form').addEventListener('submit', submitOrder);
  });
})();
