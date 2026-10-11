"use client";

import { useState } from "react";
import { SelectDropdown } from "../SelectDropDown";
import { ProductList } from "./ProductList";
import { DetailedProduct } from "@/lib/products";
import { formatCount } from "@/lib/format";

const SORT_OPTIONS = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];
export function SortableProductList({
  products,
}: {
  products: DetailedProduct[];
}) {
  const [sort, setSort] = useState<SortValue>("default");
  function sortProducts(products: DetailedProduct[], sort: SortValue) {
    if (sort === "default") {
      return products;
    }
    return [...products].sort((a, b) => {
      return sort === "price-asc" ? a.today - b.today : b.today - a.today;
    });
  }
  return (
    <div className="space-y-3 mt-3">
      <div className="bg-card flex justify-center md:justify-end items-center p-2">
        <SelectDropdown
          label="সাজান"
          options={SORT_OPTIONS}
          defaultValue="default"
          onValueChange={(v) => setSort(v as SortValue)}
        />
      </div>
      <div className="my-4">
        <h2>মোট {formatCount(products.length)}টি পণ্য দেখানো হচ্ছে</h2>
      </div>
      <ProductList products={sortProducts(products, sort)} />
    </div>
  );
}
