# Direkt

**Brand-direct deal aggregator. Live sale prices from official brand stores — no marketplaces, no middlemen, no markup.**

![Python](https://img.shields.io/badge/python-3.10+-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

Direkt surfaces active discounts from official brand storefronts (Nike, Apple, Patagonia, Casio, and more) and sends every click straight to the manufacturer's own product page. Unlike Amazon / Flipkart clones, Direkt never stocks, sells, or re-prices — the prices shown are the prices the brand is showing, right now.

---

## Contents

- [Why Direkt](#why-direkt)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Architecture](#architecture)
- [API reference](#api-reference)
- [Frontend routes](#frontend-routes)
- [Configuration](#configuration)
- [Adding products](#adding-products)
- [Design decisions](#design-decisions)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Why Direkt

Deal aggregators today fall into two camps:

1. **Marketplaces** (Amazon, Flipkart) — convenient, but polluted with third-party sellers, counterfeits, and inflated "original" prices used to fake discounts.
2. **Coupon / cashback sites** — noisy, ad-heavy, and usually out of date.

Direkt takes the opposite approach: **only brand-owned storefronts**. If Nike is running 30% off on nike.com, it shows up here. If the same item is cheaper on Amazon, it deliberately doesn't. The trade-off is a narrower catalogue — but everything inside it is authentic, first-party, and priced the way the brand priced it.

---

## Features

- **6 categories** — Shoes, Shirts, Watches, Jackets, Bags, Electronics
- **Brand-direct URLs only** — every product links to the manufacturer's own store
- **Per-brand grouping** — on each category page every brand gets its own section with discount range and entry price
- **Live sale math** — backend derives `discount_pct` and `on_sale` from `original_price` / `sale_price`
- **INR pricing with Indian locale** — formatted as `₹1,14,917` (lakh comma style)
- **Animated category icons** — hand-drawn SVG with SMIL animations per category
- **Seamless brand marquee** — infinite horizontal scroll of active brands on the homepage
- **Filterable browse** — search, category, brand, on-sale-only, sort (discount / price / rating)
- **Zero-config dev** — FastAPI + Vite, one command each

---

## Tech stack

| Layer      | Stack                                                          |
| ---------- | -------------------------------------------------------------- |
| Backend    | Python 3.10+, FastAPI, Uvicorn                                 |
| Frontend   | React 18, TypeScript, Vite, React Router 7, Tailwind CSS       |
| Data       | In-memory Python list (MVP — see [Design decisions](#design-decisions)) |
| Formatting | `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })` |

---

## Project structure

```
direkt/
├── backend/
│   ├── main.py              # FastAPI app, products, categories, USD→INR conversion
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── HomePage.tsx       # Hero, marquee, category grid, live deals, how-it-works
    │   │   ├── CategoryPage.tsx   # Per-category: products grouped by brand
    │   │   └── BrowsePage.tsx     # Global filterable search
    │   ├── components/
    │   │   ├── DealCard.tsx       # Product card (dark/light variants)
    │   │   ├── SiteNav.tsx        # Shared top nav with category links
    │   │   ├── CategoryIcon.tsx   # Animated SVG icon per category
    │   │   └── FilterBar.tsx      # Browse-page filter pills
    │   ├── api.ts                 # fetch helpers
    │   ├── types.ts               # Product / Category / FilterState
    │   ├── utils.ts               # money() with en-IN locale, starRow
    │   ├── App.tsx                # Router shell
    │   ├── main.tsx               # BrowserRouter bootstrap
    │   └── index.css              # Marquee keyframes, base styles
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.ts
```

---

## Getting started

### Prerequisites

- **Python** 3.10 or newer
- **Node** 18 or newer (ships with npm)

### Backend

```bash
cd backend
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API is live at **http://127.0.0.1:8000**. Interactive OpenAPI docs at **http://127.0.0.1:8000/docs**.

### Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

App opens at **http://localhost:5173** and talks to the backend at `127.0.0.1:8000` (configurable — see [Configuration](#configuration)).

---

## Architecture

```
┌──────────────┐   JSON (INR prices)    ┌──────────────┐
│   Frontend   │ ─────────────────────▶ │   Backend    │
│ React + Vite │   GET /api/categories  │   FastAPI    │
│              │   GET /api/products    │              │
│              │   GET /api/filters     │  PRODUCTS[]  │
└──────┬───────┘                         └──────────────┘
       │
       │  click product → new tab
       ▼
┌───────────────────────────────────────┐
│  Official brand storefront            │
│  nike.com / apple.com / patagonia.com │
└───────────────────────────────────────┘
```

Direkt never intermediates the purchase — the frontend opens each product's official URL in a new tab. No cart, no checkout, no payment processing.

---

## API reference

All endpoints return JSON and send `Access-Control-Allow-Origin: *` for dev convenience.

### `GET /api/health`

Liveness probe.

```json
{ "status": "ok" }
```

### `GET /api/categories`

Category metadata with counts and a representative image per category.

```json
[
  {
    "slug": "shoes",
    "name": "Shoes",
    "tagline": "Sneakers, runners & classics — straight from the brand.",
    "accent": "from-fuchsia-500 to-rose-500",
    "product_count": 8,
    "on_sale_count": 8,
    "brand_count": 8,
    "image": "https://...",
    "top_discount_pct": 38
  }
]
```

### `GET /api/filters`

Category and brand options used by the Browse page filter bar.

```json
{
  "categories": ["Bags", "Electronics", "Jackets", "Shirts", "Shoes", "Watches"],
  "retailers": ["Adidas", "Allbirds", "Apple", "Arc'teryx", "..."]
}
```

### `GET /api/products`

List products with optional filters.

| Query param | Type    | Description                                                       |
| ----------- | ------- | ----------------------------------------------------------------- |
| `q`         | string  | Case-insensitive substring match in `title`                       |
| `category`  | string  | Category slug (`shoes`) or display name (`Shoes`)                 |
| `retailer`  | string  | Exact brand match (case-insensitive)                              |
| `on_sale`   | boolean | Only items with `sale_price < original_price`                     |
| `min_price` | float   | Min sale price (INR)                                              |
| `max_price` | float   | Max sale price (INR)                                              |
| `sort`      | string  | `price_asc` \| `price_desc` \| `discount_desc` \| `rating_desc`   |

**Example**

```
GET /api/products?category=shoes&on_sale=true&sort=discount_desc
```

**Response**

```json
{
  "count": 8,
  "items": [
    {
      "id": 104,
      "title": "Puma Suede Classic XXI",
      "retailer": "Puma",
      "category": "Shoes",
      "image": "https://images.puma.com/...",
      "original_price": 6640,
      "sale_price": 4149,
      "currency": "INR",
      "url": "https://us.puma.com/us/en/pd/suede-classic-xxi-sneakers/374915",
      "rating": 4.5,
      "discount_pct": 38,
      "on_sale": true
    }
  ]
}
```

---

## Frontend routes

| Path              | Page         | Purpose                                                     |
| ----------------- | ------------ | ----------------------------------------------------------- |
| `/`               | HomePage     | Hero, animated category grid, live deals, brand marquee     |
| `/category/:slug` | CategoryPage | Products in that category, grouped by brand                 |
| `/browse`         | BrowsePage   | Global filterable search across every brand and category    |

Unknown paths redirect to `/`.

---

## Configuration

### Currency conversion rate

Source prices are stored in USD for readability; the API converts to INR at serve time.

Edit `backend/main.py`:

```python
USD_TO_INR = 83
```

All prices and the `currency` field are rewritten in the response automatically — clients always see INR.

### Backend URL

The frontend base URL is set in `frontend/src/api.ts`:

```ts
const API_BASE = "http://127.0.0.1:8000";
```

Swap this in for `import.meta.env.VITE_API_BASE` if you want env-driven config when deploying.

### Marquee speed

The homepage brand strip uses a hand-written keyframe in `frontend/src/index.css`:

```css
.marquee-track {
  animation: direkt-marquee 45s linear infinite;
}
```

Raise the duration for slower, lower for faster. Hovering the strip pauses it.

---

## Adding products

Append to the `PRODUCTS` list in `backend/main.py`:

```python
{
    "id": 999,
    "title": "Product Title",
    "retailer": "Brand Name",
    "category": "Shoes",                       # must match a CATEGORIES name
    "image": "https://...",                    # ideally from the brand's CDN
    "original_price": 199.99,                  # USD (converted on serve)
    "sale_price":     149.99,                  # USD
    "currency": "USD",                         # source currency; response overrides to INR
    "url": "https://brand.com/product/...",    # brand-direct URL only!
    "rating": 4.5,
}
```

`discount_pct` and `on_sale` are computed automatically. **URLs pointing at Amazon, Flipkart, Walmart, Best Buy, or any marketplace will be rejected in review** — brand-direct only is the core product wedge.

---

## Design decisions

**In-memory data.** No database for the MVP — new products are a code edit. When scale matters this swaps out for SQLite or Postgres behind the same `/api/products` contract; the frontend won't need to change.

**USD stored, INR served.** Keeping source data in USD makes the product list diffable and readable. A single `USD_TO_INR` constant does the conversion on every request, keeping data and presentation cleanly separated and making future multi-currency trivial.

**Animated SVG category icons, not product photos.** Real product photos on category cards were fragile — brand CDN URLs change often and mixed aspect ratios looked unpolished. Hand-drawn SVGs with SMIL animations give a consistent, branded aesthetic that never 404s.

**Dark theme throughout.** The homepage and category pages use a dark, marketing-forward aesthetic; the browse surface converged on the same palette for brand coherence. `DealCard` still supports a light variant for future embedding.

**React Router, not Next.js.** Ships as an SPA — no SEO pressure yet for an MVP. When crawlability matters (brand landing pages, SSR'd category pages), the plain REST API means a Next.js migration is mostly frontend.

**SMIL for SVG animations.** CSS `transform-origin` on SVG `<g>` is inconsistent across browsers for things like a clock's center-rotated second hand or a radius-based pulse ring. `<animateTransform>` and `<animate>` nodes work identically everywhere that isn't IE.

---

## Roadmap

- [ ] Per-brand pages (`/brand/:slug`) with a brand hero and full catalogue
- [ ] Wishlist with localStorage (no account required)
- [ ] SVG brand logos on category and brand cards
- [ ] Price history charts (requires persistence)
- [ ] Sale notifications (email / push)
- [ ] Swap in-memory list for Postgres + an admin CRUD UI
- [ ] Scrapers for official brand storefronts (currently hand-curated)
- [ ] Next.js migration for SSR / SEO / Core Web Vitals

---

## Contributing

Issues and PRs welcome.

**For a product addition:**

1. Fork and branch from `main`
2. Add an entry to `PRODUCTS` in `backend/main.py` with a **brand-direct URL**
3. Verify the URL opens the intended product on the brand's site
4. Open a PR describing the discount (before → after) and category

**For code changes:**

- Keep backend endpoints backwards-compatible (or version them under `/api/v2/...`)
- Frontend TypeScript must be clean: `npx tsc -b --noEmit` returns zero errors
- New UI animations should prefer CSS keyframes for element-level motion and SMIL (`<animate>`, `<animateTransform>`) for SVG-internal motion

---

## License

Released under the **MIT License**. See [LICENSE](LICENSE) for the full text.
