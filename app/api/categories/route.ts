import { NextRequest, NextResponse } from "next/server";

import { currentUser } from "@/lib/auth";
import { getCategories } from "@/data/category";

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user?.role) return new NextResponse(null, { status: 403 });

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";

    const categories = await getCategories(query, 1, 5);

    const res = categories.map((category) => ({
      id: category.id,
      name: category.name,
    }));

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}
