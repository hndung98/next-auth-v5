import { prisma } from "@/lib/db";

export const getAuthorPages = async (query: string, perPage = 10) => {
  try {
    var args = undefined;
    if (query) {
      args = {
        where: {
          name: {
            contains: query,
          },
        },
      };
    }
    const count = await prisma.author.count(args);
    const totalPages = Math.ceil(count / perPage);
    return totalPages;
  } catch (error) {
    console.log("getAuthorPages", error);
    return 0;
  }
};
