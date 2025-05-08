import { NextRequest, NextResponse } from "next/server";

import { currentUser } from "@/lib/auth";
import { getChatRooms } from "@/data/chat-room";

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user?.role) return new NextResponse(null, { status: 403 });

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";

    const rooms = await getChatRooms(query);

    const res = rooms.map((room) => ({
      id: room.id,
      name: room.name,
    }));

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}
