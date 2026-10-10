"use client";

import { ChevronDown, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth-client";

type UserMenuProps = {
  user: { name: string; email: string; image?: string | null };
};

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();
  const firstName = user.name.trim().split(" ")[0];

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
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="ইউজার মেনু"
      >
        <Avatar className="size-9">
          <AvatarImage src={user.image ?? undefined} alt={user.name} />
          <AvatarFallback>{firstName.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="hidden text-sm font-medium sm:inline lg:text-base">
          {firstName}
        </span>
        <ChevronDown className="size-3 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60 rounded-xl p-2">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="space-y-0.5 px-2 py-2">
            <p className="text-base font-semibold">{user.name}</p>
            <p className="truncate text-sm font-normal text-muted-foreground">
              {user.email}
            </p>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            render={<Link href="/profile" />}
          >
            <User /> আমার প্রোফাইল
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer"
            onClick={handleSignOut}
          >
            <LogOut /> সাইন আউট
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
