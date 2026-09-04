/* Elysean tracking v20260904-1. One shared loader; optional trackers require consent.
 * Browser events only. No Purchase, payment webhook or Conversions API is added.
 */
(function (w, d) {
  'use strict';
  if (w.ElyseanTracking) return;
  const PIXELS = ['1084792373896315', '1723955528897231'];
  const GA = 'G-NT5SEGTN2N';
  const KEY = 'elysean-consent-v1';
  const TTL = 180 * 24 * 60 * 60 * 1000;
  const MAP = {
    page_view: ['PageView', 'page_view'],
    search: ['Search', 'search'],
    view_content: ['ViewContent', 'view_item'],
    add_to_cart: ['AddToCart', 'add_to_cart'],
    contact: ['Contact', 'generate_lead'],
    initiate_checkout: ['InitiateCheckout', 'begin_checkout']
  };
  const KEYS = new Set(('page_name campaign_source campaign_medium campaign_name campaign_content campaign_term source contact_method content_name content_ids content_type contents num_items item_id item_name item_variant items price value currency shipping offer bundle_name sample_count category filter filter_name search_term search_string result_count cta_name link_name link_url faq_question visible_count visible_limit total_count').split(' '));
  let choice = { analytics: false, marketing: false }, saved = false;
  let metaReady = false, googleReady = false, metaPage = false, googlePage = false;
  let panel, toggle, previousFocus, sequence = 0;
  const recent = [];

  function readChoice() {
    try {
      const value = JSON.parse(w.localStorage.getItem(KEY));
      if (value && value.version === 1 && value.expires > Date.now()) {
        return { analytics: value.analytics === true, marketing: value.marketing === true };
      }
    } catch (_) { /* Private browsing/storage denial must not break the shop. */ }
    return null;
  }
  function text(value) {
    const valueText = String(value).trim().slice(0, 160);
    // Never send contact details typed into fragrance search or attribution fields.
    if (/@|(?:\+?\d[\s().-]*){7,}/.test(valueText)) return '[redacted]';
    return valueText;
  }
  function safeURL(value, attribution) {
    try {
      const u = new URL(value, w.location.href);
      if (!/^https?:$/.test(u.protocol)) return '';
      const out = new URL(u.origin + u.pathname);
      if (attribution) ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','bundle'].forEach(k => {
        if (u.searchParams.has(k)) out.searchParams.set(k, text(u.searchParams.get(k)));
      });
      return out.href;
    } catch (_) { return ''; }
  }
  function clean(params) {
    const out = {};
    Object.entries(params || {}).forEach(([key, value]) => {
      if (!KEYS.has(key) || value === undefined || value === null || value === '') return;
      if (key === 'items' || key === 'contents') {
        if (!Array.isArray(value)) return;
        out[key] = value.slice(0, 50).map(item => {
          const result = {};
          ['item_id','item_name','item_variant','item_category','id','quantity','price','item_price'].forEach(k => {
            if (item && typeof item[k] === 'string') result[k] = text(item[k]);
            else if (item && typeof item[k] === 'number' && Number.isFinite(item[k])) result[k] = item[k];
          });
          return result;
        });
      } else if (key === 'content_ids' && Array.isArray(value)) out[key] = value.slice(0, 50).map(text);
      else if (key === 'link_url') out[key] = safeURL(value, false);
      else if (typeof value === 'number' && Number.isFinite(value)) out[key] = value;
      else if (typeof value === 'string' || typeof value === 'boolean') out[key] = text(value);
    });
    return out;
  }
  function context() {
    const u = new URL(w.location.href);
    const out = { page_name: u.pathname.split('/').pop() || 'home' };
    ['source','medium','campaign','content','term'].forEach(k => {
      const value = u.searchParams.get('utm_' + k);
      if (value) out[k === 'campaign' ? 'campaign_name' : 'campaign_' + k] = value;
    });
    return out;
  }
  function eventID() {
    return w.crypto && typeof w.crypto.randomUUID === 'function' ? w.crypto.randomUUID() : 'ep-' + Date.now() + '-' + (++sequence) + '-' + Math.random().toString(36).slice(2);
  }
  function load(src) {
    const script = d.createElement('script');
    script.async = true;
    script.src = src;
    d.head.appendChild(script);
  }
  function initMeta() {
    if (metaReady) return;
    if (!w.fbq) {
      const fbq = function () { fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments); };
      fbq.push = fbq; fbq.loaded = true; fbq.version = '2.0'; fbq.queue = [];
      w.fbq = fbq; w._fbq = fbq;
    }
    // Avoid automatic button/metadata capture and history-change PageViews.
    w.fbq.disablePushState = true;
    w.fbq('consent', 'grant');
    PIXELS.forEach(id => { w.fbq('set', 'autoConfig', false, id); w.fbq('init', id); });
    metaReady = true;
    load('https://connect.facebook.net/en_US/fbevents.js');
  }
  function initGoogle() {
    if (googleReady) return;
    w.dataLayer = w.dataLayer || [];
    w.gtag = w.gtag || function () { w.dataLayer.push(arguments); };
    w.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    w.gtag('consent', 'update', { analytics_storage: 'granted' });
    w.gtag('js', new Date());
    w.gtag('config', GA, {
      send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false,
      cookie_expires: TTL / 1000, page_location: safeURL(w.location.href, true), page_referrer: safeURL(d.referrer, false)
    });
    googleReady = true;
    load('https://www.googletagmanager.com/gtag/js?id=' + GA);
  }
  function send(name, params, meta, google) {
    const mapping = MAP[name], id = eventID();
    const data = clean(Object.assign(context(), params));
    if (name === 'search') {
      data.search_term = data.search_term || data.search_string;
      data.search_string = data.search_string || data.search_term;
      if (!data.search_term || data.search_term.length < 2 || data.search_term === '[redacted]') return;
    }
    const attempted = [];
    if (meta && choice.marketing && metaReady) PIXELS.forEach(pixel => {
      try { w.fbq(mapping ? 'trackSingle' : 'trackSingleCustom', pixel, mapping ? mapping[0] : name, data, { eventID: id }); attempted.push(pixel); } catch (_) { /* Never block an order. */ }
    });
    if (google && choice.analytics && googleReady) {
      try {
        w.gtag('event', mapping ? mapping[1] : name, Object.assign({}, data, {
          send_to: GA, page_location: safeURL(w.location.href, true), page_referrer: safeURL(d.referrer, false), transport_type: 'beacon'
        }));
        attempted.push(GA);
      } catch (_) { /* Independent providers: one failure must not stop the other. */ }
    }
    // Local diagnostic log records calls, NOT receipt by Meta/Google. No form values.
    if (attempted.length) {
      recent.push({ event: name, event_id: id, attempted, time: new Date().toISOString() });
      if (recent.length > 30) recent.shift();
    }
  }
  function track(name, params) {
    try {
      if (!/^[a-z][a-z0-9_]{0,39}$/.test(name) || /purchase|payment|refund/i.test(name) || name === 'page_view') return;
      send(name, params, true, true);
    } catch (_) { /* Consent, analytics and diagnostics cannot interrupt browsing. */ }
  }
  function clearCookies(prefix) {
    try {
      const host = w.location.hostname.split('.'), domains = ['', w.location.hostname];
      for (let i = 0; i < host.length - 1; i++) domains.push('.' + host.slice(i).join('.'));
      d.cookie.split(';').forEach(part => {
        const name = part.split('=')[0].trim();
        if (!prefix.test(name)) return;
        domains.forEach(domain => { d.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax' + (domain ? '; domain=' + domain : ''); });
      });
    } catch (_) { /* Cannot remove third-party cookies from this origin. */ }
  }
  function applyChoice(next, persist) {
    choice = { analytics: next.analytics === true, marketing: next.marketing === true };
    if (persist) {
      saved = true;
      try { w.localStorage.setItem(KEY, JSON.stringify(Object.assign({ version: 1, expires: Date.now() + TTL }, choice))); } catch (_) { /* Choice lasts this page when storage is unavailable. */ }
    }
    w['ga-disable-' + GA] = !choice.analytics;
    if (choice.marketing) {
      try { initMeta(); w.fbq('consent', 'grant'); if (!metaPage) { metaPage = true; send('page_view', {}, true, false); } } catch (_) {}
    } else {
      if (metaReady) { try { w.fbq('consent', 'revoke'); if (w.fbq.queue) w.fbq.queue = w.fbq.queue.filter(args => !/^track/.test(args[0])); } catch (_) {} }
      clearCookies(/^_fb[pc]$/);
    }
    if (choice.analytics) {
      try { initGoogle(); w.gtag('consent', 'update', { analytics_storage: 'granted' }); if (!googlePage) { googlePage = true; send('page_view', {}, false, true); } } catch (_) {}
    } else {
      if (googleReady) { try { w.gtag('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' }); } catch (_) {} }
      clearCookies(/^_ga(?:_|$)/);
    }
  }
  function hidePanel() {
    if (panel) panel.hidden = true;
    d.documentElement.classList.remove('ep-consent-open');
    if (previousFocus && previousFocus.focus) previousFocus.focus({ preventScroll: true });
  }
  function openPreferences() {
    if (!panel) return;
    previousFocus = d.activeElement;
    panel.hidden = false;
    panel.querySelector('[data-ep-options]').hidden = false;
    panel.querySelector('[name="ep-analytics"]').checked = choice.analytics;
    panel.querySelector('[name="ep-marketing"]').checked = choice.marketing;
    d.documentElement.classList.add('ep-consent-open');
    panel.querySelector('h2').focus({ preventScroll: true });
  }
  function mount() {
    panel = d.createElement('section');
    panel.className = 'ep-consent'; panel.hidden = saved;
    panel.setAttribute('aria-labelledby', 'ep-consent-title');
    panel.innerHTML = '<h2 id="ep-consent-title" tabindex="-1">Your privacy choices</h2>' +
      '<p>We use necessary storage for your cart and sample choices. Optional analytics help us understand visits; Meta tracking measures ads and order-interest clicks. <a href="privacy-policy.html">Privacy policy</a></p>' +
      '<div class="ep-consent-actions"><button type="button" data-ep-action="accept">Accept optional</button><button type="button" data-ep-action="reject">Reject optional</button><button type="button" data-ep-action="manage">Choose cookies</button></div>' +
      '<div data-ep-options hidden><label><input type="checkbox" name="ep-analytics"> Analytics (Google Analytics)</label><label><input type="checkbox" name="ep-marketing"> Advertising (both Meta Pixels)</label><p>Necessary storage is always on. You can change these choices at any time.</p><div class="ep-consent-actions"><button type="button" data-ep-action="save">Save choices</button><button type="button" data-ep-action="close">Close</button></div></div>';
    panel.addEventListener('click', event => {
      const button = event.target.closest('[data-ep-action]'); if (!button) return;
      const action = button.dataset.epAction;
      if (action === 'manage') { openPreferences(); return; }
      if (action === 'close') { hidePanel(); return; }
      const next = action === 'save' ? {
        analytics: panel.querySelector('[name="ep-analytics"]').checked,
        marketing: panel.querySelector('[name="ep-marketing"]').checked
      } : { analytics: action === 'accept', marketing: action === 'accept' };
      applyChoice(next, true); hidePanel();
    });
    panel.addEventListener('keydown', event => { if (event.key === 'Escape') hidePanel(); });
    d.body.appendChild(panel);
    toggle = d.createElement('button'); toggle.type = 'button'; toggle.className = 'ep-cookie-settings';
    toggle.textContent = 'Cookie settings'; toggle.addEventListener('click', openPreferences);
    (d.querySelector('footer') || d.body).appendChild(toggle);
    if (!saved) d.documentElement.classList.add('ep-consent-open');
    d.addEventListener('click', event => {
      const link = event.target.closest && event.target.closest('a[href]');
      if (!link || link.hasAttribute('data-ep-tracked')) return;
      const href = link.getAttribute('href') || '';
      const source = link.dataset.track || link.id || 'website_link';
      if (/^(tel:|mailto:)/i.test(href)) track('contact', { source, contact_method: /^tel:/i.test(href) ? 'phone' : 'email' });
      else {
        let url; try { url = new URL(link.href, w.location.href); } catch (_) { return; }
        if (['wa.me','api.whatsapp.com','web.whatsapp.com'].includes(url.hostname)) track('contact', { source, contact_method: 'whatsapp' });
        else if (/google\.|g\.page/.test(url.hostname) && /review/i.test(href + link.textContent)) track('outbound_click', { link_name: 'google_reviews', link_url: url.href });
        else if (url.origin === w.location.origin && /\/(samples|promo|checkout)\.html$/.test(url.pathname)) track('cta_click', { cta_name: url.pathname.includes('samples') ? 'choose_samples_' + (url.searchParams.get('bundle') || '') : url.pathname.includes('checkout') ? 'website_checkout_start' : 'october_offer', source });
      }
    });
  }
  w.ElyseanTracking = Object.freeze({
    track, openPreferences,
    getConsent: () => Object.assign({}, choice),
    diagnostics: () => ({ consent: Object.assign({}, choice), pixel_ids: PIXELS.slice(), google_id: GA, note: 'Attempted browser calls only; verify delivery in Network and Events Manager.', recent: recent.map(row => Object.assign({}, row, { attempted: row.attempted.slice() })) })
  });
  const restored = readChoice();
  if (restored) { saved = true; applyChoice(restored, false); }
  else w['ga-disable-' + GA] = true;
  w.addEventListener('storage', event => {
    if (event.key !== KEY) return;
    const updated = readChoice();
    saved = Boolean(updated);
    applyChoice(updated || { analytics: false, marketing: false }, false);
    if (panel) {
      panel.querySelector('[name="ep-analytics"]').checked = choice.analytics;
      panel.querySelector('[name="ep-marketing"]').checked = choice.marketing;
      panel.hidden = saved;
    }
  });
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', mount, { once: true }); else mount();
})(window, document);
