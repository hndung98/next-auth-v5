import { prisma } from "@/lib/db";

export const getRevenueOfYear = async () => {
  try {
    const revenue = await prisma.revenue.findMany({ take: 12 });
    return revenue;
  } catch (error) {
    console.log("getRevenue", error);
    return [];
  }
};
