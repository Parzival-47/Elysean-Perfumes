(function () {
  'use strict';

  const OFFER_END = new Date('2027-01-01T00:00:00+02:00').getTime();
  let closeTimer = null;

  function safeCartCount() {
    try {
      const cart = JSON.parse(window.localStorage.getItem('elyseanCart') || '[]');
      if (!Array.isArray(cart)) return 0;
      return cart.reduce((total, item) => {
        const quantity = Number(item && (item.qty ?? item.quantity));
        return total + (Number.isFinite(quantity) && quantity > 0 ? quantity : 0);
      }, 0);
    } catch (_) {
      return 0;
    }
  }

  function updateCartCounts() {
    const count = safeCartCount();
    const desktopCount = document.getElementById('cart-count');
    if (desktopCount) {
      desktopCount.textContent = String(count);
      desktopCount.setAttribute('aria-label', count + (count === 1 ? ' item in cart' : ' items in cart'));
    }
    document.querySelectorAll('.mobile-cart-count').forEach(element => {
      element.textContent = String(count);
    });
  }

  function setupHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    const update = () => header.classList.toggle('is-scrolled', window.scrollY > 18);
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  function setupMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const closeButton = document.getElementById('menu-close');
    const menu = document.getElementById('mobile-nav');
    const backdrop = document.getElementById('nav-backdrop');
    if (!toggle || !closeButton || !menu || !backdrop) return;

    let previousFocus = null;

    function openMenu() {
      if (closeTimer) window.clearTimeout(closeTimer);
      previousFocus = document.activeElement;
      menu.hidden = false;
      backdrop.hidden = false;
      document.body.classList.add('nav-open');
      toggle.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      window.requestAnimationFrame(() => {
        menu.classList.add('is-open');
        backdrop.classList.add('is-open');
        closeButton.focus({ preventScroll: true });
      });
    }

    function closeMenu(restoreFocus) {
      menu.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      document.body.classList.remove('nav-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      closeTimer = window.setTimeout(() => {
        menu.hidden = true;
        backdrop.hidden = true;
      }, 280);
      if (restoreFocus && previousFocus && typeof previousFocus.focus === 'function') {
        previousFocus.focus({ preventScroll: true });
      }
    }

    toggle.addEventListener('click', () => {
      if (toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
      else openMenu();
    });
    closeButton.addEventListener('click', () => closeMenu(true));
    backdrop.addEventListener('click', () => closeMenu(true));
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu(false)));

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeMenu(true);
        return;
      }
      if (event.key !== 'Tab' || toggle.getAttribute('aria-expanded') !== 'true') return;
      const focusable = Array.from(menu.querySelectorAll('a[href], button:not([disabled])'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    const desktopQuery = window.matchMedia('(min-width: 1061px)');
    const handleDesktop = event => {
      if (event.matches && toggle.getAttribute('aria-expanded') === 'true') closeMenu(false);
    };
    if (typeof desktopQuery.addEventListener === 'function') desktopQuery.addEventListener('change', handleDesktop);
    else if (typeof desktopQuery.addListener === 'function') desktopQuery.addListener(handleDesktop);
  }

  function setupReveal() {
    const elements = Array.from(document.querySelectorAll('.reveal'));
    if (!elements.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      elements.forEach(element => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -55px' });

    elements.forEach(element => observer.observe(element));
  }

  function updateOfferCountdown() {
    const element = document.getElementById('offer-countdown');
    if (!element) return;
    const remaining = OFFER_END - Date.now();
    if (remaining <= 0) {
      element.textContent = 'Festive offer ended';
      return;
    }

    const day = 24 * 60 * 60 * 1000;
    const hour = 60 * 60 * 1000;
    const minute = 60 * 1000;
    const days = Math.floor(remaining / day);
    const hours = Math.floor((remaining % day) / hour);
    const minutes = Math.max(0, Math.floor((remaining % hour) / minute));
    element.textContent = days > 0
      ? days + (days === 1 ? ' day' : ' days') + ' · ' + hours + ' hours left'
      : hours + (hours === 1 ? ' hour' : ' hours') + ' · ' + minutes + ' min left';
  }

  function trackingParameters(element) {
    const params = {};
    const keys = {
      source: 'source',
      ctaName: 'cta_name',
      contactMethod: 'contact_method',
      category: 'category',
      bundleName: 'bundle_name',
      sampleCount: 'sample_count',
      linkName: 'link_name'
    };

    Object.entries(keys).forEach(([datasetKey, parameterKey]) => {
      if (!element.dataset[datasetKey]) return;
      const value = parameterKey === 'sample_count' ? Number(element.dataset[datasetKey]) : element.dataset[datasetKey];
      if (value !== '' && (parameterKey !== 'sample_count' || Number.isFinite(value))) params[parameterKey] = value;
    });

    if (element.dataset.event === 'outbound_click' && element.href) params.link_url = element.href;
    return params;
  }

  function trackEvent(name, params) {
    if (!window.ElyseanTracking || typeof window.ElyseanTracking.track !== 'function') return;
    window.ElyseanTracking.track(name, params || {});
  }

  function setupTracking() {
    document.addEventListener('click', event => {
      const target = event.target.closest('[data-event]');
      if (!target) return;
      trackEvent(target.dataset.event, trackingParameters(target));
    });

    document.querySelectorAll('details[data-faq]').forEach(details => {
      details.addEventListener('toggle', () => {
        if (details.open) trackEvent('faq_open', { faq_question: details.dataset.faq, source: 'home_faq' });
      });
    });
  }

  function initialise() {
    setupHeader();
    setupMobileMenu();
    setupReveal();
    setupTracking();
    updateCartCounts();
    updateOfferCountdown();

    const year = document.getElementById('current-year');
    if (year) year.textContent = String(new Date().getFullYear());

    window.setInterval(updateOfferCountdown, 60 * 1000);
    window.addEventListener('storage', event => {
      if (!event.key || event.key === 'elyseanCart') updateCartCounts();
    });
    window.addEventListener('pageshow', updateCartCounts);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialise, { once: true });
  else initialise();
})();
