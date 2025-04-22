"use server";

import { prisma } from "@/lib/db";
import { withAdminOnly } from "./with-auth";
import { revalidatePath } from "next/cache";
import { BookSchema } from "@/schemas";
import { redirect } from "next/navigation";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

export type BookState = {
  errors?: {
    title?: string[];
    pageCount?: string[];
    publishedYear?: string[];
    authorId?: string[];
    coverImage?: string[];
  };
  messages?: string | null;
  data?: {
    title: string;
    pageCount: number;
    publishedYear: number;
    authorId: string;
  };
};

const _createBook = async (formData: FormData) => {
  const data = {
    title: formData.get("title") as string,
    pageCount: Number(formData.get("pageCount") || ""),
    publishedYear: Number(formData.get("publishedYear") || ""),
    authorId: formData.get("authorId") as string,
    coverImage: formData.get("coverImage") as File,
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
        title: ["This author was not found."],
      },
      message: "Invalid Field.",
      data: data,
    };
  }

  try {
    const uploaded = await uploadImageToCloudinary(data.coverImage);
    const imagePath = uploaded.secure_url;
    console.log({ imagePath });
    await prisma.book.create({
      data: {
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
  revalidatePath("/admin/books");
  redirect("/admin/books");
};

const _updateBook = async (prevState: BookState, formData: FormData) => {};

const _deleteBook = async (id: string) => {
  try {
    await prisma.book.delete({ where: { id: id } });
    revalidatePath("/admin/books");
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
