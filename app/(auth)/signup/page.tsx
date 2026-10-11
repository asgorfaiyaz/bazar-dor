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
import { signUp } from "@/lib/auth-client";
import { signUpSchema, type SignUpValues } from "@/lib/validations/auth";
import { AuthShell } from "@/components/auth/AuthShell";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { toast } from "sonner";

const inputClass = "h-10 rounded-lg bg-white px-3 text-sm";

const fields = [
  {
    name: "name",
    label: "নাম",
    type: "text",
    autoComplete: "name",
    placeholder: "যেমন: রহিম উদ্দিন",
  },
  {
    name: "email",
    label: "ইমেইল",
    type: "email",
    placeholder: "you@example.com",
  },
  {
    name: "password",
    label: "পাসওয়ার্ড",
    type: "password",
    autoComplete: "new-password",
    placeholder: "কমপক্ষে ৮ অক্ষর",
  },
  {
    name: "confirmPassword",
    label: "পাসওয়ার্ড নিশ্চিত করুন",
    type: "password",
    autoComplete: "new-password",
    placeholder: "আবার লিখুন",
  },
] as const;

export default function SignUpPage() {
  const router = useRouter();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const { isSubmitting } = form.formState;
  const rootError = form.formState.errors.root?.message;

  async function onSubmit({ name, email, password }: SignUpValues) {
    await signUp.email(
      { name, email, password },
      {
        onSuccess: () => {
          toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এখন সাইন ইন করুন");
          router.push("/signin");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
        },
      },
    );
  }

  function onInvalid() {
    toast.error("ফর্মের তথ্য সঠিক নয়, দয়া করে ঠিক করুন");
  }

  return (
    <AuthShell
      title="অ্যাকাউন্ট তৈরি করুন"
      description="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
      footer={
        <>
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-success hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </>
      }
    >
      <form onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
        <FieldGroup className="gap-4">
          {fields.map(({ name, label, ...inputProps }) => (
            <Controller
              key={name}
              name={name}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={name}>{label}</FieldLabel>
                  <Input
                    {...field}
                    {...inputProps}
                    id={name}
                    className={inputClass}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          ))}

          {rootError && (
            <p role="alert" className="text-sm text-destructive">
              {rootError}
            </p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-10 w-full rounded-lg bg-[#058a40] font-semibold text-white shadow-md hover:bg-[#047636]"
          >
            {isSubmitting ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
          </Button>
        </FieldGroup>
      </form>

      <SocialAuthButtons disabled={isSubmitting} />
    </AuthShell>
  );
}
