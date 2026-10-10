"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  updateProfileSchema,
  type UpdateProfileValues,
} from "@/lib/validations/auth";
import { updateUser } from "@/lib/auth-client";

export function ProfileForm({ defaultName }: { defaultName: string }) {
  const router = useRouter();

  const form = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: defaultName },
  });

  const { isSubmitting, isDirty, isSubmitSuccessful } = form.formState;
  const rootError = form.formState.errors.root?.message;

  async function onSubmit(values: UpdateProfileValues) {
    const { error } = await updateUser({ name: values.name });

    if (error) {
      form.setError("root", {
        message: error.message ?? "আপডেট করা যায়নি, আবার চেষ্টা করুন",
      });
      return;
    }

    form.reset(values, { keepIsSubmitSuccessful: true });
    router.refresh();
  }

  return (
    <Card className="gap-0 rounded-2xl bg-[#f9faf7] py-0 shadow-none">
      {/* tit */}
      <CardHeader className="pt-6">
        <CardTitle className="text-lg">তথ্য</CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FieldGroup className="gap-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">নাম</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    autoComplete="name"
                    className="h-10 rounded-lg bg-white px-3 text-sm"
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
            {isSubmitSuccessful && !isDirty && (
              <p role="status" className="text-sm text-[#058a40]">
                তথ্য আপডেট হয়েছে
              </p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting || !isDirty}
              className="h-10 w-full rounded-lg bg-[#058a40] font-semibold text-white shadow-md hover:bg-[#047636]"
            >
              {isSubmitting ? "অপেক্ষা করুন..." : "আপডেট"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
