"use server";

import cuid from "cuid";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { withAdminOnly } from "@/actions/with-auth";
import {
  deleteBookImageFromCloudinary,
  uploadImageToCloudinary,
} from "@/lib/cloudinary";
import { prisma } from "@/lib/db";
import { BookSchema } from "@/schemas";

export type BookState = {
  errors?: {
    title?: string[];
    pageCount?: string[];
    publishedYear?: string[];
    authorId?: string[];
    categoryId?: string[];
    price?: string[];
    coverImage?: string[];
  };
  messages?: string | null;
  data?: {
    title: string;
    pageCount: number;
    publishedYear: number;
    authorId: string;
    categoryId: string;
    price: number;
  };
};

const _createBook = async (formData: FormData) => {
  const data = {
    title: formData.get("title") as string,
    price: Number(formData.get("price") || ""),
    pageCount: Number(formData.get("pageCount") || ""),
    publishedYear: Number(formData.get("publishedYear") || ""),
    authorId: formData.get("authorId") as string,
    categoryId: formData.get("categoryId") as string,
    coverImage: formData.get("coverImage"),
    coverImageFile: formData.get("coverImage") as File,
  };
  const validatedFields = BookSchema.safeParse(data);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields.",
      data: data,
    };
  }

  const existingAuthor = await prisma.author.findUnique({
    where: { id: data.authorId },
  });
  if (!existingAuthor) {
    return {
      errors: {
        authorId: ["This author was not found."],
      },
      message: "Invalid Field.",
      data: data,
    };
  }

  const existingCategory = await prisma.category.findUnique({
    where: { id: data.categoryId },
  });
  if (!existingCategory) {
    return {
      errors: {
        categoryId: ["This category was not found."],
      },
      message: "Invalid Field.",
      data: data,
    };
  }

  try {
    let imagePath = "";
    if (data.coverImage) {
      const uploaded = await uploadImageToCloudinary(data.coverImageFile);
      imagePath = uploaded.secure_url;
    }

    const id = cuid();
    await prisma.product.create({
      data: {
        id: id,
        name: data.title,
        type: "BOOK",
        price: data.price,
        categoryId: data.categoryId,
      },
    });

    await prisma.book.create({
      data: {
        productId: id,
        title: data.title,
        authorId: data.authorId,
        coverImagePath: imagePath,
        pageCount: data.pageCount,
        publishedYear: data.publishedYear,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to Create Book.",
      data: data,
    };
  }

  // Revalidate the cache for the authors page and redirect the user.
  revalidatePath("/dashboard/books");
  redirect("/dashboard/books");
};

const _updateBook = async (id: string, formData: FormData) => {
  const data = {
    title: formData.get("title") as string,
    price: Number(formData.get("price") || ""),
    pageCount: Number(formData.get("pageCount") || ""),
    publishedYear: Number(formData.get("publishedYear") || ""),
    authorId: formData.get("authorId") as string,
    categoryId: formData.get("categoryId") as string,
    coverImage: formData.get("coverImage"),
    coverImageFile: formData.get("coverImage") as File,
  };
  const validatedFields = BookSchema.safeParse(data);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields.",
      data: data,
    };
  }

  const existingAuthor = await prisma.author.findUnique({
    where: { id: data.authorId },
  });
  if (!existingAuthor) {
    return {
      errors: {
        authorId: ["This author was not found."],
      },
      message: "Invalid Author.",
      data: data,
    };
  }

  const existingBook = await prisma.book.findUnique({
    where: {
      productId: id,
    },
  });
  if (!existingBook) {
    return {
      errors: {
        title: ["This book was not found."],
      },
      message: "Invalid Book.",
      data: data,
    };
  }

  try {
    let imagePath = existingBook.coverImagePath || "";
    if (data.coverImage) {
      const uploaded = await uploadImageToCloudinary(data.coverImageFile);
      imagePath = uploaded.secure_url;
      if (existingBook.coverImagePath) {
        await deleteBookImageFromCloudinary(existingBook.coverImagePath);
      }
    }

    await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        price: data.price,
        name: data.title,
      },
    });

    await prisma.book.update({
      where: {
        productId: id,
      },
      data: {
        title: data.title !== existingBook.title ? data.title : undefined,
        authorId:
          data.authorId !== existingBook.authorId ? data.authorId : undefined,
        pageCount:
          data.pageCount !== existingBook.pageCount
            ? data.pageCount
            : undefined,
        publishedYear:
          data.publishedYear !== existingBook.publishedYear
            ? data.publishedYear
            : undefined,
        coverImagePath: imagePath,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to Create Book.",
      data: data,
    };
  }

  // Revalidate the cache for the authors page and redirect the user.
  revalidatePath("/dashboard/books");
  redirect("/dashboard/books");
};

const _deleteBook = async (id: string) => {
  const existingBook = await prisma.book.findUnique({
    where: {
      productId: id,
    },
  });
  if (!existingBook) {
    return {
      message: "This book was not found.",
    };
  }
  try {
    await prisma.book.delete({ where: { productId: id } });
    await prisma.product.delete({ where: { id: id } });
    await deleteBookImageFromCloudinary(existingBook.coverImagePath ?? "");
    revalidatePath("/dashboard/books");
    return {};
  } catch (error) {
    return {
      message: "Database Error: Failed to Delete Book.",
    };
  }
};

// apply admin-only privileges
export const createBook = withAdminOnly(_createBook);
export const updateBook = withAdminOnly(_updateBook);
export const deleteBook = withAdminOnly(_deleteBook);
