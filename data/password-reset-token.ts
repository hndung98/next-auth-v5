import { prisma } from "@/lib/db";

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
