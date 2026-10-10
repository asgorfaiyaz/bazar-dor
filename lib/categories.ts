import { cacheLife } from "next/cache";

export const CATEGORIES_API = process.env.CATEGORIES_API!;

export type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  const res = await fetch(`${CATEGORIES_API}/${encodeURIComponent(slug)}`);

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch category by slug (${res.status})`);
  }

  return await res.json();
}

export async function getAllCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("hours");

  const res = await fetch(CATEGORIES_API);

  if (!res.ok) {
    throw new Error(`Failed to fetch categories (${res.status})`);
  }

  const data = await res.json();

  return data as Category[];
}
