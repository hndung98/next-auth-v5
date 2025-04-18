"use server";

import { z } from "zod";

import { withAdminOnly } from "@/actions/with-auth";
import { prisma } from "@/lib/db";
import { AuthorSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

const _createAuthor = async (values: z.infer<typeof AuthorSchema>) => {
  const validatedFields = AuthorSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Validation failed." };
  }

  const { name, nationality } = validatedFields.data;

  const existingAuthor = await prisma.author.findFirst({
    where: {
      name: name,
      nationality: nationality,
    },
  });
  if (existingAuthor) {
    return { error: "Both name and nationality existed." };
  }

  try {
    await prisma.author.create({
      data: validatedFields.data,
    });
    return { success: "Author created!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong." };
  }
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
    return { success: "Author deleted!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong." };
  }
};

// apply admin-only privileges
export const createAuthor = withAdminOnly(_createAuthor);
export const updateAuthor = withAdminOnly(_updateAuthor);
export const deleteAuthor = withAdminOnly(_deleteAuthor);
