import { formatPrice, formatUnit } from "@/lib/format";
import { ProductMarket } from "@/lib/products";
import { cn } from "@/lib/utils";

type PriceSummaryType = "min" | "max" | "avg";

type Props = {
  markets: ProductMarket[];
  unit: string;
};

function getProductPriceSummary(markets: ProductMarket[]) {
  if (markets.length === 0) {
    return null;
  }

  let min = Infinity;
  let max = -Infinity;
  let total = 0;

  for (const market of markets) {
    min = Math.min(min, market.min);
    max = Math.max(max, market.max);
    total += (market.min + market.max) / 2;
  }

  return {
    min,
    max,
    avg: Math.round(total / markets.length),
  };
}

const SUMMARY_CONFIG = {
  min: {
    title: "সর্বনিম্ন দাম",
    description: "বাজারগুলোর মধ্যে সবচেয়ে কম",
    symbol: "↓",
    color: "text-success",
  },
  max: {
    title: "সর্বোচ্চ দাম",
    description: "বাজারগুলোর মধ্যে সবচেয়ে বেশি",
    symbol: "↑",
    color: "text-destructive",
  },
  avg: {
    title: "গড় দাম",
    description: "প্রতিটি বাজারের গড় সীমার গড়",
    symbol: "≈",
    color: "text-primary",
  },
} as const;

function PriceSummaryCard({
  price,
  type,
  unit,
}: {
  price: number;
  type: PriceSummaryType;
  unit: string;
}) {
  const config = SUMMARY_CONFIG[type];

  return (
    <article className="rounded-2xl border bg-card p-4 shadow-sm transition-colors hover:bg-muted/20 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-medium text-muted-foreground">
          {config.title}
        </h3>

        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted text-lg font-bold",
            config.color,
          )}
          aria-hidden="true"
        >
          {config.symbol}
        </span>
      </div>

      <p
        className={cn(
          "mt-4 text-2xl font-bold tracking-tight tabular-nums sm:text-3xl",
          config.color,
        )}
      >
        {formatPrice(price)}
        <span className="ml-1 text-sm font-medium text-muted-foreground">
          টাকা
        </span>
      </p>

      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        {config.description}
      </p>

      <div className="mt-4 border-t pt-3 text-xs text-muted-foreground">
        প্রতি {formatUnit(unit)}
      </div>
    </article>
  );
}

export function PriceSummary({ markets, unit }: Props) {
  const summary = getProductPriceSummary(markets);

  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-bold tracking-tight sm:text-xl">
          দামের সারসংক্ষেপ
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          বিভিন্ন বাজারের দামের তুলনা
        </p>
      </div>

      {summary ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <PriceSummaryCard price={summary.min} type="min" unit={unit} />
          <PriceSummaryCard price={summary.max} type="max" unit={unit} />
          <PriceSummaryCard price={summary.avg} type="avg" unit={unit} />
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">
          দামের সারসংক্ষেপ পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
}
