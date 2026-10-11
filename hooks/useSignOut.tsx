"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { signOut } from "@/lib/auth-client";

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
