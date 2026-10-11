import { getCategoryBySlug } from "@/lib/categories";
import { formatCount } from "@/lib/format";
import { notFound } from "next/navigation";
import { getProductsByCategory } from "@/lib/products";
import Link from "next/link";
import { SortableProductList } from "@/components/products/SortableProductList";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryProducts({ params }: Props) {
  const { slug } = await params;
  const [category, products] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategory(slug),
  ]);
  if (!category) notFound();

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
            {formatCount(products.length || 0)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </header>

      {products.length === 0 ? (
        <div className="flex min-h-[30vh] flex-col items-center justify-center px-4 py-12 text-center">
          <h2 className="text-xl font-semibold">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            অন্য ক্যাটাগরি বা পণ্য দেখতে হোম পেজে ফিরে যান।
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <SortableProductList products={products} />
      )}
    </section>
  );
}
