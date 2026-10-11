"use client";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

const providers = [
  { id: "google", label: "Google দিয়ে চালিয়ে যান", Icon: FcGoogle },
  { id: "github", label: "GitHub দিয়ে চালিয়ে যান", Icon: FaGithub },
] as const;

export function SocialAuthButtons({ disabled }: { disabled?: boolean }) {
  return (
    <>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        অথবা
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {providers.map(({ id, label, Icon }) => (
          <Button
            key={id}
            type="button"
            variant="outline"
            disabled={disabled}
            aria-label={label}
            className="h-10 rounded-lg bg-white text-sm font-medium"
            onClick={() =>
              signIn.social(
                { provider: id, callbackURL: "/" },
                {
                  onError: (ctx) => {
                    toast.error(ctx.error.message || "লগইন করা যায়নি");
                  },
                },
              )
            }
          >
            <Icon className="size-5 sm:size-4" />
            <span className="sr-only sm:not-sr-only">{label}</span>
          </Button>
        ))}
      </div>
    </>
  );
}
