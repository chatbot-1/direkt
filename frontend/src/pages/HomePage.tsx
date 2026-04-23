import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCategories, fetchProducts } from "../api";
import { DealCard } from "../components/DealCard";
import { CategoryIcon } from "../components/CategoryIcon";
import type { Category, Product } from "../types";

export function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [topDeals, setTopDeals] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((e: unknown) =>
        setError(e instanceof Error ? e.message : "Failed to load categories")
      );

    fetchProducts({ onSale: true, sort: "discount_desc" })
      .then((d) => {
        setTopDeals(d.items.slice(0, 8));
        setBrands(Array.from(new Set(d.items.map((p) => p.retailer))));
      })
      .catch((e: unknown) =>
        setError(e instanceof Error ? e.message : "Failed to load products")
      );
  }, []);

  // Render the brand list exactly twice — the marquee keyframe translates
  // 0 → -50%, so the second copy lands precisely where the first started,
  // making the loop seamless. More than 2 copies would create gaps.
  const marqueeBrands = brands.length > 0 ? [...brands, ...brands] : [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* NAV */}
      <nav className="relative z-20 max-w-7xl mx-auto px-6 py-5 flex items-center">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-fuchsia-500 via-violet-500 to-indigo-500 grid place-items-center font-bold text-white shadow-lg shadow-fuchsia-500/30">
            D
          </div>
          <span className="text-xl font-semibold tracking-tight">Direkt</span>
        </div>
        <div className="flex-1" />
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          <a href="#categories" className="hover:text-white transition">
            Categories
          </a>
          <a href="#deals" className="hover:text-white transition">
            Live deals
          </a>
          <a href="#brands" className="hover:text-white transition">
            Brands
          </a>
          <a href="#how" className="hover:text-white transition">
            How it works
          </a>
        </div>
        <div className="flex-1" />
        <Link
          to="/browse"
          className="text-sm font-semibold px-4 py-2 rounded-full bg-white text-slate-900 hover:bg-slate-200 transition"
        >
          Browse all →
        </Link>
      </nav>

      {/* HERO */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 -top-32">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[80rem] h-[40rem] rounded-full bg-gradient-to-br from-fuchsia-600/30 via-violet-600/20 to-indigo-600/30 blur-3xl" />
          <div className="absolute left-10 top-40 w-72 h-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="absolute right-10 top-20 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl" />
        </div>

        <Strings />

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-16 pb-20 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live from {brands.length || "—"} official brand stores
          </span>

          <h1 className="mt-8 text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] animate-fade-up">
            Brand-direct on{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              every sale.
            </span>
          </h1>

          <p
            className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            Direkt aggregates live discounts from <strong className="text-white">official brand stores only</strong> — Nike, Apple, Patagonia, Casio and more.
            No Amazon, no marketplaces, no middlemen. Browse, click, buy direct.
          </p>

          <div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            <a
              href="#categories"
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-slate-900 font-semibold hover:scale-[1.02] transition shadow-2xl shadow-fuchsia-500/20"
            >
              Shop by category
              <svg
                className="w-4 h-4 group-hover:translate-y-0.5 transition"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
            <Link
              to="/browse"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-slate-200 hover:bg-white/5 transition"
            >
              Search everything
            </Link>
          </div>

          <div
            className="mt-14 grid grid-cols-3 gap-6 max-w-xl mx-auto text-center animate-fade-up"
            style={{ animationDelay: "360ms" }}
          >
            <Stat value={`${categories.length || "—"}`} label="Categories" />
            <Stat value="100%" label="Official sites" />
            <Stat value="₹0" label="Markup" />
          </div>
        </div>
      </section>

      {/* BRAND MARQUEE */}
      <section
        id="brands"
        className="relative py-10 border-y border-white/5 bg-slate-950/50"
      >
        <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-400 mb-6">
          Pulling deals from
        </p>
        <div className="relative overflow-hidden mask-fade">
          {marqueeBrands.length === 0 ? (
            <div className="text-center text-slate-500">Loading brands…</div>
          ) : (
            <div className="marquee-track">
              {marqueeBrands.map((r, i) => (
                <span
                  key={`${r}-${i}`}
                  className="text-2xl md:text-3xl font-semibold text-slate-400/80 hover:text-white transition whitespace-nowrap px-8"
                >
                  {r}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CATEGORIES GRID — the primary nav for users */}
      <section id="categories" className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-fuchsia-400 mb-3">
              Shop by category
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Pick what you're hunting.
            </h2>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto">
              Each category shows every brand and every active sale — grouped by
              the official store it came from.
            </p>
          </div>

          {error && (
            <div className="text-center text-rose-400 text-sm mb-8">
              Could not reach the API — is uvicorn running on port 8000?
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.length === 0
              ? Array.from({ length: 6 }).map((_, i) => (
                  <CategorySkeleton key={i} />
                ))
              : categories.map((c) => <CategoryCard key={c.slug} category={c} />)}
          </div>
        </div>
      </section>

      {/* LIVE DEALS PREVIEW */}
      <section id="deals" className="relative py-24 px-6 bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-violet-400 mb-2">
                Right now
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                The deepest discounts <br className="hidden md:block" />
                live on the web.
              </h2>
            </div>
            <Link
              to="/browse"
              className="text-sm font-semibold text-slate-300 hover:text-white inline-flex items-center gap-1"
            >
              See all deals <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {topDeals.length === 0
              ? Array.from({ length: 8 }).map((_, i) => (
                  <DealSkeleton key={i} />
                ))
              : topDeals.map((p) => (
                  <DealCard key={p.id} product={p} variant="dark" />
                ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-violet-400 mb-2">
              How Direkt works
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Three steps. Zero friction.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Step
              n="01"
              title="We watch official stores"
              body="Direkt pulls live sale data from brand-direct storefronts only — nike.com, apple.com, patagonia.com and the rest. Marketplaces and resellers are excluded by design."
              accent="from-fuchsia-500/20 to-fuchsia-500/0"
            />
            <Step
              n="02"
              title="You browse by category"
              body="Shoes, shirts, watches, jackets — drill into any category and see which brands have deals live right now, each brand grouped in its own section."
              accent="from-violet-500/20 to-violet-500/0"
            />
            <Step
              n="03"
              title="Click → official site"
              body="One click takes you straight to the brand's own product page to check out. Direkt never handles your payment, never stocks anything, never adds a markup."
              accent="from-indigo-500/20 to-indigo-500/0"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 px-6">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[60rem] h-[30rem] rounded-full bg-gradient-to-br from-fuchsia-600/20 via-violet-600/10 to-indigo-600/20 blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Ready to skip the search?
          </h2>
          <p className="mt-5 text-slate-300 text-lg">
            Every live sale. Every official brand. One feed.
          </p>
          <a
            href="#categories"
            className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 text-white font-semibold text-lg shadow-2xl shadow-fuchsia-500/30 hover:scale-[1.02] transition"
          >
            Start shopping
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-fuchsia-500 via-violet-500 to-indigo-500 grid place-items-center font-bold text-white text-xs">
              D
            </div>
            <span className="font-semibold text-slate-300">Direkt</span>
          </div>
          <p>
            Aggregator of official brand storefronts. We don't sell anything —
            clicks go direct to the manufacturer.
          </p>
        </div>
      </footer>

    </div>
  );
}

function CategoryCard({ category: c }: { category: Category }) {
  return (
    <Link
      to={`/category/${c.slug}`}
      className="group relative block rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:border-white/30 transition"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${c.accent} opacity-40 group-hover:opacity-60 transition`}
        />
        {/* subtle radial glow behind the icon */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="w-3/4 h-3/4 rounded-full bg-white/10 blur-2xl" />
        </div>
        <div className="absolute inset-0 grid place-items-center text-white/95 group-hover:scale-110 transition-transform duration-500">
          <div className="w-1/2 h-1/2">
            <CategoryIcon slug={c.slug} />
          </div>
        </div>
        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur px-2.5 py-1 rounded-full text-xs font-bold text-white border border-white/10">
          Up to -{c.top_discount_pct}%
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-2xl font-semibold text-white tracking-tight">
              {c.name}
            </h3>
            <p className="mt-1 text-sm text-slate-400 line-clamp-2">
              {c.tagline}
            </p>
          </div>
          <div className="shrink-0 w-10 h-10 rounded-full border border-white/10 grid place-items-center group-hover:bg-white group-hover:text-slate-900 transition">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </div>
        <div className="mt-5 pt-5 border-t border-white/5 flex items-center gap-4 text-xs text-slate-400">
          <span>
            <strong className="text-white">{c.brand_count}</strong> brands
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-600" />
          <span>
            <strong className="text-white">{c.product_count}</strong> products
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-600" />
          <span>
            <strong className="text-emerald-400">{c.on_sale_count}</strong> on sale
          </span>
        </div>
      </div>
    </Link>
  );
}

function CategorySkeleton() {
  return (
    <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03]">
      <div className="aspect-[4/3] bg-slate-800/50 animate-pulse" />
      <div className="p-6 space-y-3">
        <div className="h-6 w-32 bg-slate-800/70 rounded animate-pulse" />
        <div className="h-4 w-full bg-slate-800/70 rounded animate-pulse" />
        <div className="h-3 w-40 bg-slate-800/70 rounded animate-pulse" />
      </div>
    </div>
  );
}

function DealSkeleton() {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
      <div className="aspect-square bg-slate-800/50 animate-pulse" />
      <div className="p-4 space-y-2">
        <div className="h-3 w-16 bg-slate-800/70 rounded animate-pulse" />
        <div className="h-4 w-full bg-slate-800/70 rounded animate-pulse" />
        <div className="h-5 w-20 bg-slate-800/70 rounded animate-pulse mt-3" />
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-xs uppercase tracking-wider text-slate-500 mt-1">
        {label}
      </div>
    </div>
  );
}

function Step({
  n,
  title,
  body,
  accent,
}: {
  n: string;
  title: string;
  body: string;
  accent: string;
}) {
  return (
    <div className="relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
      <div
        className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${accent} blur-2xl`}
      />
      <div className="relative">
        <div className="text-sm font-mono text-slate-500">{n}</div>
        <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
        <p className="mt-3 text-slate-400 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

function Strings() {
  return (
    <svg
      className="absolute inset-x-0 top-0 w-full h-64 opacity-30 pointer-events-none"
      viewBox="0 0 1200 256"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="str" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
        </linearGradient>
      </defs>
      {Array.from({ length: 12 }).map((_, i) => {
        const x = 60 + i * 95;
        return (
          <line
            key={i}
            x1={x}
            y1="0"
            x2={x + (i % 2 === 0 ? 6 : -6)}
            y2="256"
            stroke="url(#str)"
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
}
