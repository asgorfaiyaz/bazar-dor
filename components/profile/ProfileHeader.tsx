import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { SignOutButton } from "../auth/SignOutButton";

type ProfileHeaderProps = {
  user: { name: string; email: string; image?: string | null };
};

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <Card className="gap-0 rounded-2xl bg-[#f9faf7] py-0 shadow-none">
      <CardContent className="flex items-center gap-4 p-6">
        <Avatar className="size-20 rounded-xl">
          <AvatarImage
            src={user.image ?? undefined}
            alt={user.name}
            className="rounded-xl"
          />
          <AvatarFallback className="rounded-xl text-2xl">
            {user.name.trim().charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-xl font-semibold">{user.name}</h2>
          <p className="truncate text-muted-foreground">{user.email}</p>
        </div>

        <SignOutButton />
      </CardContent>
    </Card>
  );
}
