import { cacheLife } from "next/cache";
import { Product } from "./products";

export type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};
export async function getCategoryBySlug(slug: string): Promise<Category> {
  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/categories/${slug}`,
  );
  if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`);
  return res.json();
}
export async function getProductsByCategory(slug: string): Promise<Product[]> {
  "use cache";
  cacheLife("minutes");
  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${slug}`,
  );
  if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`);
  return res.json();
}
