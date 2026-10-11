import { cacheLife } from "next/cache";

export type ProductMarket = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type DetailedProduct = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: ProductMarket[];
};

export const PRODUCTS_API = process.env.PRODUCTS_API!;
export async function getAllProducts(): Promise<DetailedProduct[]> {
  "use cache";
  cacheLife("hours");

  const res = await fetch(PRODUCTS_API);
  if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`);
  return res.json();
}

export function getTopMovers(
  products: DetailedProduct[],
  dir: DetailedProduct["change"]["dir"],
  limit = 6,
) {
  return products
    .filter((p) => p.change.dir === dir)
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, limit);
}

export async function getProductsByCategory(
  slug: string,
): Promise<DetailedProduct[]> {
  "use cache";
  cacheLife("minutes");
  const res = await fetch(`${PRODUCTS_API}?category=${slug}`);
  if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`);
  return res.json();
}
