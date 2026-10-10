import { formatPercent, formatPrice, formatUnit } from "@/lib/format";
import { DetailedProduct } from "@/lib/products";
import { cn } from "@/lib/utils";

type Props = {
  product: DetailedProduct;
};

const TREND = {
  up: {
    symbol: "▲",
    className: "bg-success/10 text-success",
  },
  down: {
    symbol: "▼",
    className: "bg-destructive/10 text-destructive",
  },
  flat: {
    symbol: "—",
    className: "bg-muted text-muted-foreground",
  },
} as const;

function ProductOverview({ product }: Props) {
  const trend = TREND[product.change.dir];
  const priceDifference = Math.abs(product.today - product.yesterday);
  return (
    <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="flex flex-col gap-5 p-4 sm:p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl border bg-muted/60 text-4xl sm:size-20">
            <span aria-hidden="true">{product.image}</span>
          </div>

          <div className="min-w-0 space-y-1">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              {product.nameBn}
            </h1>

            <p className="text-sm text-muted-foreground">
              {formatUnit(product.unit)} <span aria-hidden="true">·</span>{" "}
              {product.categoryNameBn}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                  trend.className,
                )}
              >
                <span aria-hidden="true">{trend.symbol}</span>
                {formatPercent(product.change.pct)}%
              </span>

              <span className="text-sm text-muted-foreground">
                {trend.symbol}
                {product.change.dir !== "flat" &&
                  ` · ${formatPrice(priceDifference)} টাকা`}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-muted/50 p-4 md:min-w-52 md:bg-transparent md:p-0 md:text-right">
          <p className="text-sm font-medium text-muted-foreground">আজকের দাম</p>

          <p className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            {formatPrice(product.today)}
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              টাকা
            </span>
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            {formatUnit(product.unit)}
          </p>
        </div>
      </div>

      <div className="border-t bg-muted/20 px-4 py-3 sm:px-6">
        <p className="text-xs text-muted-foreground">
          গতকালের দাম: {formatPrice(product.yesterday)} টাকা
          <span className="mx-2" aria-hidden="true">
            ·
          </span>
          গত সপ্তাহে: {formatPrice(product.lastWeek)} টাকা
        </p>
      </div>
    </section>
  );
}

export default ProductOverview;
