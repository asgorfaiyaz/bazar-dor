"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type NavLinkProps = ComponentProps<typeof Link> & {
  href: string;
  exact?: boolean;
  activeClassName?: string;
};

export default function NavLink({
  href,
  exact = false,
  className,
  activeClassName,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "border-b-2 border-transparent text-muted-foreground transition-colors hover:text-foreground",
        isActive && "bg-primary text-primary-foreground",
        isActive && activeClassName,
        className,
      )}
      {...props}
    />
  );
}
