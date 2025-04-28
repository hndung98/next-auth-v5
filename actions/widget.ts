"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { withAuth } from "@/actions/with-auth";
import { getUserById } from "@/data/user";
import { prisma } from "@/lib/db";
import { WidgetSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";

const _createWidget = async (formData: FormData) => {
  const data = {
    name: formData.get("name") as string,
    url: formData.get("url") as string,
    userId: formData.get("userId") as string,
  };
  const validatedFields = WidgetSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields.",
      data: data,
    };
  }

  const { name, url, userId } = validatedFields.data;

  const existingUser = await getUserById(userId);
  if (!existingUser) {
    return {
      message: "User not found.",
      data: data,
    };
  }

  try {
    await prisma.widget.create({
      data: {
        name: name,
        url: url,
        userId: userId,
      },
    });
  } catch (error) {
    console.log("_createWidget", error);
    return {
      message: "Database Error: Failed to Create widget.",
      data: data,
    };
  }
  // Revalidate the cache for the widgets page and redirect the user.
  revalidatePath("/dashboard/widgets");
  redirect("/dashboard/widgets");
};

const _updateWidget = async (id: string, formData: FormData) => {
  const data = {
    name: formData.get("name") as string,
    url: formData.get("url") as string,
    userId: formData.get("userId") as string,
  };
  const validatedFields = WidgetSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields.",
      data: data,
    };
  }

  const { name, url, userId } = validatedFields.data;

  const existingUser = await getUserById(userId);
  if (!existingUser) {
    return {
      message: "User not found.",
      data: data,
    };
  }

  try {
    await prisma.widget.update({
      where: { id: id },
      data: {
        name: name,
        url: url,
        userId: userId,
      },
    });
  } catch (error) {
    console.log("_updateWidget", error);
    return {
      message: "Database Error: Failed to Update widget.",
      data: data,
    };
  }
  // Revalidate the cache for the widgets page and redirect the user.
  revalidatePath("/dashboard/widgets");
  redirect("/dashboard/widgets");
};

const _deleteWidget = async (id: string) => {
  const existingWidget = await prisma.widget.findUnique({ where: { id: id } });
  if (!existingWidget) {
    return {
      message: "Widget not found.",
    };
  }
  const user = await currentUser();
  if (user?.role !== "ADMIN" && user?.id !== existingWidget.userId) {
    return {
      message: "Cannot delete this widget.",
    };
  }

  try {
    await prisma.widget.delete({
      where: { id: id },
    });
    revalidatePath("/dashboard/widgets");
    return {};
  } catch (error) {
    console.log("_deleteWidget", error);
    return {
      message: "Database Error: Failed to Delete widget.",
    };
  }
};

export const createWidget = withAuth(_createWidget);
export const updateWidget = withAuth(_updateWidget);
export const deleteWidget = withAuth(_deleteWidget);
