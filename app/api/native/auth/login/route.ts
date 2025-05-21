import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (
    !user ||
    !user.password ||
    !(await bcrypt.compare(password, user.password))
  ) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    { sub: user.id, email: user.email },
    process.env.AUTH_SECRET!,
    { expiresIn: "7d" }
  );

  const res = {
    token: token,
    expiresIn: "",
    tokenType: "Bearer",
    status: "success",
  };

  return NextResponse.json(res);
}
