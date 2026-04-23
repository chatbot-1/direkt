import { Link, NavLink } from "react-router-dom";
import type { Category } from "../types";

type Props = {
  categories: Category[];
};

export function SiteNav({ categories }: Props) {
  return (
    <nav className="relative z-20 border-b border-white/5 bg-slate-950/60 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-500 via-violet-500 to-indigo-500 grid place-items-center font-bold text-white shadow-md shadow-fuchsia-500/30">
            D
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            Direkt
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1 text-sm overflow-x-auto">
          {categories.map((c) => (
            <NavLink
              key={c.slug}
              to={`/category/${c.slug}`}
              className={({ isActive }) =>
                "px-3 py-1.5 rounded-full transition whitespace-nowrap " +
                (isActive
                  ? "bg-white/10 text-white"
                  : "text-slate-300 hover:text-white hover:bg-white/5")
              }
            >
              {c.name}
            </NavLink>
          ))}
        </div>

        <div className="flex-1" />

        <Link
          to="/browse"
          className="text-sm font-semibold px-4 py-2 rounded-full bg-white text-slate-900 hover:bg-slate-200 transition whitespace-nowrap"
        >
          Browse all →
        </Link>
      </div>
    </nav>
  );
}
