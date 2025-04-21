import { prisma } from "@/lib/db";
import { Author } from "@prisma/client";

export const getAuthors = async (
  query: string,
  page: number,
  perPage = 10
): Promise<Author[]> => {
  try {
    const search = query?.trim();
    const authors = await prisma.author.findMany({
      where: search
        ? {
            OR: [
              {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                nationality: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          }
        : undefined,
      take: perPage,
      skip: (page - 1) * perPage,
    });
    return authors;
  } catch (error) {
    console.log("getAuthorPages", error);
    return [];
  }
};

export const getAuthorById = async (id: string): Promise<Author | null> => {
  try {
    const author = await prisma.author.findUnique({
      where: { id },
    });
    return author;
  } catch (error) {
    console.log("getAuthorById", error);
    return null;
  }
};

export const getTotalPages = async (query: string, perPage = 10) => {
  try {
    const search = query?.trim();
    const count = await prisma.author.count({
      where: search
        ? {
            OR: [
              {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                nationality: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          }
        : undefined,
    });
    const totalPages = Math.ceil(count / perPage);
    return totalPages;
  } catch (error) {
    console.log("getTotalPages", error);
    return 0;
  }
};
