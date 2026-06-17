// ─── MOBILE NAV ───
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

// ─── LOAD CART & TOTALS ───
const cart = JSON.parse(localStorage.getItem('elyseanCart') || '[]');

// Render order items on right panel
const orderList = document.getElementById('order-items');
if (orderList) {
    if (cart.length === 0) {
        orderList.innerHTML = '<p style="color:var(--muted);font-size:0.85rem;padding:20px 0;">Your cart is empty. <a href="product-page.html" style="color:var(--gold);">Shop now →</a></p>';
    } else {
        orderList.innerHTML = cart.map(item => `
            <div class="order-item">
                <div class="order-item-info">
                    <p class="order-item-name">${item.name}</p>
                    <p class="order-item-size">${item.size} · EDP 20%</p>
                    <p class="order-item-qty">Qty: ${item.qty}</p>
                </div>
                <span class="order-item-price">R${(item.price * item.qty).toLocaleString()}</span>
            </div>
        `).join('');
    }
}

// ─── CALCULATE TOTALS ───
const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
const tax = Math.round(subtotal * 0);
const shipping = cart.length > 0 ? 0 : 0;
const total = subtotal + tax + shipping;
const totalInCents = total * 100;

// Update display
if (document.getElementById('right-subtotal')) {
    document.getElementById('right-subtotal').textContent = 'R' + subtotal.toLocaleString();
}
if (document.getElementById('right-tax')) {
    document.getElementById('right-tax').textContent = 'R' + tax.toLocaleString();
}
if (document.getElementById('right-total')) {
    document.getElementById('right-total').textContent = 'R' + total.toLocaleString();
}
if (document.getElementById('payBtnAmount')) {
    document.getElementById('payBtnAmount').textContent = 'R' + total.toLocaleString();
}

// ─── CHECKOUT PAYMENT HANDLER ───
document.addEventListener('DOMContentLoaded', () => {
    const payBtn = document.getElementById('payBtn');
    if (!payBtn) {
        console.error("❌ Pay button not found");
        return;
    }

    payBtn.addEventListener('click', async () => {
        const btnText = payBtn.querySelector('.btn-text') || payBtn;

        payBtn.classList.add('loading');
        if (btnText) btnText.textContent = 'PROCESSING...';

        // Get form values
        const firstName = document.getElementById('firstName')?.value.trim() || '';
        const lastName  = document.getElementById('lastName')?.value.trim() || '';
        const email     = document.getElementById('email')?.value.trim() || '';
        const phone     = document.getElementById('phone')?.value.trim() || '';

        console.log("📋 Form Values:", { firstName, lastName, email, phone });

        // ── Use the totalInCents calculated above — no localStorage needed ──
        if (totalInCents <= 0) {
            alert("Your cart is empty. Please add items before checking out.");
            resetButton();
            return;
        }

        if (!firstName || !lastName || !email) {
            alert("Please fill in First Name, Last Name and Email.");
            resetButton();
            return;
        }

        try {
            const response = await fetch('/create-checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amountInCents: totalInCents,
                    // ── Key fix: send as customerInfo to match index.js ──
                    customerInfo: {
                        firstName,
                        lastName,
                        email,
                        phone
                    },
                    cart: cart,
                    subtotal: subtotal,
                    shipping: shipping,
                    tax: tax
                })
            });

            const data = await response.json();
            console.log("Checkout response:", data);

            if (response.ok && data.redirectUrl) {
                window.location.href = data.redirectUrl;
            } else {
                console.error("Checkout error details:", data);
                alert("Payment could not be started. Please try again.");
            }
        } catch (err) {
            console.error("Network error:", err);
            alert("Could not connect to server. Please try again.");
        } finally {
            resetButton();
        }
    });

    function resetButton() {
        payBtn.classList.remove('loading');
        const btnText = payBtn.querySelector('.btn-text');
        if (btnText) btnText.textContent = 'PAY NOW';
    }
});

// ─── REVEAL ON SCROLL ───
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -80px 0px"
    });

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    console.log(`✅ Reveal system active — ${document.querySelectorAll('.reveal').length} elements observed`);
});

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