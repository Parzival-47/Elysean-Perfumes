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

// ─── HEADER SCROLL EFFECT ───
document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');

    if (!header) {
        console.warn("Header element not found");
        return;
    }

    function handleScroll() {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    
    // Run once on load
    handleScroll();
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