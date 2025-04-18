import { UserRole } from "@prisma/client";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required." }),
  password: z
    .string()
    .min(3, { message: "Password must contain at least 3 characters." }),
  code: z.optional(z.string()),
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

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(3)),
    newPassword: z.optional(z.string().min(3)),
  })
  .refine(
    (data) => {
      if (!data.newPassword && data.password) {
        return false;
      }
      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (!data.password && data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const AuthorSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must contain at least 3 characters." }),
  nationality: z
    .string()
    .min(3, { message: "Nationality must contain at least 3 characters." }),
});
