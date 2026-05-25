console.log("Cart-page.js is connected successfully!");

    // ─── SUCCESS CHECK ───
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      document.getElementById('successBanner').classList.add('show');
      localStorage.removeItem('elyseanCart');
      window.history.replaceState({}, '', 'cart-page.html');
    }

    // ─── CART ───
    function getCart() { return JSON.parse(localStorage.getItem('elyseanCart') || '[]'); }
    function saveCart(cart) { localStorage.setItem('elyseanCart', JSON.stringify(cart)); }

    function renderCart() {
      const cart = getCart();
      const list = document.getElementById('cart-items-list');
      const empty = document.getElementById('emptyCart');
      const checkoutBtn = document.getElementById('checkoutBtn');
      document.getElementById('item-count').textContent = cart.reduce((s,i)=>s+i.qty,0);

      if (cart.length === 0) {
        list.innerHTML = '';
        empty.classList.add('show');
        checkoutBtn.style.pointerEvents = 'none';
        checkoutBtn.style.background = 'var(--mid)';
        checkoutBtn.style.color = 'var(--muted)';
        updateTotals([]);
        return;
      }

      empty.classList.remove('show');
      checkoutBtn.style.pointerEvents = '';
      checkoutBtn.style.background = '';
      checkoutBtn.style.color = '';

      list.innerHTML = cart.map(item => `
        <div class="cart-item" data-key="${item.key}">
          <img src="${item.img}" alt="${item.name}" class="cart-item-img"/>
          <div class="cart-item-details">
            <span class="cart-item-cat">${item.cat}</span>
            <h3 class="cart-item-name">${item.name}</h3>
            <p class="cart-item-brand">${item.brand}</p>
            <p class="cart-item-size">Size: ${item.size} · EDP 20%</p>
          </div>
          <div class="cart-item-actions">
            <span class="cart-item-price">R${(item.price * item.qty).toLocaleString()}</span>
            <div class="qty-controls">
              <button class="qty-btn" data-action="dec" data-key="${item.key}">−</button>
              <span class="qty-num">${item.qty}</span>
              <button class="qty-btn" data-action="inc" data-key="${item.key}">+</button>
            </div>
            <button class="remove-btn" data-key="${item.key}">Remove</button>
          </div>
        </div>
      `).join('');

      // events
      list.querySelectorAll('.qty-btn').forEach(btn => {
        addHover(btn);
        btn.addEventListener('click', () => {
          const key = btn.dataset.key;
          const cart = getCart();
          const item = cart.find(i => i.key === key);
          if (!item) return;
          if (btn.dataset.action === 'inc') item.qty++;
          else { item.qty--; if (item.qty <= 0) { saveCart(cart.filter(i=>i.key!==key)); renderCart(); return; } }
          saveCart(cart);
          renderCart();
        });
      });
      list.querySelectorAll('.remove-btn').forEach(btn => {
        addHover(btn);
        btn.addEventListener('click', () => {
          const cart = getCart().filter(i => i.key !== btn.dataset.key);
          saveCart(cart);
          renderCart();
        });
      });

      updateTotals(cart);
      document.querySelectorAll('a,button').forEach(el => addHover(el));
    }

    function updateTotals(cart) {
      const subtotal = cart.reduce((s,i) => s + i.price * i.qty, 0);
      const tax = subtotal * 0.15;
      const total = subtotal + tax;
      document.getElementById('subtotal').textContent = 'R' + subtotal.toLocaleString();
      document.getElementById('tax').textContent = 'R' + Math.round(tax).toLocaleString();
      document.getElementById('total').textContent = 'R' + Math.round(total).toLocaleString();
      // Store total for payment page
      localStorage.setItem('elyseanTotal', Math.round(total));
    }

    document.getElementById('clearCartBtn').addEventListener('click', () => {
      if (confirm('Remove all items from your cart?')) { saveCart([]); renderCart(); }
    });

    renderCart();
    document.querySelectorAll('a,button').forEach(el => addHover(el));