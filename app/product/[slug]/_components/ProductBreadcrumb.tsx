import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Props = {
  category: { slug: string; nameBn: string };
  productName: string;
};

export function ProductBreadcrumb({ category, productName }: Props) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-xs leading-relaxed sm:text-sm lg:text-base 2xl:text-lg [&>li>svg]:size-3 sm:[&>li>svg]:size-3.5 lg:[&>li>svg]:size-4">
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/" />}>হোম</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            render={<Link href={`/categories/${category.slug}`} />}
          >
            {category.nameBn}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="line-clamp-1 max-w-[40vw] font-semibold text-primary sm:max-w-none">
            {productName}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
