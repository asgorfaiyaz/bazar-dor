import { cacheLife } from "next/cache";

export type Product = {
  id: string;
  slug: string;
  nameBn: string;
  image: string;
  today: string;
  unit: string;
  change: { dir: "up" | "down"; pct: number };
};

const PRODUCTS_API = "https://api.api-store.workers.dev/api/bazardor/products";

export async function getAllProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("hours");

  const res = await fetch(PRODUCTS_API);
  if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`);
  return res.json();
}

export function getTopMovers(
  products: Product[],
  dir: Product["change"]["dir"],
  limit = 6,
) {
  return products
    .filter((p) => p.change.dir === dir)
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, limit);
}
