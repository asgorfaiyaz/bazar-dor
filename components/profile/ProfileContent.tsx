"use client";

import { ProfileForm } from "@/components/profile/ProfileForm";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function ProfileSkeleton() {
  return (
    <>
      <h1>Loading...</h1>
    </>
  );
}

export function ProfileContent() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) router.replace("/signin?reason=login-required");
  }, [isPending, session, router]);

  if (isPending || !session) return <ProfileSkeleton />;
  return (
    <>
      <ProfileHeader user={session.user} />
      <ProfileForm defaultName={session.user.name} />
    </>
  );
}
