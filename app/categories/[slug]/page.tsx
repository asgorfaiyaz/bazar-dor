import CategoryProducts from "@/app/categories/[slug]/_components/CategoryProducts";
import { ProductListSkeleton } from "@/components/products/ProductsSkeleton";
import { Suspense } from "react";

type CateogryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CateogryPage({ params }: CateogryPageProps) {
  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <CategoryProducts params={params} />
    </Suspense>
  );
}
