import { prisma } from "@/lib/db";
import { Category } from "@prisma/client";

export const getCategories = async (
  query: string,
  page: number,
  perPage = 10
): Promise<Category[]> => {
  try {
    const search = query?.trim();
    const categories = await prisma.category.findMany({
      where: search
        ? {
            OR: [
              {
                name: {
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
    return categories;
  } catch (error) {
    console.log("getCategories", error);
    return [];
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });
    return category;
  } catch (error) {
    console.log("getCategoryById", error);
    return null;
  }
};
