const CONFIG = {
  whatsappNumber: "27774638001", // 077 463 8001
  offerDeadline: "2026-10-31T23:59:59+02:00",
  offerName: "October Buy One 100ml Get the Same 100ml Free",
  pudoDelivery: 79,
  sampleSingle: 49,
  sampleTrioDelivered: 219,
  sampleFiveDelivered: 299,
  initialProductLimit: 9,
  resultPageSize: 12,
  featuredIds: [164, 201, 45, 106, 258, 261, 280, 310, 314],
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const PRODUCTS = Array.isArray(window.ELYSEAN_PRODUCTS) ? window.ELYSEAN_PRODUCTS : [];

let activeFilter = "all";
let visibleLimit = CONFIG.initialProductLimit;
let selectedProduct = null;

function money(value) {
  return `R${Number(value).toLocaleString("en-ZA")}`;
}

function track(eventName, params = {}) {
  if (typeof window.fbq === "function") {
    const metaMap = {
      page_view: "PageView",
      lead: "Lead",
      view_content: "ViewContent",
      initiate_checkout: "InitiateCheckout",
    };
    window.fbq("track", metaMap[eventName] || eventName, params);
  }
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

function whatsappUrl(message) {
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function bindWhatsAppLinks() {
  $$(".js-whatsapp").forEach((link) => {
    const message = link.dataset.message || `Hi Elysean Perfumes, I am interested in the ${CONFIG.offerName}.`;
    link.href = whatsappUrl(message);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.addEventListener("click", () => track("lead", { source: link.dataset.track || "whatsapp_link" }));
  });
}

function categoryLabel(category) {
  const labels = { feminine: "Feminine", masculine: "Masculine", unisex: "Unisex" };
  return labels[category] || "Unisex";
}

function productSearchText(product) {
  return [product.reference, product.variant, product.description, product.notes, product.category, `elysean ${product.id}`]
    .join(" ")
    .toLowerCase();
}

function filteredProducts() {
  const query = $("#product-search")?.value.trim().toLowerCase() || "";
  let items = PRODUCTS.filter((p) => activeFilter === "all" || p.category === activeFilter);

  if (query) {
    const terms = query.split(/\s+/).filter(Boolean);
    items = items.filter((product) => {
      const haystack = productSearchText(product);
      return terms.every((term) => haystack.includes(term));
    });
  } else if (activeFilter === "all") {
    const featured = CONFIG.featuredIds.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);
    const used = new Set(featured.map((p) => p.id));
    const rest = PRODUCTS.filter((p) => !used.has(p.id));
    items = [...featured, ...rest];
  }

  return { items, query };
}

function productCard(product) {
  const notes = product.notes ? product.notes.split(",").slice(0, 5).join(" · ") : product.description;
  return `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-card__top">
        <span class="product-card__number">ELYSEAN NO. ${String(product.id).padStart(3, "0")}</span>
        <span class="product-card__category">${categoryLabel(product.category)}</span>
      </div>
      <h3>${escapeHtml(product.reference)}</h3>
      <p class="product-card__variant">${escapeHtml(product.variant)}</p>
      <p class="product-card__reference">Scent reference: <strong>${escapeHtml(product.reference)}</strong></p>
      <p class="product-card__notes">${escapeHtml(notes || product.description || "20% Eau de Parfum")}</p>
      <div class="product-card__bottom">
        <div class="product-card__price">
          <strong>${money(product.price100)}</strong>
          <small>Pay once · 100ml price</small>
          <div class="product-card__bogo">Receive 2 × 100ml of this same scent</div>
        </div>
        <button class="btn btn--gold js-bogo-select" type="button" data-select-id="${product.id}">Select</button>
      </div>
    </article>`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderProducts(resetLimit = false) {
  const grid = $("#product-grid");
  if (!grid) return;
  if (resetLimit) visibleLimit = CONFIG.initialProductLimit;

  const { items, query } = filteredProducts();
  const visible = items.slice(0, visibleLimit);
  const count = $("#result-count");
  const showMore = $("#show-more");
  const clear = $("#clear-search");

  if (!items.length) {
    grid.innerHTML = `<div class="no-results"><strong>No match found.</strong><p>Try a shorter scent name or ask us on WhatsApp.</p></div>`;
  } else {
    grid.innerHTML = visible.map(productCard).join("");
  }

  if (count) {
    if (!query && activeFilter === "all") {
      count.textContent = `Featured first · ${PRODUCTS.length} searchable Elysean options`;
    } else {
      count.textContent = `${items.length} fragrance${items.length === 1 ? "" : "s"} found`;
    }
  }
  if (showMore) showMore.hidden = visible.length >= items.length;
  if (clear) clear.hidden = !query && activeFilter === "all";

  $$("[data-select-id]", grid).forEach((button) => {
    button.addEventListener("click", () => selectProduct(Number(button.dataset.selectId)));
  });
}

function selectProduct(id) {
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return;
  selectedProduct = product;

  $("#selected-title").textContent = `Elysean No. ${String(product.id).padStart(3, "0")} · ${product.variant}`;
  $("#selected-reference").textContent = `Scent reference: ${product.reference} · 2 × 100ml same scent`;
  $("#selected-price").textContent = money(product.price100);
  $("#selected-total").textContent = money(product.price100 + CONFIG.pudoDelivery);
  $("#order-dock").hidden = false;

  track("view_content", {
    content_name: product.reference,
    content_id: product.id,
    price: product.price100,
    offer: CONFIG.offerName,
  });
  showToast(`${product.reference} selected — your second matching 100ml bottle is free.`);
}

function setupCollection() {
  if (!PRODUCTS.length) return;
  const minPrice = Math.min(...PRODUCTS.map((p) => p.price100));
  if ($("#price-from")) $("#price-from").textContent = money(minPrice);

  $("#product-search")?.addEventListener("input", () => renderProducts(true));
  $$(".filter-pill").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      $$(".filter-pill").forEach((b) => b.classList.toggle("is-active", b === button));
      renderProducts(true);
    });
  });

  $("#show-more")?.addEventListener("click", () => {
    visibleLimit += CONFIG.resultPageSize;
    renderProducts(false);
  });

  $("#clear-search")?.addEventListener("click", () => {
    $("#product-search").value = "";
    activeFilter = "all";
    $$(".filter-pill").forEach((b) => b.classList.toggle("is-active", b.dataset.filter === "all"));
    renderProducts(true);
  });

  $("#clear-selection")?.addEventListener("click", () => {
    selectedProduct = null;
    $("#order-dock").hidden = true;
    $("#choose")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  $("#continue-whatsapp")?.addEventListener("click", () => {
    if (!selectedProduct) return;
    const total = selectedProduct.price100 + CONFIG.pudoDelivery;
    const message = [
      "Hi Elysean Perfumes 👋",
      "I would like to claim the October Buy One 100ml Get One Free offer.",
      "",
      `Elysean product: No. ${String(selectedProduct.id).padStart(3, "0")} — ${selectedProduct.variant}`,
      `Scent reference: ${selectedProduct.reference}`,
      `BOGO: 2 × 100ml of the SAME fragrance/formulation`,
      `Fragrance price: ${money(selectedProduct.price100)}`,
      `PUDO locker delivery: ${money(CONFIG.pudoDelivery)}`,
      `Order total: ${money(total)}`,
      "",
      "Please confirm the expected dispatch date and availability, then send me the secure Yoco payment link.",
    ].join("\n");

    track("initiate_checkout", {
      content_name: selectedProduct.reference,
      content_id: selectedProduct.id,
      value: total,
      currency: "ZAR",
      offer: CONFIG.offerName,
    });
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  });

  renderProducts(true);
}

function setupCountdown() {
  const el = $("#countdown");
  const strip = $("#offer-strip");
  if (!el || !strip) return;
  const deadline = new Date(CONFIG.offerDeadline).getTime();

  const render = () => {
    const remaining = deadline - Date.now();
    if (remaining <= 0) {
      el.textContent = "Offer ended 31 October 2026";
      strip.classList.add("offer-ended");
      document.body.classList.add("offer-expired");
      return;
    }
    const days = Math.floor(remaining / 86400000);
    const hours = Math.floor((remaining % 86400000) / 3600000);
    const mins = Math.floor((remaining % 3600000) / 60000);
    const secs = Math.floor((remaining % 60000) / 1000);
    el.textContent = `${days}d ${String(hours).padStart(2, "0")}h ${String(mins).padStart(2, "0")}m ${String(secs).padStart(2, "0")}s left`;
  };
  render();
  window.setInterval(render, 1000);
}

function setupMobileMenu() {
  const button = $(".menu-toggle");
  const menu = $("#mobile-menu");
  if (!button || !menu) return;
  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    menu.hidden = isOpen;
  });
  $$("a", menu).forEach((link) => link.addEventListener("click", () => {
    button.setAttribute("aria-expanded", "false");
    menu.hidden = true;
  }));
}

function setupReveal() {
  const elements = $$(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  elements.forEach((el) => observer.observe(el));
}

function setupTracking() {
  $$('[data-track]').forEach((el) => el.addEventListener("click", () => {
    track("view_content", { action: el.dataset.track });
  }));
}

let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

document.addEventListener("DOMContentLoaded", () => {
  bindWhatsAppLinks();
  setupCollection();
  setupCountdown();
  setupMobileMenu();
  setupReveal();
  setupTracking();
  track("page_view", { page: "october_same_scent_bogo" });
});
