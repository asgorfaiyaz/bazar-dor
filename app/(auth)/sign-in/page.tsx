"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";
import { signInSchema, SignInValues } from "@/lib/validations/auth";
import { AuthShell } from "@/components/auth/AuthShell";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";

const inputClass = "h-10 rounded-lg bg-white px-3 text-sm";

export default function SignInPage() {
  const router = useRouter();

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const { isSubmitting } = form.formState;
  const rootError = form.formState.errors.root?.message;

  async function onSubmit(values: SignInValues) {
    await signIn.email(values, {
      onSuccess: () => {
        router.push("/");
        router.refresh();
      },
      onError: (ctx) => {
        form.setError("root", { message: ctx.error.message });
      },
    });
  }

  return (
    <AuthShell
      title="সাইন ইন"
      description="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
      footer={
        <>
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-[#058a40] hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </>
      }
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="gap-4">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">ইমেইল</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className={inputClass}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">পাসওয়ার্ড</FieldLabel>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  className={inputClass}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {rootError && (
            <p role="alert" className="text-sm text-destructive">
              {rootError}
            </p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-10 w-full rounded-lg bg-success font-semibold text-white shadow-md hover:bg-success"
          >
            {isSubmitting ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </Button>
        </FieldGroup>
      </form>

      <SocialAuthButtons disabled={isSubmitting} />
    </AuthShell>
  );
}
