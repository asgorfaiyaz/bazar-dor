import type { DetailedProduct } from "@/lib/products";
import { ProductList } from "./ProductList";

type Props = {
  title: string;
  subTitle?: string;
  products: DetailedProduct[];
};

export function ProductSection({ title, subTitle, products }: Props) {
  if (products.length === 0) return null;

  return (
    <section id={title === "সব পণ্য" ? "সব-পণ্য" : title} className="space-y-4">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {subTitle && (
          <p className="text-sm text-muted-foreground">{subTitle}</p>
        )}
      </header>
      <ProductList products={products} />
    </section>
  );
}
