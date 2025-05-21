import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { getCategories } from "@/data/category";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "Missing token" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.AUTH_SECRET!);

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";

    const categories = await getCategories(query, 1, 10);

    const data = categories.map((category) => ({
      id: category.id,
      name: category.name,
    }));

    const res = {
      status: "success",
      payload: data,
      user: decoded,
    };
    return NextResponse.json(res);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ message: "Missing token" }, { status: 401 });
  }

  const body = await request.json();
  const { name } = body;
  if (!name) {
    return NextResponse.json({ message: "Missing name" }, { status: 404 });
  }

  let slug = "";

  try {
    slug = name.replaceAll(" ", "-").toLowerCase();
    const existingCategory = await prisma.category.findFirst({
      where: {
        slug: slug,
      },
    });
    if (existingCategory) {
      return NextResponse.json(
        { message: "Please type another name" },
        { status: 400 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Invalid name" }, { status: 400 });
  }

  try {
    const decoded = jwt.verify(token, process.env.AUTH_SECRET!);

    const result = await prisma.category.create({
      data: {
        name: name,
        slug: slug,
      },
    });

    const res = {
      status: "success",
      payload: {
        id: result.id,
        name: result.name,
      },
      user: decoded,
    };
    return NextResponse.json(res);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
