import * as bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { invoices, revenue, users } from "@/app/api/seed/placeholder-data";
import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Invoice, Revenue, User } from "@prisma/client";

const SUPER_EMAILS = [
  "hoangdung.200298@gmail.com",
  "dunghoang.1610538@gmail.com",
];

async function seedUsers() {
  try {
    const userList = [] as User[];
    const hashedPassword = await bcrypt.hash("1998", 10);
    users.forEach((user) => {
      userList.push({
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image_url,
        password: hashedPassword,
        isTwoFactorEnabled: false,
        role: "USER",
        emailVerified: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userList[0].id,
      },
    });
    if (!existingUser) {
      await prisma.user.createMany({
        data: userList,
      });
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteSeededUsers() {
  try {
    const ids = users.map((user) => user.id);
    await prisma.user.deleteMany({
      where: {
        id: {
          in: ids,
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
    const invoicesList = [] as Invoice[];
    invoices.forEach((invoice) => {
      invoicesList.push({
        id: uuidv4(),
        amount: invoice.amount,
        status: invoice.status === "PENDING" ? "PENDING" : "PAID",
        paymentMethod: "CASH",
        date: invoice.date,
        userId: invoice.user_id,
        createdAt: new Date(),
        updatedAt: new Date(),
        otherDescription: null,
      });
    });
    const existingInvoice = await prisma.invoice.findFirst({
      where: {
        userId: users[0].id,
      },
    });
    if (!existingInvoice) {
      await prisma.invoice.createMany({
        data: invoicesList,
      });
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function seedRevenue() {
  try {
    const revenueList = [] as Revenue[];
    revenue.forEach((r) => {
      revenueList.push({
        id: uuidv4(),
        period: r.month,
        revenue: r.revenue,
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    const existingRevenue = await prisma.revenue.findFirst({
      where: {
        userId: users[0].id,
      },
    });
    if (!existingRevenue) {
      await prisma.revenue.createMany({
        data: revenueList,
      });
    }
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
    const type = formData.get("type");
    switch (type) {
      case "create":
        await seedUsers();
        await seedInvoices();
        await seedRevenue();
        return new NextResponse(null, { status: 200 });

      case "delete":
        await deleteSeededUsers();
        return new NextResponse(null, { status: 200 });

      default:
        throw new Error();
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}
