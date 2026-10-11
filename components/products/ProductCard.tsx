import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatPercent, formatPrice, formatUnit } from "@/lib/format";
import type { DetailedProduct } from "@/lib/products";

const TREND = {
  up: { symbol: "▲", className: "bg-success/10 text-success" },
  down: { symbol: "▼", className: "bg-destructive/10 text-destructive" },
  flat: { symbol: "—", className: "bg-muted text-muted-foreground" },
} as const;

export default function ProductCard({ product }: { product: DetailedProduct }) {
  const { slug, nameBn, image, today, unit, change } = product;
  const trend = TREND[change.pct === 0 ? "flat" : change.dir];

  return (
    <Link
      href={`/product/${slug}`}
      className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-5 text-card-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex items-center gap-4">
        <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-muted text-3xl">
          {image}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold">{nameBn}</h3>
          <p className="text-sm text-muted-foreground">{formatUnit(unit)}</p>
        </div>
      </div>

      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-sm text-muted-foreground">আজকের দাম</p>
          <p className="text-2xl font-extrabold">
            {formatPrice(today)}{" "}
            <span className="text-base font-normal">টাকা</span>
          </p>
        </div>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold",
            trend.className,
          )}
        >
          {trend.symbol} {formatPercent(change.pct)}%
        </span>
      </div>
    </Link>
  );
}
