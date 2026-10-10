"use client";

export default function CurrentDate() {
  return (
    <p className="text-sm">
      {new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Dhaka",
      })}
    </p>
  );
}
