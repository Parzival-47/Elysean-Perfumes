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
const shipping = cart.length > 0 ? 50 : 0; // R50 shipping if cart not empty
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

// ─── PAY BUTTON ───
// This sends the user to Yoco's payment page.
// Yoco handles the payment and redirects back to your successUrl.
// No timer or simulation needed here.
document.getElementById('payBtn').addEventListener('click', async () => {
    const payBtn = document.getElementById('payBtn');
    payBtn.classList.add('loading');

    // Collect form data
    const formData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        // Add more fields if needed
    };

    // Basic validation
    if (!formData.email || !formData.firstName || !formData.lastName) {
        alert("Please fill in all required fields");
        payBtn.classList.remove('loading');
        return;
    }

    try {
        const response = await fetch('/create-checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amountInCents: localStorage.getItem('elyseanTotal') * 100, // convert to cents
                metadata: formData   // ← THIS IS THE KEY
            })
        });

        const data = await response.json();

        if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
        } else {
            alert("Payment failed to start. Please try again.");
        }
    } catch (err) {
        console.error(err);
        alert("Something went wrong. Please try again.");
    } finally {
        payBtn.classList.remove('loading');
    }
});

// ─── REVEAL ON SCROLL (Add at the very end) ───
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing after reveal
                // observer.unobserve(entry.target);
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