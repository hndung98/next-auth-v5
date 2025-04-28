import { InvoiceStatus, PaymentMethod, UserRole } from "@prisma/client";
import * as z from "zod";

import { isValidDateString } from "@/lib/utils";

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

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
export const BookSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must contain at least 3 characters." }),
  authorId: z.string().nonempty("Author id cannot be empty"),
  pageCount: z.coerce
    .number()
    .gt(0, "Please enter a number greater than 0.")
    .lt(10_000, "Please enter a number less than 10 000."),
  publishedYear: z.coerce
    .number()
    .gt(0, "Please enter a number greater than 0.")
    .lt(new Date().getFullYear(), "Invalid year."),
  coverImage: z
    .any()
    .refine((file) => {
      return !file || file instanceof File;
    }, "Invalid file")
    .refine((file) => {
      if (!file) return true;
      return file?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine((file) => {
      if (!file) return true;
      return ACCEPTED_IMAGE_TYPES.includes(file?.type);
    }, "Only .jpg, .jpeg, .png formats are supported.")
    .optional(),
});

export const CustomerSchema = z.object({
  email: z.string().email({ message: "Email is required." }),
  password: z.string().min(3, { message: "Minimum 3 characters." }),
  newPassword: z.string().optional(),
  name: z.string().min(1, { message: "Name is required." }),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  image: z
    .any()
    .refine((file) => {
      return !file || file instanceof File;
    }, "Invalid file")
    .refine((file) => {
      if (!file) return true;
      return file?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine((file) => {
      if (!file) return true;
      return ACCEPTED_IMAGE_TYPES.includes(file?.type);
    }, "Only .jpg, .jpeg, .png formats are supported.")
    .optional(),
});

export const EditCustomerSchema = CustomerSchema.pick({
  email: true,
  name: true,
  role: true,
  newPassword: true,
  image: true,
});

export const InvoiceSchema = z.object({
  amount: z.coerce.number().gt(0, "Please enter a number greater than 0."),
  status: z.enum([
    InvoiceStatus.PENDING,
    InvoiceStatus.PAID,
    InvoiceStatus.CANCELED,
  ]),
  paymentMethod: z.enum([
    PaymentMethod.CASH,
    PaymentMethod.CREDIT,
    PaymentMethod.OTHER,
  ]),
  date: z.string().refine((value) => {
    return isValidDateString(value);
  }),
  userId: z.string().nonempty("User id cannot be empty"),
});

export const WidgetSchema = z.object({
  name: z.string().nonempty("Name id cannot be empty"),
  url: z.string().url({ message: "Invalid url" }),
  userId: z.string().nonempty("User id cannot be empty"),
});
