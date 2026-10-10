"use client";

import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleSignOut}
      className="border-destructive/60 bg-transparent text-destructive hover:bg-destructive/5 hover:text-destructive"
    >
      <Undo2 />
      সাইন আউট
    </Button>
  );
}
