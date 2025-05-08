"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SiGoogleclassroom } from "react-icons/si";

const DefaultIcon = () => {
  return <SiGoogleclassroom className="w-5 h-5" />;
};

type RoomInfo = {
  id: string;
  name: string;
};

export default function NavLinks() {
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    fetch(`/api/chat/rooms`)
      .then((res) => res.json())
      .then(setRooms);
  }, []);
  return (
    <>
      {rooms.map((room) => {
        const href = `/chat/${room.id}/room`;
        return (
          <Link
            key={room.id}
            href={href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              { "bg-sky-100 text-blue-600": pathname === href },
              { "my-button-dark-style": pathname !== href }
            )}
          >
            <DefaultIcon />
            <p className="hidden md:block">{room.name}</p>
          </Link>
        );
      })}
    </>
  );
}
