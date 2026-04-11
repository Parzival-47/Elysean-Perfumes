// ─── CURSOR ───
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; });
function animRing() { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animRing); }
animRing();
function addCursorHover(el) {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); ring.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); ring.classList.remove('hover'); });
}

// ─── PRODUCTS DATA ───
const PRODUCTS = [
    {
        id: 1, cat: 'masculine',
        name: 'Noir Sauvage', brand: 'Elysean Collection',
        desc: 'An untamed force of nature — wild bergamot, Sichuan pepper, and dark ambroxan converge in a scent that commands every room it enters.',
        notes: ['Bergamot', 'Pepper', 'Cedar', 'Ambroxan', 'Vetiver'],
        conc: 'Eau de Parfum — 20%',
        img: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=85',
        sizes: [{ ml: '2ml', label: 'Sample', price: 80 }, { ml: '30ml', label: '', price: 750 }, { ml: '50ml', label: '', price: 1100 }, { ml: '100ml', label: 'Popular', price: 1650 }, { ml: '250ml', label: 'Collector', price: 3200 }]
    },
    {
        id: 2, cat: 'feminine',
        name: 'Rose Éternelle', brand: 'Elysean Collection',
        desc: 'An eternal rose — Bulgarian rose at its most opulent, wrapped in suede and warmed by the softest vanilla accord. Femininity, distilled.',
        notes: ['Bulgarian Rose', 'Suede', 'Vanilla', 'Musk', 'Peach'],
        conc: 'Eau de Parfum — 20%',
        img: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&q=85',
        sizes: [{ ml: '2ml', label: 'Sample', price: 80 }, { ml: '30ml', label: '', price: 720 }, { ml: '50ml', label: '', price: 1050 }, { ml: '100ml', label: 'Popular', price: 1580 }, { ml: '250ml', label: 'Collector', price: 3100 }]
    },
    {
        id: 3, cat: 'ouds',
        name: 'Majlis Al Oud', brand: 'Elysean Oud Series',
        desc: 'Aged agarwood from the forests of Cambodia, smoke-kissed and resinous. A fragrance that carries within it centuries of Eastern tradition.',
        notes: ['Agarwood', 'Rose', 'Saffron', 'Amber', 'Incense'],
        conc: 'Eau de Parfum — 20%',
        img: 'https://images.unsplash.com/photo-1600612253971-2b58555c7b60?w=800&q=85',
        sizes: [{ ml: '2ml', label: 'Sample', price: 120 }, { ml: '30ml', label: '', price: 980 }, { ml: '50ml', label: '', price: 1450 }, { ml: '100ml', label: 'Popular', price: 2100 }, { ml: '250ml', label: 'Collector', price: 4200 }]
    },
    {
        id: 4, cat: 'unisex',
        name: 'Santal 33 Noir', brand: 'Elysean Collection',
        desc: 'Sandalwood stripped to its soul — creamy, woody, and undeniably addictive. The fragrance that starts conversations and lingers for days.',
        notes: ['Sandalwood', 'Cedar', 'Iris', 'Leather', 'Cardamom'],
        conc: 'Eau de Parfum — 20%',
        img: 'https://images.unsplash.com/photo-1547887538-047ad8a8b207?w=800&q=85',
        sizes: [{ ml: '2ml', label: 'Sample', price: 80 }, { ml: '30ml', label: '', price: 850 }, { ml: '50ml', label: '', price: 1200 }, { ml: '100ml', label: 'Popular', price: 1800 }, { ml: '250ml', label: 'Collector', price: 3500 }]
    },
    {
        id: 5, cat: 'masculine',
        name: 'Vetiver Absolu', brand: 'Elysean Collection',
        desc: 'The earth itself, rendered in scent. Haitian vetiver at its most raw and unapologetic — smoky, rooty, and achingly sophisticated.',
        notes: ['Vetiver', 'Tobacco', 'Oakmoss', 'Leather', 'Citrus'],
        conc: 'Eau de Parfum — 20%',
        img: 'https://images.unsplash.com/photo-1590156562745-5d9c9a9be2a5?w=800&q=85',
        sizes: [{ ml: '2ml', label: 'Sample', price: 80 }, { ml: '30ml', label: '', price: 780 }, { ml: '50ml', label: '', price: 1120 }, { ml: '100ml', label: 'Popular', price: 1680 }, { ml: '250ml', label: 'Collector', price: 3300 }]
    },
    {
        id: 6, cat: 'feminine',
        name: 'Jardin Blanc', brand: 'Elysean Collection',
        desc: 'A white garden at dusk — tuberose, gardenia and jasmine twined around crisp green leaves. Feminine power in its purest, most luminous form.',
        notes: ['Tuberose', 'Gardenia', 'Jasmine', 'White Musk', 'Iris'],
        conc: 'Eau de Parfum — 20%',
        img: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=85',
        sizes: [{ ml: '2ml', label: 'Sample', price: 80 }, { ml: '30ml', label: '', price: 700 }, { ml: '50ml', label: '', price: 1000 }, { ml: '100ml', label: 'Popular', price: 1500 }, { ml: '250ml', label: 'Collector', price: 2950 }]
    },
    {
        id: 7, cat: 'ouds',
        name: 'Oud Satin Mood', brand: 'Elysean Oud Series',
        desc: 'Velvet oud — smooth and seductive where others are harsh. Rose and vanilla soften the oud into something deeply wearable and profoundly luxurious.',
        notes: ['Oud', 'Rose', 'Vanilla', 'Patchouli', 'Musk'],
        conc: 'Eau de Parfum — 20%',
        img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=85',
        sizes: [{ ml: '2ml', label: 'Sample', price: 120 }, { ml: '30ml', label: '', price: 1100 }, { ml: '50ml', label: '', price: 1650 }, { ml: '100ml', label: 'Popular', price: 2400 }, { ml: '250ml', label: 'Collector', price: 4800 }]
    },
    {
        id: 8, cat: 'unisex',
        name: 'Vanille Haze', brand: 'Elysean Collection',
        desc: 'Dreamy, warm, and almost edible — bourbon vanilla, benzoin resin, and a whisper of smoked woods create a fragrance that feels like a warm embrace.',
        notes: ['Vanilla', 'Benzoin', 'Tonka Bean', 'Sandalwood', 'Musk'],
        conc: 'Eau de Parfum — 20%',
        img: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=85',
        sizes: [{ ml: '2ml', label: 'Sample', price: 80 }, { ml: '30ml', label: '', price: 760 }, { ml: '50ml', label: '', price: 1080 }, { ml: '100ml', label: 'Popular', price: 1620 }, { ml: '250ml', label: 'Collector', price: 3180 }]
    },
    {
        id: 9, cat: 'masculine',
        name: 'Aqua Profondo', brand: 'Elysean Collection',
        desc: 'The deep ocean rendered in scent — ozonic minerals, grey amber, and driftwood. Fresh, unexpected, and utterly impossible to forget.',
        notes: ['Marine Accord', 'Grey Amber', 'Driftwood', 'Musk', 'Citrus'],
        conc: 'Eau de Parfum — 20%',
        img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=85',
        sizes: [{ ml: '2ml', label: 'Sample', price: 80 }, { ml: '30ml', label: '', price: 700 }, { ml: '50ml', label: '', price: 1000 }, { ml: '100ml', label: 'Popular', price: 1500 }, { ml: '250ml', label: 'Collector', price: 2950 }]
    },
    {
        id: 10, cat: 'feminine',
        name: 'Amber Soleil', brand: 'Elysean Collection',
        desc: 'Sunlit amber — warm, golden, and radiant. Labdanum, benzoin, and a heart of orange blossom that glows like afternoon light through honey.',
        notes: ['Labdanum', 'Orange Blossom', 'Benzoin', 'Amber', 'Vanilla'],
        conc: 'Eau de Parfum — 20%',
        img: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&q=85',
        sizes: [{ ml: '2ml', label: 'Sample', price: 80 }, { ml: '30ml', label: '', price: 730 }, { ml: '50ml', label: '', price: 1050 }, { ml: '100ml', label: 'Popular', price: 1580 }, { ml: '250ml', label: 'Collector', price: 3100 }]
    },
    {
        id: 11, cat: 'ouds',
        name: 'Black Aoud Royale', brand: 'Elysean Oud Series',
        desc: 'The darkest oud in our collection — intense, resinous, and commanding. Black rose and dark patchouli amplify the ancient wood into something majestic.',
        notes: ['Black Oud', 'Dark Rose', 'Patchouli', 'Labdanum', 'Smoke'],
        conc: 'Eau de Parfum — 20%',
        img: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=85',
        sizes: [{ ml: '2ml', label: 'Sample', price: 140 }, { ml: '30ml', label: '', price: 1200 }, { ml: '50ml', label: '', price: 1800 }, { ml: '100ml', label: 'Popular', price: 2650 }, { ml: '250ml', label: 'Collector', price: 5200 }]
    },
    {
        id: 12, cat: 'unisex',
        name: 'Tobacco & Amber', brand: 'Elysean Collection',
        desc: 'The warmth of a leather armchair in a candlelit library — rich tobacco, dried fruits, and beeswax amber. Cosy, complex, and utterly beguiling.',
        notes: ['Tobacco', 'Dried Fruit', 'Beeswax', 'Amber', 'Leather'],
        conc: 'Eau de Parfum — 20%',
        img: 'https://images.unsplash.com/photo-1547887538-047ad8a8b207?w=800&q=85',
        sizes: [{ ml: '2ml', label: 'Sample', price: 80 }, { ml: '30ml', label: '', price: 820 }, { ml: '50ml', label: '', price: 1180 }, { ml: '100ml', label: 'Popular', price: 1760 }, { ml: '250ml', label: 'Collector', price: 3450 }]
    }
];

let currentFilter = 'all';
let selectedProduct = null;
let selectedSize = null;

// ─── RENDER PRODUCTS ───
function renderProducts(filter) {
    const grid = document.getElementById('products-grid');
    const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);
    document.getElementById('filter-count').textContent = filtered.length + ' fragrances';
    grid.innerHTML = '';
    filtered.forEach((p, i) => {
        const startPrice = p.sizes[0].price;
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.animationDelay = (i * 0.08) + 's';
        card.innerHTML = `
          <div class="product-card-img-wrap">
            <img src="${p.img}" alt="${p.name}" class="product-card-img" loading="lazy"/>
            <div class="product-badge">${p.cat.charAt(0).toUpperCase() + p.cat.slice(1)}</div>
            <button class="quick-view" data-id="${p.id}">View Details</button>
          </div>
          <div class="product-card-body">
            <span class="product-category">${p.cat}</span>
            <h3 class="product-name">${p.name}</h3>
            <p class="product-brand">${p.brand}</p>
            <div class="product-notes">${p.notes.slice(0, 3).map(n => `<span class="note-tag">${n}</span>`).join('')}</div>
            <div class="product-price-row">
              <div class="product-price">R${startPrice}<span>from</span></div>
              <button class="add-btn" data-id="${p.id}">Select Size</button>
            </div>
          </div>
        `;
        grid.appendChild(card);
    });
    // re-attach hover for cursor
    document.querySelectorAll('a, button, .product-card').forEach(el => addCursorHover(el));
    // events
    grid.querySelectorAll('.quick-view, .add-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.dataset.id);
            openModal(id);
        });
    });
}

// ─── FILTERS ───
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.cat;
        renderProducts(currentFilter);
    });
    addCursorHover(btn);
});

// ─── MODAL ───
function openModal(id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;
    selectedProduct = p;
    selectedSize = p.sizes[3] || p.sizes[0]; // default 100ml
    document.getElementById('modal-img').src = p.img;
    document.getElementById('modal-cat').textContent = p.cat;
    document.getElementById('modal-name').textContent = p.name;
    document.getElementById('modal-brand').textContent = p.brand;
    document.getElementById('modal-desc').textContent = p.desc;
    document.getElementById('modal-conc').textContent = p.conc;
    document.getElementById('modal-notes').innerHTML = p.notes.map(n => `<span class="modal-note-tag">${n}</span>`).join('');
    const sizeOpts = document.getElementById('size-options');
    sizeOpts.innerHTML = p.sizes.map((s, i) => `
        <button class="size-btn ${i === 3 || i === p.sizes.length - 1 ? 'selected' : ''}" data-idx="${i}">
          <span class="size-ml">${s.ml}</span>
          <span class="size-price">R${s.price}</span>
          ${s.label ? `<span style="font-size:0.52rem;color:var(--gold);letter-spacing:0.1em;">${s.label}</span>` : ''}
        </button>
      `).join('');
    sizeOpts.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            sizeOpts.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedSize = p.sizes[parseInt(btn.dataset.idx)];
        });
        addCursorHover(btn);
    });
    document.getElementById('modalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
function closeModal() {
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

// ─── ADD TO CART ───
document.getElementById('modal-add-btn').addEventListener('click', () => {
    if (!selectedProduct || !selectedSize) return;
    const cart = JSON.parse(localStorage.getItem('elyseanCart') || '[]');
    const key = `${selectedProduct.id}-${selectedSize.ml}`;
    const existing = cart.find(i => i.key === key);
    if (existing) { existing.qty++; }
    else {
        cart.push({
            key, id: selectedProduct.id,
            name: selectedProduct.name, brand: selectedProduct.brand,
            img: selectedProduct.img, cat: selectedProduct.cat,
            size: selectedSize.ml, price: selectedSize.price, qty: 1
        });
    }
    localStorage.setItem('elyseanCart', JSON.stringify(cart));
    updateCartCount();
    closeModal();
    showPopup(selectedProduct.name, selectedSize.ml);
});

function showPopup(name, size) {
    document.getElementById('popup-sub').textContent = `${name} — ${size}`;
    const popup = document.getElementById('cartPopup');
    popup.classList.add('show');
    setTimeout(() => popup.classList.remove('show'), 5000);
}
document.getElementById('popupContinue').addEventListener('click', () => {
    document.getElementById('cartPopup').classList.remove('show');
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('elyseanCart') || '[]');
    document.getElementById('cart-count').textContent = cart.reduce((s, i) => s + i.qty, 0);
}

// ─── URL FILTER ───
const urlCat = new URLSearchParams(window.location.search).get('cat');
if (urlCat) {
    const btn = document.querySelector(`[data-cat="${urlCat}"]`);
    if (btn) { document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); currentFilter = urlCat; }
}

renderProducts(currentFilter);
updateCartCount();
document.querySelectorAll('a, button').forEach(el => addCursorHover(el));