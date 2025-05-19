import { NextRequest, NextResponse } from "next/server";

import { currentUser } from "@/lib/auth";
import { getCategoryById } from "@/data/category";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const categoryId = (await params).id;

    const user = await currentUser();
    if (!user?.role) return new NextResponse(null, { status: 403 });

    const category = await getCategoryById(categoryId);

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    const res = {
      id: category.id,
      name: category.name,
    };

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}
