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
import { updateUser } from "@/lib/auth-client";
import {
  updateProfileSchema,
  type UpdateProfileValues,
} from "@/lib/validations/auth";
import toast from "react-hot-toast";

export function ProfileForm({ defaultName }: { defaultName: string }) {
  const router = useRouter();

  const form = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: defaultName },
  });

  const { isSubmitting, isDirty } = form.formState;

  async function onSubmit(values: UpdateProfileValues) {
    const { error } = await updateUser({ name: values.name });

    if (error) {
      toast.error(error.message || "আপডেট করা যায়নি, আবার চেষ্টা করুন");
      return;
    }
    // show a toast msg
    toast.success("তথ্য আপডেট হয়েছে");
    form.reset(values);
    router.refresh();
  }

  function onInvalid() {
    toast.error("ফর্মের তথ্য সঠিক নয়, দয়া করে ঠিক করুন");
  }

  return (
    <Card className="gap-0 rounded-2xl bg-[#f9faf7] py-0 shadow-none">
      <CardHeader className="pt-6">
        <CardTitle className="text-lg">তথ্য</CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} noValidate>
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
                    // autoComplete="name"
                    className="h-10 rounded-lg bg-white px-3 text-sm"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

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
