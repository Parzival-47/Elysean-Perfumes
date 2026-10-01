(() => {
  'use strict';
  const state = { products: [], filter: 'all', query: '' };
  const $ = (selector) => document.querySelector(selector);
  const escapeHtml = (value) => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');

  async function api(url, options = {}) {
    const response = await fetch(url, { ...options, headers: { 'Content-Type': 'application/json', ...(options.headers || {}) } });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(body.error || 'Request failed');
      error.status = response.status;
      throw error;
    }
    return body;
  }

  function showLogin(message = '') {
    $('#dashboard').hidden = true;
    $('#login-panel').hidden = false;
    $('#login-error').textContent = message;
    $('#login-error').hidden = !message;
  }

  function showDashboard() {
    $('#login-panel').hidden = true;
    $('#dashboard').hidden = false;
  }

  function filteredProducts() {
    const query = state.query.toLowerCase();
    return state.products.filter((product) => {
      if (state.filter !== 'all' && product.status !== state.filter) return false;
      if (!query) return true;
      return `${product.id} ${product.reference} ${product.variant} ${product.notes} ${product.note}`.toLowerCase().includes(query);
    });
  }

  function render() {
    const visible = filteredProducts();
    $('#available-count').textContent = state.products.filter((product) => product.status === 'available').length;
    $('#unavailable-count').textContent = state.products.filter((product) => product.status === 'unavailable').length;
    $('#visible-count').textContent = visible.length;
    $('#status-message').textContent = `${state.products.length} fragrances loaded. Changes save immediately.`;
    $('#inventory').innerHTML = visible.length ? visible.map((product) => `
      <article class="stock-row ${product.status === 'unavailable' ? 'is-unavailable' : ''}" data-product-id="${product.id}">
        <div><span class="stock-id">ELYSEAN NO. ${String(product.id).padStart(3, '0')}</span><h2>${escapeHtml(product.reference)}</h2><p>${escapeHtml(product.variant)} · R${Number(product.price100).toLocaleString('en-ZA')}</p></div>
        <input class="stock-note" value="${escapeHtml(product.note || '')}" maxlength="200" placeholder="Optional private stock note">
        <div class="stock-actions">
          <button type="button" data-status="available" class="${product.status === 'available' ? 'active' : ''}">Available</button>
          <button type="button" data-status="unavailable" class="${product.status === 'unavailable' ? 'active' : ''}">Unavailable</button>
        </div>
      </article>`).join('') : '<div class="empty">No fragrances match this search and filter.</div>';

    $('#inventory').querySelectorAll('[data-status]').forEach((button) => button.addEventListener('click', () => saveRow(button.closest('[data-product-id]'), button.dataset.status)));
    $('#inventory').querySelectorAll('.stock-note').forEach((input) => input.addEventListener('change', () => {
      const row = input.closest('[data-product-id]');
      const product = state.products.find((item) => item.id === Number(row.dataset.productId));
      saveRow(row, product.status);
    }));
  }

  async function saveRow(row, status) {
    const productId = Number(row.dataset.productId);
    const product = state.products.find((item) => item.id === productId);
    const note = row.querySelector('.stock-note').value.trim();
    row.classList.add('saving');
    try {
      const body = await api(`/api/admin/inventory/${productId}`, {
        method: 'PATCH', body: JSON.stringify({ status, note }),
      });
      product.status = body.inventory.status;
      product.note = body.inventory.note;
      product.updatedAt = body.inventory.updated_at;
      render();
    } catch (error) {
      row.classList.remove('saving');
      $('#status-message').textContent = `Could not save: ${error.message}`;
      if (error.status === 401) showLogin('Your session expired. Sign in again.');
    }
  }

  async function loadInventory() {
    $('#status-message').textContent = 'Loading stock…';
    try {
      const body = await api('/api/admin/inventory');
      state.products = body.products;
      showDashboard();
      render();
    } catch (error) {
      if (error.status === 401) showLogin();
      else showLogin(error.message);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    $('#login-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const button = event.currentTarget.querySelector('button');
      button.disabled = true;
      try {
        await api('/api/admin/login', { method: 'POST', body: JSON.stringify({ password: $('#password').value }) });
        $('#password').value = '';
        await loadInventory();
      } catch (error) {
        showLogin(error.message);
      } finally { button.disabled = false; }
    });
    $('#logout').addEventListener('click', async () => { await api('/api/admin/logout', { method: 'POST' }).catch(() => {}); showLogin(); });
    $('#refresh').addEventListener('click', loadInventory);
    $('#stock-search').addEventListener('input', (event) => { state.query = event.target.value.trim(); render(); });
    document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => {
      state.filter = button.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach((item) => item.classList.toggle('active', item === button));
      render();
    }));
    loadInventory();
  });
})();
