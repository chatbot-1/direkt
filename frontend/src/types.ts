export type Product = {
  id: number;
  title: string;
  retailer: string;
  category: string;
  image: string;
  original_price: number;
  sale_price: number;
  currency: string;
  url: string;
  rating: number;
  discount_pct: number;
  on_sale: boolean;
};

export type ProductsResponse = {
  count: number;
  items: Product[];
};

export type FiltersResponse = {
  categories: string[];
  retailers: string[];
};

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  accent: string;
  image: string;
  product_count: number;
  on_sale_count: number;
  brand_count: number;
  top_discount_pct: number;
};

export type SortKey =
  | ""
  | "price_asc"
  | "price_desc"
  | "discount_desc"
  | "rating_desc";

export type FilterState = {
  q: string;
  category: string;
  retailer: string;
  onSale: boolean;
  sort: SortKey;
};
