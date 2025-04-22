import { NextRequest, NextResponse } from "next/server";

import { getAuthors } from "@/data/author";
import { currentUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user?.role) return new NextResponse(null, { status: 403 });

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";

    const authors = await getAuthors(query, 1);

    return NextResponse.json(authors);
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}
