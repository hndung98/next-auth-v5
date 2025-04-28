"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { withAdminOnly } from "@/actions/with-auth";
import { prisma } from "@/lib/db";
import { AuthorSchema } from "@/schemas";

export type AuthorState = {
  errors?: {
    name?: string[];
    nationality?: string[];
  };
  message?: string | null;
  data?: {
    name: string;
    nationality: string;
  };
};

const _createAuthor = async (prevState: AuthorState, formData: FormData) => {
  const data = {
    name: formData.get("name") as string,
    nationality: formData.get("nationality") as string,
  };
  const validatedFields = AuthorSchema.safeParse(data);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create.",
      data: data,
    };
  }

  const { name, nationality } = validatedFields.data;

  const existingAuthor = await prisma.author.findFirst({
    where: {
      name: name,
      nationality: nationality,
    },
  });
  if (existingAuthor) {
    return { message: "Both name and nationality existed.", data: data };
  }

  try {
    await prisma.author.create({
      data: validatedFields.data,
    });
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to Create Author.",
      data: data,
    };
  }

  // Revalidate the cache for the authors page and redirect the user.
  revalidatePath("/dashboard/authors");
  redirect("/dashboard/authors");
};

const _updateAuthor = async (
  id: string,
  prevState: AuthorState,
  formData: FormData
) => {
  const data = {
    name: formData.get("name") as string,
    nationality: formData.get("nationality") as string,
  };
  const validatedFields = AuthorSchema.safeParse(data);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create.",
      data: data,
    };
  }

  const { name, nationality } = validatedFields.data;
  const existingAuthor = await prisma.author.findFirst({
    where: {
      name: name,
      nationality: nationality,
    },
  });
  if (existingAuthor && id !== existingAuthor.id) {
    return {
      message: "Both name and nationality existed.",
      data: data,
    };
  }

  try {
    await prisma.author.update({
      where: { id: id },
      data: validatedFields.data,
    });
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to Update Author.",
      data: data,
    };
  }

  // Revalidate the cache for the authors page and redirect the user.
  revalidatePath("/dashboard/authors");
  redirect("/dashboard/authors");
};

const _deleteAuthor = async (id: string) => {
  try {
    await prisma.author.delete({
      where: { id: id },
    });
    revalidatePath("/dashboard/authors");
    return {};
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to Delete Author.",
    };
  }
};

// apply admin-only privileges
export const createAuthor = withAdminOnly(_createAuthor);
export const updateAuthor = withAdminOnly(_updateAuthor);
export const deleteAuthor = withAdminOnly(_deleteAuthor);
