import { NextRequest, NextResponse } from "next/server";

import {
  authors,
  invoices,
  revenue,
  users,
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
        email: users[0].email,
      },
    });
    if (!existingUser) await prisma.user.createMany({ data: users });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteSeededUsers() {
  try {
    const emails = users.map((user) => user.email);
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

async function seedInvoices() {
  try {
    const existingInvoice = await prisma.invoice.findFirst({
      where: {
        id: invoices[0].id,
      },
    });
    if (!existingInvoice) await prisma.invoice.createMany({ data: invoices });

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
        id: revenue[0].id,
      },
    });
    if (!existingRevenue) await prisma.revenue.createMany({ data: revenue });
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
        id: authors[0].id,
      },
    });
    if (!existingAuthor) await prisma.author.createMany({ data: authors });
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
        if (tables.includes("author")) {
          await seedAuthors();
        }
        if (tables.includes("user")) {
          await seedUsers();
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
