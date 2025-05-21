import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

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

    const categories = await getCategories(query, 1, 5);

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
