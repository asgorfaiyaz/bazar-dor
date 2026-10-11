import Banner from "@/components/Banner";
import { ProductsOverview } from "@/components/products/ProductsOverview";
import { ProductsOverviewSkeleton } from "@/components/products/ProductsSkeleton";
import { Suspense } from "react";

function Home() {
  return (
    <div className="">
      <Banner />
      <Suspense fallback={<ProductsOverviewSkeleton />}>
        <ProductsOverview />
      </Suspense>
    </div>
  );
}

export default Home;
