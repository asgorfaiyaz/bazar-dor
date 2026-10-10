export default function ProductNotFound() {
  return (
    <section className="flex min-h-[40vh] flex-col items-center justify-center px-4 py-12 text-center">
      <h2 className="text-2xl font-bold">পণ্যটি পাওয়া যায়নি</h2>

      <p className="mt-2 text-sm text-muted-foreground">
        পণ্যের লিংকটি ভুল হতে পারে অথবা পণ্যটি আর উপলব্ধ নেই।
      </p>
    </section>
  );
}
