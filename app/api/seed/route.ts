import { NextRequest, NextResponse } from "next/server";

import {
  authorData,
  bookData,
  categoryData,
  customerData,
  inventoryData,
  invoiceData,
  productData,
  revenueData,
  userData,
} from "@/app/api/seed/placeholder-data";
import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

const SUPER_EMAILS = [
  "hoangdung.200298@gmail.com",
  "dunghoang.1610538@gmail.com",
];

async function seedUsers() {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: userData[0].email,
      },
    });
    if (!existingUser) await prisma.user.createMany({ data: userData });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteSeededUsers() {
  try {
    const emails = userData.map((user) => user.email);
    await prisma.user.deleteMany({
      where: {
        email: {
          in: emails,
        },
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function seedCustomer() {
  try {
    const existingCustomer = await prisma.customer.findUnique({
      where: {
        id: customerData[0].id,
      },
    });
    if (!existingCustomer)
      await prisma.customer.createMany({ data: customerData });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function seedAuthors() {
  try {
    const existingAuthor = await prisma.author.findFirst({
      where: {
        id: authorData[0].id,
      },
    });
    if (!existingAuthor) await prisma.author.createMany({ data: authorData });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function seedBooks() {
  try {
    const existingBook = await prisma.book.findFirst({
      where: {
        productId: bookData[0].productId,
      },
    });
    if (!existingBook) await prisma.book.createMany({ data: bookData });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteAllAuthors() {
  try {
    await prisma.author.deleteMany({});
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function seedCategory() {
  try {
    const existingCategory = await prisma.category.findFirst({
      where: {
        id: categoryData[0].id,
      },
    });
    if (!existingCategory)
      await prisma.category.createMany({ data: categoryData });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteAllCategories() {
  try {
    await prisma.category.deleteMany({});
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function seedProduct() {
  try {
    const existingProduct = await prisma.product.findFirst({
      where: {
        id: productData[0].id,
      },
    });
    if (!existingProduct)
      await prisma.product.createMany({ data: productData });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteAllProducts() {
  try {
    await prisma.product.deleteMany({});
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function seedInventory() {
  try {
    const existingInventory = await prisma.inventory.findFirst({
      where: {
        id: inventoryData[0].id,
      },
    });
    if (!existingInventory)
      await prisma.inventory.createMany({ data: inventoryData });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function seedInvoices() {
  try {
    const existingInvoice = await prisma.invoice.findFirst({
      where: {
        id: invoiceData[0].id,
      },
    });
    if (!existingInvoice)
      await prisma.invoice.createMany({ data: invoiceData });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function seedRevenue() {
  try {
    const existingRevenue = await prisma.revenue.findFirst({
      where: {
        id: revenueData[0].id,
      },
    });
    if (!existingRevenue)
      await prisma.revenue.createMany({ data: revenueData });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    if (user?.role !== "ADMIN") return new NextResponse(null, { status: 403 });
    if (user.email && !SUPER_EMAILS.includes(user.email))
      return new NextResponse(null, { status: 405 });

    const formData = await request.formData();
    const type = formData.get("type") as string;
    const tables = formData.get("tables") as string;
    switch (type) {
      case "create":
        if (tables.includes("user")) {
          await seedUsers();
          if (tables.includes("customer")) {
            await seedCustomer();
          }
          if (tables.includes("category")) {
            await seedCategory();
          }
          if (tables.includes("product")) {
            await seedProduct();
          }
          if (tables.includes("inventory")) {
            await seedInventory();
          }
          if (tables.includes("author")) {
            await seedAuthors();
          }
          if (tables.includes("book")) {
            await seedBooks();
          }
          if (tables.includes("invoice")) {
            await seedInvoices();
          }
          if (tables.includes("revenue")) {
            await seedRevenue();
          }
        }
        return new NextResponse(null, { status: 200 });

      case "delete":
        if (tables.includes("user")) {
          await deleteSeededUsers();
        }
        if (tables.includes("product")) {
          await deleteAllProducts();
        }
        if (tables.includes("category")) {
          await deleteAllCategories();
        }
        if (tables.includes("author")) {
          await deleteAllAuthors();
        }
        return new NextResponse(null, { status: 200 });

      default:
        throw new Error();
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}
