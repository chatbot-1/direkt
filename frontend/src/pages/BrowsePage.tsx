import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories, fetchFilters, fetchProducts } from "../api";
import { FilterBar } from "../components/FilterBar";
import { SiteNav } from "../components/SiteNav";
import { DealCard } from "../components/DealCard";
import type { Category, FilterState, Product } from "../types";

const INITIAL_FILTERS: FilterState = {
  q: "",
  category: "",
  retailer: "",
  onSale: false,
  sort: "",
};

export function BrowsePage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [searchInput, setSearchInput] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [retailers, setRetailers] = useState<string[]>([]);
  const [navCategories, setNavCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Product[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setFilters((f) => ({ ...f, q: searchInput }));
    }, 250);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchInput]);

  useEffect(() => {
    fetchFilters()
      .then((d) => {
        setCategories(d.categories);
        setRetailers(d.retailers);
      })
      .catch((e: unknown) =>
        setError(e instanceof Error ? e.message : "Failed to load filters")
      );
    fetchCategories()
      .then(setNavCategories)
      .catch(() => setNavCategories([]));
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchProducts(filters)
      .then((d) => {
        if (cancelled) return;
        setItems(d.items);
        setCount(d.count);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Failed to load products");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [filters]);

  const onFilterChange = useMemo(
    () => (next: Partial<FilterState>) =>
      setFilters((f) => ({ ...f, ...next })),
    []
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <SiteNav categories={navCategories} />

      <div className="border-b border-white/5 bg-slate-950/80 sticky top-0 z-10 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="relative w-full">
            <input
              type="search"
              placeholder="Search every brand…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white/5 border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none text-slate-100 placeholder:text-slate-500"
            />
            <svg
              className="absolute left-4 top-3.5 w-5 h-5 text-slate-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <FilterBar
            state={filters}
            categories={categories}
            retailers={retailers}
            count={count}
            onChange={(next) => {
              // If user picks a category here, jump to the dedicated page
              if (
                next.category &&
                next.category !== filters.category &&
                !filters.q &&
                !filters.retailer
              ) {
                const match = navCategories.find(
                  (c) => c.name.toLowerCase() === next.category!.toLowerCase()
                );
                if (match) {
                  navigate(`/category/${match.slug}`);
                  return;
                }
              }
              onFilterChange(next);
            }}
          />
        </div>

        {error && (
          <div className="text-center py-12 text-rose-400">
            Could not reach the API. Make sure uvicorn is running on port 8000.
            <div className="text-xs text-slate-500 mt-2">{error}</div>
          </div>
        )}

        {!error && loading && items.length === 0 && (
          <div className="text-center py-20 text-slate-500">Loading…</div>
        )}

        {!error && !loading && count === 0 && (
          <div className="text-center py-20 text-slate-500">
            No products match your filters.
          </div>
        )}

        {count > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {items.map((p) => (
              <DealCard key={p.id} product={p} variant="dark" />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-white/5 py-10 px-6 mt-12">
        <div className="max-w-7xl mx-auto text-center text-sm text-slate-500">
          Direkt · Official brand stores only · No marketplaces
        </div>
      </footer>
    </div>
  );
}
