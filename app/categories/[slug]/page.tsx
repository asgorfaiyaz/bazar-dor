import CategoryProducts from "@/app/categories/[slug]/_components/CategoryProducts";
import { Suspense } from "react";

type CateogryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CateogryPage({ params }: CateogryPageProps) {
  return (
    <Suspense fallback={<h1>Loading ...</h1>}>
      <CategoryProducts params={params} />
    </Suspense>
  );
}
