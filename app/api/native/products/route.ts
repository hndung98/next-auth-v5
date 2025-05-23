import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

import { checkBlacklist } from "@/data/jwt-token";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "Missing token" }, { status: 401 });
  }

  try {
    jwt.verify(token, process.env.AUTH_SECRET!);

    const isBlacklistedToken = await checkBlacklist(token);
    if (isBlacklistedToken) {
      return NextResponse.json(
        { message: "Token blacklisted. Please log in again." },
        { status: 401 }
      );
    }

    // const { searchParams } = new URL(request.url);
    // const query = searchParams.get("query") || "";

    const products = await prisma.product.findMany({
      take: 10,
      include: {
        book: {
          select: {
            coverImagePath: true,
          },
        },
      },
    });

    // const data = products.map((product) => ({
    //   id: product.id,
    //   name: product.name,
    // }));

    const res = {
      status: "success",
      payload: products,
    };
    return NextResponse.json(res);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
