(() => {
  'use strict';
  const CART_KEY = 'elysean-bogo-cart-v1';
  const LOCKER_KEY = 'elysean-pudo-locker-v1';
  const ATTRIBUTION_KEY = 'elysean-bogo-attribution-v1';
  const products = new Map((window.ELYSEAN_PRODUCTS || []).map((product) => [Number(product.id), product]));
  const state = { cart: readCart(), quote: null, locker: readJson(LOCKER_KEY), busy: false };
  let lockerTimer;

  const $ = (selector) => document.querySelector(selector);
  const money = (cents) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(Number(cents || 0) / 100);
  const escapeHtml = (value) => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');

  function readJson(key) {
    try { return JSON.parse(localStorage.getItem(key)); } catch (_) { return null; }
  }
  function readCart() {
    const raw = readJson(CART_KEY);
    if (!Array.isArray(raw)) return [];
    return raw.filter((item) => products.has(Number(item.productId)) && Number.isInteger(Number(item.quantity)) && Number(item.quantity) > 0)
      .map((item) => ({ productId: Number(item.productId), quantity: Math.min(4, Number(item.quantity)) }));
  }
  function writeCart() { localStorage.setItem(CART_KEY, JSON.stringify(state.cart)); }
  function totalSets() { return state.cart.reduce((sum, item) => sum + item.quantity, 0); }
  function showError(message) {
    const box = $('#checkout-error');
    box.textContent = message;
    box.hidden = !message;
    if (message) box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function renderCart() {
    const container = $('#checkout-items');
    const empty = $('#empty-cart');
    if (!state.cart.length) {
      container.innerHTML = '';
      empty.hidden = false;
      $('#checkout-form').hidden = true;
      updateSummary();
      return;
    }
    empty.hidden = true;
    $('#checkout-form').hidden = false;
    container.innerHTML = state.cart.map((item) => {
      const product = products.get(item.productId);
      return `<article class="checkout-item" data-product-id="${item.productId}">
        <div><h3>Elysean No. ${String(product.id).padStart(3, '0')} · ${escapeHtml(product.reference)}</h3>
          <p>${escapeHtml(product.variant)} · 20% Eau de Parfum</p>
          <span class="item-offer">${item.quantity} PAID + ${item.quantity} FREE · ${item.quantity * 2} × 100 ML</span>
        </div>
        <div class="item-price"><strong>${money(product.price100 * 100 * item.quantity)}</strong>
          <div class="quantity" aria-label="BOGO set quantity">
            <button type="button" data-action="decrease" aria-label="Decrease quantity">−</button>
            <output>${item.quantity}</output>
            <button type="button" data-action="increase" aria-label="Increase quantity">+</button>
          </div>
          <button type="button" class="remove-item" data-action="remove">Remove</button>
        </div>
      </article>`;
    }).join('');

    container.querySelectorAll('[data-action]').forEach((button) => button.addEventListener('click', () => {
      const row = button.closest('[data-product-id]');
      const item = state.cart.find((entry) => entry.productId === Number(row.dataset.productId));
      if (!item) return;
      if (button.dataset.action === 'increase') {
        if (totalSets() >= 4) return showError('A maximum of 4 BOGO sets can be purchased in one checkout.');
        item.quantity += 1;
      } else if (button.dataset.action === 'decrease') {
        item.quantity -= 1;
        if (item.quantity < 1) state.cart = state.cart.filter((entry) => entry !== item);
      } else if (button.dataset.action === 'remove') {
        state.cart = state.cart.filter((entry) => entry !== item);
      }
      writeCart();
      state.quote = null;
      showError('');
      renderCart();
      requestQuote();
    }));
  }

  function updateSummary() {
    $('#summary-subtotal').textContent = state.quote ? money(state.quote.subtotalCents) : '—';
    $('#summary-shipping').textContent = state.quote ? money(state.quote.shippingCents) : '—';
    $('#summary-total').textContent = state.quote ? money(state.quote.totalCents) : '—';
    $('#shipping-label').textContent = state.quote ? `PUDO ${state.quote.shippingTier} locker delivery` : 'PUDO locker delivery';
    updatePayButton();
  }

  async function requestQuote() {
    if (!state.cart.length) { state.quote = null; updateSummary(); return; }
    try {
      const response = await fetch('/api/bogo/quote', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: state.cart }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Could not verify this order');
      state.quote = body;
      updateSummary();
      if (!sessionStorage.getItem('elysean-bogo-checkout-tracked')) {
        sessionStorage.setItem('elysean-bogo-checkout-tracked', '1');
        window.ElyseanTracking?.track('initiate_checkout', {
          source: 'festive_bogo_checkout', value: body.totalCents / 100, currency: 'ZAR',
          num_items: body.bottleCount, content_ids: body.items.map((item) => String(item.productId)),
          items: body.items.map((item) => ({ item_id: String(item.productId), item_name: item.reference, price: item.unitPriceCents / 100, quantity: item.quantity })),
          offer: 'Festive BOGO',
        });
      }
    } catch (error) {
      state.quote = null;
      showError(error.message);
      updateSummary();
    }
  }

  function renderSelectedLocker() {
    const selected = $('#selected-locker');
    const results = $('#locker-results');
    if (!state.locker?.code) {
      selected.hidden = true;
      updatePayButton();
      return;
    }
    $('#selected-locker-name').textContent = `${state.locker.name} (${state.locker.code})`;
    $('#selected-locker-address').textContent = state.locker.address || state.locker.city || '';
    selected.hidden = false;
    results.innerHTML = '';
    $('#locker-message').textContent = 'Your selected locker is saved for this checkout.';
    updatePayButton();
  }

  async function searchLockers() {
    const query = $('#locker-query').value.trim();
    if (query.length < 2) { $('#locker-message').textContent = 'Enter at least two letters to search.'; return; }
    const results = $('#locker-results');
    results.innerHTML = '';
    $('#locker-message').textContent = 'Searching PUDO lockers…';
    $('#locker-search-button').disabled = true;
    try {
      const response = await fetch(`/api/pudo/lockers?q=${encodeURIComponent(query)}`);
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Locker search failed');
      if (!body.lockers.length) {
        $('#locker-message').textContent = 'No matching locker was found. Try the town, suburb or shopping-centre name.';
        return;
      }
      $('#locker-message').textContent = `${body.lockers.length} matching locker${body.lockers.length === 1 ? '' : 's'} found.`;
      results.innerHTML = body.lockers.map((locker, index) => `<button class="locker-option" type="button" data-index="${index}">
        <strong>${escapeHtml(locker.name)} <small>(${escapeHtml(locker.code)})</small></strong>
        <span>${escapeHtml(locker.address || locker.city || 'View this locker')}</span>
      </button>`).join('');
      results.querySelectorAll('[data-index]').forEach((button) => button.addEventListener('click', () => {
        state.locker = body.lockers[Number(button.dataset.index)];
        localStorage.setItem(LOCKER_KEY, JSON.stringify(state.locker));
        renderSelectedLocker();
      }));
    } catch (error) {
      $('#locker-message').textContent = error.message;
    } finally {
      $('#locker-search-button').disabled = false;
    }
  }

  function updatePayButton() {
    const button = $('#pay-button');
    const enabled = Boolean(state.cart.length && state.quote && state.locker?.code && !state.busy);
    button.disabled = !enabled;
    $('#pay-label').textContent = state.busy ? 'Opening secure payment…' : !state.cart.length ? 'Choose a fragrance first' : !state.quote ? 'Checking order…' : !state.locker?.code ? 'Select a locker to continue' : `Pay ${money(state.quote.totalCents)} securely`;
  }

  async function submitOrder(event) {
    event.preventDefault();
    showError('');
    if (!event.currentTarget.reportValidity()) return;
    if (!state.quote) return showError('Your order could not be verified. Please refresh and try again.');
    if (!state.locker?.code) return showError('Please select a PUDO locker.');
    state.busy = true;
    updatePayButton();
    try {
      const response = await fetch('/api/bogo/checkout', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: state.cart,
          customer: {
            firstName: $('#first-name').value.trim(), lastName: $('#last-name').value.trim(),
            email: $('#email').value.trim(), phone: $('#phone').value.trim(),
          },
          lockerCode: state.locker.code,
          termsAccepted: $('#terms').checked,
          attribution: readJson(ATTRIBUTION_KEY) || {},
        }),
      });
      const body = await response.json();
      if (!response.ok || !body.redirectUrl) throw new Error(body.error || 'Payment could not be started');
      window.location.assign(body.redirectUrl);
    } catch (error) {
      state.busy = false;
      updatePayButton();
      showError(error.message);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (new URLSearchParams(location.search).get('payment') === 'cancelled') $('#payment-notice').hidden = false;
    renderCart();
    renderSelectedLocker();
    requestQuote();
    $('#locker-search-button').addEventListener('click', searchLockers);
    $('#locker-query').addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); searchLockers(); } });
    $('#locker-query').addEventListener('input', () => {
      clearTimeout(lockerTimer);
      lockerTimer = setTimeout(() => { if ($('#locker-query').value.trim().length >= 3) searchLockers(); }, 650);
    });
    $('#change-locker').addEventListener('click', () => {
      state.locker = null;
      localStorage.removeItem(LOCKER_KEY);
      $('#selected-locker').hidden = true;
      $('#locker-query').focus();
      updatePayButton();
    });
    $('#checkout-form').addEventListener('submit', submitOrder);
  });
})();
