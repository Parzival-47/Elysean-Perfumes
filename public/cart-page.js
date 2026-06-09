console.log("Cart-page.js is connected successfully!");

// ─── SUCCESS CHECK ───
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('success') === 'true') {
    document.getElementById('successBanner').classList.add('show');
    localStorage.removeItem('elyseanCart');
    window.history.replaceState({}, '', 'cart-page.html');
}

// ─── CART HELPERS ───
function getCart() { 
    return JSON.parse(localStorage.getItem('elyseanCart') || '[]'); 
}

function saveCart(cart) { 
    localStorage.setItem('elyseanCart', JSON.stringify(cart)); 
}

// Safe hover function (fallback if addCursorHover doesn't exist)
function addHover(el) {
    if (typeof addCursorHover === 'function') {
        addCursorHover(el);
    } else {
        // Minimal fallback hover
        el.addEventListener('mouseenter', () => el.style.opacity = '0.85');
        el.addEventListener('mouseleave', () => el.style.opacity = '1');
    }
}

// ─── RENDER CART ───
function renderCart() {
    const cart = getCart();
    const list = document.getElementById('cart-items-list');
    const empty = document.getElementById('emptyCart');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const itemCountEl = document.getElementById('item-count');

    // Update item count in header
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    if (itemCountEl) itemCountEl.textContent = totalItems;

    if (cart.length === 0) {
        list.innerHTML = '';
        empty.classList.add('show');
        checkoutBtn.style.pointerEvents = 'none';
        checkoutBtn.style.background = 'var(--gold-light)';
        checkoutBtn.style.color = 'var(--black)';
        updateTotals([]);
        return;
    }

    empty.classList.remove('show');
    checkoutBtn.style.pointerEvents = '';
    checkoutBtn.style.background = '';
    checkoutBtn.style.color = '';

    // Build cart items
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

    // Attach quantity buttons
    list.querySelectorAll('.qty-btn').forEach(btn => {
        addHover(btn);
        btn.addEventListener('click', handleQuantityChange);
    });

    // Attach remove buttons
    list.querySelectorAll('.remove-btn').forEach(btn => {
        addHover(btn);
        btn.addEventListener('click', handleRemoveItem);
    });

    updateTotals(cart);
    
    // Global hover for all interactive elements
    document.querySelectorAll('a, button').forEach(el => addHover(el));
}

// Quantity handler
function handleQuantityChange(e) {
    const btn = e.currentTarget;
    const key = btn.dataset.key;
    const action = btn.dataset.action;
    
    let cart = getCart();
    const item = cart.find(i => i.key === key);
    if (!item) return;

    if (action === 'inc') {
        item.qty++;
    } else {
        item.qty--;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.key !== key);
        }
    }

    saveCart(cart);
    renderCart();   // This will also update totals
}

// Remove item handler
function handleRemoveItem(e) {
    const key = e.currentTarget.dataset.key;
    let cart = getCart().filter(i => i.key !== key);
    saveCart(cart);
    renderCart();
}

// ─── TOTALS ───
function updateTotals(cart) {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const tax = subtotal * 0.15;
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = 'R' + subtotal.toLocaleString();
    document.getElementById('tax').textContent = 'R' + Math.round(tax).toLocaleString();
    document.getElementById('total').textContent = 'R' + Math.round(total).toLocaleString();

    localStorage.setItem('elyseanTotal', Math.round(total));
}

// Clear cart
document.getElementById('clearCartBtn').addEventListener('click', () => {
    if (confirm('Remove all items from your cart?')) {
        saveCart([]);
        renderCart();
    }
});

// Initialize
renderCart();