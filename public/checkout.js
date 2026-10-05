(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const cart = JSON.parse(localStorage.getItem('elyseanCart') || '[]');
  const deliveryApi = window.ElyseanDelivery;
  const money = (value) => `R${Number(value || 0).toLocaleString('en-ZA')}`;
  const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * Number(item.qty), 0);
  let deliveryQuote = null;

  function renderItems() {
    $('order-items').innerHTML = cart.length ? cart.map((item) => `<div class="order-item"><div class="order-item-info"><p class="order-item-name">${item.name}</p><p class="order-item-size">${item.size} · EDP 20%</p><p class="order-item-qty">Qty: ${item.qty}</p></div><span class="order-item-price">${money(item.price * item.qty)}</span></div>`).join('') : '<p>Your cart is empty. <a href="product-page.html">Shop now →</a></p>';
    $('right-subtotal').textContent = money(subtotal); $('right-tax').textContent = 'R0'; updateTotals();
  }
  function updateTotals() {
    $('right-shipping').textContent = deliveryQuote ? money(deliveryQuote.customerChargeCents / 100) : '—';
    $('right-shipping-label').textContent = deliveryQuote?.zoneName || 'Local delivery';
    $('right-total').textContent = deliveryQuote ? money(subtotal + deliveryQuote.customerChargeCents / 100) : money(subtotal);
  }
  function populateAreas() {
    if (!deliveryApi) return;
    $('deliveryArea').insertAdjacentHTML('beforeend', deliveryApi.areas.map((area) => { const quote = deliveryApi.quote(area.id); return `<option value="${area.id}">${area.name} — ${money(quote.customerChargeCents / 100)}</option>`; }).join(''));
    $('deliveryArea').addEventListener('change', () => {
      deliveryQuote = $('deliveryArea').value ? deliveryApi.quote($('deliveryArea').value) : null;
      $('deliveryNote').style.display = deliveryQuote ? 'block' : 'none';
      $('deliveryNote').textContent = deliveryQuote ? `${deliveryQuote.zoneName}: ${deliveryQuote.schedule}` : '';
      const needsAddress = deliveryQuote?.method !== 'collection'; $('deliveryAddress').style.display = deliveryQuote && needsAddress ? 'block' : 'none';
      ['addressLine1','suburb','postalCode'].forEach((id) => { $(id).required = Boolean(deliveryQuote && needsAddress); }); updateTotals();
    });
  }
  function error(message) { $('error-msg').textContent = message; $('error-msg').style.display = message ? 'block' : 'none'; }
  async function pay() {
    error('');
    if (!cart.length) return error('Your cart is empty.');
    const customerInfo = { firstName: $('firstName').value.trim(), lastName: $('lastName').value.trim(), email: $('email').value.trim(), phone: $('phone').value.trim() };
    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || !customerInfo.phone) return error('Please complete your name, email and phone number.');
    if (!deliveryQuote) return error('Please choose a delivery area or collection.');
    const delivery = { areaId: $('deliveryArea').value, addressLine1: $('addressLine1').value.trim(), addressLine2: $('addressLine2').value.trim(), suburb: $('suburb').value.trim(), postalCode: $('postalCode').value.trim(), instructions: $('deliveryInstructions').value.trim() };
    if (deliveryQuote.method !== 'collection' && (!delivery.addressLine1 || !delivery.suburb || !delivery.postalCode)) return error('Please complete your local delivery address.');
    $('payBtn').disabled = true; $('payBtn').classList.add('loading'); $('payBtn').querySelector('.btn-text').textContent = 'PROCESSING...';
    try {
      const response = await fetch('/create-checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ customerInfo, delivery, cart }) });
      const result = await response.json(); if (!response.ok || !result.redirectUrl) throw new Error(result.error || 'Payment could not be started.'); window.location.assign(result.redirectUrl);
    } catch (problem) { error(problem.message); $('payBtn').disabled = false; $('payBtn').classList.remove('loading'); $('payBtn').querySelector('.btn-text').textContent = 'PAY NOW'; }
  }
  document.addEventListener('DOMContentLoaded', () => { renderItems(); populateAreas(); $('payBtn')?.addEventListener('click', pay); });
})();
