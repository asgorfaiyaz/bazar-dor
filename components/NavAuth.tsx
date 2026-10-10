import { headers } from "next/headers";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { UserMenu } from "./UserMenu";

const linkClass = "text-sm font-semibold lg:text-base 2xl:text-lg";

async function getSession() {
  try {
    return await auth.api.getSession({ headers: await headers() });
  } catch (error) {
    console.error("Failed to get session:", error);
    return null;
  }
}

export async function NavAuth({ className }: { className?: string }) {
  const session = await getSession();
  if (session) {
    return (
      <div className={className}>
        <UserMenu user={session.user} />
      </div>
    );
  }

  return (
    <div className={cn("flex gap-2", className)}>
      <Link
        href="/sign-in"
        className={buttonVariants({
          variant: "secondary",
          className: linkClass,
        })}
      >
        সাইন ইন
      </Link>
      <Link
        href="/sign-up"
        className={buttonVariants({ variant: "default", className: linkClass })}
      >
        সাইন আপ
      </Link>
    </div>
  );
}
