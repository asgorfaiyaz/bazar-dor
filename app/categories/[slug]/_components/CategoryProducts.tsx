import { getCategoryBySlug } from "@/lib/categories";
import { formatCount } from "@/lib/format";
import { notFound } from "next/navigation";
import { ProductList } from "../../../../components/products/ProductList";
import { getProductsByCategory } from "@/lib/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryProducts({ params }: Props) {
  const { slug } = await params;
  const [category, products] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategory(slug),
  ]);

  if (!category || products.length === 0) notFound();

  return (
    <section>
      <header className="space-y-1 flex items-center w-full bg-card">
        <div className="flex size-16 shrink-0 items-center justify-center rounded-xl text-3xl">
          {category.icon}
        </div>
        <div className="">
          <h2 className="text-xl font-semibold tracking-tight">
            {category.nameBn}
          </h2>
          <p className="text-sm text-muted-foreground">
            {formatCount(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </header>
      <div className="my-4">
        <h2>মোট{formatCount(products.length)}টি পণ্য দেখানো হচ্ছে</h2>
      </div>
      <ProductList products={products} />
    </section>
  );
}
