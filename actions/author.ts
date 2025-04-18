"use server";

import { z } from "zod";

import { withAdminOnly } from "@/actions/with-auth";
import { prisma } from "@/lib/db";
import { AuthorSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type AuthorState = {
  errors?: {
    name?: string[];
    nationality?: string[];
  };
  message?: string | null;
};

const _createAuthor = async (prevState: AuthorState, formData: FormData) => {
  const validatedFields = AuthorSchema.safeParse({
    name: formData.get("name"),
    nationality: formData.get("nationality"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create.",
    };
  }
  console.log(validatedFields.data);

  const { name, nationality } = validatedFields.data;

  const existingAuthor = await prisma.author.findFirst({
    where: {
      name: name,
      nationality: nationality,
    },
  });
  if (existingAuthor) {
    return { message: "Both name and nationality existed." };
  }

  try {
    await prisma.author.create({
      data: validatedFields.data,
    });
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to Create Author.",
    };
  }

  // Revalidate the cache for the authors page and redirect the user.
  revalidatePath("/admin/authors");
  redirect("/admin/authors");
};

const _updateAuthor = async (
  id: string,
  values: z.infer<typeof AuthorSchema>
) => {
  const validatedFields = AuthorSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Validation failed." };
  }

  try {
    await prisma.author.update({
      where: { id: id },
      data: validatedFields.data,
    });
    return { success: "Author updated!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong." };
  }
};

const _deleteAuthor = async (id: string) => {
  try {
    await prisma.author.delete({
      where: { id: id },
    });
    revalidatePath("/admin/authors");
    return {};
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong." };
  }
};

// apply admin-only privileges
export const createAuthor = withAdminOnly(_createAuthor);
export const updateAuthor = withAdminOnly(_updateAuthor);
export const deleteAuthor = withAdminOnly(_deleteAuthor);
