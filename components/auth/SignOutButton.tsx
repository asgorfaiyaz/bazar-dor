"use client";

import { Undo2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSignOut } from "@/hooks/useSignOut";

export function SignOutButton() {
  const handleSignOut = useSignOut();

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
