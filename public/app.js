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
let searchTimer = null;
let lastTrackedSearch = "";

function money(value) {
  return `R${Number(value).toLocaleString("en-ZA")}`;
}

function trackingContext() {
  const url = new URL(window.location.href);
  return {
    page_name: "october_same_scent_bogo",
    campaign_source: url.searchParams.get("utm_source") || undefined,
    campaign_medium: url.searchParams.get("utm_medium") || undefined,
    campaign_name: url.searchParams.get("utm_campaign") || undefined,
  };
}

function cleanParams(params) {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== ""));
}

function track(eventName, params = {}) {
  window.ElyseanTracking?.track(eventName, cleanParams({ ...trackingContext(), ...params }));
}

function whatsappUrl(message) {
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function bindWhatsAppLinks() {
  $$(".js-whatsapp").forEach((link) => {
    const message = link.dataset.message || `Hi Elysean Perfumes, I am interested in the ${CONFIG.offerName}.`;
    link.setAttribute("data-ep-tracked", "true");
    link.href = whatsappUrl(message);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.addEventListener("click", () => {
      const source = link.dataset.track || "whatsapp_link";
      const sampleValues = {
        sample_trio: CONFIG.sampleTrioDelivered,
        sample_five: CONFIG.sampleFiveDelivered,
      };
      track("contact", {
        contact_method: "whatsapp",
        source,
        value: sampleValues[source],
        currency: sampleValues[source] ? "ZAR" : undefined,
      });
    });
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
    content_ids: [String(product.id)],
    content_type: "product",
    item_id: String(product.id),
    item_name: product.reference,
    item_variant: product.variant,
    items: [{
      item_id: String(product.id),
      item_name: product.reference,
      item_variant: product.variant,
      price: product.price100,
      quantity: 1,
    }],
    price: product.price100,
    value: product.price100,
    currency: "ZAR",
    offer: CONFIG.offerName,
  });
  showToast(`${product.reference} selected — your second matching 100ml bottle is free.`);
}

function setupCollection() {
  if (!PRODUCTS.length) return;
  const minPrice = Math.min(...PRODUCTS.map((p) => p.price100));
  if ($("#price-from")) $("#price-from").textContent = money(minPrice);

  $("#product-search")?.addEventListener("input", (event) => {
    renderProducts(true);
    window.clearTimeout(searchTimer);
    const searchTerm = event.target.value.trim();
    searchTimer = window.setTimeout(() => {
      if (searchTerm.length >= 2 && searchTerm !== lastTrackedSearch) {
        lastTrackedSearch = searchTerm;
        const { items } = filteredProducts();
        track("search", {
          search_string: searchTerm,
          search_term: searchTerm,
          result_count: items.length,
        });
      }
    }, 700);
  });
  $$(".filter-pill").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      $$(".filter-pill").forEach((b) => b.classList.toggle("is-active", b === button));
      renderProducts(true);
      track("fragrance_filter", { filter_name: activeFilter });
    });
  });

  $("#show-more")?.addEventListener("click", () => {
    visibleLimit += CONFIG.resultPageSize;
    renderProducts(false);
    track("show_more_fragrances", { visible_limit: visibleLimit });
  });

  $("#clear-search")?.addEventListener("click", () => {
    window.clearTimeout(searchTimer);
    lastTrackedSearch = "";
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
      source: "bogo_order",
      shipping: CONFIG.pudoDelivery,
      num_items: 2,
      content_name: selectedProduct.reference,
      content_ids: [String(selectedProduct.id)],
      content_type: "product",
      item_id: String(selectedProduct.id),
      item_name: selectedProduct.reference,
      item_variant: selectedProduct.variant,
      items: [{
        item_id: String(selectedProduct.id),
        item_name: selectedProduct.reference,
        item_variant: selectedProduct.variant,
        price: selectedProduct.price100,
        quantity: 1,
      }],
      value: total,
      currency: "ZAR",
      contact_method: "whatsapp",
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
    const action = el.dataset.track;
    if (el.classList.contains("js-whatsapp")) return;
    if (action === "phone_click" || action === "email_click") {
      track("contact", { contact_method: action === "phone_click" ? "phone" : "email", source: action });
      return;
    }
    if (action === "google_reviews") {
      track("outbound_click", { link_name: "google_reviews", link_url: el.href });
      return;
    }
    track("cta_click", { cta_name: action });
  }));

  $$("#faq details").forEach((item) => item.addEventListener("toggle", () => {
    if (item.open) {
      track("faq_open", { faq_question: $("summary", item)?.textContent.trim() });
    }
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
});
