import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import Marquee from "react-fast-marquee";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import CurrentDate from "../CurrentDate";
import { formatPercent, formatPrice, formatUnit } from "@/lib/format";
import NavLink from "../NavLink";
import { getAllProducts } from "@/lib/products";
import { getAllCategories } from "@/lib/categories";
import { NavAuth } from "../NavAuth";
import { Skeleton } from "../ui/skeleton";

const TREND = {
  up: { symbol: "▲", className: "bg-success/10 text-success" },
  down: { symbol: "▼", className: "bg-destructive/10 text-destructive" },
  flat: { symbol: "—", className: "bg-muted text-muted-foreground" },
} as const;

const Navbar = async () => {
  const navCategories = await getAllCategories();
  const todaysBestProducts = await getAllProducts();

  return (
    <>
      <header className="sticky top-0 left-0 z-50 bg-background">
        <div className="page-container flex items-center justify-between">
          <Link href={"/"} className="flex items-center gap-2">
            <div className="flex h-9 w-11 items-center justify-center rounded-sm bg-primary text-primary-foreground sm:h-10 sm:w-12">
              <ShoppingCart className="size-4 sm:size-5 lg:size-6" />
            </div>
            <div className="flex flex-col py-2 leading-tight">
              <span className="text-base font-bold sm:text-lg lg:text-xl 2xl:text-2xl">
                বাজার দর
              </span>
              <div className="text-xs text-muted-foreground sm:text-sm lg:text-base ">
                <Suspense fallback={<span>Loading ...</span>}>
                  <CurrentDate />
                </Suspense>
              </div>
            </div>
          </Link>

          <Suspense fallback={<Skeleton className="h-9 w-35 rounded-lg" />}>
            <NavAuth />
          </Suspense>
        </div>

        <Suspense fallback={<h1>Loading...</h1>}>
          <nav className="bg-card scrollbar-none[&::-webkit-scrollbar]:hidden mb-1">
            <div className="page-container flex items-center gap-3 overflow-x-auto whitespace-nowrap lg:gap-5">
              {navCategories?.map((c) => (
                <NavLink
                  key={c.id}
                  href={`/categories/${c.slug}`}
                  className="shrink-0 px-3 py-1 rounded-lg my-2 text-sm font-semibold lg:text-base"
                >
                  {c.icon} {c.nameBn}
                </NavLink>
              ))}
            </div>
          </nav>
        </Suspense>
      </header>
      <div className="overflow-hidden border-y bg-card py-3">
        <Marquee speed={60} pauseOnHover>
          {todaysBestProducts.slice(10).map((p) => {
            const trend = TREND[p.change.pct === 0 ? "flat" : p.change.dir];

            return (
              <Link
                href={p.slug}
                key={p.id}
                className="mx-3 inline-flex items-center gap-3 rounded-lg border bg-background px-4 py-2 transition-colors hover:bg-accent"
              >
                <span className="text-xl">{p.image}</span>

                <span className="text-sm font-medium">{p.nameBn}</span>

                <span className="text-sm font-normal">
                  {formatPrice(p.today)}
                  <span className="ml-1 font-normal text-muted-foreground">
                    / {formatUnit(p.unit)}
                  </span>
                </span>

                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    trend.className,
                  )}
                >
                  {trend.symbol} {formatPercent(p.change.pct)}%
                </span>
              </Link>
            );
          })}
        </Marquee>
      </div>
    </>
  );
};

export default Navbar;
