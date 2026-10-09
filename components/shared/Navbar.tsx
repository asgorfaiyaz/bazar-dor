import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import Marquee from "react-fast-marquee";
import { Suspense } from "react";

import { cacheLife } from "next/cache";
import CurrentDate from "../CurrentDate";

async function getCategoryList(): Promise<
  { id: string; slug: string; nameBn: string; icon: string }[]
> {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
    {
      next: {
        revalidate: 24 * 60 * 1000,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

async function getTodaysBestProducts(): Promise<
  {
    id: string;
    slug: string;
    nameBn: string;
    image: string;
    today: string;
    unit: string;
    change: { dir: "up" | "down"; pct: number };
  }[]
> {
  "use cache";

  cacheLife("days");

  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

const Navbar = async () => {
  const navCategories = await getCategoryList();
  const todaysBestProducts = await getTodaysBestProducts();

  return (
    <>
      <header className="sticky top-0 left-0 z-50 bg-background">
        <div className="page-container flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="w-12 h-10 bg-primary text-primary-foreground flex justify-center items-center rounded-sm">
              <ShoppingCart />
            </div>
            <div className="py-2">
              <span className="font-bold">বাজার দর</span>
              <Suspense fallback={<h1>Loading ...</h1>}>
                <CurrentDate />
              </Suspense>
            </div>
          </div>
          <div className="flex gap-2 text-sm font-semibold!">
            <Link
              className={buttonVariants({
                variant: "secondary",
                className: "lg:text-lg! 2xl:text-2xl!",
              })}
              href={"/sign-in"}
            >
              সাইন ইন
            </Link>
            <Link
              className={buttonVariants({
                variant: "default",
                className: "lg:text-lg! 2xl:text-xl!",
              })}
              href={"/sign-up"}
            >
              সাইন আপ
            </Link>
          </div>
        </div>

        <nav className="page-container flex items-center gap-6 overflow-x-auto whitespace-nowrap bg-card scrollbar-none[&::-webkit-scrollbar]:hidden lg:gap-8">
          {navCategories?.map((c) => (
            <Link
              className="shrink-0 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground lg:text-base"
              href={c.slug}
              key={c.id}
            >
              {c.icon} {c.nameBn}
            </Link>
          ))}
        </nav>
      </header>
      <div className="overflow-hidden border-y bg-card py-3">
        <Marquee speed={60} pauseOnHover>
          {todaysBestProducts.slice(10).map((p) => {
            const isUp = p.change.dir === "up";

            return (
              <Link
                href={p.slug}
                key={p.id}
                className="mx-3 inline-flex items-center gap-3 rounded-lg border bg-background px-4 py-2 transition-colors hover:bg-accent"
              >
                <span className="text-xl">{p.image}</span>

                <span className="text-sm font-medium">{p.nameBn}</span>

                <span className="text-sm font-normal">
                  {p.today} টাকা
                  <span className="ml-1 font-normal text-muted-foreground">
                    / {p.unit}
                  </span>
                </span>

                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold ${
                    isUp ? "text-red-600" : "text-green-600"
                  }`}
                >
                  <span>{isUp ? "▲" : "▼"}</span>
                  {p.change.pct}%
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
