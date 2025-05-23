import { prisma } from "@/lib/db";

export const checkBlacklist = async (token: string) => {
  try {
    const existingToken = await prisma.tokenBlacklist.findUnique({
      where: {
        token: token,
      },
    });
    return !!existingToken;
  } catch (error) {
    console.log("checkBlacklist", error);
    return true;
  }
};
