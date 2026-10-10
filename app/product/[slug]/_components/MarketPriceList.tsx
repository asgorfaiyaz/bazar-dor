import { formatPrice, formatUnit } from "@/lib/format";
import { ProductMarket } from "@/lib/products";
import { cn } from "@/lib/utils";

type Props = {
  markets: ProductMarket[];
  productName: string;
  unit: string;
};

function MarketPriceRow({
  market,
  unit,
  isFirst,
}: {
  market: ProductMarket;
  unit: string;
  isFirst: boolean;
}) {
  return (
    <div
      className={cn(
        "group flex flex-col gap-3 p-4 transition-colors hover:bg-muted/40",
        "sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-5",
        !isFirst && "border-t",
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors group-hover:bg-background">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5"
            aria-hidden="true"
          >
            <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
        </div>

        <div className="min-w-0 space-y-1">
          <p className="truncate font-semibold leading-snug">{market.market}</p>
          <p className="text-sm text-muted-foreground">{market.division}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-dashed pt-3 sm:min-w-56 sm:justify-end sm:border-0 sm:pt-0">
        <div className="sm:text-right">
          <p className="text-xs text-muted-foreground">দামের পরিসর</p>

          <p className="mt-1 text-base font-bold tracking-tight tabular-nums sm:text-lg">
            {formatPrice(market.min)}
            <span className="mx-1 text-sm font-normal text-muted-foreground">
              –
            </span>
            {formatPrice(market.max)}
            <span className="ml-1 text-sm font-medium text-muted-foreground">
              টাকা
            </span>
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            প্রতি {formatUnit(unit)}
          </p>
        </div>

        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted/70 text-muted-foreground sm:hidden">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
            aria-hidden="true"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function MarketPriceEmptyState() {
  return (
    <div className="px-4 py-10 text-center sm:px-6">
      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6 text-muted-foreground"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v4m0 4h.01" />
        </svg>
      </div>

      <p className="mt-3 font-semibold">বাজারের তথ্য পাওয়া যায়নি</p>
      <p className="mt-1 text-sm text-muted-foreground">
        এই পণ্যের বাজারভিত্তিক দাম এখনো পাওয়া যায়নি।
      </p>
    </div>
  );
}

export function MarketPriceList({ markets, productName, unit }: Props) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-bold tracking-tight sm:text-xl">
          বাজারভিত্তিক দাম
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          বিভিন্ন বাজারে {productName}-এর দামের পরিসর
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        {markets.length > 0 ? (
          markets.map((market, index) => (
            <MarketPriceRow
              key={`${market.market}-${market.division}`}
              market={market}
              unit={unit}
              isFirst={index === 0}
            />
          ))
        ) : (
          <MarketPriceEmptyState />
        )}
      </div>
    </section>
  );
}
