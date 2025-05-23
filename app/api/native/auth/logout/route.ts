import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

import { checkBlacklist } from "@/data/jwt-token";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ message: "Missing token" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.AUTH_SECRET!);

    const isBlacklistedToken = await checkBlacklist(token);
    if (isBlacklistedToken) {
      return NextResponse.json(
        { message: "Token blacklisted. Please log in again." },
        { status: 401 }
      );
    }

    if (typeof decoded !== "string") {
      const expTimestamp = decoded.exp || Math.floor(Date.now() / 1000);

      await prisma.tokenBlacklist.create({
        data: {
          token: token,
          expiresAt: new Date(expTimestamp * 1000),
        },
      });
      const res = {
        status: "success",
      };
      return NextResponse.json(res);
    }

    const res = {
      status: "failed",
      message: "Cannot verify your token.",
    };
    return NextResponse.json(res);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
