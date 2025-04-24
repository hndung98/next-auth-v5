"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { withAdminOnly } from "@/actions/with-auth";
import { getUserByEmail } from "@/data/user";
import { prisma } from "@/lib/db";
import { CustomerSchema } from "@/schemas";

const _createCustomer = async (formData: FormData) => {
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const validatedFields = CustomerSchema.safeParse(data);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields.",
      data: data,
    };
  }

  const { email, name, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { message: "Email already in use!", data: data };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
        emailVerified: new Date(),
      },
    });
  } catch (error) {
    console.log("_createCustomer", error);
    return {
      message: "Database Error: Failed to Create Customer.",
      data: data,
    };
  }
  // Revalidate the cache for the customers page and redirect the user.
  revalidatePath("/admin/customers");
  redirect("/admin/customers");
};

const _updateCustomer = async (formData: FormData) => {
  const data = {
    name: formData.get("name") as string,
  };
  try {
  } catch (error) {
    console.log("_updateCustomer", error);
  }
  // Revalidate the cache for the customers page and redirect the user.
  revalidatePath("/admin/customers");
  redirect("/admin/customers");
};

const _deleteCustomer = async (id: string) => {
  try {
    await prisma.author.delete({
      where: { id: id },
    });
    revalidatePath("/admin/customers");
    return {};
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to Delete Author.",
    };
  }
};

// apply admin-only privileges
export const createCustomer = withAdminOnly(_createCustomer);
export const updateCustomer = withAdminOnly(_updateCustomer);
export const deleteCustomer = withAdminOnly(_deleteCustomer);
