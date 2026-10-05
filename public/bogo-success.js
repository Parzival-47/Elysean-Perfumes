(() => {
  'use strict';
  const params = new URLSearchParams(window.location.search);
  const orderNumber = String(params.get('order') || '').trim().toUpperCase();
  const cartKey = 'elysean-bogo-cart-v1';
  const money = (cents) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(Number(cents || 0) / 100);
  const escapeHtml = (value) => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
  let attempts = 0;
  let stopped = false;

  function setState(type, title, copy, notice) {
    const mark = document.querySelector('#status-mark');
    mark.className = `confirmation__mark${type ? ` is-${type}` : ''}`;
    mark.textContent = type === 'success' ? '✓' : type === 'error' ? '!' : '…';
    document.querySelector('#status-title').textContent = title;
    document.querySelector('#status-copy').textContent = copy;
    document.querySelector('#status-notice').textContent = notice;
    document.querySelector('#loader').hidden = Boolean(type);
  }

  function showPaid(order) {
    stopped = true;
    localStorage.removeItem(cartKey);
    sessionStorage.removeItem('elysean-bogo-checkout-tracked');
    setState('success', 'Thank you. Your order is confirmed.', 'Your Yoco payment has been verified and your Festive BOGO order is now in our preparation queue.', 'A confirmation email is being sent to the email address supplied at checkout.');
    document.querySelector('#order-card').hidden = false;
    document.querySelector('#next-steps').hidden = false;
    document.querySelector('#order-number').textContent = order.order_number;
    document.querySelector('#order-items').innerHTML = (order.items || []).map((item) => `<div class="order-item"><strong>Elysean No. ${String(item.productId).padStart(3, '0')} · ${escapeHtml(item.reference)}</strong><span>${Number(item.quantity)} paid + ${Number(item.complimentaryQuantity)} free<br>${Number(item.physicalBottles)} × 100 ml</span></div>`).join('');
    document.querySelector('#order-delivery').textContent = order.delivery?.areaName || 'Local delivery / collection';
    document.querySelector('#order-shipping').textContent = `${order.delivery?.zoneName || order.delivery_zone || 'Local delivery'} · ${money(order.shipping_cents)}`;
    document.querySelector('#order-total').textContent = money(order.total_cents);
    document.querySelector('#primary-action').textContent = 'Return to Elysean';
  }

  function showFailure(order) {
    stopped = true;
    setState('error', 'Payment was not completed.', 'Yoco did not confirm a successful payment for this order.', 'No order will be prepared until payment is completed. Return to checkout to try again.');
    const action = document.querySelector('#primary-action');
    action.href = `bogo-checkout.html?payment=cancelled&order=${encodeURIComponent(orderNumber)}`;
    action.textContent = 'Return to checkout';
    if (order?.order_number) {
      document.querySelector('#order-card').hidden = false;
      document.querySelector('#order-number').textContent = order.order_number;
      document.querySelector('#order-badge').textContent = 'NOT PAID';
      document.querySelector('#order-badge').style.background = '#fff0f1';
      document.querySelector('#order-badge').style.color = '#9d3949';
    }
  }

  async function checkOrder() {
    if (stopped) return;
    if (!/^EPB-\d{8}-[A-F0-9]{16}$/.test(orderNumber)) {
      setState('error', 'We could not find that order.', 'The confirmation link does not contain a valid Elysean BOGO order number.', 'Return to the offer page or contact us if you have already paid.');
      return;
    }
    attempts += 1;
    try {
      const response = await fetch(`/api/orders/${encodeURIComponent(orderNumber)}/status`, { headers: { Accept: 'application/json' }, cache: 'no-store' });
      const order = await response.json();
      if (!response.ok) throw new Error(order.error || 'Order status is unavailable');
      if (order.status === 'paid') return showPaid(order);
      if (['payment_failed', 'checkout_failed', 'cancelled'].includes(order.status)) return showFailure(order);
      if (attempts >= 20) {
        stopped = true;
        setState('', 'Your payment is still being verified.', 'We have your order reference, but Yoco’s verified payment notification has not reached us yet.', `Order ${orderNumber}. Please check your email shortly. If you received a Yoco payment receipt but no Elysean confirmation, contact us with this order number.`);
        document.querySelector('#loader').hidden = true;
        return;
      }
    } catch (_) {
      if (attempts >= 20) {
        stopped = true;
        setState('error', 'Confirmation is taking longer than expected.', 'We cannot retrieve the order status right now.', `Keep your Yoco receipt and contact us with order number ${orderNumber}.`);
        return;
      }
    }
    window.setTimeout(checkOrder, 3000);
  }

  document.addEventListener('DOMContentLoaded', checkOrder);
})();
