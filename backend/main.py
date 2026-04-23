from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List

app = FastAPI(title="Direkt API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Category metadata. Slugs are URL-safe ids; `name` matches `category` on PRODUCTS.
CATEGORIES = [
    {
        "slug": "shoes",
        "name": "Shoes",
        "tagline": "Sneakers, runners & classics — straight from the brand.",
        "accent": "from-fuchsia-500 to-rose-500",
    },
    {
        "slug": "shirts",
        "name": "Shirts",
        "tagline": "Tees, hoodies & button-ups from official labels.",
        "accent": "from-violet-500 to-fuchsia-500",
    },
    {
        "slug": "watches",
        "name": "Watches",
        "tagline": "Smartwatches, divers & dailies — direct from makers.",
        "accent": "from-amber-500 to-orange-500",
    },
    {
        "slug": "jackets",
        "name": "Jackets",
        "tagline": "Fleeces, down & shells from the source.",
        "accent": "from-emerald-500 to-teal-500",
    },
    {
        "slug": "bags",
        "name": "Bags",
        "tagline": "Backpacks & daypacks built to last.",
        "accent": "from-cyan-500 to-blue-500",
    },
    {
        "slug": "electronics",
        "name": "Electronics",
        "tagline": "Headphones, laptops & gear — manufacturer pricing.",
        "accent": "from-indigo-500 to-violet-500",
    },
]


# Brand-direct products only — every URL points to the manufacturer's own
# storefront. No marketplaces (Amazon, Walmart, Best Buy, Flipkart, etc.).
PRODUCTS: List[dict] = [
    # ─── SHOES ──────────────────────────────────────────────────────────────
    {
        "id": 101,
        "title": "Nike Air Zoom Pegasus 41",
        "retailer": "Nike",
        "category": "Shoes",
        "image": "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/4d2f4f1a-1f9f-4f5a-9b9f-3b5b5b5b5b5b/pegasus-41-mens-road-running-shoes.png",
        "original_price": 140.00,
        "sale_price": 98.97,
        "currency": "USD",
        "url": "https://www.nike.com/t/pegasus-41-mens-road-running-shoes",
        "rating": 4.5,
    },
    {
        "id": 102,
        "title": "Adidas Ultraboost Light",
        "retailer": "Adidas",
        "category": "Shoes",
        "image": "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/ultraboost-light.jpg",
        "original_price": 190.00,
        "sale_price": 133.00,
        "currency": "USD",
        "url": "https://www.adidas.com/us/ultraboost-light-shoes",
        "rating": 4.4,
    },
    {
        "id": 103,
        "title": "New Balance Made in USA 990v6",
        "retailer": "New Balance",
        "category": "Shoes",
        "image": "https://nb.scene7.com/is/image/NB/m990gl6_nb_02_i?$pdpflexf2$",
        "original_price": 199.99,
        "sale_price": 159.99,
        "currency": "USD",
        "url": "https://www.newbalance.com/pd/made-in-usa-990v6/M990V6-41250.html",
        "rating": 4.7,
    },
    {
        "id": 104,
        "title": "Puma Suede Classic XXI",
        "retailer": "Puma",
        "category": "Shoes",
        "image": "https://images.puma.com/image/upload/f_auto,q_auto/global/374915/01/sv01/fnd/PNA/fmt/png/Suede-Classic-XXI-Sneakers.png",
        "original_price": 80.00,
        "sale_price": 49.99,
        "currency": "USD",
        "url": "https://us.puma.com/us/en/pd/suede-classic-xxi-sneakers/374915",
        "rating": 4.5,
    },
    {
        "id": 105,
        "title": "Converse Chuck 70 High Top",
        "retailer": "Converse",
        "category": "Shoes",
        "image": "https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/chuck-70-classic.jpg",
        "original_price": 90.00,
        "sale_price": 67.50,
        "currency": "USD",
        "url": "https://www.converse.com/shop/p/chuck-70-classic-unisex-high-top-shoe/162050C.html",
        "rating": 4.6,
    },
    {
        "id": 106,
        "title": "Vans Old Skool",
        "retailer": "Vans",
        "category": "Shoes",
        "image": "https://images.vans.com/is/image/Vans/old-skool-classic-black-white.png",
        "original_price": 70.00,
        "sale_price": 55.95,
        "currency": "USD",
        "url": "https://www.vans.com/en-us/shoes-c00081/old-skool-shoe-pvn0d3hy28",
        "rating": 4.7,
    },
    {
        "id": 107,
        "title": "On Cloud 5",
        "retailer": "On",
        "category": "Shoes",
        "image": "https://images.on-running.com/is/image/OnAG/cloud-5-all-black.png",
        "original_price": 139.99,
        "sale_price": 109.99,
        "currency": "USD",
        "url": "https://www.on.com/en-us/products/cloud-5-3md10210197",
        "rating": 4.5,
    },
    {
        "id": 108,
        "title": "Allbirds Tree Runner",
        "retailer": "Allbirds",
        "category": "Shoes",
        "image": "https://cdn.allbirds.com/image/upload/f_auto,q_auto/cms/tree-runner-natural-black.png",
        "original_price": 110.00,
        "sale_price": 88.00,
        "currency": "USD",
        "url": "https://www.allbirds.com/products/mens-tree-runners",
        "rating": 4.4,
    },

    # ─── SHIRTS & TOPS ──────────────────────────────────────────────────────
    {
        "id": 201,
        "title": "Uniqlo U Crew Neck Short-Sleeve T-Shirt",
        "retailer": "Uniqlo",
        "category": "Shirts",
        "image": "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/445938/item/usgoods_09_445938.jpg",
        "original_price": 19.90,
        "sale_price": 14.90,
        "currency": "USD",
        "url": "https://www.uniqlo.com/us/en/products/E445938-000",
        "rating": 4.5,
    },
    {
        "id": 202,
        "title": "Levi's Western Pearl Snap Shirt",
        "retailer": "Levi's",
        "category": "Shirts",
        "image": "https://lsco.scene7.com/is/image/lsco/A57570000-front-pdp",
        "original_price": 79.50,
        "sale_price": 47.70,
        "currency": "USD",
        "url": "https://www.levi.com/US/en_US/clothing/men/shirts/western-shirt/p/A57570000",
        "rating": 4.6,
    },
    {
        "id": 203,
        "title": "Patagonia P-6 Logo Responsibili-Tee",
        "retailer": "Patagonia",
        "category": "Shirts",
        "image": "https://www.patagonia.com/dw/image/v2/bdjb_prd/on/demandware.static/-/Sites-patagonia-master/default/p-6-logo-tee.jpg",
        "original_price": 39.00,
        "sale_price": 29.25,
        "currency": "USD",
        "url": "https://www.patagonia.com/product/mens-p-6-logo-responsibili-tee/38504.html",
        "rating": 4.7,
    },
    {
        "id": 204,
        "title": "Lululemon Metal Vent Tech Short-Sleeve",
        "retailer": "Lululemon",
        "category": "Shirts",
        "image": "https://images.lululemon.com/is/image/lululemon/LM3DCMS_metal-vent-tech.png",
        "original_price": 78.00,
        "sale_price": 58.00,
        "currency": "USD",
        "url": "https://shop.lululemon.com/p/mens-shortsleeve/Metal-Vent-Tech-SS",
        "rating": 4.6,
    },
    {
        "id": 205,
        "title": "Champion Reverse Weave Hoodie",
        "retailer": "Champion",
        "category": "Shirts",
        "image": "https://www.champion.com/dw/image/v2/AAJB_PRD/on/demandware.static/reverse-weave-hoodie.jpg",
        "original_price": 65.00,
        "sale_price": 45.50,
        "currency": "USD",
        "url": "https://www.champion.com/shop/en/champion-us/men/sweatshirts/reverse-weave-hoodie",
        "rating": 4.7,
    },
    {
        "id": 206,
        "title": "The North Face Half Dome T-Shirt",
        "retailer": "The North Face",
        "category": "Shirts",
        "image": "https://www.thenorthface.com/dw/image/v2/half-dome-tee.png",
        "original_price": 30.00,
        "sale_price": 22.50,
        "currency": "USD",
        "url": "https://www.thenorthface.com/shop/mens-short-sleeve-half-dome-tee-nf0a4m4n",
        "rating": 4.6,
    },

    # ─── WATCHES ────────────────────────────────────────────────────────────
    {
        "id": 301,
        "title": "Casio G-Shock GA-2100-1A",
        "retailer": "Casio",
        "category": "Watches",
        "image": "https://www.casio.com/content/dam/casio/product-info/locales/us/en/timepiece/product/watch/G/GA/GA2/GA-2100-1A/assets/GA-2100-1A.png",
        "original_price": 99.00,
        "sale_price": 79.00,
        "currency": "USD",
        "url": "https://www.casio.com/us/watches/gshock/product.GA-2100-1A/",
        "rating": 4.8,
    },
    {
        "id": 302,
        "title": "Seiko 5 Sports Automatic SRPD55",
        "retailer": "Seiko",
        "category": "Watches",
        "image": "https://www.seikowatches.com/us-en/-/media/Images/Product/2019/SRPD55/SRPD55K1.png",
        "original_price": 295.00,
        "sale_price": 220.00,
        "currency": "USD",
        "url": "https://www.seikowatches.com/us-en/products/seiko5sports/srpd55",
        "rating": 4.7,
    },
    {
        "id": 303,
        "title": "Citizen Eco-Drive Promaster Diver",
        "retailer": "Citizen",
        "category": "Watches",
        "image": "https://www.citizenwatch.com/dw/image/v2/AAVW_PRD/on/demandware.static/eco-drive-promaster.jpg",
        "original_price": 395.00,
        "sale_price": 295.00,
        "currency": "USD",
        "url": "https://www.citizenwatch.com/us/en/product/BN0150-28E.html",
        "rating": 4.7,
    },
    {
        "id": 304,
        "title": "Timex Weekender 38mm",
        "retailer": "Timex",
        "category": "Watches",
        "image": "https://www.timex.com/dw/image/v2/AAQF_PRD/on/demandware.static/weekender-38mm.jpg",
        "original_price": 56.00,
        "sale_price": 39.00,
        "currency": "USD",
        "url": "https://www.timex.com/weekender-38mm-fabric-strap-watch/TW2T30500.html",
        "rating": 4.5,
    },
    {
        "id": 305,
        "title": "Fossil Gen 6 Smartwatch",
        "retailer": "Fossil",
        "category": "Watches",
        "image": "https://fossil.scene7.com/is/image/FossilPartners/FTW4061_main",
        "original_price": 299.00,
        "sale_price": 199.00,
        "currency": "USD",
        "url": "https://www.fossil.com/en-us/products/gen-6-smartwatch-stainless-steel/FTW4061.html",
        "rating": 4.3,
    },
    {
        "id": 306,
        "title": "Apple Watch Series 9 GPS 41mm",
        "retailer": "Apple",
        "category": "Watches",
        "image": "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MR9R3_VW_34FR+watch-41-alum-midnight-nc-s9?wid=600&hei=600&fmt=jpeg",
        "original_price": 399.00,
        "sale_price": 329.00,
        "currency": "USD",
        "url": "https://www.apple.com/shop/buy-watch/apple-watch",
        "rating": 4.8,
    },

    # ─── JACKETS ────────────────────────────────────────────────────────────
    {
        "id": 401,
        "title": "Patagonia Better Sweater Fleece Jacket",
        "retailer": "Patagonia",
        "category": "Jackets",
        "image": "https://www.patagonia.com/dw/image/v2/bdjb_prd/on/demandware.static/-/Sites-patagonia-master/default/better-sweater-jacket.jpg",
        "original_price": 159.00,
        "sale_price": 119.00,
        "currency": "USD",
        "url": "https://www.patagonia.com/product/mens-better-sweater-fleece-jacket/25528.html",
        "rating": 4.7,
    },
    {
        "id": 402,
        "title": "Uniqlo Ultra Light Down Jacket",
        "retailer": "Uniqlo",
        "category": "Jackets",
        "image": "https://image.uniqlo.com/UQ/ST3/us/imagesgoods/459360/item/usgoods_09_459360.jpg",
        "original_price": 69.90,
        "sale_price": 49.90,
        "currency": "USD",
        "url": "https://www.uniqlo.com/us/en/products/E459360-000",
        "rating": 4.6,
    },
    {
        "id": 403,
        "title": "The North Face Denali Fleece Jacket",
        "retailer": "The North Face",
        "category": "Jackets",
        "image": "https://www.thenorthface.com/dw/image/v2/denali-fleece-jacket.png",
        "original_price": 199.00,
        "sale_price": 139.00,
        "currency": "USD",
        "url": "https://www.thenorthface.com/shop/mens-denali-jacket-nf0a7uqu",
        "rating": 4.8,
    },
    {
        "id": 404,
        "title": "Columbia Steens Mountain 2.0 Fleece",
        "retailer": "Columbia",
        "category": "Jackets",
        "image": "https://columbia.scene7.com/is/image/ColumbiaSportswear/1476671_010_f.png",
        "original_price": 60.00,
        "sale_price": 39.99,
        "currency": "USD",
        "url": "https://www.columbia.com/p/mens-steens-mountain-2-0-full-zip-fleece-jacket-1476671.html",
        "rating": 4.7,
    },
    {
        "id": 405,
        "title": "Arc'teryx Beta Jacket",
        "retailer": "Arc'teryx",
        "category": "Jackets",
        "image": "https://images.arcteryx.com/F23/1080x1080/Beta-Jacket-Mens-Black.jpg",
        "original_price": 500.00,
        "sale_price": 425.00,
        "currency": "USD",
        "url": "https://arcteryx.com/us/en/shop/mens/beta-jacket",
        "rating": 4.8,
    },

    # ─── BAGS ───────────────────────────────────────────────────────────────
    {
        "id": 501,
        "title": "Herschel Little America Backpack",
        "retailer": "Herschel",
        "category": "Bags",
        "image": "https://herschel.com/content/dam/herschel/products/10014/10014-00001-OS_01.jpg",
        "original_price": 110.00,
        "sale_price": 79.99,
        "currency": "USD",
        "url": "https://herschel.com/shop/backpacks/little-america-backpack",
        "rating": 4.7,
    },
    {
        "id": 502,
        "title": "Patagonia Black Hole Pack 25L",
        "retailer": "Patagonia",
        "category": "Bags",
        "image": "https://www.patagonia.com/dw/image/v2/bdjb_prd/on/demandware.static/-/Sites-patagonia-master/default/black-hole-pack-25l.jpg",
        "original_price": 129.00,
        "sale_price": 89.00,
        "currency": "USD",
        "url": "https://www.patagonia.com/product/black-hole-pack-25-liters/49298.html",
        "rating": 4.8,
    },
    {
        "id": 503,
        "title": "The North Face Borealis Backpack",
        "retailer": "The North Face",
        "category": "Bags",
        "image": "https://www.thenorthface.com/dw/image/v2/borealis-backpack.png",
        "original_price": 99.00,
        "sale_price": 69.30,
        "currency": "USD",
        "url": "https://www.thenorthface.com/shop/borealis-backpack-nf0a52se",
        "rating": 4.7,
    },

    # ─── ELECTRONICS ────────────────────────────────────────────────────────
    {
        "id": 601,
        "title": "Apple MacBook Air 13\" M3",
        "retailer": "Apple",
        "category": "Electronics",
        "image": "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mba13-midnight-select-202402?wid=904&hei=840&fmt=jpeg",
        "original_price": 1099.00,
        "sale_price": 999.00,
        "currency": "USD",
        "url": "https://www.apple.com/shop/buy-mac/macbook-air",
        "rating": 4.8,
    },
    {
        "id": 602,
        "title": "Apple AirPods Pro (2nd gen)",
        "retailer": "Apple",
        "category": "Electronics",
        "image": "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQD83?wid=600&hei=600&fmt=jpeg",
        "original_price": 249.00,
        "sale_price": 199.00,
        "currency": "USD",
        "url": "https://www.apple.com/shop/buy-airpods/airpods-pro",
        "rating": 4.8,
    },
    {
        "id": 603,
        "title": "Logitech MX Master 3S Mouse",
        "retailer": "Logitech",
        "category": "Electronics",
        "image": "https://resource.logitech.com/w_800,c_limit,q_auto,f_auto/content/dam/logitech/en/products/mice/mx-master-3s.png",
        "original_price": 99.99,
        "sale_price": 79.99,
        "currency": "USD",
        "url": "https://www.logitech.com/en-us/products/mice/mx-master-3s.html",
        "rating": 4.8,
    },
    {
        "id": 604,
        "title": "Sony WH-1000XM5 Wireless Headphones",
        "retailer": "Sony",
        "category": "Electronics",
        "image": "https://www.sony.com/image/wh1000xm5-black.png",
        "original_price": 399.99,
        "sale_price": 299.99,
        "currency": "USD",
        "url": "https://electronics.sony.com/audio/headphones/headband/p/wh1000xm5-b",
        "rating": 4.7,
    },
    {
        "id": 605,
        "title": "Dyson V15 Detect Cordless Vacuum",
        "retailer": "Dyson",
        "category": "Electronics",
        "image": "https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/419617-01.png",
        "original_price": 749.99,
        "sale_price": 599.99,
        "currency": "USD",
        "url": "https://www.dyson.com/vacuum-cleaners/sticks/v15/detect-yellow-nickel",
        "rating": 4.8,
    },
]


# Source prices above are in USD for readability. The API serves INR — we
# convert at response time and override the currency. Change the rate here if
# you want to refresh against the live FX.
USD_TO_INR = 83


def _with_discount(p: dict) -> dict:
    op = round(p["original_price"] * USD_TO_INR)
    sp = round(p["sale_price"] * USD_TO_INR)
    discount_pct = round((op - sp) / op * 100) if op > 0 and sp < op else 0
    return {
        **p,
        "original_price": op,
        "sale_price": sp,
        "currency": "INR",
        "discount_pct": discount_pct,
        "on_sale": discount_pct > 0,
    }


def _slug_to_name(slug: str) -> Optional[str]:
    for c in CATEGORIES:
        if c["slug"].lower() == slug.lower():
            return c["name"]
    return None


@app.get("/api/products")
def list_products(
    q: Optional[str] = Query(None, description="Search in title"),
    category: Optional[str] = Query(None, description="Category name OR slug"),
    retailer: Optional[str] = None,
    on_sale: Optional[bool] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    sort: Optional[str] = Query(
        None,
        description="price_asc | price_desc | discount_desc | rating_desc",
    ),
):
    items = [_with_discount(p) for p in PRODUCTS]

    if q:
        needle = q.lower()
        items = [p for p in items if needle in p["title"].lower()]
    if category:
        # Accept either the slug ("shoes") or the display name ("Shoes")
        target = _slug_to_name(category) or category
        items = [p for p in items if p["category"].lower() == target.lower()]
    if retailer:
        items = [p for p in items if p["retailer"].lower() == retailer.lower()]
    if on_sale is True:
        items = [p for p in items if p["on_sale"]]
    if min_price is not None:
        items = [p for p in items if p["sale_price"] >= min_price]
    if max_price is not None:
        items = [p for p in items if p["sale_price"] <= max_price]

    if sort == "price_asc":
        items.sort(key=lambda p: p["sale_price"])
    elif sort == "price_desc":
        items.sort(key=lambda p: p["sale_price"], reverse=True)
    elif sort == "discount_desc":
        items.sort(key=lambda p: p["discount_pct"], reverse=True)
    elif sort == "rating_desc":
        items.sort(key=lambda p: p["rating"], reverse=True)

    return {"count": len(items), "items": items}


@app.get("/api/categories")
def list_categories():
    """Categories with metadata, item counts, and a representative image."""
    products = [_with_discount(p) for p in PRODUCTS]

    out = []
    for meta in CATEGORIES:
        in_cat = [p for p in products if p["category"] == meta["name"]]
        if not in_cat:
            continue
        on_sale = sorted(
            [p for p in in_cat if p["on_sale"]],
            key=lambda p: p["discount_pct"],
            reverse=True,
        )
        rep = on_sale[0] if on_sale else in_cat[0]
        brands = sorted({p["retailer"] for p in in_cat})
        out.append(
            {
                **meta,
                "product_count": len(in_cat),
                "on_sale_count": len(on_sale),
                "brand_count": len(brands),
                "image": rep["image"],
                "top_discount_pct": on_sale[0]["discount_pct"] if on_sale else 0,
            }
        )
    return out


@app.get("/api/filters")
def filter_options():
    categories = sorted({p["category"] for p in PRODUCTS})
    retailers = sorted({p["retailer"] for p in PRODUCTS})
    return {"categories": categories, "retailers": retailers}


@app.get("/api/health")
def health():
    return {"status": "ok"}
