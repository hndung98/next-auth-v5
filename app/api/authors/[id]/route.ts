import { NextRequest, NextResponse } from "next/server";

import { getAuthorById } from "@/data/author";
import { currentUser } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authorId = (await params).id;

    const user = await currentUser();
    if (!user?.role) return new NextResponse(null, { status: 403 });

    const author = await getAuthorById(authorId);

    if (!author) {
      return NextResponse.json(
        { message: "Author not found" },
        { status: 404 }
      );
    }

    const res = {
      id: author.id,
      name: author.name,
      nationality: author.nationality,
    };

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}
