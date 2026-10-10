"use client";

import { ProfileForm } from "@/components/profile/ProfileForm";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { useSession } from "@/lib/auth-client";

function ProfileSkeleton() {
  return (
    <>
      <h1>Loading...</h1>
    </>
  );
}

export function ProfileContent() {
  const { data: session, isPending } = useSession();

  if (isPending || !session) return <ProfileSkeleton />;
  return (
    <>
      <ProfileHeader user={session.user} />
      <ProfileForm defaultName={session.user.name} />
    </>
  );
}
