import { Skeleton } from "@/components/ui/skeleton";

function CardSkeleton() {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-4">
        <Skeleton className="size-16 shrink-0 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
      <div className="flex items-end justify-between gap-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-7 w-28" />
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}

export function ProductListSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div role="status">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: count }, (_, i) => (
          <li key={i}>
            <CardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProductsOverviewSkeleton() {
  return (
    <div className="mt-10 space-y-10">
      {[6, 6, 8].map((count, i) => (
        <section key={i} className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-7 w-44" />
            <Skeleton className="h-4 w-64" />
          </div>
          <ProductListSkeleton count={count} />
        </section>
      ))}
    </div>
  );
}
