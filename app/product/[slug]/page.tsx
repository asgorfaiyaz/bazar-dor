import { Suspense } from "react";
import ProductDetails from "./_components/ProductDetails";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<h1>Loading ...</h1>}>
      <ProductDetails params={params} />
    </Suspense>
  );
}
