import { currentUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
});

export async function POST(req: NextRequest) {
  try {
    const { roomId, message } = await req.json();

    const user = await currentUser();
    if (!user?.role) return new NextResponse(null, { status: 403 });

    const trigger = await pusher.trigger(roomId, "message", {
      userId: user.id,
      username: user.name,
      message,
    });

    const res = {
      success: true,
      trigger: trigger,
    };
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}
