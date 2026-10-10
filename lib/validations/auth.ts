import * as z from "zod";

export const signInSchema = z.object({
  email: z.email("সঠিক ইমেইল দিন"),
  // No length rule on sign-in: only sign-up enforces the password policy
  password: z.string().min(1, "পাসওয়ার্ড দিন"),
});

export const signUpSchema = z
  .object({
    name: z.string().min(2, "নাম কমপক্ষে ২ অক্ষরের হতে হবে"),
    email: z.email("সঠিক ইমেইল দিন"),
    password: z.string().min(8, "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে"),
    confirmPassword: z.string().min(1, "পাসওয়ার্ড আবার লিখুন"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "পাসওয়ার্ড মিলছে না",
  });

export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;
