import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchCategories, fetchProducts } from "../api";
import { DealCard } from "../components/DealCard";
import { SiteNav } from "../components/SiteNav";
import type { Category, Product } from "../types";
import { money } from "../utils";

type Tab = "all" | "sale";

export function CategoryPage() {
  const { slug = "" } = useParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("all");

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchProducts({ category: slug, sort: "discount_desc" })
      .then((d) => setItems(d.items))
      .catch((e: unknown) =>
        setError(e instanceof Error ? e.message : "Failed to load products")
      )
      .finally(() => setLoading(false));
  }, [slug]);

  const category = categories.find((c) => c.slug === slug);
  const visibleItems = tab === "sale" ? items.filter((p) => p.on_sale) : items;

  // Group by brand, preserve discount-desc order within each group
  const byBrand = useMemo(() => {
    const map = new Map<string, Product[]>();
    for (const p of visibleItems) {
      const list = map.get(p.retailer) || [];
      list.push(p);
      map.set(p.retailer, list);
    }
    // Sort brands by biggest single discount in the brand
    return Array.from(map.entries()).sort((a, b) => {
      const maxA = Math.max(...a[1].map((p) => p.discount_pct));
      const maxB = Math.max(...b[1].map((p) => p.discount_pct));
      return maxB - maxA;
    });
  }, [visibleItems]);

  const onSaleCount = items.filter((p) => p.on_sale).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <SiteNav categories={categories} />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute inset-0">
          <div
            className={`absolute left-1/2 -translate-x-1/2 top-0 w-[60rem] h-[30rem] rounded-full bg-gradient-to-br ${
              category?.accent ?? "from-violet-500 to-fuchsia-500"
            } opacity-20 blur-3xl`}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <nav className="text-sm text-slate-400 mb-6">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-200">{category?.name ?? slug}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                {category?.name ?? slug}
              </h1>
              {category && (
                <p className="mt-4 text-lg text-slate-300 max-w-2xl">
                  {category.tagline}
                </p>
              )}
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                <Badge>{byBrand.length} brands</Badge>
                <Badge>{items.length} products</Badge>
                <Badge accent>{onSaleCount} on sale</Badge>
                {category && category.top_discount_pct > 0 && (
                  <Badge hot>-{category.top_discount_pct}% top</Badge>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10 self-start">
              <TabBtn active={tab === "all"} onClick={() => setTab("all")}>
                All ({items.length})
              </TabBtn>
              <TabBtn active={tab === "sale"} onClick={() => setTab("sale")}>
                On sale ({onSaleCount})
              </TabBtn>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND SECTIONS */}
      <section className="relative max-w-7xl mx-auto px-6 py-16">
        {error && (
          <div className="text-center text-rose-400 py-12">
            Could not reach the API.
            <div className="text-xs text-slate-500 mt-2">{error}</div>
          </div>
        )}

        {!error && loading && (
          <div className="text-center text-slate-500 py-20">Loading…</div>
        )}

        {!error && !loading && byBrand.length === 0 && (
          <div className="text-center text-slate-500 py-20">
            Nothing here yet.
          </div>
        )}

        <div className="space-y-16">
          {byBrand.map(([brand, products]) => (
            <BrandSection key={brand} brand={brand} products={products} />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-slate-500">
          Direkt is an aggregator of official brand stores. We never sell — we
          just find the sales.
        </div>
      </footer>
    </div>
  );
}

function BrandSection({
  brand,
  products,
}: {
  brand: string;
  products: Product[];
}) {
  const onSale = products.filter((p) => p.on_sale);
  const maxDiscount = Math.max(0, ...products.map((p) => p.discount_pct));
  const cheapest = products.reduce((acc, p) =>
    p.sale_price < acc.sale_price ? p : acc
  );

  return (
    <div>
      <div className="flex items-end justify-between flex-wrap gap-3 mb-5 pb-4 border-b border-white/5">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            {brand}
          </h2>
          <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
            <span>
              <strong className="text-slate-200">{products.length}</strong>{" "}
              product{products.length === 1 ? "" : "s"}
            </span>
            {onSale.length > 0 && (
              <>
                <span className="w-1 h-1 rounded-full bg-slate-600" />
                <span className="text-emerald-400 font-medium">
                  {onSale.length} on sale
                </span>
              </>
            )}
            {maxDiscount > 0 && (
              <>
                <span className="w-1 h-1 rounded-full bg-slate-600" />
                <span className="text-fuchsia-400 font-medium">
                  up to -{maxDiscount}%
                </span>
              </>
            )}
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span>
              from{" "}
              <strong className="text-slate-200">
                {money(cheapest.sale_price, cheapest.currency)}
              </strong>
            </span>
          </div>
        </div>
        <a
          href={products[0].url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-slate-300 hover:text-white inline-flex items-center gap-1"
        >
          Visit {brand} <span aria-hidden>↗</span>
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((p) => (
          <DealCard key={p.id} product={p} variant="dark" />
        ))}
      </div>
    </div>
  );
}

function Badge({
  children,
  accent,
  hot,
}: {
  children: React.ReactNode;
  accent?: boolean;
  hot?: boolean;
}) {
  return (
    <span
      className={
        "px-3 py-1 rounded-full text-xs font-medium border " +
        (hot
          ? "bg-gradient-to-r from-fuchsia-500/20 to-rose-500/20 border-fuchsia-500/30 text-fuchsia-200"
          : accent
          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
          : "bg-white/5 border-white/10 text-slate-300")
      }
    >
      {children}
    </span>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "px-4 py-1.5 rounded-full text-sm font-medium transition " +
        (active
          ? "bg-white text-slate-900"
          : "text-slate-300 hover:text-white")
      }
    >
      {children}
    </button>
  );
}
