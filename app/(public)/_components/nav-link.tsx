"use client";

import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const bloglinks = [
  { name: "All", href: "/blogs?category=all", shortName: "All" },
  { name: "Book", href: "/blogs?category=book", shortName: "Book" },
  { name: "Game", href: "/blogs?category=game", shortName: "Game" },
  { name: "Music", href: "/blogs?category=music", shortName: "Music" },
  { name: "Technology", href: "/blogs?category=technology", shortName: "Tech" },
];

export function BlogNavLinks() {
  const searchParams = useSearchParams();
  return (
    <>
      {bloglinks.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600":
                  link.shortName.toLowerCase() === searchParams.get("category"),
              },
              {
                "my-dark-style":
                  link.shortName.toLowerCase() !== searchParams.get("category"),
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
