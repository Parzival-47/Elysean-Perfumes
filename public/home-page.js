// ─── MOBILE NAV ───
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileOverlay = document.getElementById('mobileOverlay');

    // Safety check
    if (!navToggle || !mobileNav || !mobileOverlay) {
        console.warn("Mobile nav elements not found. Check HTML IDs: navToggle, mobileNav, mobileOverlay");
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

    // Toggle on hamburger click
    navToggle.addEventListener('click', () => {
        navToggle.classList.contains('open') ? closeMobileNav() : openMobileNav();
    });

    // Close when clicking overlay
    mobileOverlay.addEventListener('click', closeMobileNav);

    // Close when clicking any mobile link
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    console.log("✅ Mobile nav initialized successfully");
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