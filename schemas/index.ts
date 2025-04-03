import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required." }),
  password: z
    .string()
    .min(3, { message: "Password must contain at least 3 characters." }),
});
