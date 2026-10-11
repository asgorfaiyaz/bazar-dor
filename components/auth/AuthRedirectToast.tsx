"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export function AuthRedirectToast() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("reason") !== "login-required") return;

    toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "login-required" });
    router.replace("/signin"); // clean the url so a refresh doesn't repeat it
  }, [router]);

  return null;
}
