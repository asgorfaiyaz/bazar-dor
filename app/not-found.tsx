import Link from "next/link";

export default function RootNotFoundPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <section className="w-full max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          404 — Not Found
        </p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          পেজটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
          আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে, এর ঠিকানা পরিবর্তন হয়েছে,
          অথবা লিংকটি ভুল।
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          হোমপেজে ফিরে যান
        </Link>
      </section>
    </main>
  );
}
