"use server";

import { revalidatePath } from "next/cache";
import { withAuth } from "./with-auth";
import { redirect } from "next/navigation";

const _createWidget = async (formData: FormData) => {
  const data = {
    name: formData.get("name") as string,
    url: formData.get("url") as string,
    userId: formData.get("userId") as string,
  };

  try {
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

const _updateWidget = async (formData: FormData) => {
  const data = {
    name: formData.get("name") as string,
    url: formData.get("url") as string,
    userId: formData.get("userId") as string,
  };

  try {
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
  try {
  } catch (error) {
    console.log("_deleteWidget", error);
    return {
      message: "Database Error: Failed to Delete widget.",
    };
  }
  // Revalidate the cache for the widgets page.
  revalidatePath("/dashboard/widgets");
};

export const createWidget = withAuth(_createWidget);
export const updateWidget = withAuth(_updateWidget);
