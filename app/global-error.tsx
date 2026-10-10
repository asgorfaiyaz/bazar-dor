"use client";

import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="bn">
      <body>
        <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12 text-foreground">
          <section className="w-full max-w-md rounded-2xl border bg-card p-6 text-center shadow-sm sm:p-8">
            <div
              className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-destructive/10 text-destructive"
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold tracking-tight">
              দুঃখিত, কিছু একটা সমস্যা হয়েছে!
            </h1>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              পেজটি লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন। সমস্যা চলতে থাকলে
              কিছুক্ষণ পর আবার আসুন।
            </p>

            {error.digest && (
              <p className="mt-4 text-xs text-muted-foreground">
                Error reference: {error.digest}
              </p>
            )}

            <button
              type="button"
              onClick={() => reset()}
              className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto"
            >
              আবার চেষ্টা করুন
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
