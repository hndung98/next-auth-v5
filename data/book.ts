import { prisma } from "@/lib/db";
import { BookInfo } from "@/types/book";

export const getTotalPages = async (query: string, perPage = 10) => {
  try {
    const search = query?.trim();
    const count = await prisma.book.count({
      where: search
        ? {
            title: {
              contains: search,
              mode: "insensitive",
            },
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

export const getBooks = async (query: string, page: number, perPage = 10) => {
  try {
    const search = query?.trim();
    const books = await prisma.book.findMany({
      where: search
        ? {
            title: {
              contains: search,
              mode: "insensitive",
            },
          }
        : undefined,
      take: perPage,
      skip: (page - 1) * perPage,
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return books;
  } catch (error) {
    console.log("getBooks", error);
    return [];
  }
};

export const getBookById = async (id: string): Promise<BookInfo | null> => {
  try {
    const book = await prisma.book.findUnique({
      where: { productId: id },
      include: {
        product: {
          select: {
            categoryId: true,
            price: true,
          },
        },
      },
    });
    return book;
  } catch (error) {
    console.log("getBookById", error);
    return null;
  }
};
