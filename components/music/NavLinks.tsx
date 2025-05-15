"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "playlists", href: "/music/playlists", shortName: "playlists" },
  { name: "us-uk", href: "/music/us-uk", shortName: "us-uk" },
  { name: "lofi", href: "/music/lofi", shortName: "lofi" },
];

export function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "underline text-blue-500": link.href === pathname,
              },
              {
                "my-dark-style": link.href !== pathname,
              }
            )}
          >
            <p className="hidden md:block">{link.name}</p>
            <p className="block md:hidden">{link.shortName}</p>
          </Link>
        );
      })}
    </>
  );
}
