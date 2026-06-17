// ─── MOBILE NAV (Clean & Reliable) ───
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileOverlay = document.getElementById('mobileOverlay');

    if (!navToggle || !mobileNav || !mobileOverlay) {
        console.error("❌ Mobile nav elements missing! Check HTML IDs.");
        return;
    }

    function openMobileNav() {
        navToggle.classList.add('open');
        mobileNav.classList.add('open');
        mobileOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
        navToggle.classList.remove('open');
        mobileNav.classList.remove('open');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', () => {
        if (navToggle.classList.contains('open')) {
            closeMobileNav();
        } else {
            openMobileNav();
        }
    });

    const mobileCloseBtn = document.getElementById('mobileCloseBtn');
    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', closeMobileNav);
    }

    mobileOverlay.addEventListener('click', closeMobileNav);

    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    console.log("✅ Mobile Nav successfully initialized");
});

// ─── CART PAGE JS ───
document.addEventListener('DOMContentLoaded', () => {

    console.log("✅ cart-page.js initialized");

    // ─── HEADER SCROLL EFFECT ───
    const header = document.getElementById('header');
    if (header) {
        function handleScroll() {
            if (window.scrollY > 80) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Run immediately
    }

    // ─── SUCCESS CHECK ───
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        const successBanner = document.getElementById('successBanner');
        if (successBanner) successBanner.classList.add('show');
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

    // ─── RENDER CART ───
    function renderCart() {
        const cart = getCart();
        const list = document.getElementById('cart-items-list');
        const empty = document.getElementById('emptyCart');
        const checkoutBtn = document.getElementById('checkoutBtn');
        const itemCountEl = document.getElementById('item-count');

        // Update item count
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        if (itemCountEl) itemCountEl.textContent = totalItems;

        if (cart.length === 0) {
            if (list) list.innerHTML = '';
            if (empty) empty.classList.add('show');
            if (checkoutBtn) {
                checkoutBtn.style.pointerEvents = 'none';
                checkoutBtn.style.background = 'var(--mid)';
                checkoutBtn.style.color = 'var(--muted)';
            }
            updateTotals([]);
            return;
        }

        if (empty) empty.classList.remove('show');
        if (checkoutBtn) {
            checkoutBtn.style.pointerEvents = '';
            checkoutBtn.style.background = '';
            checkoutBtn.style.color = '';
        }

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
            btn.addEventListener('click', handleQuantityChange);
        });

        // Attach remove buttons
        list.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', handleRemoveItem);
        });

        updateTotals(cart);
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
        renderCart();
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
        const tax = subtotal * 0;
        const shipping = cart.length > 0 ? 50 : 0;
        const total = subtotal + tax + shipping;

        const subtotalEl = document.getElementById('subtotal');
        const taxEl = document.getElementById('tax');
        const totalEl = document.getElementById('total');
        const shippingEl = document.getElementById('shipping')

        if (subtotalEl) subtotalEl.textContent = 'R' + subtotal.toLocaleString();
        if (taxEl) taxEl.textContent = 'R' + Math.round(tax).toLocaleString();
        if (totalEl) totalEl.textContent = 'R' + Math.round(total).toLocaleString();

        localStorage.setItem('elyseanTotal', Math.round(total));
    }

    // Clear cart
    const clearBtn = document.getElementById('clearCartBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('Remove all items from your cart?')) {
                saveCart([]);
                renderCart();
            }
        });
    }

    // Initialize
    renderCart();
});

// Success page logic
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('success') === 'true') {
    console.log("✅ Payment success page loaded");

    // Optional: Show success message to user
    const successBanner = document.getElementById('successBanner');
    if (successBanner) successBanner.classList.add('show');

    // Clear cart
    localStorage.removeItem('elyseanCart');
}

// ─── CART COUNT FOR HOME PAGE ───
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('elyseanCart') || '[]');
    const countEl = document.getElementById('cart-count');
    if (countEl) {
        const totalItems = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
        countEl.textContent = totalItems;
        console.log(`🛒 Home page cart count updated: ${totalItems}`);
    }
}

// Run it when page loads and when cart changes
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // Listen for changes from other pages
    window.addEventListener('storage', updateCartCount);
    
    // Extra safety - run again after a short delay
    setTimeout(updateCartCount, 500);
});