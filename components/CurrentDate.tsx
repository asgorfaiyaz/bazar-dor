import { cacheLife } from "next/cache";

export default async function CurrentDate() {
  "use cache";

  cacheLife("days");
  return (
    <p className="text-sm">
      {new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </p>
  );
}
