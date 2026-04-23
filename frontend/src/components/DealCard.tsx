import type { Product } from "../types";
import { money, starRow } from "../utils";

type Props = {
  product: Product;
  variant?: "dark" | "light";
};

export function DealCard({ product: p, variant = "dark" }: Props) {
  const isDark = variant === "dark";

  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className={
        isDark
          ? "group relative block rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 overflow-hidden hover:border-fuchsia-400/40 hover:bg-white/[0.06] transition"
          : "group relative block rounded-2xl bg-white border border-slate-200 overflow-hidden hover:border-violet-400 hover:shadow-lg transition"
      }
    >
      <div
        className={
          "relative aspect-square overflow-hidden " +
          (isDark ? "bg-slate-900" : "bg-slate-100")
        }
      >
        {p.on_sale && (
          <span className="absolute top-3 left-3 z-10 bg-gradient-to-r from-fuchsia-500 to-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            -{p.discount_pct}%
          </span>
        )}
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement;
            el.style.display = "none";
            const parent = el.parentElement;
            if (parent && !parent.querySelector(".img-fallback")) {
              const div = document.createElement("div");
              div.className =
                "img-fallback absolute inset-0 grid place-items-center text-slate-400 text-xs";
              div.textContent = p.retailer;
              parent.appendChild(div);
            }
          }}
        />
      </div>
      <div className="p-4">
        <div
          className={
            "text-[10px] uppercase tracking-wider font-semibold " +
            (isDark ? "text-fuchsia-400" : "text-violet-600")
          }
        >
          {p.retailer}
        </div>
        <div
          className={
            "mt-1 text-sm font-medium line-clamp-2 min-h-[2.5rem] " +
            (isDark ? "text-slate-100" : "text-slate-900")
          }
        >
          {p.title}
        </div>
        <div
          className={
            "mt-1 text-xs " + (isDark ? "text-amber-400" : "text-amber-500")
          }
        >
          {starRow(p.rating)}{" "}
          <span className={isDark ? "text-slate-500" : "text-slate-500"}>
            {p.rating}
          </span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span
            className={
              "text-lg font-bold " + (isDark ? "text-white" : "text-slate-900")
            }
          >
            {money(p.sale_price, p.currency)}
          </span>
          {p.on_sale && (
            <span
              className={
                "text-xs line-through " +
                (isDark ? "text-slate-500" : "text-slate-400")
              }
            >
              {money(p.original_price, p.currency)}
            </span>
          )}
        </div>
        <div
          className={
            "mt-3 text-xs flex items-center gap-1 " +
            (isDark ? "text-slate-400" : "text-slate-500")
          }
        >
          Visit {p.retailer}
          <svg
            className="w-3 h-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>
      </div>
    </a>
  );
}
