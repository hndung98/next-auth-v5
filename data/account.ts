import { prisma } from "@/lib/db";

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await prisma.account.findFirst({
      where: { userId: userId },
    });
    return account;
  } catch (error) {
    console.log("getAccountByUserId", error);
    return null;
  }
};
