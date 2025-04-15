"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";

import { signIn, signOut } from "@/auth";
import {
  getPasswordResetTokenByToken,
  getTwoFactorTokenByEmail,
  getTwoFactorTokenConfirmationByUserId,
} from "@/data/token";
import { getUserByEmail } from "@/data/user";
import { prisma } from "@/lib/db";
import {
  sendPasswordResetEmail,
  sendTwoFactorTokenEmail,
  sendVerificationEmail,
} from "@/lib/mail";
import {
  generatePasswordResetToken,
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {
  LoginSchema,
  NewPasswordSchema,
  RegisterSchema,
  ResetSchema,
} from "@/schemas";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Inputs are invalid!" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }
  const passwordsMatch = await bcrypt.compare(password, existingUser.password);
  if (!passwordsMatch) {
    return { error: "Invalid password!" };
  }

  if (!existingUser.emailVerified) {
    return { error: "Email not verified!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const existingToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!existingToken) {
        return { error: "Invalid token!" };
      }
      if (existingToken.token !== code) {
        return { error: "Invalid token code!" };
      }

      const hasExpired = new Date(existingToken.expires) < new Date();
      if (hasExpired) {
        return { error: "Code expired!" };
      }

      await prisma.twoFactorToken.delete({
        where: {
          id: existingToken.id,
        },
      });

      const existingConfirmation = await getTwoFactorTokenConfirmationByUserId(
        existingUser.id
      );
      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }

      await prisma.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      if (twoFactorToken) {
        await sendTwoFactorTokenEmail(
          twoFactorToken.email,
          twoFactorToken.token
        );
      }
      return {
        twoFactor: true,
      };
    }
  }

  try {
    console.log({ callbackUrl });
    const res = await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
    if (res)
      return {
        success: "Logged in.",
      };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        case "CallbackRouteError":
          return { error: "Route error." };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};

export const logout = async () => {
  await signOut();
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Something went wrong!" };
  }

  const { email, password, name } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { email: email, name: name, password: hashedPassword },
  });

  const verificationToken = await generateVerificationToken(email);
  if (!verificationToken?.token) {
    return { error: "Something went wrong!" };
  }
  await sendVerificationEmail(email, verificationToken?.token);

  return { success: "Confirmation email sent!" };
};

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid email." };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Email not found." };
  }

  if (!existingUser.emailVerified) {
    return { error: "Email not verified." };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  if (!passwordResetToken) {
    return { error: "Something went wrong!" };
  }
  await sendPasswordResetEmail(email, passwordResetToken?.token);

  return {
    success: `Sent request to ${email}`,
  };
};

export const setNewPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string
) => {
  if (!token) {
    return { error: "Missing token." };
  }
  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid password." };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) return { error: "Token does not exist!" };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token has exprired!" };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: "Email does not exist!" };

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });
  await prisma.passwordResetToken.delete({ where: { id: existingToken.id } });

  return { success: "Password updated!" };
};
