import Link from "next/link";
import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

type AuthShellProps = {
  title: string;
  description: string;
  footer: ReactNode;
  children: ReactNode;
};

export function AuthShell({
  title,
  description,
  footer,
  children,
}: AuthShellProps) {
  return (
    <main className="flex min-h-screen flex-col items-center px-0 lg:px-4 py-5">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </header>

      <Card className="w-full max-w-2xl gap-0 rounded-lg md:rounded-2xl border bg-[#f9faf7] py-0 shadow-none">
        <CardContent className="space-y-4 p-3 lg:p-6">
          {children}
          <p className="text-center text-sm">{footer}</p>
        </CardContent>
      </Card>

      <Link
        href="/"
        className="mt-6 text-sm text-muted-foreground hover:text-foreground"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
