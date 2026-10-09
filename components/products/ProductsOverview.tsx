import { getAllProducts, getTopMovers } from "@/lib/products";
import { ProductSection } from "./ProductSection";
import { formatCount } from "@/lib/format";

export async function ProductsOverview() {
  const products = await getAllProducts();

  const risers = getTopMovers(products, "up");
  const fallers = getTopMovers(products, "down");

  return (
    <div className="space-y-10 mt-10">
      <ProductSection title="▲ আজ দাম বেড়েছে" products={risers} />
      <ProductSection title="▼ আজ দাম কমেছে" products={fallers} />
      <ProductSection
        title="সব পণ্য"
        subTitle={`মোট ${formatCount(products.length)}টি পণ্য দেখানো হচ্ছে`}
        products={products}
      />
    </div>
  );
}
