import { Book } from "@prisma/client";

export type BookInfo = Book & {
  product: {
    categoryId: string;
    price: number;
  };
};
