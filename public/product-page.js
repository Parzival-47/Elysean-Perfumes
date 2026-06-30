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

// ─── PRODUCTS DATA ───
const PRODUCTS = [
    {
        "id": 1,
        "cat": "feminine",
        "name": "Armaf Club De Nuit Woman",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "A bold and seductive feminine fragrance featuring juicy fruits, rich florals, and a warm sweet base that radiates confidence and femininity.",
        "notes": [
            "Apple",
            "Rose",
            "Jasmine",
            "Vanilla",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 179
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 236
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 343
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 576
            }
        ]
    },
    {
        "id": 2,
        "cat": "feminine",
        "name": "Armani Si",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Elegant feminine scent with blackcurrant, rose, and warm vanilla musk.",
        "notes": [
            "Blackcurrant",
            "Rose",
            "Vanilla",
            "Musk",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 188
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 253
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 381
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 669
            }
        ]
    },
    {
        "id": 3,
        "cat": "feminine",
        "name": "Armani Si",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Elegant feminine scent with blackcurrant, rose, and warm vanilla musk.",
        "notes": [
            "Blackcurrant",
            "Rose",
            "Vanilla",
            "Musk",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 172
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 222
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 313
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 501
            }
        ]
    },
    {
        "id": 4,
        "cat": "feminine",
        "name": "Avon Faraway Rebel",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Bold floral-oriental with spicy woods and a seductive musky trail.",
        "notes": [
            "Floral",
            "Oriental",
            "Spicy",
            "Woods",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 172
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 223
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 315
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 508
            }
        ]
    },
    {
        "id": 5,
        "cat": "feminine",
        "name": "Avon Justine Faraway",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Warm oriental fragrance with sweet floral heart and amber base.",
        "notes": [
            "Oriental",
            "Floral",
            "Amber",
            "Sweet",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 177
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 232
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 335
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 556
            }
        ]
    },
    {
        "id": 6,
        "cat": "feminine",
        "name": "Avroy Shlain Coppelia",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Soft romantic floral with powdery iris and warm sandalwood finish.",
        "notes": [
            "Floral",
            "Iris",
            "Sandalwood",
            "Powdery",
            "Romantic"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 177
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 232
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 334
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 554
            }
        ]
    },
    {
        "id": 7,
        "cat": "feminine",
        "name": "Avroy Shlain Endangered For Her",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Delicate floral bouquet with fresh green notes and gentle musk.",
        "notes": [
            "Floral",
            "Green",
            "Musk",
            "Fresh",
            "Delicate"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 176
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 230
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 330
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 545
            }
        ]
    },
    {
        "id": 8,
        "cat": "feminine",
        "name": "Avroy Shlain Js",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Light feminine fragrance with fresh florals and a clean musky base.",
        "notes": [
            "Floral",
            "Fresh",
            "Musk",
            "Clean",
            "Light"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 177
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 232
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 335
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 556
            }
        ]
    },
    {
        "id": 9,
        "cat": "feminine",
        "name": "Avroy Shlain Tabasheer",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Warm exotic scent with bamboo, soft florals, and creamy woods.",
        "notes": [
            "Bamboo",
            "Floral",
            "Woods",
            "Creamy",
            "Exotic"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 176
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 231
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 333
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 550
            }
        ]
    },
    {
        "id": 10,
        "cat": "feminine",
        "name": "Azzaro Wanted For Her",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Sparkling floral-oriental with bergamot, jasmine, and warm vanilla.",
        "notes": [
            "Bergamot",
            "Jasmine",
            "Vanilla",
            "Floral",
            "Oriental"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 181
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 240
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 351
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 597
            }
        ]
    },
    {
        "id": 11,
        "cat": "feminine",
        "name": "B&B Works Beautiful Day",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Fresh floral blend with bright citrus, soft petals, and light musk.",
        "notes": [
            "Citrus",
            "Floral",
            "Petals",
            "Musk",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 171
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 221
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 311
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 497
            }
        ]
    },
    {
        "id": 12,
        "cat": "feminine",
        "name": "B&B Works Black Cherry Merlot White Barn",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Rich and intoxicating blend of dark cherry, ripe merlot, and warm vanilla with a touch of oak for a luxurious, sensual feel.",
        "notes": [
            "Black Cherry",
            "Merlot",
            "Vanilla",
            "Oak",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 178
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 234
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 338
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 565
            }
        ]
    },
    {
        "id": 13,
        "cat": "feminine",
        "name": "B&B Works Champagne Toast",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Festive sparkling scent with bubbly citrus, peach, and sweet musk.",
        "notes": [
            "Citrus",
            "Peach",
            "Musk",
            "Sweet",
            "Sparkling"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 172
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 223
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 314
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 504
            }
        ]
    },
    {
        "id": 14,
        "cat": "feminine",
        "name": "B&B Works Cinnamon Spiced Vanilla",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Warm and cozy blend of spicy cinnamon, sweet vanilla, and soft woods.",
        "notes": [
            "Cinnamon",
            "Vanilla",
            "Woods",
            "Spicy",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 165
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 209
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 284
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 430
            }
        ]
    },
    {
        "id": 15,
        "cat": "feminine",
        "name": "B&B Works Dark Kiss",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Sensual dark floral with black cherry, wild berries, and warm musk.",
        "notes": [
            "Cherry",
            "Berries",
            "Musk",
            "Floral",
            "Dark"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 174
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 227
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 323
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 527
            }
        ]
    },
    {
        "id": 16,
        "cat": "feminine",
        "name": "B&B Works Fiji Sunrise",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Tropical citrus blend with bright mango, coconut, and beach florals.",
        "notes": [
            "Mango",
            "Coconut",
            "Citrus",
            "Floral",
            "Tropical"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 175
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 228
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 325
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 533
            }
        ]
    },
    {
        "id": 17,
        "cat": "feminine",
        "name": "B&B Works Hello Beautiful",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Uplifting floral with fresh peony, soft rose, and light cedarwood.",
        "notes": [
            "Peony",
            "Rose",
            "Cedarwood",
            "Floral",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 172
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 222
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 313
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 503
            }
        ]
    },
    {
        "id": 18,
        "cat": "feminine",
        "name": "B&B Works Iced Sugar Plum",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Sweet and playful fragrance with juicy sugar plum, frosted berries, and creamy vanilla for a delightful winter-inspired scent.",
        "notes": [
            "Sugar Plum",
            "Berry",
            "Vanilla",
            "Frosted Sugar",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 166
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 212
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 291
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 446
            }
        ]
    },
    {
        "id": 19,
        "cat": "feminine",
        "name": "B&B Works Into The Night",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Mysterious and alluring night-time scent with dark fruits, warm florals, and a deep vanilla-amber base.",
        "notes": [
            "Black Cherry",
            "Jasmine",
            "Vanilla",
            "Amber",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 181
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 240
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 352
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 598
            }
        ]
    },
    {
        "id": 20,
        "cat": "feminine",
        "name": "B&B Works Japanese Cherry Blossom",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Delicate floral with sweet cherry blossom, fresh petals, and soft musk.",
        "notes": [
            "Cherry Blossom",
            "Petals",
            "Musk",
            "Floral",
            "Sweet"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 172
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 223
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 315
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 506
            }
        ]
    },
    {
        "id": 21,
        "cat": "feminine",
        "name": "B&B Works Noir Cologne",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Dark and mysterious blend with smoky woods, amber, and black musk.",
        "notes": [
            "Smoky",
            "Woods",
            "Amber",
            "Musk",
            "Dark"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 173
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 225
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 320
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 518
            }
        ]
    },
    {
        "id": 22,
        "cat": "feminine",
        "name": "B&B Works Pink Pineapple Sunrise",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Fun tropical blend with juicy pineapple, citrus, and soft florals.",
        "notes": [
            "Pineapple",
            "Citrus",
            "Floral",
            "Tropical",
            "Fruity"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 182
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 242
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 357
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 611
            }
        ]
    },
    {
        "id": 23,
        "cat": "feminine",
        "name": "B&B Works Pure Wonder",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Clean and dreamy scent with soft florals, sheer musk, and light woods.",
        "notes": [
            "Floral",
            "Musk",
            "Woods",
            "Clean",
            "Dreamy"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 187
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 251
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 376
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 659
            }
        ]
    },
    {
        "id": 24,
        "cat": "feminine",
        "name": "B&B Works Sea Island Shore",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Fresh coastal scent with sea salt, driftwood, and tropical florals.",
        "notes": [
            "Sea Salt",
            "Driftwood",
            "Floral",
            "Coastal",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 181
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 241
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 353
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 602
            }
        ]
    },
    {
        "id": 25,
        "cat": "feminine",
        "name": "B&B Works Twilight Woods",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Warm earthy fragrance with amber, cedar, and soft woodland florals.",
        "notes": [
            "Amber",
            "Cedar",
            "Floral",
            "Earthy",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 182
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 241
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 355
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 605
            }
        ]
    },
    {
        "id": 26,
        "cat": "feminine",
        "name": "B&B Works Twisted Peppermint",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Cool and festive mint with sweet candy and icy frosted freshness.",
        "notes": [
            "Mint",
            "Candy",
            "Fresh",
            "Cool",
            "Sweet"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 186
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 249
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 371
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 646
            }
        ]
    },
    {
        "id": 27,
        "cat": "feminine",
        "name": "B&B Works Vanilla Bean Noel",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Cozy sweet vanilla with warm sugar, buttercream, and soft musk.",
        "notes": [
            "Vanilla",
            "Sugar",
            "Buttercream",
            "Musk",
            "Sweet"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 168
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 215
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 296
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 460
            }
        ]
    },
    {
        "id": 28,
        "cat": "feminine",
        "name": "B&B Works Warm Vanilla Sugar",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Cozy and addictive gourmand fragrance filled with warm vanilla, brown sugar, and a touch of creamy sweetness.",
        "notes": [
            "Vanilla",
            "Brown Sugar",
            "Buttercream",
            "Musk",
            "Tonka Bean"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 172
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 222
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 313
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 501
            }
        ]
    },
    {
        "id": 29,
        "cat": "feminine",
        "name": "B&B Works Watermelon Lemonade",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Bright and juicy blend of fresh watermelon, tart lemon, and citrus zest.",
        "notes": [
            "Watermelon",
            "Lemon",
            "Citrus",
            "Fruity",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 173
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 224
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 318
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 513
            }
        ]
    },
    {
        "id": 30,
        "cat": "feminine",
        "name": "Baccarat Rouge",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Warm, sweet and mysterious gourmand fragrance with creamy vanilla, cocoa, and soft fruity undertones.",
        "notes": [
            "Vanilla",
            "Cocoa",
            "Sugar",
            "Red Berries",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 274
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 415
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 737
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 1552
            }
        ]
    },
    {
        "id": 31,
        "cat": "feminine",
        "name": "Beyonce Heat",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Sultry and sensual blend of red berries, peach, magnolia, and warm musk.",
        "notes": [
            "Berries",
            "Peach",
            "Magnolia",
            "Musk",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 175
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 228
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 326
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 534
            }
        ]
    },
    {
        "id": 32,
        "cat": "feminine",
        "name": "Billie Eilish Eilish",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Sophisticated woody-floral with cedarwood, rose, and soft powdery notes for an elegant and refined aura.",
        "notes": [
            "Cedarwood",
            "Rose",
            "Jasmine",
            "Powder",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 171
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 221
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 309
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 493
            }
        ]
    },
    {
        "id": 33,
        "cat": "feminine",
        "name": "Britney Spears Fantasy",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Sweet playful scent with kiwi, jasmine, cupcake accord, and musk.",
        "notes": [
            "Kiwi",
            "Jasmine",
            "Vanilla",
            "Musk",
            "Sweet"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 188
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 252
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 379
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 666
            }
        ]
    },
    {
        "id": 34,
        "cat": "feminine",
        "name": "Britney Spears Fantasy",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Sweet playful scent with kiwi, jasmine, cupcake accord, and musk.",
        "notes": [
            "Kiwi",
            "Jasmine",
            "Vanilla",
            "Musk",
            "Sweet"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 180
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 239
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 349
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 591
            }
        ]
    },
    {
        "id": 35,
        "cat": "feminine",
        "name": "Burberry Her",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Vibrant fruity floral with berry, jasmine, violet, and soft amber.",
        "notes": [
            "Berry",
            "Jasmine",
            "Violet",
            "Amber",
            "Floral"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 175
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 229
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 328
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 540
            }
        ]
    },
    {
        "id": 36,
        "cat": "feminine",
        "name": "Bvlgari Omnia",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Warm oriental spice with Indian tea, cardamom, and sandalwood.",
        "notes": [
            "Tea",
            "Cardamom",
            "Sandalwood",
            "Spice",
            "Oriental"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 179
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 236
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 343
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 575
            }
        ]
    },
    {
        "id": 37,
        "cat": "feminine",
        "name": "Bvlgari Omnia 2003 Original",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Original warm spiced floral with saffron, henna, and precious woods.",
        "notes": [
            "Saffron",
            "Henna",
            "Woods",
            "Floral",
            "Spiced"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 180
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 239
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 349
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 591
            }
        ]
    },
    {
        "id": 38,
        "cat": "feminine",
        "name": "Bvlgari Omnia Crystalline Original",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Sheer and luminous floral with bamboo, lotus, and icy white notes.",
        "notes": [
            "Bamboo",
            "Lotus",
            "Floral",
            "Sheer",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 200
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 275
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 429
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 788
            }
        ]
    },
    {
        "id": 39,
        "cat": "feminine",
        "name": "Cacharel Amor Amor",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Passionate floral-fruity with orange, jasmine, and warm vanilla musk.",
        "notes": [
            "Orange",
            "Jasmine",
            "Vanilla",
            "Floral",
            "Fruity"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 178
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 234
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 338
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 563
            }
        ]
    },
    {
        "id": 40,
        "cat": "feminine",
        "name": "Cacharel Anais Anais",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Soft romantic white floral with lily, rose, and powdery iris.",
        "notes": [
            "Lily",
            "Rose",
            "Iris",
            "Floral",
            "Powdery"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 178
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 234
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 338
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 563
            }
        ]
    },
    {
        "id": 41,
        "cat": "feminine",
        "name": "Cacharel Yes I Am",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Bold fruity-floral with caramel, rose, and warm sandalwood.",
        "notes": [
            "Caramel",
            "Rose",
            "Sandalwood",
            "Floral",
            "Fruity"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 168
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 215
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 296
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 460
            }
        ]
    },
    {
        "id": 42,
        "cat": "feminine",
        "name": "Calvin Klein Euphoria",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Sensual dark floral with pomegranate, black orchid, and warm amber.",
        "notes": [
            "Pomegranate",
            "Black Orchid",
            "Amber",
            "Floral",
            "Dark"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 187
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 251
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 377
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 660
            }
        ]
    },
    {
        "id": 43,
        "cat": "feminine",
        "name": "Carolina Herrera 212 Vip Ladies",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Glamorous floral with champagne accord, gardenia, and warm musk.",
        "notes": [
            "Gardenia",
            "Champagne",
            "Musk",
            "Floral",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 179
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 236
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 343
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 577
            }
        ]
    },
    {
        "id": 44,
        "cat": "feminine",
        "name": "Carolina Herrera Good Girl",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Iconic dual-nature scent with jasmine, tonka bean, and dark cocoa.",
        "notes": [
            "Jasmine",
            "Tonka Bean",
            "Cocoa",
            "Floral",
            "Dark"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 195
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 267
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 412
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 746
            }
        ]
    },
    {
        "id": 45,
        "cat": "feminine",
        "name": "Carolina Herrera Good Girl",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Iconic dual-nature scent with jasmine, tonka bean, and dark cocoa.",
        "notes": [
            "Jasmine",
            "Tonka Bean",
            "Cocoa",
            "Floral",
            "Dark"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 180
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 239
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 349
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 591
            }
        ]
    },
    {
        "id": 46,
        "cat": "feminine",
        "name": "Chanel Coco",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Rich oriental floral with rose, jasmine, vanilla, and precious woods.",
        "notes": [
            "Rose",
            "Jasmine",
            "Vanilla",
            "Woods",
            "Oriental"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 196
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 268
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 413
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 749
            }
        ]
    },
    {
        "id": 47,
        "cat": "feminine",
        "name": "Chanel Coco Madam",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Modern floral chypre with grapefruit, rose, and white musk.",
        "notes": [
            "Grapefruit",
            "Rose",
            "White Musk",
            "Floral",
            "Chypre"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 180
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 239
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 349
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 591
            }
        ]
    },
    {
        "id": 48,
        "cat": "feminine",
        "name": "Chanel Coco Madam",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Modern floral chypre with grapefruit, rose, and white musk.",
        "notes": [
            "Grapefruit",
            "Rose",
            "White Musk",
            "Floral",
            "Chypre"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 201
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 278
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 434
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 802
            }
        ]
    },
    {
        "id": 49,
        "cat": "feminine",
        "name": "Chanel No. 5",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Timeless classic aldehyde floral with rose, ylang-ylang, and sandalwood.",
        "notes": [
            "Rose",
            "Ylang-Ylang",
            "Sandalwood",
            "Aldehyde",
            "Floral"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 175
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 228
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 325
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 533
            }
        ]
    },
    {
        "id": 50,
        "cat": "feminine",
        "name": "Chloe Atelier Des Fleurs Cedrus",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Romantic and feminine with juicy fruits, delicate florals, and a soft vanilla base.",
        "notes": [
            "Pear",
            "Rose",
            "Jasmine",
            "Vanilla",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 205
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 285
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 452
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 845
            }
        ]
    },
    {
        "id": 51,
        "cat": "feminine",
        "name": "Chloe Love Story",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh romantic floral with orange blossom, stephanotis, and cedarwood.",
        "notes": [
            "Orange Blossom",
            "Stephanotis",
            "Cedarwood",
            "Floral",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 184
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 246
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 364
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 629
            }
        ]
    },
    {
        "id": 52,
        "cat": "feminine",
        "name": "Christian Dior Holy Peony",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Luminous peony-centred floral with rose, lychee, and soft musk.",
        "notes": [
            "Peony",
            "Rose",
            "Lychee",
            "Musk",
            "Floral"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 190
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 257
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 390
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 692
            }
        ]
    },
    {
        "id": 53,
        "cat": "feminine",
        "name": "Christian Dior Hypnotic Poison",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Dark seductive scent with bitter almond, jasmine, and warm vanilla.",
        "notes": [
            "Almond",
            "Jasmine",
            "Vanilla",
            "Dark",
            "Seductive"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 175
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 228
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 325
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 533
            }
        ]
    },
    {
        "id": 54,
        "cat": "feminine",
        "name": "Christian Dior Jadore",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Luxurious feminine floral with ylang-ylang, rose, and jasmine accord.",
        "notes": [
            "Ylang-Ylang",
            "Rose",
            "Jasmine",
            "Floral",
            "Luxurious"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 169
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 218
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 303
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 478
            }
        ]
    },
    {
        "id": 55,
        "cat": "feminine",
        "name": "Christian Dior Poison Girl",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Sweet and bold with bitter orange, rose, and warm vanilla accord.",
        "notes": [
            "Orange",
            "Rose",
            "Vanilla",
            "Sweet",
            "Bold"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 189
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 254
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 384
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 676
            }
        ]
    },
    {
        "id": 56,
        "cat": "feminine",
        "name": "Christian Dior Poison",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Dramatic oriental floral with tuberose, plum, and rich amber base.",
        "notes": [
            "Tuberose",
            "Plum",
            "Amber",
            "Floral",
            "Oriental"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 181
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 240
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 351
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 597
            }
        ]
    },
    {
        "id": 57,
        "cat": "feminine",
        "name": "Clinique Aromatics Elixir",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Distinctive chypre with rose, chamomile, oakmoss, and patchouli.",
        "notes": [
            "Rose",
            "Chamomile",
            "Oakmoss",
            "Patchouli",
            "Chypre"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 178
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 234
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 339
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 566
            }
        ]
    },
    {
        "id": 58,
        "cat": "feminine",
        "name": "Clinique Happy",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Bright uplifting floral with citrus, spring mimosa, and clean musk.",
        "notes": [
            "Citrus",
            "Mimosa",
            "Musk",
            "Floral",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 184
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 245
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 363
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 625
            }
        ]
    },
    {
        "id": 59,
        "cat": "feminine",
        "name": "Coty Exclamation",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Classic affordable oriental with rose, jasmine, and warm musky base.",
        "notes": [
            "Rose",
            "Jasmine",
            "Musk",
            "Oriental",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 178
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 235
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 341
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 570
            }
        ]
    },
    {
        "id": 60,
        "cat": "feminine",
        "name": "D&G The One Gold Female Type",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Opulent floral oriental with peach, lily, and warm amber.",
        "notes": [
            "Peach",
            "Lily",
            "Amber",
            "Floral",
            "Oriental"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 192
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 260
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 396
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 708
            }
        ]
    },
    {
        "id": 61,
        "cat": "feminine",
        "name": "Davidof Cool Water Ladies",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh aquatic floral with melon, green notes, and soft sandalwood.",
        "notes": [
            "Melon",
            "Green",
            "Sandalwood",
            "Aquatic",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 178
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 234
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 338
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 563
            }
        ]
    },
    {
        "id": 62,
        "cat": "feminine",
        "name": "Dkny Be Delicious Fresh Blossom",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Crisp floral with pink grapefruit, white florals, and fresh cedarwood.",
        "notes": [
            "Grapefruit",
            "Floral",
            "Cedarwood",
            "Crisp",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 165
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 209
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 284
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 430
            }
        ]
    },
    {
        "id": 63,
        "cat": "feminine",
        "name": "Dkny Be Delicious Green",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh green apple, magnolia, and light musky woods.",
        "notes": [
            "Green Apple",
            "Magnolia",
            "Musk",
            "Woods",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 177
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 232
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 335
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 556
            }
        ]
    },
    {
        "id": 64,
        "cat": "feminine",
        "name": "Dkny Women Eau De Parfum",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Vibrant floral bouquet with apple blossom, violet, and soft musk.",
        "notes": [
            "Apple Blossom",
            "Violet",
            "Musk",
            "Floral",
            "Vibrant"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 170
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 219
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 307
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 487
            }
        ]
    },
    {
        "id": 65,
        "cat": "feminine",
        "name": "Dkyn Be Delicious (Original)",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Iconic fresh green apple scent with floral heart and light cedar.",
        "notes": [
            "Green Apple",
            "Floral",
            "Cedar",
            "Fresh",
            "Iconic"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 199
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 273
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 425
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 779
            }
        ]
    },
    {
        "id": 66,
        "cat": "feminine",
        "name": "Dolce & Gabbana Light Blue Femme",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh Mediterranean citrus with apple, bamboo, and white rose.",
        "notes": [
            "Citrus",
            "Apple",
            "Bamboo",
            "Rose",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 178
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 235
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 341
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 570
            }
        ]
    },
    {
        "id": 67,
        "cat": "feminine",
        "name": "Dolce & Gabbana The One For Her",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Sophisticated oriental floral with mandarin, lychee, and warm vanilla.",
        "notes": [
            "Mandarin",
            "Lychee",
            "Vanilla",
            "Floral",
            "Oriental"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 180
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 239
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 349
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 591
            }
        ]
    },
    {
        "id": 68,
        "cat": "feminine",
        "name": "Elie Saab Le Parfum",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Feminine floral-woody with orange blossom, rose, and patchouli.",
        "notes": [
            "Orange Blossom",
            "Rose",
            "Patchouli",
            "Floral",
            "Woody"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 177
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 232
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 333
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 552
            }
        ]
    },
    {
        "id": 69,
        "cat": "feminine",
        "name": "Elizabeth Arden 5th Avenue",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Elegant floral bouquet with magnolia, lilac, rose, and warm woods.",
        "notes": [
            "Magnolia",
            "Lilac",
            "Rose",
            "Woods",
            "Floral"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 175
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 229
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 327
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 536
            }
        ]
    },
    {
        "id": 70,
        "cat": "feminine",
        "name": "Elizabeth Arden Red Door",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Classic rich floral with rose, jasmine, ylang-ylang, and sandalwood.",
        "notes": [
            "Rose",
            "Jasmine",
            "Ylang-Ylang",
            "Sandalwood",
            "Floral"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 180
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 237
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 346
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 582
            }
        ]
    },
    {
        "id": 71,
        "cat": "feminine",
        "name": "Elizabeth Arden Sunflowers",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Bright sunny floral with orange blossom, rose, and fresh greenery.",
        "notes": [
            "Orange Blossom",
            "Rose",
            "Green",
            "Floral",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 168
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 215
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 296
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 460
            }
        ]
    },
    {
        "id": 72,
        "cat": "feminine",
        "name": "Elizabeth Arden White Tea",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Light and clean with delicate white tea, lotus, and soft musk.",
        "notes": [
            "White Tea",
            "Lotus",
            "Musk",
            "Clean",
            "Light"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 193
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 263
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 401
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 721
            }
        ]
    },
    {
        "id": 73,
        "cat": "feminine",
        "name": "Elizabeth Taylor White Diamonds",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Timeless opulent floral with rose, neroli, lily, and warm amber.",
        "notes": [
            "Rose",
            "Neroli",
            "Lily",
            "Amber",
            "Floral"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 175
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 228
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 325
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 533
            }
        ]
    },
    {
        "id": 74,
        "cat": "feminine",
        "name": "Ellie Saab Girl Of Now",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Fresh floral with grapefruit, magnolia, and light woody musk.",
        "notes": [
            "Grapefruit",
            "Magnolia",
            "Musk",
            "Floral",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 185
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 248
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 368
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 639
            }
        ]
    },
    {
        "id": 75,
        "cat": "feminine",
        "name": "Escada Taj Sunset",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fruity-oriental with mango, orange blossom, amber, and warm woods.",
        "notes": [
            "Mango",
            "Orange Blossom",
            "Amber",
            "Woods",
            "Fruity"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 178
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 234
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 338
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 563
            }
        ]
    },
    {
        "id": 76,
        "cat": "feminine",
        "name": "Estee Lauder Beautiful",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Romantic multi-floral bouquet with rose, lily, and soft sandalwood.",
        "notes": [
            "Rose",
            "Lily",
            "Sandalwood",
            "Floral",
            "Romantic"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 186
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 249
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 371
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 646
            }
        ]
    },
    {
        "id": 77,
        "cat": "feminine",
        "name": "Estee Lauder Knowing",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Sophisticated chypre floral with rose, jasmine, and mossy woods.",
        "notes": [
            "Rose",
            "Jasmine",
            "Oakmoss",
            "Chypre",
            "Woody"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 182
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 242
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 356
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 607
            }
        ]
    },
    {
        "id": 78,
        "cat": "feminine",
        "name": "Estee Lauder White Linen",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Clean fresh aldehydic floral with rose, lilac, and crisp musk.",
        "notes": [
            "Rose",
            "Lilac",
            "Musk",
            "Aldehyde",
            "Clean"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 186
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 248
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 371
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 645
            }
        ]
    },
    {
        "id": 79,
        "cat": "feminine",
        "name": "Fire And Ice",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Bold contrast scent with spicy florals, warm amber, and icy freshness.",
        "notes": [
            "Spice",
            "Floral",
            "Amber",
            "Fresh",
            "Bold"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 165
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 211
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 287
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 439
            }
        ]
    },
    {
        "id": 80,
        "cat": "feminine",
        "name": "Fugazzi Vanilla Haze",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Dreamy warm vanilla with soft musk, light woods, and creamy sweetness.",
        "notes": [
            "Vanilla",
            "Musk",
            "Woods",
            "Creamy",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 191
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 259
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 394
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 701
            }
        ]
    },
    {
        "id": 81,
        "cat": "feminine",
        "name": "Giucci Gucci Flora",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Delicate feminine floral with peach rose, magnolia, and sandalwood.",
        "notes": [
            "Rose",
            "Magnolia",
            "Sandalwood",
            "Peach",
            "Floral"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 182
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 242
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 356
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 607
            }
        ]
    },
    {
        "id": 82,
        "cat": "feminine",
        "name": "Givenchy Absolutely Irresistible",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Vibrant fruity floral with raspberry, rose, and soft warm musk.",
        "notes": [
            "Raspberry",
            "Rose",
            "Musk",
            "Floral",
            "Fruity"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 193
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 263
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 401
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 721
            }
        ]
    },
    {
        "id": 83,
        "cat": "feminine",
        "name": "Givenchy Organza",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Rich floral oriental with honeysuckle, gardenia, and warm amber.",
        "notes": [
            "Honeysuckle",
            "Gardenia",
            "Amber",
            "Floral",
            "Oriental"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 181
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 239
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 351
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 595
            }
        ]
    },
    {
        "id": 84,
        "cat": "feminine",
        "name": "Gucci Guilty Lady",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Intense floral-oriental with pink pepper, geranium, and amber.",
        "notes": [
            "Pink Pepper",
            "Geranium",
            "Amber",
            "Floral",
            "Oriental"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 181
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 240
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 352
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 598
            }
        ]
    },
    {
        "id": 85,
        "cat": "feminine",
        "name": "Gucci Rush",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Bold sensual floral with gardenia, vanilla, and warm patchouli.",
        "notes": [
            "Gardenia",
            "Vanilla",
            "Patchouli",
            "Floral",
            "Sensual"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 171
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 221
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 310
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 494
            }
        ]
    },
    {
        "id": 86,
        "cat": "feminine",
        "name": "Hugo Boss Femme Type",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Soft feminine floral with fruity top notes and warm musky woods.",
        "notes": [
            "Floral",
            "Fruity",
            "Musk",
            "Woods",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 188
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 254
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 382
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 673
            }
        ]
    },
    {
        "id": 87,
        "cat": "feminine",
        "name": "Hugo Boss The Scent Elixir Her",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Intense sensual blend with cocoa, rose, and dark woody musk.",
        "notes": [
            "Cocoa",
            "Rose",
            "Musk",
            "Woods",
            "Dark"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 209
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 292
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 466
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 881
            }
        ]
    },
    {
        "id": 88,
        "cat": "feminine",
        "name": "Hugo Boss The Scent For Her",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Seductive floral-oriental with freesia, peach, and warm woods.",
        "notes": [
            "Freesia",
            "Peach",
            "Woods",
            "Floral",
            "Seductive"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 182
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 241
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 355
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 605
            }
        ]
    },
    {
        "id": 89,
        "cat": "feminine",
        "name": "Issey Miyake Leau Dissey Original",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Iconic fresh aquatic floral with lotus, rose, and clean woods.",
        "notes": [
            "Lotus",
            "Rose",
            "Woods",
            "Aquatic",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 181
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 240
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 351
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 597
            }
        ]
    },
    {
        "id": 90,
        "cat": "feminine",
        "name": "Jean Paul Gaultier Scandal Women",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Bold floral with honey, orange blossom, and warm patchouli.",
        "notes": [
            "Honey",
            "Orange Blossom",
            "Patchouli",
            "Floral",
            "Bold"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 177
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 232
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 335
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 556
            }
        ]
    },
    {
        "id": 91,
        "cat": "feminine",
        "name": "Jean Paul Scandal For Women",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Sensual floral with gardenia, blood orange, and warm woody base.",
        "notes": [
            "Gardenia",
            "Blood Orange",
            "Woods",
            "Floral",
            "Sensual"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 188
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 252
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 379
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 666
            }
        ]
    },
    {
        "id": 92,
        "cat": "feminine",
        "name": "Jimmy Choo Jimmy Choo For Women",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Glamorous fruity floral with pear, orchid, and warm patchouli.",
        "notes": [
            "Pear",
            "Orchid",
            "Patchouli",
            "Floral",
            "Fruity"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 178
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 234
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 338
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 565
            }
        ]
    },
    {
        "id": 93,
        "cat": "feminine",
        "name": "Jo Malone English Pear And Freesia Cologne",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Fresh and fruity with ripe pear, white freesia, and patchouli.",
        "notes": [
            "Pear",
            "Freesia",
            "Patchouli",
            "Fruity",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 201
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 277
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 432
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 797
            }
        ]
    },
    {
        "id": 94,
        "cat": "feminine",
        "name": "Jo Malone Peony And Blush Suede Cologne",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Soft romantic blend of peony, red apple, and velvety suede.",
        "notes": [
            "Peony",
            "Red Apple",
            "Suede",
            "Floral",
            "Romantic"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 191
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 258
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 392
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 698
            }
        ]
    },
    {
        "id": 95,
        "cat": "feminine",
        "name": "Jo Malone Pomegranate Noir Cologne",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Fruity-woody with pomegranate, pink pepper, and dark woods.",
        "notes": [
            "Pomegranate",
            "Pink Pepper",
            "Woods",
            "Fruity",
            "Dark"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 211
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 295
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 474
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 900
            }
        ]
    },
    {
        "id": 96,
        "cat": "feminine",
        "name": "Jo Malone Velvet Rose And Oud Cologne",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Opulent rose with rich oud, velvet woods, and smoky incense.",
        "notes": [
            "Rose",
            "Oud",
            "Woods",
            "Incense",
            "Smoky"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 206
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 286
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 453
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 849
            }
        ]
    },
    {
        "id": 97,
        "cat": "feminine",
        "name": "Juliette Has A Gun Juliette",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Minimalist and modern scent built around Cetalox (a clean woody-amber molecule) for a unique skin-like fragrance.",
        "notes": [
            "Cetalox",
            "Woody",
            "Amber",
            "Musk",
            "Clean"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 191
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 258
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 393
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 699
            }
        ]
    },
    {
        "id": 98,
        "cat": "feminine",
        "name": "Juliette Has A Gun Not A Perfume",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Soft, powdery and comforting scent with iris, vanilla, and creamy woods for a quiet luxury feel.",
        "notes": [
            "Iris",
            "Vanilla",
            "Powdery",
            "Woods",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 202
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 279
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 437
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 809
            }
        ]
    },
    {
        "id": 99,
        "cat": "feminine",
        "name": "Juliette Has A Gun Ode To Dullness",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Delicate and refined floral fragrance centered around osmanthus with fruity and leathery nuances.",
        "notes": [
            "Osmanthus",
            "Apricot",
            "Leather",
            "Floral",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 183
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 244
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 361
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 622
            }
        ]
    },
    {
        "id": 100,
        "cat": "feminine",
        "name": "Kenzo Flower",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Delicate white floral with powdery violet, rose, and clean musk.",
        "notes": [
            "Violet",
            "Rose",
            "Musk",
            "Floral",
            "Powdery"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 163
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 206
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 277
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 414
            }
        ]
    },
    {
        "id": 101,
        "cat": "feminine",
        "name": "Lacoste Touch Of Pink",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh feminine scent with grapefruit, magnolia, and soft woods.",
        "notes": [
            "Grapefruit",
            "Magnolia",
            "Woods",
            "Fresh",
            "Floral"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 185
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 247
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 366
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 634
            }
        ]
    },
    {
        "id": 102,
        "cat": "feminine",
        "name": "Lady Gaga",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Daring dark floral with honey, saffron, and warm animalic base.",
        "notes": [
            "Honey",
            "Saffron",
            "Floral",
            "Dark",
            "Animalic"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 178
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 234
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 338
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 565
            }
        ]
    },
    {
        "id": 103,
        "cat": "feminine",
        "name": "Lancome Idole Lintense Type",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Deep intense floral with rose, jasmine, and warm woody musk.",
        "notes": [
            "Rose",
            "Jasmine",
            "Musk",
            "Woods",
            "Intense"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 189
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 254
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 384
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 676
            }
        ]
    },
    {
        "id": 104,
        "cat": "feminine",
        "name": "Lancome La Nuit Tresor",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Dark romantic floral with black rose, peach, and vanilla amber.",
        "notes": [
            "Black Rose",
            "Peach",
            "Vanilla",
            "Amber",
            "Floral"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 177
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 232
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 334
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 554
            }
        ]
    },
    {
        "id": 105,
        "cat": "feminine",
        "name": "Lancome La Vie Est Belle",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Joyful floral oriental with iris, praline, and warm sandalwood.",
        "notes": [
            "Iris",
            "Praline",
            "Sandalwood",
            "Floral",
            "Oriental"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 188
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 254
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 382
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 673
            }
        ]
    },
    {
        "id": 106,
        "cat": "feminine",
        "name": "Lancome La Vie Est Belle",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Joyful floral oriental with iris, praline, and warm sandalwood.",
        "notes": [
            "Iris",
            "Praline",
            "Sandalwood",
            "Floral",
            "Oriental"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 180
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 239
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 349
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 591
            }
        ]
    },
    {
        "id": 107,
        "cat": "feminine",
        "name": "Le Labo Santal",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Iconic unisex woody scent with sandalwood, cedar, and leather.",
        "notes": [
            "Sandalwood",
            "Cedar",
            "Leather",
            "Woody",
            "Iconic"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 189
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 255
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 386
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 682
            }
        ]
    },
    {
        "id": 108,
        "cat": "feminine",
        "name": "Lentheric Panache",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Classic powdery floral with soft rose, violet, and warm musk.",
        "notes": [
            "Rose",
            "Violet",
            "Musk",
            "Floral",
            "Powdery"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 174
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 226
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 321
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 522
            }
        ]
    },
    {
        "id": 109,
        "cat": "feminine",
        "name": "Loccitane Osmathus",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Delicate and refined floral fragrance centered around osmanthus with fruity and leathery nuances.",
        "notes": [
            "Osmanthus",
            "Apricot",
            "Leather",
            "Floral",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 173
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 225
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 318
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 515
            }
        ]
    },
    {
        "id": 110,
        "cat": "feminine",
        "name": "Maison Francis Kurkdjian Paris Oud Satin Mood Exact",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Velvety oud with rose, vanilla, and soft woody incense.",
        "notes": [
            "Oud",
            "Rose",
            "Vanilla",
            "Incense",
            "Woody"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 202
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 279
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 439
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 813
            }
        ]
    },
    {
        "id": 111,
        "cat": "feminine",
        "name": "Maison Crivelli Hibiscus Mahajad",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Vibrant tropical floral with hibiscus, citrus, and light woods.",
        "notes": [
            "Hibiscus",
            "Citrus",
            "Woods",
            "Floral",
            "Tropical"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 196
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 268
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 413
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 749
            }
        ]
    },
    {
        "id": 112,
        "cat": "feminine",
        "name": "Maison Francis Kurkdijan Baccarat Rouge",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Iconic luxurious unisex scent with saffron, jasmine, amberwood, and sweet woody notes.",
        "notes": [
            "Saffron",
            "Jasmine",
            "Amberwood",
            "Fir Resin",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 208
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 290
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 462
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 870
            }
        ]
    },
    {
        "id": 113,
        "cat": "feminine",
        "name": "Maison Francis Kurkdjian",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Luminous and fresh with bergamot, white musk, and soft woods.",
        "notes": [
            "Bergamot",
            "White Musk",
            "Woods",
            "Fresh",
            "Luminous"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 199
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 273
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 425
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 779
            }
        ]
    },
    {
        "id": 114,
        "cat": "feminine",
        "name": "Maison Francis Kurkdjian Apom Eau De Parfum",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Elegant warm floral with orange blossom, amber, and precious woods.",
        "notes": [
            "Orange Blossom",
            "Amber",
            "Woods",
            "Floral",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 193
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 262
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 401
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 719
            }
        ]
    },
    {
        "id": 115,
        "cat": "feminine",
        "name": "Maison Francis Kurkdjian Gentle Fluidity Gold",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Warm spiced oriental with nutmeg, musk, and amber woods.",
        "notes": [
            "Nutmeg",
            "Musk",
            "Amber",
            "Woods",
            "Oriental"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 210
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 293
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 470
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 889
            }
        ]
    },
    {
        "id": 116,
        "cat": "feminine",
        "name": "Marc Jacobs Daisy",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh feminine floral with violet leaf, strawberry, and soft musk.",
        "notes": [
            "Violet Leaf",
            "Strawberry",
            "Musk",
            "Floral",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 178
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 234
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 338
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 563
            }
        ]
    },
    {
        "id": 117,
        "cat": "feminine",
        "name": "Molton Brown Coastal Cypress & Sea Fennel",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Fresh coastal fragrance with crisp cypress, sea fennel, and salty marine notes.",
        "notes": [
            "Cypress",
            "Sea Fennel",
            "Marine",
            "Woody",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 175
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 228
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 325
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 533
            }
        ]
    },
    {
        "id": 118,
        "cat": "feminine",
        "name": "Molton Brown Fiery Pink Pepper",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Spicy and vibrant with pink pepper, jasmine, and warm woody undertones.",
        "notes": [
            "Pink Pepper",
            "Jasmine",
            "Woods",
            "Spicy",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 169
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 218
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 302
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 476
            }
        ]
    },
    {
        "id": 119,
        "cat": "feminine",
        "name": "Molton Brown Heavenly Ginger Lily",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Exotic floral with spicy ginger, lily, and warm tropical woods.",
        "notes": [
            "Ginger",
            "Lily",
            "Woods",
            "Floral",
            "Exotic"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 174
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 227
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 324
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 529
            }
        ]
    },
    {
        "id": 120,
        "cat": "feminine",
        "name": "Molton Brown Rhubarb And Rose",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Playful floral with tart rhubarb, fresh rose, and soft musk.",
        "notes": [
            "Rhubarb",
            "Rose",
            "Musk",
            "Floral",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 182
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 243
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 358
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 613
            }
        ]
    },
    {
        "id": 121,
        "cat": "feminine",
        "name": "Mont Blanc Signature Type",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Elegant floral with peony, rose, and warm white musks.",
        "notes": [
            "Peony",
            "Rose",
            "White Musk",
            "Floral",
            "Elegant"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 184
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 245
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 363
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 625
            }
        ]
    },
    {
        "id": 122,
        "cat": "feminine",
        "name": "Narciso Rodriguez Eau Neroli Ambree Type",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Warm citrus floral with neroli, amber, and soft woody musk.",
        "notes": [
            "Neroli",
            "Amber",
            "Musk",
            "Citrus",
            "Floral"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 212
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 299
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 481
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 918
            }
        ]
    },
    {
        "id": 123,
        "cat": "feminine",
        "name": "Narciso Rodriguez For Her",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Intimate musky floral with rose, jasmine, and warm sandalwood.",
        "notes": [
            "Rose",
            "Jasmine",
            "Sandalwood",
            "Musk",
            "Floral"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 180
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 239
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 349
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 591
            }
        ]
    },
    {
        "id": 124,
        "cat": "feminine",
        "name": "Narcisse Chloe",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh green floral with narcissus, rose, and soft earthy woods.",
        "notes": [
            "Narcissus",
            "Rose",
            "Woods",
            "Floral",
            "Green"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 177
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 232
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 335
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 556
            }
        ]
    },
    {
        "id": 125,
        "cat": "feminine",
        "name": "Nicki Minaj Pink Friday",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Playful fruity floral with mandarin, jasmine, and warm sandalwood.",
        "notes": [
            "Mandarin",
            "Jasmine",
            "Sandalwood",
            "Floral",
            "Fruity"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 176
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 230
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 330
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 545
            }
        ]
    },
    {
        "id": 126,
        "cat": "feminine",
        "name": "Nicki Minaj Trini Girl",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Tropical floral with passion fruit, frangipani, and coconut musk.",
        "notes": [
            "Passion Fruit",
            "Frangipani",
            "Coconut",
            "Musk",
            "Tropical"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 171
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 221
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 311
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 497
            }
        ]
    },
    {
        "id": 127,
        "cat": "feminine",
        "name": "Paco Rabanne Black Xs Her",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Dark gothic floral with rose, anise, and warm patchouli base.",
        "notes": [
            "Rose",
            "Anise",
            "Patchouli",
            "Floral",
            "Dark"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 185
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 247
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 367
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 636
            }
        ]
    },
    {
        "id": 128,
        "cat": "feminine",
        "name": "Paco Rabanne Lady Million",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Glamorous floral with neroli, raspberry, gardenia, and warm amber.",
        "notes": [
            "Neroli",
            "Raspberry",
            "Gardenia",
            "Amber",
            "Floral"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 181
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 240
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 352
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 598
            }
        ]
    },
    {
        "id": 129,
        "cat": "feminine",
        "name": "Paco Rabanne Lady Million",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Glamorous floral with neroli, raspberry, gardenia, and warm amber.",
        "notes": [
            "Neroli",
            "Raspberry",
            "Gardenia",
            "Amber",
            "Floral"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 174
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 227
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 323
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 527
            }
        ]
    },
    {
        "id": 130,
        "cat": "feminine",
        "name": "Paco Rabanne Olympea",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Aquatic floral with jasmine, salted vanilla, and warm cashmere wood.",
        "notes": [
            "Jasmine",
            "Vanilla",
            "Cashmere",
            "Aquatic",
            "Floral"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 177
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 232
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 335
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 556
            }
        ]
    },
    {
        "id": 131,
        "cat": "feminine",
        "name": "Paco Rabanne Olympea Intense",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Bold and sensual with vanilla, jasmine, and warm amber woods.",
        "notes": [
            "Vanilla",
            "Jasmine",
            "Amber",
            "Woods",
            "Sensual"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 177
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 233
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 336
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 559
            }
        ]
    },
    {
        "id": 132,
        "cat": "feminine",
        "name": "Penhaligons Halfeti",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Rich and opulent oriental rose fragrance with oud, spices, and dark woods.",
        "notes": [
            "Rose",
            "Oud",
            "Spice",
            "Leather",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 189
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 255
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 385
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 680
            }
        ]
    },
    {
        "id": 133,
        "cat": "feminine",
        "name": "Pink Chiffon",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Light and airy with soft florals, sheer peach, and clean musk.",
        "notes": [
            "Floral",
            "Peach",
            "Musk",
            "Airy",
            "Light"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 174
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 227
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 323
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 527
            }
        ]
    },
    {
        "id": 134,
        "cat": "feminine",
        "name": "Rhiana Crush",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fruity floral with berries, peach, and warm soft musky base.",
        "notes": [
            "Berries",
            "Peach",
            "Musk",
            "Floral",
            "Fruity"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 187
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 250
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 375
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 655
            }
        ]
    },
    {
        "id": 135,
        "cat": "feminine",
        "name": "Roberto Cavali Just Cavalli For Her",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Wild and exotic floral with fruits, jasmine, and warm woods.",
        "notes": [
            "Fruits",
            "Jasmine",
            "Woods",
            "Floral",
            "Exotic"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 180
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 238
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 348
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 588
            }
        ]
    },
    {
        "id": 136,
        "cat": "feminine",
        "name": "Sol De Janeiro Cheirosa 40",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Tropical gourmand with coconut, praline, and warm vanilla musk.",
        "notes": [
            "Coconut",
            "Praline",
            "Vanilla",
            "Musk",
            "Gourmand"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 177
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 233
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 337
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 561
            }
        ]
    },
    {
        "id": 137,
        "cat": "feminine",
        "name": "Sol De Janeiro Cheirosa 48 -",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Bright floral with jasmine, pink pepper, and creamy sandalwood.",
        "notes": [
            "Jasmine",
            "Pink Pepper",
            "Sandalwood",
            "Floral",
            "Creamy"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 199
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 273
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 425
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 779
            }
        ]
    },
    {
        "id": 138,
        "cat": "feminine",
        "name": "Sol De Janeiro Cheirosa 50 -",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh floral with vanilla orchid, coconut, and warm amber musk.",
        "notes": [
            "Vanilla",
            "Orchid",
            "Coconut",
            "Amber",
            "Floral"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 181
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 240
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 351
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 597
            }
        ]
    },
    {
        "id": 139,
        "cat": "feminine",
        "name": "Sol De Janeiro Cheirosa 62 -",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Iconic Brazilian blend of pistachio, salted caramel, and vanilla.",
        "notes": [
            "Pistachio",
            "Caramel",
            "Vanilla",
            "Gourmand",
            "Sweet"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 174
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 226
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 322
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 524
            }
        ]
    },
    {
        "id": 140,
        "cat": "feminine",
        "name": "Sol De Janeiro Cheirosa 68",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Sweet floral with caramel, jasmine, and warm toasted coconut.",
        "notes": [
            "Caramel",
            "Jasmine",
            "Coconut",
            "Floral",
            "Sweet"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 171
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 222
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 312
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 499
            }
        ]
    },
    {
        "id": 141,
        "cat": "feminine",
        "name": "Sol De Janeiro Cheirosa 71 -",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fruity floral with passion fruit, pink pepper, and warm woods.",
        "notes": [
            "Passion Fruit",
            "Pink Pepper",
            "Woods",
            "Floral",
            "Fruity"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 174
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 226
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 322
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 524
            }
        ]
    },
    {
        "id": 142,
        "cat": "feminine",
        "name": "Sol De Janeiro Cheirosa 78 -",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh aquatic blend with sea notes, soft florals, and light musk.",
        "notes": [
            "Sea",
            "Floral",
            "Musk",
            "Aquatic",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 183
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 244
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 361
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 620
            }
        ]
    },
    {
        "id": 143,
        "cat": "feminine",
        "name": "Tabu Dana",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Classic oriental with rose, jasmine, amber, and warm spicy base.",
        "notes": [
            "Rose",
            "Jasmine",
            "Amber",
            "Spice",
            "Oriental"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 199
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 274
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 427
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 783
            }
        ]
    },
    {
        "id": 144,
        "cat": "feminine",
        "name": "Thierry Mugler Alien",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Mysterious floral with white sambac jasmine and warm amber woods.",
        "notes": [
            "Jasmine",
            "Amber",
            "Woods",
            "Floral",
            "Mysterious"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 182
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 242
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 356
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 607
            }
        ]
    },
    {
        "id": 145,
        "cat": "feminine",
        "name": "Thierry Mugler Alien Goddess Type",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Luminous floral with jasmine, vanilla, and warm sandalwood glow.",
        "notes": [
            "Jasmine",
            "Vanilla",
            "Sandalwood",
            "Floral",
            "Luminous"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 196
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 268
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 414
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 751
            }
        ]
    },
    {
        "id": 146,
        "cat": "feminine",
        "name": "Thierry Mugler Angel Type - Angelina",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Iconic gourmand with praline, chocolate, patchouli, and vanilla.",
        "notes": [
            "Praline",
            "Chocolate",
            "Patchouli",
            "Vanilla",
            "Gourmand"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 177
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 233
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 336
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 559
            }
        ]
    },
    {
        "id": 147,
        "cat": "feminine",
        "name": "Tom Ford Black Orchid Type",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Dark, sensual and mysterious with black orchid, spices, and rich dark chocolate notes.",
        "notes": [
            "Black Orchid",
            "Spice",
            "Chocolate",
            "Vanilla",
            "Patchouli"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 177
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 233
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 336
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 559
            }
        ]
    },
    {
        "id": 148,
        "cat": "feminine",
        "name": "Tommi Hilfiger Tommy Girl",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh feminine floral with apple, violet, rose, and light musk.",
        "notes": [
            "Apple",
            "Violet",
            "Rose",
            "Musk",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 176
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 230
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 330
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 545
            }
        ]
    },
    {
        "id": 149,
        "cat": "feminine",
        "name": "Versace Bright Crystal",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Light and fresh with pomegranate, peony, lotus, and soft musk.",
        "notes": [
            "Pomegranate",
            "Peony",
            "Lotus",
            "Musk",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 166
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 213
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 292
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 449
            }
        ]
    },
    {
        "id": 150,
        "cat": "feminine",
        "name": "Versace Versace Eros Pour Femme",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Vibrant floral with lemon, pomegranate, peony, and warm musk.",
        "notes": [
            "Lemon",
            "Pomegranate",
            "Peony",
            "Musk",
            "Floral"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 181
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 240
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 352
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 598
            }
        ]
    },
    {
        "id": 151,
        "cat": "feminine",
        "name": "Victoria'S Secret Bombshell Intense",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Bold fruity floral with exotic fruits, jasmine, and warm woods.",
        "notes": [
            "Exotic Fruits",
            "Jasmine",
            "Woods",
            "Floral",
            "Bold"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 175
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 228
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 325
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 533
            }
        ]
    },
    {
        "id": 152,
        "cat": "feminine",
        "name": "Victoria'S Secret Bombshell Passion",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Passionate fruity floral with berries, jasmine, and warm vanilla.",
        "notes": [
            "Berries",
            "Jasmine",
            "Vanilla",
            "Floral",
            "Fruity"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 176
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 230
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 330
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 543
            }
        ]
    },
    {
        "id": 153,
        "cat": "feminine",
        "name": "Victoria'S Secret Bombshell Seduction",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Sensual dark floral with blackcurrant, rose, and warm musk.",
        "notes": [
            "Blackcurrant",
            "Rose",
            "Musk",
            "Floral",
            "Dark"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 181
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 239
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 350
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 593
            }
        ]
    },
    {
        "id": 154,
        "cat": "feminine",
        "name": "Victoria'S Secret Love Spell Golden",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Sweet romantic mist with cherry blossom, peach, and soft musk.",
        "notes": [
            "Cherry Blossom",
            "Peach",
            "Musk",
            "Floral",
            "Sweet"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 175
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 228
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 326
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 534
            }
        ]
    },
    {
        "id": 155,
        "cat": "feminine",
        "name": "Victoria'S Secret Merlot And Pear",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Juicy and sweet with ripe pear, merlot wine, and soft floral undertones.",
        "notes": [
            "Pear",
            "Merlot",
            "Floral",
            "Musk",
            "Sweet"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 171
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 222
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 311
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 498
            }
        ]
    },
    {
        "id": 156,
        "cat": "feminine",
        "name": "Victoria'S Secret Ruby Rose",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Romantic floral with rose, raspberry, and warm velvety woods.",
        "notes": [
            "Rose",
            "Raspberry",
            "Woods",
            "Floral",
            "Romantic"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 169
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 218
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 302
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 476
            }
        ]
    },
    {
        "id": 157,
        "cat": "feminine",
        "name": "Victoria'S Secret Warm Horizon",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "A cozy and inviting gourmand fragrance with warm caramel, toasted coconut, and soft vanilla for a comforting, sun-kissed feel.",
        "notes": [
            "Caramel",
            "Coconut",
            "Vanilla",
            "Tonka Bean",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 165
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 210
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 285
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 433
            }
        ]
    },
    {
        "id": 158,
        "cat": "feminine",
        "name": "Victoria'S Tease Candy Noir",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Dark gourmand with blackcurrant, jasmine, and sweet amber musk.",
        "notes": [
            "Blackcurrant",
            "Jasmine",
            "Amber",
            "Musk",
            "Dark"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 175
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 229
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 328
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 540
            }
        ]
    },
    {
        "id": 159,
        "cat": "feminine",
        "name": "Viktor And Rolf Flower Bomb",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Explosive floral bouquet with jasmine, rose, orchid, and patchouli.",
        "notes": [
            "Jasmine",
            "Rose",
            "Orchid",
            "Patchouli",
            "Floral"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 168
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 216
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 298
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 465
            }
        ]
    },
    {
        "id": 160,
        "cat": "feminine",
        "name": "Viktor And Rolf Flower Bomb Bloom",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh light floral with peony, rose, and soft warm musk.",
        "notes": [
            "Peony",
            "Rose",
            "Musk",
            "Floral",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 179
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 235
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 342
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 574
            }
        ]
    },
    {
        "id": 161,
        "cat": "feminine",
        "name": "Yara Pink (Ibc)",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Sweet and playful pink fragrance with tropical fruits and creamy vanilla.",
        "notes": [
            "Tropical Fruit",
            "Vanilla",
            "Sugar",
            "Musk",
            "Floral"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 172
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 224
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 316
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 508
            }
        ]
    },
    {
        "id": 162,
        "cat": "feminine",
        "name": "Yardley White Satin",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Soft powdery floral with jasmine, rose, and creamy musk.",
        "notes": [
            "Jasmine",
            "Rose",
            "Musk",
            "Floral",
            "Powdery"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 167
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 214
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 294
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 455
            }
        ]
    },
    {
        "id": 163,
        "cat": "feminine",
        "name": "Ysl Black Opium",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Addictive dark floral with coffee, vanilla, and white flowers.",
        "notes": [
            "Coffee",
            "Vanilla",
            "White Flowers",
            "Dark",
            "Gourmand"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 199
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 274
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 427
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 785
            }
        ]
    },
    {
        "id": 164,
        "cat": "feminine",
        "name": "Ysl Black Opium",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Addictive dark floral with coffee, vanilla, and white flowers.",
        "notes": [
            "Coffee",
            "Vanilla",
            "White Flowers",
            "Dark",
            "Gourmand"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 178
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 234
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 338
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 563
            }
        ]
    },
    {
        "id": 165,
        "cat": "feminine",
        "name": "Ysl Libre",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Bold and empowering floral with lavender, orange blossom, and warm vanilla.",
        "notes": [
            "Lavender",
            "Orange Blossom",
            "Vanilla",
            "Musk",
            "Floral"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 199
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 273
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 425
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 779
            }
        ]
    },
    {
        "id": 166,
        "cat": "feminine",
        "name": "Ysl M",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Elegant and refined woody-floral with fresh citrus, rose, and warm woods.",
        "notes": [
            "Citrus",
            "Rose",
            "Woods",
            "Floral",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 173
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 225
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 319
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 517
            }
        ]
    },
    {
        "id": 167,
        "cat": "feminine",
        "name": "Zadig And Voltaire This Is Love Her Type",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Romantic floral with rose, peony, and warm sandalwood musk.",
        "notes": [
            "Rose",
            "Peony",
            "Sandalwood",
            "Musk",
            "Floral"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Fem.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 192
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 261
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 398
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 712
            }
        ]
    },
    {
        "id": 168,
        "cat": "masculine",
        "name": "Abercrombie & Fitch Authentic Night",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Deep and masculine with lavender, sage, and warm woody notes for evening wear.",
        "notes": [
            "Lavender",
            "Sage",
            "Woods",
            "Musk",
            "Amber"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 189
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 255
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 384
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 678
            }
        ]
    },
    {
        "id": 169,
        "cat": "masculine",
        "name": "Adidas Originals For Him",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh sporty scent with citrus, lavender, and clean woody base.",
        "notes": [
            "Citrus",
            "Lavender",
            "Woods",
            "Fresh",
            "Sporty"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 169
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 218
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 302
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 476
            }
        ]
    },
    {
        "id": 170,
        "cat": "masculine",
        "name": "Antonio Banderas Blue Seduction",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh aromatic scent with citrus, violet leaf, and light woods.",
        "notes": [
            "Citrus",
            "Violet Leaf",
            "Woods",
            "Fresh",
            "Aromatic"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 164
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 208
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 281
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 423
            }
        ]
    },
    {
        "id": 171,
        "cat": "masculine",
        "name": "Antonio Banderas For Men",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Warm masculine blend with woody spices, amber, and clean musk.",
        "notes": [
            "Spice",
            "Amber",
            "Musk",
            "Woods",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 178
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 234
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 338
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 563
            }
        ]
    },
    {
        "id": 172,
        "cat": "masculine",
        "name": "Aramis 900",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Classic aromatic chypre with herbs, oakmoss, and warm sandalwood.",
        "notes": [
            "Herbs",
            "Oakmoss",
            "Sandalwood",
            "Chypre",
            "Aromatic"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 194
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 263
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 404
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 726
            }
        ]
    },
    {
        "id": 173,
        "cat": "masculine",
        "name": "Aramis Aramis Classic",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Bold masculine blend of leather, oakmoss, herbs, and warm spices.",
        "notes": [
            "Leather",
            "Oakmoss",
            "Herbs",
            "Spice",
            "Masculine"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 191
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 258
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 391
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 696
            }
        ]
    },
    {
        "id": 174,
        "cat": "masculine",
        "name": "Aramis Havanva",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Oriental fragrance with rich tobacco, spicy notes, and warm woody undertones, evoking the spirit of classic Havana cigars.",
        "notes": [
            "Tobacco",
            "Spice",
            "Vanilla",
            "Woods",
            "Amber"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 171
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 222
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 312
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 499
            }
        ]
    },
    {
        "id": 175,
        "cat": "masculine",
        "name": "Aramis New West",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh aquatic aromatic with sea breeze, herbs, and warm cedar.",
        "notes": [
            "Sea Breeze",
            "Herbs",
            "Cedar",
            "Aquatic",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 183
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 243
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 358
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 614
            }
        ]
    },
    {
        "id": 176,
        "cat": "masculine",
        "name": "Armaf Club De Nuit Intense Man",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Bold woody oud with dark spices and a smoky masculine trail.",
        "notes": [
            "Oud",
            "Spice",
            "Smoky",
            "Woods",
            "Masculine"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 226
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 324
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 536
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 1055
            }
        ]
    },
    {
        "id": 177,
        "cat": "masculine",
        "name": "Armani Acqua Di Gio For Men",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Intense aquatic woody with incense, marine notes, and dark woods.",
        "notes": [
            "Incense",
            "Marine",
            "Woods",
            "Aquatic",
            "Intense"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 184
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 245
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 363
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 627
            }
        ]
    },
    {
        "id": 178,
        "cat": "masculine",
        "name": "Armani Acqua Di Gio Profumo",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Intense aquatic-woody with marine notes, incense, and dark woods.",
        "notes": [
            "Marine",
            "Incense",
            "Woods",
            "Citrus",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 175
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 229
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 327
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 536
            }
        ]
    },
    {
        "id": 179,
        "cat": "masculine",
        "name": "Armani Black Code",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Dark seductive blend with bergamot, tobacco, and warm guaiac wood.",
        "notes": [
            "Bergamot",
            "Tobacco",
            "Guaiac Wood",
            "Dark",
            "Seductive"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 182
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 242
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 356
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 607
            }
        ]
    },
    {
        "id": 180,
        "cat": "masculine",
        "name": "Armani With You Intense",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Warm spiced floral with jasmine, cinnamon, and rich amber woods.",
        "notes": [
            "Jasmine",
            "Cinnamon",
            "Amber",
            "Woods",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 184
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 245
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 363
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 625
            }
        ]
    },
    {
        "id": 181,
        "cat": "masculine",
        "name": "Asad Lattafa",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Rich oriental woody with oud, spices, and warm amber resin.",
        "notes": [
            "Oud",
            "Spice",
            "Amber",
            "Resin",
            "Oriental"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 208
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 291
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 463
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 873
            }
        ]
    },
    {
        "id": 182,
        "cat": "masculine",
        "name": "Avroy Shlain Endangered For Him",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Strong masculine woody with green notes, spices, and warm musk.",
        "notes": [
            "Green",
            "Spice",
            "Musk",
            "Woods",
            "Masculine"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 182
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 242
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 356
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 607
            }
        ]
    },
    {
        "id": 183,
        "cat": "masculine",
        "name": "Azzaro Chrome Original",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Fresh aromatic aquatic with citrus, herbs, and clean wood base.",
        "notes": [
            "Citrus",
            "Herbs",
            "Woods",
            "Aquatic",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 181
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 239
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 350
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 593
            }
        ]
    },
    {
        "id": 184,
        "cat": "masculine",
        "name": "Azzaro The Most Wanted",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Spicy woody aromatic with cardamom, cashmeran, and warm amber.",
        "notes": [
            "Cardamom",
            "Cashmeran",
            "Amber",
            "Spicy",
            "Woody"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 184
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 245
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 363
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 627
            }
        ]
    },
    {
        "id": 185,
        "cat": "masculine",
        "name": "Azzaro Wanted",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh spicy woody with ginger, grapefruit, and vetiver base.",
        "notes": [
            "Ginger",
            "Grapefruit",
            "Vetiver",
            "Spicy",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 176
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 230
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 330
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 545
            }
        ]
    },
    {
        "id": 186,
        "cat": "masculine",
        "name": "B&B Works Bourbon Cologne",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Warm and rich with bourbon, oak, and warm vanilla musk.",
        "notes": [
            "Bourbon",
            "Oak",
            "Vanilla",
            "Musk",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 184
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 245
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 363
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 625
            }
        ]
    },
    {
        "id": 187,
        "cat": "masculine",
        "name": "B&B Works Clean Slate Cologne",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Fresh minimal scent with clean musk, soft citrus, and airy woods.",
        "notes": [
            "Musk",
            "Citrus",
            "Woods",
            "Fresh",
            "Clean"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 183
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 243
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 359
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 616
            }
        ]
    },
    {
        "id": 188,
        "cat": "masculine",
        "name": "B&B Works Dark Amber And Oud",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Rich and smoky oriental with dark amber, oud, and warm spices.",
        "notes": [
            "Amber",
            "Oud",
            "Spice",
            "Smoke",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 173
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 225
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 318
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 515
            }
        ]
    },
    {
        "id": 189,
        "cat": "masculine",
        "name": "B&B Works Teakwood Cologne",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Bold masculine blend with mahogany teakwood, lavender, and oak.",
        "notes": [
            "Teakwood",
            "Lavender",
            "Oak",
            "Mahogany",
            "Masculine"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 181
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 241
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 353
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 602
            }
        ]
    },
    {
        "id": 190,
        "cat": "masculine",
        "name": "B&B Works Whiskey Reserve Cologne",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Bold and smooth with whiskey, smoked oak, and warm spices.",
        "notes": [
            "Whiskey",
            "Smoked Oak",
            "Spice",
            "Bold",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 181
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 239
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 350
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 593
            }
        ]
    },
    {
        "id": 191,
        "cat": "masculine",
        "name": "Baccarat Rouge",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Luxurious and addictive with saffron, jasmine, amberwood, and sweet resin.",
        "notes": [
            "Saffron",
            "Jasmine",
            "Amberwood",
            "Fir Resin",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 274
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 415
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 737
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 1552
            }
        ]
    },
    {
        "id": 192,
        "cat": "masculine",
        "name": "Bvlgari Bvlgari Man",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Elegant fresh aromatic with white tea, tobacco, and warm woods.",
        "notes": [
            "White Tea",
            "Tobacco",
            "Woods",
            "Fresh",
            "Aromatic"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 182
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 242
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 356
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 607
            }
        ]
    },
    {
        "id": 193,
        "cat": "masculine",
        "name": "Bvlgari Man In Black 2010",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Intense oriental with rum, tuberose, spices, and dark amber.",
        "notes": [
            "Rum",
            "Tuberose",
            "Spice",
            "Amber",
            "Oriental"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 177
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 232
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 334
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 554
            }
        ]
    },
    {
        "id": 194,
        "cat": "masculine",
        "name": "Carolina Herrera 212 VIP Man",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Vibrant warm woody with saffron, vetiver, and dark tonka bean.",
        "notes": [
            "Saffron",
            "Vetiver",
            "Tonka Bean",
            "Woody",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 180
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 237
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 346
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 582
            }
        ]
    },
    {
        "id": 195,
        "cat": "masculine",
        "name": "Carolina Herrera 212 VIP Man",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Vibrant warm woody with saffron, vetiver, and dark tonka bean.",
        "notes": [
            "Saffron",
            "Vetiver",
            "Tonka Bean",
            "Woody",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 189
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 255
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 384
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 678
            }
        ]
    },
    {
        "id": 196,
        "cat": "masculine",
        "name": "Chanel Allure Homme Sport",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh sporty aromatic with citrus, pepper, and warm cedar base.",
        "notes": [
            "Citrus",
            "Pepper",
            "Cedar",
            "Fresh",
            "Sporty"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 181
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 240
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 351
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 597
            }
        ]
    },
    {
        "id": 197,
        "cat": "masculine",
        "name": "Chanel Bleu De Chanel",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Sophisticated woody aromatic with citrus, labdanum, and sandalwood.",
        "notes": [
            "Citrus",
            "Labdanum",
            "Sandalwood",
            "Woody",
            "Aromatic"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 186
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 250
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 374
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 652
            }
        ]
    },
    {
        "id": 198,
        "cat": "masculine",
        "name": "Chloe Atelier Des Fleurs Cedrus",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Sophisticated cedarwood and floral blend with elegant woody structure.",
        "notes": [
            "Cedarwood",
            "Rose",
            "Floral",
            "Woody",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 205
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 285
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 452
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 845
            }
        ]
    },
    {
        "id": 199,
        "cat": "masculine",
        "name": "Christian Dior Fahrenheit",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Iconic warm woody with violet, leather, and warm honey amber.",
        "notes": [
            "Violet",
            "Leather",
            "Amber",
            "Honey",
            "Woody"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 174
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 228
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 325
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 531
            }
        ]
    },
    {
        "id": 200,
        "cat": "masculine",
        "name": "Christian Dior Homme Intense",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Dark rich floral with iris, orris root, and warm cedar.",
        "notes": [
            "Iris",
            "Orris Root",
            "Cedar",
            "Floral",
            "Dark"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 208
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 290
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 462
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 870
            }
        ]
    },
    {
        "id": 201,
        "cat": "masculine",
        "name": "Christian Dior Sauvage",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Intense spicy woody with cinnamon, sandalwood, and dark amber.",
        "notes": [
            "Cinnamon",
            "Sandalwood",
            "Amber",
            "Spicy",
            "Intense"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 175
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 229
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 327
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 536
            }
        ]
    },
    {
        "id": 202,
        "cat": "masculine",
        "name": "Christian Dior Sauvage Elixir",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Fresh and raw with bergamot, Sichuan pepper, and clean ambroxan.",
        "notes": [
            "Bergamot",
            "Pepper",
            "Ambroxan",
            "Fresh",
            "Raw"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 203
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 280
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 441
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 818
            }
        ]
    },
    {
        "id": 203,
        "cat": "masculine",
        "name": "Creed Aventus Men",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Prestigious fruity chypre with pineapple, birch, oakmoss, and musk.",
        "notes": [
            "Pineapple",
            "Birch",
            "Oakmoss",
            "Musk",
            "Chypre"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 185
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 247
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 367
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 636
            }
        ]
    },
    {
        "id": 204,
        "cat": "masculine",
        "name": "D&G The One Gold For Men",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Warm spiced oriental with tobacco, amber, ginger, and dark woods.",
        "notes": [
            "Tobacco",
            "Amber",
            "Ginger",
            "Woods",
            "Oriental"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 185
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 247
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 367
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 636
            }
        ]
    },
    {
        "id": 205,
        "cat": "masculine",
        "name": "David Beckham Instinct",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh aromatic with citrus, tonka, and warm masculine musk.",
        "notes": [
            "Citrus",
            "Tonka Bean",
            "Musk",
            "Fresh",
            "Aromatic"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 178
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 234
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 338
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 563
            }
        ]
    },
    {
        "id": 206,
        "cat": "masculine",
        "name": "Davidof Cool Water For Men",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Classic fresh aquatic with lavender, mint, and warm cedarwood.",
        "notes": [
            "Lavender",
            "Mint",
            "Cedar",
            "Aquatic",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 172
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 222
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 313
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 501
            }
        ]
    },
    {
        "id": 207,
        "cat": "masculine",
        "name": "Diesel Bad",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Bold oriental with tobacco, lavender, and warm resinous amber.",
        "notes": [
            "Tobacco",
            "Lavender",
            "Amber",
            "Resin",
            "Oriental"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 190
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 257
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 389
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 691
            }
        ]
    },
    {
        "id": 208,
        "cat": "masculine",
        "name": "Diesel Bad",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Bold oriental with tobacco, lavender, and warm resinous amber.",
        "notes": [
            "Tobacco",
            "Lavender",
            "Amber",
            "Resin",
            "Oriental"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 177
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 233
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 337
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 561
            }
        ]
    },
    {
        "id": 209,
        "cat": "masculine",
        "name": "Diesel Fuel For Life",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh fruity woody with grapefruit, raspberry, and warm sandalwood.",
        "notes": [
            "Grapefruit",
            "Raspberry",
            "Sandalwood",
            "Woody",
            "Fruity"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 180
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 239
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 349
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 591
            }
        ]
    },
    {
        "id": 210,
        "cat": "masculine",
        "name": "Diesel Only The Brave",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Bright and bold with lemon, violet, and warm amber leather.",
        "notes": [
            "Lemon",
            "Violet",
            "Amber",
            "Leather",
            "Bold"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 174
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 227
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 324
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 529
            }
        ]
    },
    {
        "id": 211,
        "cat": "masculine",
        "name": "Diesel Plus Plus",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh citrus woody with bergamot, herbs, and warm masculine base.",
        "notes": [
            "Bergamot",
            "Herbs",
            "Woods",
            "Citrus",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 186
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 249
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 371
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 647
            }
        ]
    },
    {
        "id": 212,
        "cat": "masculine",
        "name": "Diesel Spirit of The Brave",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Bold and energetic with fresh citrus, spicy notes, and warm woody base.",
        "notes": [
            "Citrus",
            "Spice",
            "Woods",
            "Lavender",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 174
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 226
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 322
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 523
            }
        ]
    },
    {
        "id": 213,
        "cat": "masculine",
        "name": "Dolce & Gabbana Light Blue Men",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh Mediterranean aromatic with citrus, rosemary, and cedarwood.",
        "notes": [
            "Citrus",
            "Rosemary",
            "Cedar",
            "Fresh",
            "Mediterranean"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 177
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 232
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 335
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 556
            }
        ]
    },
    {
        "id": 214,
        "cat": "masculine",
        "name": "Dolce & Gabbana The One Men",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Warm spiced tobacco with ginger, orange blossom, and amber.",
        "notes": [
            "Tobacco",
            "Ginger",
            "Orange Blossom",
            "Amber",
            "Spiced"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 181
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 240
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 352
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 598
            }
        ]
    },
    {
        "id": 215,
        "cat": "masculine",
        "name": "Dolce And Gabbana K",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Fresh aromatic fougere with bergamot, carrot, and warm cedarwood.",
        "notes": [
            "Bergamot",
            "Carrot",
            "Cedar",
            "Fresh",
            "Fougere"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 170
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 220
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 308
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 488
            }
        ]
    },
    {
        "id": 216,
        "cat": "masculine",
        "name": "Dunhill Desire Black",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Dark woody oriental with black pepper, amber, and smoky woods.",
        "notes": [
            "Black Pepper",
            "Amber",
            "Smoky",
            "Woods",
            "Oriental"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 189
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 254
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 383
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 675
            }
        ]
    },
    {
        "id": 217,
        "cat": "masculine",
        "name": "Dunhill Desire Blue",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh aquatic woody with citrus, sage, and light cedarwood.",
        "notes": [
            "Citrus",
            "Sage",
            "Cedar",
            "Aquatic",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 175
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 228
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 325
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 533
            }
        ]
    },
    {
        "id": 218,
        "cat": "masculine",
        "name": "Dunhill Desire Red",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Warm spicy oriental with cinnamon, amber, and rich woody base.",
        "notes": [
            "Cinnamon",
            "Amber",
            "Woods",
            "Spicy",
            "Oriental"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 176
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 230
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 330
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 545
            }
        ]
    },
    {
        "id": 219,
        "cat": "masculine",
        "name": "Ferrari Ferrari Black",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh aromatic with citrus, lavender, and clean woody musk.",
        "notes": [
            "Citrus",
            "Lavender",
            "Musk",
            "Woods",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 181
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 240
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 352
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 598
            }
        ]
    },
    {
        "id": 220,
        "cat": "masculine",
        "name": "Fugazzi Vanilla Haze",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Dreamy warm vanilla with soft musk, light woods, and creamy sweetness.",
        "notes": [
            "Vanilla",
            "Musk",
            "Woods",
            "Creamy",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 191
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 259
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 394
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 701
            }
        ]
    },
    {
        "id": 221,
        "cat": "masculine",
        "name": "Givenchy Blue",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh aromatic aquatic with citrus, mint, and clean cedarwood.",
        "notes": [
            "Citrus",
            "Mint",
            "Cedar",
            "Aquatic",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 170
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 219
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 307
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 487
            }
        ]
    },
    {
        "id": 222,
        "cat": "masculine",
        "name": "Givenchy Gentlemen Only Absolute",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Warm woody aromatic with iris, tonka bean, and dark patchouli.",
        "notes": [
            "Iris",
            "Tonka Bean",
            "Patchouli",
            "Woody",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 182
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 242
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 356
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 607
            }
        ]
    },
    {
        "id": 223,
        "cat": "masculine",
        "name": "Gucci Guilty Black For Men",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Intense aromatic with lavender, orange blossom, and dark patchouli.",
        "notes": [
            "Lavender",
            "Orange Blossom",
            "Patchouli",
            "Aromatic",
            "Intense"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 180
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 239
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 349
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 591
            }
        ]
    },
    {
        "id": 224,
        "cat": "masculine",
        "name": "Guy Laroche Drakkar Noir",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Classic fougere with lavender, rosemary, cedar, and leather.",
        "notes": [
            "Lavender",
            "Rosemary",
            "Cedar",
            "Leather",
            "Fougere"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 181
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 239
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 350
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 593
            }
        ]
    },
    {
        "id": 225,
        "cat": "masculine",
        "name": "Hermes Terre Dhermes",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Earthy mineral woody with orange, flint, vetiver, and cedar.",
        "notes": [
            "Orange",
            "Flint",
            "Vetiver",
            "Cedar",
            "Earthy"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 186
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 249
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 371
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 646
            }
        ]
    },
    {
        "id": 226,
        "cat": "masculine",
        "name": "Hugo Boss Boss Bottled",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Classic warm apple and spice with sandalwood and warm woods.",
        "notes": [
            "Apple",
            "Spice",
            "Sandalwood",
            "Woods",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 182
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 242
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 356
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 607
            }
        ]
    },
    {
        "id": 227,
        "cat": "masculine",
        "name": "Hugo Boss Boss Bottled Intense",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Rich and warm with apple, cinnamon, vanilla, and dark wood.",
        "notes": [
            "Apple",
            "Cinnamon",
            "Vanilla",
            "Woods",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 180
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 239
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 349
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 591
            }
        ]
    },
    {
        "id": 228,
        "cat": "masculine",
        "name": "Hugo Boss Boss Bottled Oud",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Luxurious dark oud with spices, leather, and warm resinous woods.",
        "notes": [
            "Oud",
            "Spice",
            "Leather",
            "Resin",
            "Woods"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 180
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 239
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 349
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 591
            }
        ]
    },
    {
        "id": 229,
        "cat": "masculine",
        "name": "Hugo Boss Dark Blue",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh aquatic woody with citrus, seaweed, and warm sandalwood.",
        "notes": [
            "Citrus",
            "Seaweed",
            "Sandalwood",
            "Aquatic",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 175
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 229
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 327
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 536
            }
        ]
    },
    {
        "id": 230,
        "cat": "masculine",
        "name": "Hugo Boss Hugo",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh green aromatic with apple, mint, and clean cedarwood.",
        "notes": [
            "Apple",
            "Mint",
            "Cedar",
            "Fresh",
            "Green"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 173
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 224
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 318
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 513
            }
        ]
    },
    {
        "id": 231,
        "cat": "masculine",
        "name": "Hugo Boss Orange",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Warm fruity woody with citrus, peach, and light sandalwood.",
        "notes": [
            "Citrus",
            "Peach",
            "Sandalwood",
            "Fruity",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 193
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 263
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 402
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 723
            }
        ]
    },
    {
        "id": 232,
        "cat": "masculine",
        "name": "Hugo Intense Hugo Boss",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Bold aromatic with violet, woody spices, and warm amber musk.",
        "notes": [
            "Violet",
            "Spice",
            "Amber",
            "Musk",
            "Aromatic"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 181
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 240
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 351
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 597
            }
        ]
    },
    {
        "id": 233,
        "cat": "masculine",
        "name": "Issey Miyake Issey Miyake Sport",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh aquatic with citrus, marine notes, and clean woody base.",
        "notes": [
            "Citrus",
            "Marine",
            "Woods",
            "Aquatic",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 174
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 227
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 324
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 529
            }
        ]
    },
    {
        "id": 234,
        "cat": "masculine",
        "name": "Issey Miyake Leau Dissey Pour Homme",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Iconic fresh aquatic with yuzu, sage, and clean cedarwood.",
        "notes": [
            "Yuzu",
            "Sage",
            "Cedar",
            "Aquatic",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 178
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 234
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 338
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 563
            }
        ]
    },
    {
        "id": 235,
        "cat": "masculine",
        "name": "Jean Paul Gaultier Le Male",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Classic fougere with lavender, mint, vanilla, and warm amber.",
        "notes": [
            "Lavender",
            "Mint",
            "Vanilla",
            "Amber",
            "Fougere"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 174
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 226
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 321
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 522
            }
        ]
    },
    {
        "id": 236,
        "cat": "masculine",
        "name": "Jean Paul Gaultier Scandal For Men",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Bold spicy woody with blood orange, nutmeg, and warm vetiver.",
        "notes": [
            "Blood Orange",
            "Nutmeg",
            "Vetiver",
            "Spicy",
            "Woody"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 181
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 240
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 351
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 597
            }
        ]
    },
    {
        "id": 237,
        "cat": "masculine",
        "name": "Jean Paul Le Male Le Parfum",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Intense and rich with lavender, vanilla, iris, and warm woods.",
        "notes": [
            "Lavender",
            "Vanilla",
            "Iris",
            "Woods",
            "Intense"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 180
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 239
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 349
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 591
            }
        ]
    },
    {
        "id": 238,
        "cat": "masculine",
        "name": "Jo Malone Oud And Bergamot",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Sophisticated blend of rich oud and bright bergamot with woody undertones.",
        "notes": [
            "Oud",
            "Bergamot",
            "Woods",
            "Citrus",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 202
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 278
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 437
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 808
            }
        ]
    },
    {
        "id": 239,
        "cat": "masculine",
        "name": "Joop Joop Homme",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Bold oriental floral with jasmine, cinnamon, vanilla, and musk.",
        "notes": [
            "Jasmine",
            "Cinnamon",
            "Vanilla",
            "Musk",
            "Oriental"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 198
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 272
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 422
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 771
            }
        ]
    },
    {
        "id": 240,
        "cat": "masculine",
        "name": "Juliette Has A Gun Ode To Dullness",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Soft, powdery and comforting scent with iris, vanilla, and creamy woods.",
        "notes": [
            "Iris",
            "Vanilla",
            "Powdery",
            "Woods",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 183
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 244
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 361
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 622
            }
        ]
    },
    {
        "id": 241,
        "cat": "masculine",
        "name": "Lacoste Blue",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh aquatic aromatic with citrus, rosewood, and cedarwood.",
        "notes": [
            "Citrus",
            "Rosewood",
            "Cedar",
            "Aquatic",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 180
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 239
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 349
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 591
            }
        ]
    },
    {
        "id": 242,
        "cat": "masculine",
        "name": "Lacoste Essential",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Clean green aromatic with tomato leaf, iris, and light woods.",
        "notes": [
            "Tomato Leaf",
            "Iris",
            "Woods",
            "Green",
            "Clean"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 174
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 227
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 324
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 529
            }
        ]
    },
    {
        "id": 243,
        "cat": "masculine",
        "name": "Legacy Cristiano Ronaldo",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh woody aromatic with citrus, lavender, and warm cedarwood.",
        "notes": [
            "Citrus",
            "Lavender",
            "Cedar",
            "Fresh",
            "Woody"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 166
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 212
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 290
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 446
            }
        ]
    },
    {
        "id": 244,
        "cat": "masculine",
        "name": "Loccitane Osmathus",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Delicate and refined floral fragrance centered around osmanthus.",
        "notes": [
            "Osmanthus",
            "Apricot",
            "Leather",
            "Floral",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 173
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 225
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 318
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 515
            }
        ]
    },
    {
        "id": 245,
        "cat": "masculine",
        "name": "Maison Francis Kurkdjian Paris Oud Satin Mood Exact",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Velvety oud with rose, vanilla, and soft woody incense.",
        "notes": [
            "Oud",
            "Rose",
            "Vanilla",
            "Incense",
            "Woody"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 202
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 279
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 439
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 813
            }
        ]
    },
    {
        "id": 246,
        "cat": "masculine",
        "name": "Maison Crivelli Hibiscus Mahajad",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Vibrant tropical floral with hibiscus, citrus, and light woods.",
        "notes": [
            "Hibiscus",
            "Citrus",
            "Woods",
            "Floral",
            "Tropical"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 196
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 268
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 413
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 749
            }
        ]
    },
    {
        "id": 247,
        "cat": "masculine",
        "name": "Maison Francis Kurkdjian 724",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Luminous and fresh with bergamot, white musk, and soft woods.",
        "notes": [
            "Bergamot",
            "White Musk",
            "Woods",
            "Fresh",
            "Luminous"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 199
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 273
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 425
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 779
            }
        ]
    },
    {
        "id": 248,
        "cat": "masculine",
        "name": "Maison Francis Kurkdijan Baccarat Rouge",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Iconic luxurious scent with saffron, jasmine, amberwood, and sweet woody notes.",
        "notes": [
            "Saffron",
            "Jasmine",
            "Amberwood",
            "Fir Resin",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 208
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 290
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 462
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 870
            }
        ]
    },
    {
        "id": 249,
        "cat": "masculine",
        "name": "Maison Francis Kurkdjian Apom Eau De Parfum",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Elegant warm floral with orange blossom, amber, and precious woods.",
        "notes": [
            "Orange Blossom",
            "Amber",
            "Woods",
            "Floral",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 193
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 262
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 401
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 719
            }
        ]
    },
    {
        "id": 250,
        "cat": "masculine",
        "name": "Michael Kors Michael For Men",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh and sophisticated with citrus, sage, and warm sandalwood.",
        "notes": [
            "Citrus",
            "Sage",
            "Sandalwood",
            "Musk",
            "Woody"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 178
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 234
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 339
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 566
            }
        ]
    },
    {
        "id": 251,
        "cat": "masculine",
        "name": "Molton Brown Coastal Cypress & Sea Fennel",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Fresh coastal fragrance with crisp cypress and sea fennel.",
        "notes": [
            "Cypress",
            "Sea Fennel",
            "Marine",
            "Woody",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 175
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 228
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 325
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 533
            }
        ]
    },
    {
        "id": 252,
        "cat": "masculine",
        "name": "Molton Brown Heavenly Ginger Lily",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Exotic floral with spicy ginger, lily, and warm tropical woods.",
        "notes": [
            "Ginger",
            "Lily",
            "Woods",
            "Floral",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 174
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 227
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 324
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 529
            }
        ]
    },
    {
        "id": 253,
        "cat": "masculine",
        "name": "Mont Blanc Explorer",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh woody aromatic with bergamot, vetiver, and warm leather.",
        "notes": [
            "Bergamot",
            "Vetiver",
            "Leather",
            "Fresh",
            "Woody"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 177
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 232
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 335
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 556
            }
        ]
    },
    {
        "id": 254,
        "cat": "masculine",
        "name": "Mont Blanc Legend",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Clean aromatic with lavender, oakmoss, and warm woody musk.",
        "notes": [
            "Lavender",
            "Oakmoss",
            "Musk",
            "Woods",
            "Aromatic"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 180
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 237
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 346
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 582
            }
        ]
    },
    {
        "id": 255,
        "cat": "masculine",
        "name": "Montale Arabians White Oud",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Creamy white oud with rose, sandalwood, and soft amber musk.",
        "notes": [
            "Oud",
            "Rose",
            "Sandalwood",
            "Amber",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 193
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 263
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 402
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 723
            }
        ]
    },
    {
        "id": 256,
        "cat": "masculine",
        "name": "Montale White Oud",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Soft luminous oud with white florals, vanilla, and sandalwood.",
        "notes": [
            "Oud",
            "White Florals",
            "Vanilla",
            "Sandalwood",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 189
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 254
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 384
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 676
            }
        ]
    },
    {
        "id": 257,
        "cat": "masculine",
        "name": "Paco Rabanne 1 Million",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Bold spicy oriental with blood mandarin, cinnamon, and leather.",
        "notes": [
            "Blood Mandarin",
            "Cinnamon",
            "Leather",
            "Spicy",
            "Oriental"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 211
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 296
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 476
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 905
            }
        ]
    },
    {
        "id": 258,
        "cat": "masculine",
        "name": "Paco Rabanne 1 Million",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Bold spicy oriental with blood mandarin, cinnamon, and leather.",
        "notes": [
            "Blood Mandarin",
            "Cinnamon",
            "Leather",
            "Spicy",
            "Oriental"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 174
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 227
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 323
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 526
            }
        ]
    },
    {
        "id": 259,
        "cat": "masculine",
        "name": "Paco Rabanne Black Xs Men",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Dark gothic blend with heliotrope, cacao, and warm leather.",
        "notes": [
            "Heliotrope",
            "Cacao",
            "Leather",
            "Dark",
            "Gothic"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 191
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 259
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 394
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 701
            }
        ]
    },
    {
        "id": 260,
        "cat": "masculine",
        "name": "Paco Rabanne Black Xs Men",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Dark gothic blend with heliotrope, cacao, and warm leather.",
        "notes": [
            "Heliotrope",
            "Cacao",
            "Leather",
            "Dark",
            "Gothic"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 174
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 227
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 323
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 527
            }
        ]
    },
    {
        "id": 261,
        "cat": "masculine",
        "name": "Paco Rabanne Invictus",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Fresh marine woody with grapefruit, bay laurel, and guaiac wood.",
        "notes": [
            "Grapefruit",
            "Bay Laurel",
            "Guaiac Wood",
            "Marine",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 178
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 234
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 338
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 563
            }
        ]
    },
    {
        "id": 262,
        "cat": "masculine",
        "name": "Paco Rabanne Invictus Intense",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Warm spiced woody with cardamom, amber, and dark sandalwood.",
        "notes": [
            "Cardamom",
            "Amber",
            "Sandalwood",
            "Spiced",
            "Woody"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 183
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 243
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 359
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 616
            }
        ]
    },
    {
        "id": 263,
        "cat": "masculine",
        "name": "Paco Rabanne One Million Elixir",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Intense warm oriental with cinnamon, myrrh, and dark leather.",
        "notes": [
            "Cinnamon",
            "Myrrh",
            "Leather",
            "Oriental",
            "Intense"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 193
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 263
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 401
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 721
            }
        ]
    },
    {
        "id": 264,
        "cat": "masculine",
        "name": "Paco Rabanne Phantom",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Fresh citrus aromatic with lavender, lemon, and warm woody base.",
        "notes": [
            "Lavender",
            "Lemon",
            "Woods",
            "Citrus",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 185
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 247
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 367
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 636
            }
        ]
    },
    {
        "id": 265,
        "cat": "masculine",
        "name": "Penhaligons Halfeti",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Rich and opulent oriental rose fragrance with oud and dark woods.",
        "notes": [
            "Rose",
            "Oud",
            "Spice",
            "Leather",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 189
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 255
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 385
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 680
            }
        ]
    },
    {
        "id": 266,
        "cat": "masculine",
        "name": "Polo Ultra Blue",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh aquatic with citrus, water notes, and light cedarwood.",
        "notes": [
            "Citrus",
            "Water",
            "Cedar",
            "Aquatic",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 178
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 235
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 341
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 570
            }
        ]
    },
    {
        "id": 267,
        "cat": "masculine",
        "name": "Roberto Cavali Just Cavalli For Men",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh aromatic with citrus, spices, and warm woody musk.",
        "notes": [
            "Citrus",
            "Spice",
            "Musk",
            "Woods",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 182
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 242
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 356
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 607
            }
        ]
    },
    {
        "id": 268,
        "cat": "masculine",
        "name": "Ted Lapedus Lapidus Pour Homme",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Classic fougere with lavender, leather, and warm woody base.",
        "notes": [
            "Lavender",
            "Leather",
            "Woods",
            "Fougere",
            "Classic"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 180
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 239
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 349
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 591
            }
        ]
    },
    {
        "id": 269,
        "cat": "masculine",
        "name": "Thierry Muglier A Men",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Iconic gourmand with patchouli, coffee, caramel, and dark woods.",
        "notes": [
            "Patchouli",
            "Coffee",
            "Caramel",
            "Woods",
            "Gourmand"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 181
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 240
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 352
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 598
            }
        ]
    },
    {
        "id": 270,
        "cat": "masculine",
        "name": "Tom Ford Costa Azurre",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Fresh Mediterranean with citrus, sea spray, and light woody musk.",
        "notes": [
            "Citrus",
            "Marine",
            "Woods",
            "Musk",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 203
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 281
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 442
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 820
            }
        ]
    },
    {
        "id": 271,
        "cat": "masculine",
        "name": "Tom Ford Leather Ombre",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Rich and sensual leather fragrance with jasmine, patchouli, and warm amber.",
        "notes": [
            "Leather",
            "Jasmine",
            "Patchouli",
            "Amber",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 222
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 316
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 520
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 1014
            }
        ]
    },
    {
        "id": 272,
        "cat": "masculine",
        "name": "Tom Ford Noir",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Sophisticated oriental with violet, amber, and warm woody spices.",
        "notes": [
            "Violet",
            "Amber",
            "Spice",
            "Woods",
            "Oriental"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 184
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 246
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 364
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 629
            }
        ]
    },
    {
        "id": 273,
        "cat": "masculine",
        "name": "Tom Ford Oud Wood Type",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Warm smoky oud with cardamom, sandalwood, and dark amber.",
        "notes": [
            "Oud",
            "Cardamom",
            "Sandalwood",
            "Amber",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 200
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 276
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 430
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 792
            }
        ]
    },
    {
        "id": 274,
        "cat": "masculine",
        "name": "Tom Ford Tuscan Leather",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Rich leathery scent with raspberry, saffron, and warm dark leather.",
        "notes": [
            "Raspberry",
            "Saffron",
            "Leather",
            "Rich",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 199
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 274
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 427
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 785
            }
        ]
    },
    {
        "id": 275,
        "cat": "masculine",
        "name": "Tommy Hilfiger Tommy Boy",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh green aromatic with mint, lavender, and warm cedarwood.",
        "notes": [
            "Mint",
            "Lavender",
            "Cedar",
            "Fresh",
            "Green"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 178
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 234
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 338
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 563
            }
        ]
    },
    {
        "id": 276,
        "cat": "masculine",
        "name": "Tsar Gold",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Classic floral aromatic with lavender, carnation, and warm amber.",
        "notes": [
            "Lavender",
            "Carnation",
            "Amber",
            "Floral",
            "Aromatic"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 259
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 387
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 675
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 1397
            }
        ]
    },
    {
        "id": 277,
        "cat": "masculine",
        "name": "Van Cleef & Arpels Tsar",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Elegant aromatic with lavender, caraway, and warm sandalwood.",
        "notes": [
            "Lavender",
            "Caraway",
            "Sandalwood",
            "Aromatic",
            "Elegant"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 191
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 258
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 391
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 696
            }
        ]
    },
    {
        "id": 278,
        "cat": "masculine",
        "name": "Versace Dylan Blue Men",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh aquatic aromatic with fig leaves, violet, and saffron.",
        "notes": [
            "Fig Leaf",
            "Violet",
            "Saffron",
            "Aquatic",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 177
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 232
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 334
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 554
            }
        ]
    },
    {
        "id": 279,
        "cat": "masculine",
        "name": "Versace Eros Flame Homme",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Warm oriental with lemon, rosemary, pepper, and cedarwood.",
        "notes": [
            "Lemon",
            "Rosemary",
            "Pepper",
            "Cedar",
            "Oriental"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 183
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 243
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 358
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 614
            }
        ]
    },
    {
        "id": 280,
        "cat": "masculine",
        "name": "Versace Eros For Men",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Fresh aromatic with mint, green apple, tonka, and vanilla woods.",
        "notes": [
            "Mint",
            "Green Apple",
            "Tonka Bean",
            "Vanilla",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 183
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 243
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 359
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 616
            }
        ]
    },
    {
        "id": 281,
        "cat": "masculine",
        "name": "Versace Pour Homme Oud Noir Type",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Dark oud woody with spices, amber, and warm resinous base.",
        "notes": [
            "Oud",
            "Spice",
            "Amber",
            "Resin",
            "Dark"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 191
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 258
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 391
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 696
            }
        ]
    },
    {
        "id": 282,
        "cat": "masculine",
        "name": "Versace Pour Homme (Sc)",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Fresh Mediterranean blend with citrus, hyacinth, and cedarwood.",
        "notes": [
            "Citrus",
            "Hyacinth",
            "Cedar",
            "Fresh",
            "Mediterranean"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 176
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 231
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 333
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 552
            }
        ]
    },
    {
        "id": 283,
        "cat": "masculine",
        "name": "Versace Versace Pour Homme",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh Mediterranean blend with citrus, hyacinth, and cedarwood.",
        "notes": [
            "Citrus",
            "Hyacinth",
            "Cedarwood",
            "Fresh",
            "Woody"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 174
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 227
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 323
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 527
            }
        ]
    },
    {
        "id": 284,
        "cat": "masculine",
        "name": "Viktor And Rolf Spicebomb Infrared Type",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Intense spicy woody with chilli, pepper, vetiver, and warm musk.",
        "notes": [
            "Chilli",
            "Pepper",
            "Vetiver",
            "Musk",
            "Spicy"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 188
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 253
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 381
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 669
            }
        ]
    },
    {
        "id": 285,
        "cat": "masculine",
        "name": "Ysl Body Kouros Black",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Bold oriental with honey, incense, and warm woody spices.",
        "notes": [
            "Honey",
            "Incense",
            "Spice",
            "Woods",
            "Oriental"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 185
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 247
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 367
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 636
            }
        ]
    },
    {
        "id": 286,
        "cat": "masculine",
        "name": "Ysl Kouros Original",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Classic aromatic fougere with lavender, leather, and oakmoss.",
        "notes": [
            "Lavender",
            "Leather",
            "Oakmoss",
            "Fougere",
            "Classic"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 203
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 281
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 442
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 820
            }
        ]
    },
    {
        "id": 287,
        "cat": "masculine",
        "name": "Zadig And Voltaire This Is Love Him",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Fresh woody with citrus, apple, cedar, and warm vanilla musk.",
        "notes": [
            "Citrus",
            "Apple",
            "Cedar",
            "Vanilla",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Masc.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 219
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 310
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 507
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 982
            }
        ]
    },
    {
        "id": 288,
        "cat": "unisex",
        "name": "Andromeda Tiziana Terenzi",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Celestial floral-woody fragrance with bright citrus and creamy sandalwood.",
        "notes": [
            "Citrus",
            "Floral",
            "Sandalwood",
            "Woody",
            "Creamy"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 206
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 288
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 457
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 858
            }
        ]
    },
    {
        "id": 289,
        "cat": "unisex",
        "name": "Aqua Di Parma Colonia",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Classic Italian citrus cologne with fresh neroli and warm woody base.",
        "notes": [
            "Citrus",
            "Neroli",
            "Woods",
            "Fresh",
            "Classic"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 185
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 248
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 370
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 643
            }
        ]
    },
    {
        "id": 290,
        "cat": "unisex",
        "name": "Asad Lattafa",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Rich oriental woody with oud, spices, and warm amber resin.",
        "notes": [
            "Oud",
            "Spice",
            "Amber",
            "Resin",
            "Oriental"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 208
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 291
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 463
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 873
            }
        ]
    },
    {
        "id": 291,
        "cat": "unisex",
        "name": "Baccarat Rouge",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Iconic luminous blend of jasmine, saffron, amberwood, and fir resin.",
        "notes": [
            "Jasmine",
            "Saffron",
            "Amberwood",
            "Fir Resin",
            "Luminous"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 274
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 415
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 737
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 1552
            }
        ]
    },
    {
        "id": 292,
        "cat": "unisex",
        "name": "B&B Works Noir Cologne",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Dark and mysterious blend with smoky woods, amber, and black musk.",
        "notes": [
            "Smoky",
            "Woods",
            "Amber",
            "Musk",
            "Dark"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 173
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 225
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 320
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 518
            }
        ]
    },
    {
        "id": 293,
        "cat": "unisex",
        "name": "B&B Works Teakwood Cologne",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Bold masculine blend with mahogany teakwood, lavender, and oak.",
        "notes": [
            "Teakwood",
            "Lavender",
            "Oak",
            "Mahogany",
            "Bold"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 181
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 241
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 353
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 602
            }
        ]
    },
    {
        "id": 294,
        "cat": "unisex",
        "name": "B&B Works Whiskey Reserve Cologne",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Bold and smooth with whiskey, smoked oak, and warm spices.",
        "notes": [
            "Whiskey",
            "Smoked Oak",
            "Spice",
            "Bold",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 181
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 239
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 350
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 593
            }
        ]
    },
    {
        "id": 295,
        "cat": "unisex",
        "name": "Brown Orchid Rose Edition",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Rich floral with dark rose, oud, and warm amber resin.",
        "notes": [
            "Dark Rose",
            "Oud",
            "Amber",
            "Resin",
            "Floral"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 182
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 242
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 356
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 609
            }
        ]
    },
    {
        "id": 296,
        "cat": "unisex",
        "name": "Calvin Klein Ck One",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Fresh clean unisex scent with citrus, green tea, and light woods.",
        "notes": [
            "Citrus",
            "Green Tea",
            "Woods",
            "Fresh",
            "Clean"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 196
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 267
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 412
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 747
            }
        ]
    },
    {
        "id": 297,
        "cat": "unisex",
        "name": "Chloe Atelier Des Fleurs Cedrus",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Sophisticated woody-floral with cedarwood, rose, and soft powdery notes.",
        "notes": [
            "Cedarwood",
            "Rose",
            "Jasmine",
            "Powder",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 205
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 285
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 452
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 845
            }
        ]
    },
    {
        "id": 298,
        "cat": "unisex",
        "name": "Christian Dior Oud Ispahan",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Opulent rose oud with labdanum, patchouli, and warm sandalwood.",
        "notes": [
            "Rose",
            "Oud",
            "Labdanum",
            "Patchouli",
            "Sandalwood"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 188
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 253
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 381
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 669
            }
        ]
    },
    {
        "id": 299,
        "cat": "unisex",
        "name": "Diptyque Do Son",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Soft sheer floral with tuberose, rose, and light powdery musk.",
        "notes": [
            "Tuberose",
            "Rose",
            "Musk",
            "Floral",
            "Powdery"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 197
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 270
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 419
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 763
            }
        ]
    },
    {
        "id": 300,
        "cat": "unisex",
        "name": "Diptyque Eau Duelle",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Elegant blend of black tea, incense, and soft spices with a woody base.",
        "notes": [
            "Black Tea",
            "Incense",
            "Spice",
            "Woods",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 198
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 272
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 422
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 772
            }
        ]
    },
    {
        "id": 301,
        "cat": "unisex",
        "name": "Fugazzi Vanilla Haze",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Dreamy warm vanilla with soft musk, light woods, and creamy sweetness.",
        "notes": [
            "Vanilla",
            "Musk",
            "Woods",
            "Creamy",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 191
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 259
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 394
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 701
            }
        ]
    },
    {
        "id": 302,
        "cat": "unisex",
        "name": "Gucci Intense Oud",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Bold dark oud with incense, patchouli, and warm resinous spices.",
        "notes": [
            "Oud",
            "Incense",
            "Patchouli",
            "Resin",
            "Dark"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 180
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 238
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 348
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 589
            }
        ]
    },
    {
        "id": 303,
        "cat": "unisex",
        "name": "Gucci Oud",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Smooth oriental oud with rose, leather, and warm amber woods.",
        "notes": [
            "Oud",
            "Rose",
            "Leather",
            "Amber",
            "Woods"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 177
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 233
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 335
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 558
            }
        ]
    },
    {
        "id": 304,
        "cat": "unisex",
        "name": "Jasoor Lattafa",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Rich oriental blend with oud, spices, rose, and dark amber.",
        "notes": [
            "Oud",
            "Spice",
            "Rose",
            "Amber",
            "Oriental"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 180
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 237
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 346
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 582
            }
        ]
    },
    {
        "id": 305,
        "cat": "unisex",
        "name": "Jo Malone Oud And Bergamot",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Fresh citrus meets rich oud with bergamot and warm cedar.",
        "notes": [
            "Oud",
            "Bergamot",
            "Cedar",
            "Citrus",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 202
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 278
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 437
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 808
            }
        ]
    },
    {
        "id": 306,
        "cat": "unisex",
        "name": "Jo Malone Pomegranate Noir Cologne",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Fruity-woody with pomegranate, pink pepper, and dark woods.",
        "notes": [
            "Pomegranate",
            "Pink Pepper",
            "Woods",
            "Fruity",
            "Dark"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 211
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 295
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 474
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 900
            }
        ]
    },
    {
        "id": 307,
        "cat": "unisex",
        "name": "Jo Malone Velvet Rose And Oud Cologne",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Opulent rose with rich oud, velvet woods, and smoky incense.",
        "notes": [
            "Rose",
            "Oud",
            "Woods",
            "Incense",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 206
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 286
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 453
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 849
            }
        ]
    },
    {
        "id": 308,
        "cat": "unisex",
        "name": "Juliette Has A Gun Ode To Dullness",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Soft, powdery and comforting scent with iris, vanilla, and creamy woods.",
        "notes": [
            "Iris",
            "Vanilla",
            "Powdery",
            "Woods",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 183
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 244
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 361
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 622
            }
        ]
    },
    {
        "id": 309,
        "cat": "unisex",
        "name": "Le Labo Palo Santo Type",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Warm, woody and spiritual with palo santo, incense, and creamy woods.",
        "notes": [
            "Palo Santo",
            "Incense",
            "Woods",
            "Creamy",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 166
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 212
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 291
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 447
            }
        ]
    },
    {
        "id": 310,
        "cat": "unisex",
        "name": "Le Labo Santal",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Iconic unisex woody scent with sandalwood, cedar, and leather.",
        "notes": [
            "Sandalwood",
            "Cedar",
            "Leather",
            "Woody",
            "Iconic"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 189
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 255
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 386
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 682
            }
        ]
    },
    {
        "id": 311,
        "cat": "unisex",
        "name": "Loccitane Osmathus",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Delicate and refined floral fragrance centered around osmanthus.",
        "notes": [
            "Osmanthus",
            "Apricot",
            "Leather",
            "Floral",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 173
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 225
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 318
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 515
            }
        ]
    },
    {
        "id": 312,
        "cat": "unisex",
        "name": "Maison Francis Kurkdjian Paris Oud Satin Mood Exact",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Velvety oud with rose, vanilla, and soft woody incense.",
        "notes": [
            "Oud",
            "Rose",
            "Vanilla",
            "Incense",
            "Woody"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 202
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 279
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 439
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 813
            }
        ]
    },
    {
        "id": 313,
        "cat": "unisex",
        "name": "Maison Crivelli Hibiscus Mahajad",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Vibrant tropical floral with hibiscus, citrus, and light woods.",
        "notes": [
            "Hibiscus",
            "Citrus",
            "Woods",
            "Floral",
            "Tropical"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 196
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 268
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 413
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 749
            }
        ]
    },
    {
        "id": 314,
        "cat": "unisex",
        "name": "Maison Francis Kurkdijan Baccarat Rouge",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Luminous blend of jasmine, saffron, amberwood, and fir resin.",
        "notes": [
            "Jasmine",
            "Saffron",
            "Amberwood",
            "Fir Resin",
            "Luminous"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 208
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 290
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 462
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 870
            }
        ]
    },
    {
        "id": 315,
        "cat": "unisex",
        "name": "Maison Francis Kurkdjian Apom Eau De Parfum",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Elegant warm floral with orange blossom, amber, and precious woods.",
        "notes": [
            "Orange Blossom",
            "Amber",
            "Woods",
            "Floral",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 193
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 262
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 401
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 719
            }
        ]
    },
    {
        "id": 316,
        "cat": "unisex",
        "name": "Molton Brown Coastal Cypress & Sea Fennel",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Fresh coastal blend with cypress, sea fennel, and clean driftwood.",
        "notes": [
            "Cypress",
            "Sea Fennel",
            "Driftwood",
            "Coastal",
            "Fresh"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 175
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 228
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 325
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 533
            }
        ]
    },
    {
        "id": 317,
        "cat": "unisex",
        "name": "Molton Brown Fiery Pink Pepper",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Bold spicy floral with pink pepper, jasmine, and warm woods.",
        "notes": [
            "Pink Pepper",
            "Jasmine",
            "Woods",
            "Spicy",
            "Bold"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 169
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 218
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 302
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 476
            }
        ]
    },
    {
        "id": 318,
        "cat": "unisex",
        "name": "Molton Brown Heavenly Ginger Lily",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Exotic floral with spicy ginger, lily, and warm tropical woods.",
        "notes": [
            "Ginger",
            "Lily",
            "Woods",
            "Floral",
            "Exotic"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 174
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 227
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 324
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 529
            }
        ]
    },
    {
        "id": 319,
        "cat": "unisex",
        "name": "Molton Brown Orange And Bergamot",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Bright and refreshing citrus with orange, bergamot, and soft woody base.",
        "notes": [
            "Orange",
            "Bergamot",
            "Woody",
            "Citrus",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 165
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 210
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 285
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 433
            }
        ]
    },
    {
        "id": 320,
        "cat": "unisex",
        "name": "Montale Arabians White Oud",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Creamy white oud with rose, sandalwood, and soft amber musk.",
        "notes": [
            "Oud",
            "Rose",
            "Sandalwood",
            "Amber",
            "Creamy"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 193
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 263
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 402
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 723
            }
        ]
    },
    {
        "id": 321,
        "cat": "unisex",
        "name": "Montale Black Aoud",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Intense dark oud with rose, patchouli, and smoky resinous woods.",
        "notes": [
            "Oud",
            "Rose",
            "Patchouli",
            "Smoky",
            "Dark"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 185
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 248
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 369
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 641
            }
        ]
    },
    {
        "id": 322,
        "cat": "unisex",
        "name": "Montale White Oud",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Soft luminous oud with white florals, vanilla, and sandalwood.",
        "notes": [
            "Oud",
            "White Florals",
            "Vanilla",
            "Sandalwood",
            "Luminous"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 189
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 254
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 384
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 676
            }
        ]
    },
    {
        "id": 323,
        "cat": "unisex",
        "name": "Penhaligons Halfeti",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Rich and opulent oriental rose fragrance with oud and dark woods.",
        "notes": [
            "Rose",
            "Oud",
            "Spice",
            "Leather",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 189
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 255
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 385
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 680
            }
        ]
    },
    {
        "id": 324,
        "cat": "unisex",
        "name": "Ruark Concentrate Fragrance",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Concentrated woody blend with spices, musk, and warm amber base.",
        "notes": [
            "Woods",
            "Spice",
            "Musk",
            "Amber",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 188
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 254
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 382
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 673
            }
        ]
    },
    {
        "id": 325,
        "cat": "unisex",
        "name": "Tom Ford Black Orchid Type",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Dark, sensual and mysterious with black orchid, spices, and rich chocolate notes.",
        "notes": [
            "Black Orchid",
            "Spice",
            "Chocolate",
            "Vanilla",
            "Patchouli"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 177
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 233
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 336
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 559
            }
        ]
    },
    {
        "id": 326,
        "cat": "unisex",
        "name": "Tom Ford Leather Ombre",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Rich and sensual leather fragrance with jasmine, patchouli, and warm amber.",
        "notes": [
            "Leather",
            "Jasmine",
            "Patchouli",
            "Amber",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 222
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 316
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 520
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 1014
            }
        ]
    },
    {
        "id": 327,
        "cat": "unisex",
        "name": "Tom Ford Noir",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Sophisticated oriental with violet, amber, and warm woody spices.",
        "notes": [
            "Violet",
            "Amber",
            "Spice",
            "Woods",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 184
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 246
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 364
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 629
            }
        ]
    },
    {
        "id": 328,
        "cat": "unisex",
        "name": "Tom Ford Oud Wood Type",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Warm smoky oud with cardamom, sandalwood, and dark amber.",
        "notes": [
            "Oud",
            "Cardamom",
            "Sandalwood",
            "Amber",
            "Smoky"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 200
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 276
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 430
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 792
            }
        ]
    },
    {
        "id": 329,
        "cat": "unisex",
        "name": "Tom Ford Tobacco Vanille Unisex",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Rich warm blend of tobacco, vanilla, spices, and dark woods.",
        "notes": [
            "Tobacco",
            "Vanilla",
            "Spice",
            "Woods",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 181
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 240
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 353
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 600
            }
        ]
    },
    {
        "id": 330,
        "cat": "unisex",
        "name": "Tom Ford Tuscan Leather",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Rich leathery scent with raspberry, saffron, and warm dark leather.",
        "notes": [
            "Raspberry",
            "Saffron",
            "Leather",
            "Rich",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 199
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 274
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 427
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 785
            }
        ]
    },
    {
        "id": 331,
        "cat": "unisex",
        "name": "Versace Atelier Versace Vanille Rouge",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Luxurious warm blend with vanilla, red fruits, and dark woody amber.",
        "notes": [
            "Vanilla",
            "Red Fruits",
            "Amber",
            "Woods",
            "Warm"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 226
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 324
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 536
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 1055
            }
        ]
    },
    {
        "id": 332,
        "cat": "unisex",
        "name": "Versace Pour Homme Oud Noir Type",
        "type": "Exact Match",
        "brand": "Elysean Perfumes",
        "desc": "Dark oud woody with spices, amber, and warm resinous base.",
        "notes": [
            "Oud",
            "Spice",
            "Amber",
            "Resin",
            "Woods"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 191
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 258
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 391
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 696
            }
        ]
    },
    {
        "id": 333,
        "cat": "unisex",
        "name": "Vetuza Milanos Tutti Fruit",
        "type": "Inspiration",
        "brand": "Elysean Perfumes",
        "desc": "Playful and juicy tropical fruit blend with sweet and fresh notes.",
        "notes": [
            "Tropical Fruit",
            "Berry",
            "Citrus",
            "Sweet",
            "Musk"
        ],
        "conc": "Eau de Parfum — 20%",
        "img": "images/ProductCoverImage-Unisex.png",
        "sizes": [
            {
                "ml": "Sample",
                "label": "",
                "price": 50
            },
            {
                "ml": "30ml",
                "label": "",
                "price": 165
            },
            {
                "ml": "50ml",
                "label": "",
                "price": 210
            },
            {
                "ml": "100ml",
                "label": "",
                "price": 286
            },
            {
                "ml": "250ml",
                "label": "",
                "price": 435
            }
        ]
    }
];

// Global state
let currentFilter = 'all';
let currentSearchTerm = '';
let selectedProduct = null;
let selectedSize = null;

// ─── CURSOR HOVER HELPER ───
function addCursorHover(element) {
    if (!element) return;
    element.addEventListener('mouseenter', () => {
        document.documentElement.style.setProperty('--cursor', 'pointer');
    });
    element.addEventListener('mouseleave', () => {
        document.documentElement.style.setProperty('--cursor', 'default');
    });
}

// ─── RENDER PRODUCTS USING TEMPLATE ───
function renderProducts(filter = 'all', searchTerm = '') {
    const grid = document.getElementById('products-grid');
    const template = document.getElementById('product-card-template');
    
    if (!template) {
        console.error("❌ Product card template not found in HTML!");
        return;
    }

    let filtered = filter === 'all' 
        ? PRODUCTS 
        : PRODUCTS.filter(p => p.cat === filter);

    // Apply search
    if (searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase().trim();
        filtered = filtered.filter(p => {
            return (
                p.name.toLowerCase().includes(term) ||
                p.brand.toLowerCase().includes(term) ||
                p.desc.toLowerCase().includes(term) ||
                p.notes.some(note => note.toLowerCase().includes(term))
            );
        });
    }

    // Update count
    const countEl = document.getElementById('filter-count') || document.getElementById('searchResultsCount');
    if (countEl) {
        countEl.textContent = filtered.length + ' fragrances';
    }

    grid.innerHTML = '';

    filtered.forEach((p, i) => {
        // Get 30ml price
        let price30ml = p.sizes.find(size => size.ml === '30ml');
        const displayPrice = price30ml ? price30ml.price : p.sizes[0].price;
        
        const clone = template.content.cloneNode(true);
        const card = clone.querySelector('.product-card');
        
        card.style.animationDelay = (i * 0.08) + 's';
        
        card.querySelector('.product-card-img').src = p.img;
        card.querySelector('.product-card-img').alt = p.name;
        
        card.querySelector('.product-badge').textContent = 
            p.cat.charAt(0).toUpperCase() + p.cat.slice(1);
        
        card.querySelector('.product-brand').textContent = p.brand;
        card.querySelector('.product-name').textContent = p.name;
        card.querySelector('.product-type').textContent = p.type
        
        const notesContainer = card.querySelector('.product-notes');
        notesContainer.innerHTML = p.notes.slice(0, 3)
            .map(n => `<span class="note-tag">${n}</span>`).join('');
        
        card.querySelector('.product-price').textContent = `R${displayPrice}`;
        card.querySelector('.add-btn').dataset.id = p.id;

        grid.appendChild(clone);
    });

    console.log(`✅ Rendered ${filtered.length} products (30ml prices)`);

    // Re-attach events
    grid.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.dataset.id);
            openModal(id);
        });
        addCursorHover(btn);
    });
}

// ─── MODAL FUNCTIONS ───
function openModal(id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;
    selectedProduct = p;
    selectedSize = p.sizes.find(s => s.ml === '30ml') || p.sizes[0];
    
    // Fill modal (keep your existing modal code here)
    document.getElementById('modal-img').src = p.img;
    document.getElementById('modal-cat').textContent = p.cat;
    document.getElementById('modal-name').textContent = p.name;
    document.getElementById('modal-brand').textContent = p.brand;
    document.getElementById('modal-desc').textContent = p.desc;
    document.getElementById('modal-conc').textContent = p.conc;
    document.getElementById('modal-notes').innerHTML = p.notes.map(n => `<span class="modal-note-tag">${n}</span>`).join('');
    
    // Size options...
    const sizeOpts = document.getElementById('size-options');
    sizeOpts.innerHTML = p.sizes.map((s, i) => `
        <button class="size-btn ${s.ml === '30ml' ? 'selected' : ''}" data-idx="${i}">
            <span class="size-ml">${s.ml}</span>
            <span class="size-price">R${s.price}</span>
        </button>
    `).join('');
    
    // Add click handlers for sizes...
    sizeOpts.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            sizeOpts.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedSize = p.sizes[parseInt(btn.dataset.idx)];
        });
    });
    
    document.getElementById('modalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

// ─── CART & POPUP ───
document.getElementById('modal-add-btn').addEventListener('click', () => {
    if (!selectedProduct || !selectedSize) return;
    // ... your existing cart logic ...
    const cart = JSON.parse(localStorage.getItem('elyseanCart') || '[]');
    const key = `${selectedProduct.id}-${selectedSize.ml}`;
    const existing = cart.find(i => i.key === key);
    if (existing) existing.qty++;
    else {
        cart.push({
            key, id: selectedProduct.id, name: selectedProduct.name,
            brand: selectedProduct.brand, img: selectedProduct.img,
            cat: selectedProduct.cat, size: selectedSize.ml,
            price: selectedSize.price, qty: 1
        });
    }
    localStorage.setItem('elyseanCart', JSON.stringify(cart));
    updateCartCount();
    closeModal();
    showPopup(selectedProduct.name, selectedSize.ml);
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('elyseanCart') || '[]');
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
}

function showPopup(name, size) {
    const popup = document.getElementById('cartPopup');
    document.getElementById('popup-sub').textContent = `${name} — ${size}`;
    popup.classList.add('show');
    setTimeout(() => popup.classList.remove('show'), 5000);
}

// ─── FILTERS & SEARCH & INIT ───
document.addEventListener('DOMContentLoaded', () => {
    // Filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.cat;
            renderProducts(currentFilter);
        });
    });

    // URL param
    const urlCat = new URLSearchParams(window.location.search).get('cat');
    if (urlCat) {
        const btn = document.querySelector(`[data-cat="${urlCat}"]`);
        if (btn) btn.click();
    }

    // ─── SEARCH FUNCTIONALITY ───
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            currentSearchTerm = searchInput.value;
            if (searchClear) {
                searchClear.classList.toggle('visible', currentSearchTerm.length > 0);
            }
            renderProducts(currentFilter, currentSearchTerm);
        });

        if (searchClear) {
            searchClear.addEventListener('click', () => {
                searchInput.value = '';
                currentSearchTerm = '';
                searchClear.classList.remove('visible');
                renderProducts(currentFilter, '');
                searchInput.focus();
            });
        }
    }

    renderProducts(currentFilter);
    updateCartCount();

    // Header scroll
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 80);
        }
    });
});

// Make sure listeners are attached after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const modalCloseBtn = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
        console.log('✅ Modal close button listener attached');
    } else {
        console.error('❌ #modalClose button not found in HTML!');
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {  // Clicked outside content
                closeModal();
            }
        });
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

// Mobile Filter Dropdown
document.addEventListener('DOMContentLoaded', () => {
    const dropdownBtn = document.getElementById('mobileFilterBtn');
    const dropdownMenu = document.getElementById('filterDropdown');

    if (dropdownBtn && dropdownMenu) {
        dropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            dropdownMenu.classList.remove('show');
        });
    }
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