import type { FilterState, SortKey } from "../types";

type Props = {
  state: FilterState;
  categories: string[];
  retailers: string[];
  count: number;
  onChange: (next: Partial<FilterState>) => void;
};

const pill =
  "px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-slate-200 hover:border-violet-400/50 focus:border-violet-400 outline-none transition";

export function FilterBar({
  state,
  categories,
  retailers,
  count,
  onChange,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 cursor-pointer hover:border-violet-400/50 transition">
        <input
          type="checkbox"
          className="accent-violet-500"
          checked={state.onSale}
          onChange={(e) => onChange({ onSale: e.target.checked })}
        />
        <span className="text-sm font-medium text-slate-200">On sale only</span>
      </label>

      <select
        className={pill}
        value={state.category}
        onChange={(e) => onChange({ category: e.target.value })}
      >
        <option value="" className="bg-slate-900">
          All categories
        </option>
        {categories.map((c) => (
          <option key={c} value={c} className="bg-slate-900">
            {c}
          </option>
        ))}
      </select>

      <select
        className={pill}
        value={state.retailer}
        onChange={(e) => onChange({ retailer: e.target.value })}
      >
        <option value="" className="bg-slate-900">
          All brands
        </option>
        {retailers.map((r) => (
          <option key={r} value={r} className="bg-slate-900">
            {r}
          </option>
        ))}
      </select>

      <select
        className={pill}
        value={state.sort}
        onChange={(e) => onChange({ sort: e.target.value as SortKey })}
      >
        <option value="" className="bg-slate-900">
          Sort: featured
        </option>
        <option value="discount_desc" className="bg-slate-900">
          Biggest discount
        </option>
        <option value="price_asc" className="bg-slate-900">
          Price: low to high
        </option>
        <option value="price_desc" className="bg-slate-900">
          Price: high to low
        </option>
        <option value="rating_desc" className="bg-slate-900">
          Top rated
        </option>
      </select>

      <div className="flex-1" />
      <span className="text-sm text-slate-400">
        {count} product{count === 1 ? "" : "s"}
      </span>
    </div>
  );
}
