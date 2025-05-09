import "server-only";

import { prisma } from "@/lib/db";

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findFirst({
      where: { email: email },
    });
    return passwordResetToken;
  } catch (error) {
    console.log("getPasswordResetTokenByEmail", error);
    return null;
  }
};

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });
    return passwordResetToken;
  } catch (error) {
    console.log("getPasswordResetTokenByToken", error);
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findFirst({
      where: { email },
    });
    return twoFactorToken;
  } catch (error) {
    console.log("getTwoFactorTokenByEmail", error);
    return null;
  }
};

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findUnique({
      where: { token },
    });
    return twoFactorToken;
  } catch (error) {
    console.log("getTwoFactorTokenByToken", error);
    return null;
  }
};

export const getTwoFactorTokenConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorTokenConfirmation =
      await prisma.twoFactorConfirmation.findUnique({
        where: { userId },
      });
    return twoFactorTokenConfirmation;
  } catch (error) {
    console.log("getTwoFactorTokenConfirmationByUserId", error);
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch (error) {
    console.log("getVerificationTokenByEmail", error);
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch (error) {
    console.log("getVerificationTokenByToken", error);
    return null;
  }
};
