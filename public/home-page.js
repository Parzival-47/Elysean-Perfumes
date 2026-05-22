    // ─── MOBILE NAV ───
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileOverlay = document.getElementById('mobileOverlay');

// Safety check — only run if elements exist
if (navToggle && mobileNav && mobileOverlay) {

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
        navToggle.classList.contains('open') ? closeMobileNav() : openMobileNav();
    });

    mobileOverlay.addEventListener('click', closeMobileNav);

    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });
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
    navToggle.classList.contains('open') ? closeMobileNav() : openMobileNav();
});

mobileOverlay.addEventListener('click', closeMobileNav);
mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
});

    // ─── HEADER SCROLL ───
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    });

    // ─── HERO BG ───
    const heroBg = document.getElementById('heroBg');
    setTimeout(() => heroBg.classList.add('loaded'), 100);

    // ─── REVEAL ON SCROLL ───
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ─── CART COUNT ───
    function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('elyseanCart') || '[]');
      const total = cart.reduce((s, i) => s + i.qty, 0);
      document.getElementById('cart-count').textContent = total;
    }
    updateCartCount();