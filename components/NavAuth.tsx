"use client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserMenu } from "./UserMenu";
import { useSession } from "@/lib/auth-client";

const linkClass = "text-sm font-semibold lg:text-base 2xl:text-lg";

export function NavAuth({ className }: { className?: string }) {
  const { data: session, isPending } = useSession();
  if (isPending) return <div className="h-9 w-32" />;

  if (session) {
    return (
      <div className={className}>
        <UserMenu user={session.user} />
      </div>
    );
  }

  return (
    <div className={cn("flex gap-2", className)}>
      <Link
        href="/signin"
        className={buttonVariants({
          variant: "secondary",
          className: linkClass,
        })}
      >
        সাইন ইন
      </Link>
      <Link
        href="/signup"
        className={buttonVariants({ variant: "default", className: linkClass })}
      >
        সাইন আপ
      </Link>
    </div>
  );
}
