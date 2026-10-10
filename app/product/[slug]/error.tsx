"use client";

import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function ProductError({ error, retry }: Props) {
  useEffect(() => {
    // Send the error to your monitoring service if configured.
    console.error("Product page error:", error);
  }, [error]);

  return (
    <section className="flex min-h-[40vh] flex-col items-center justify-center px-4 py-12 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <span className="text-2xl" aria-hidden="true">
          !
        </span>
      </div>

      <h2 className="mt-5 text-xl font-bold tracking-tight">
        পণ্যটি লোড করা যায়নি
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        পণ্যের তথ্য আনতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।
      </p>

      <button
        type="button"
        onClick={() => retry()}
        className="mt-6 inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        আবার চেষ্টা করুন
      </button>
    </section>
  );
}
