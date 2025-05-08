import { Metadata } from "next";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/common/breadcrumbs";
import Room from "@/components/chat/room";
import { getChatRoomById } from "@/data/chat-room";

export const metadata: Metadata = {
  title: "Chat Room",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const room = await getChatRoomById(id);

  if (!room) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Chat", href: "/chat" },
          {
            label: `${room.name}`,
            href: `/chat/${id}/room`,
            active: true,
          },
        ]}
      />
      <div className="w-full">
        <Room room={room} />
      </div>
    </main>
  );
}
