import { NextRequest, NextResponse } from "next/server";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
});

// using pusher-js
// const pusher = new Pusher(process.env.PUSHER_KEY!, {
//   cluster: process.env.PUSHER_CLUSTER!,
// });

export async function POST(req: NextRequest) {
  try {
    const { username, message } = await req.json();

    const trigger = await pusher.trigger("chat", "message", {
      username,
      message,
    });

    const res = {
      success: true,
      trigger: trigger,
    };
    return NextResponse.json(res);
    // return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}
