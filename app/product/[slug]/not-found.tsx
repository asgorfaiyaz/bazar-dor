import Link from "next/link";

export default function ProductNotFound() {
  return (
    <section className="flex min-h-[40vh] flex-col items-center justify-center px-4 py-12 text-center">
      <h2 className="text-2xl font-bold">পণ্যটি পাওয়া যায়নি</h2>

      <p className="mt-2 text-sm text-muted-foreground">
        পণ্যের লিংকটি ভুল হতে পারে অথবা পণ্যটি আর উপলব্ধ নেই।
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        হোমপেজে ফিরে যান
      </Link>
    </section>
  );
}
