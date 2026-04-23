import type {
  Category,
  FilterState,
  FiltersResponse,
  ProductsResponse,
} from "./types";

const API_BASE = "http://127.0.0.1:8000";

export async function fetchFilters(): Promise<FiltersResponse> {
  const res = await fetch(`${API_BASE}/api/filters`);
  if (!res.ok) throw new Error(`Filters failed: ${res.status}`);
  return res.json();
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/api/categories`);
  if (!res.ok) throw new Error(`Categories failed: ${res.status}`);
  return res.json();
}

export async function fetchProducts(
  state: Partial<FilterState>
): Promise<ProductsResponse> {
  const params = new URLSearchParams();
  if (state.q) params.set("q", state.q);
  if (state.category) params.set("category", state.category);
  if (state.retailer) params.set("retailer", state.retailer);
  if (state.onSale) params.set("on_sale", "true");
  if (state.sort) params.set("sort", state.sort);

  const res = await fetch(`${API_BASE}/api/products?${params.toString()}`);
  if (!res.ok) throw new Error(`Products failed: ${res.status}`);
  return res.json();
}
