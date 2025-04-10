import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required." }),
  password: z
    .string()
    .min(3, { message: "Password must contain at least 3 characters." }),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is required." }),
  password: z.string().min(3, { message: "Minimum 3 characters." }),
  name: z.string().min(1, { message: "Name is required." }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(3, { message: "Minimum 3 characters." }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required." }),
});
