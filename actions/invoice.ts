"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { withAdminOnly } from "@/actions/with-auth";
import { getUserById } from "@/data/user";
import { prisma } from "@/lib/db";
import { InvoiceSchema } from "@/schemas";

const _createInvoice = async (formData: FormData) => {
  const data = {
    amount: Number(formData.get("amount") || ""),
    status: formData.get("status") as string,
    paymentMethod: formData.get("paymentMethod") as string,
    date: formData.get("date") as string,
    userId: formData.get("userId") as string,
  };
  const validatedFields = InvoiceSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields.",
      data: data,
    };
  }

  const { amount, status, paymentMethod, date, userId } = validatedFields.data;

  const existingUser = await getUserById(userId);
  if (!existingUser) {
    return {
      message: "Customer not found.",
      data: data,
    };
  }

  try {
    await prisma.invoice.create({
      data: {
        amount,
        status,
        paymentMethod,
        date,
        userId,
      },
    });
  } catch (error) {
    console.log("_createInvoice", error);
    return {
      message: "Database Error: Failed to Create Invoice.",
      data: data,
    };
  }
  // Revalidate the cache for the customers page and redirect the user.
  revalidatePath("/admin/invoices");
  redirect("/admin/invoices");
};

const _updateInvoice = async (id: string, formData: FormData) => {
  const data = {
    amount: Number(formData.get("amount") || ""),
    status: formData.get("status") as string,
    paymentMethod: formData.get("paymentMethod") as string,
    date: formData.get("date") as string,
    userId: formData.get("userId") as string,
  };
  const validatedFields = InvoiceSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields.",
      data: data,
    };
  }

  try {
  } catch (error) {
    console.log("_updateInvoice", error);
    return {
      message: "Database Error: Failed to Update Invoice.",
      data: data,
    };
  }
  // Revalidate the cache for the customers page and redirect the user.
  revalidatePath("/admin/invoices");
  redirect("/admin/invoices");
};

const _deleteInvoice = async (id: string) => {
  try {
    await prisma.invoice.delete({
      where: { id: id },
    });
    revalidatePath("/admin/invoices");
    return {};
  } catch (error) {
    return {
      message: "Database Error: Failed to Delete Invoice.",
    };
  }
};

// apply admin-only privileges
export const createInvoice = withAdminOnly(_createInvoice);
export const updateInvoice = withAdminOnly(_updateInvoice);
export const deleteInvoice = withAdminOnly(_deleteInvoice);
