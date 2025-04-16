"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineBookOpen,
  HiOutlineHome,
  HiOutlinePencil,
  HiOutlineUserGroup,
  HiOutlineDocumentDuplicate,
  HiOutlineLink,
} from "react-icons/hi";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/admin", icon: HiOutlineHome },
  { name: "Authors", href: "/admin/authors", icon: HiOutlinePencil },
  { name: "Books", href: "/admin/books", icon: HiOutlineBookOpen },
  { name: "Customers", href: "/admin/customers", icon: HiOutlineUserGroup },
  {
    name: "Invoices",
    href: "/admin/invoices",
    icon: HiOutlineDocumentDuplicate,
  },
  { name: "Widgets", href: "/admin/widgets", icon: HiOutlineLink },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              { "bg-sky-100 text-blue-600": pathname === link.href }
            )}
          >
            <LinkIcon className="w-5 h-5" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
