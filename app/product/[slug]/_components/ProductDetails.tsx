import { DetailedProduct, PRODUCTS_API } from "@/lib/products";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { ProductBreadcrumb } from "./ProductBreadcrumb";
import { PriceSummary } from "./PriceSummary";
import { MarketPriceList } from "./MarketPriceList";
import ProductOverview from "./ProductOverview";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function getProductBySlug(
  slug: string,
): Promise<DetailedProduct | null> {
  "use cache";
  cacheLife("hours");

  const res = await fetch(`${PRODUCTS_API}?slug=${encodeURIComponent(slug)}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch product (${res.status})`);
  }

  const products = (await res.json()) as DetailedProduct[];
  return products[0] ?? null;
}

export default async function ProductDetails({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <section className="space-y-6 pb-8">
      {/* Powered by shadcn/ui */}
      <ProductBreadcrumb
        category={{
          slug: product.category,
          nameBn: product.categoryNameBn,
        }}
        productName={product.nameBn}
      />
      {/* Little desc about a product */}
      <ProductOverview product={product} />

      <PriceSummary markets={product.markets} unit={product.unit} />

      <MarketPriceList
        markets={product.markets}
        productName={product.nameBn}
        unit={product.unit}
      />
    </section>
  );
}
