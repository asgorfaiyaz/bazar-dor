"use client";

import { useRouter } from "next/navigation";

import { signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

export function useSignOut() {
  const router = useRouter();

  return async function handleSignOut() {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে");
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "সাইন আউট করা যায়নি");
        },
      },
    });
  };
}
