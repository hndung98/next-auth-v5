"use client";

import { UserButton } from "@/components/common/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    name: "Blogs",
    href: "/blogs",
  },
  {
    name: "Docs",
    href: "/docs",
  },
];

export const NavBar = () => {
  const pathname = usePathname();
  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-full shadow-sm">
      <div className="flex gap-x-2">
        {navItems.map((item) => (
          <Button
            key={item.name}
            asChild
            variant={pathname.startsWith(item.href) ? "default" : "link"}
          >
            <Link href={item.href}>{item.name}</Link>
          </Button>
        ))}
      </div>
      <UserButton />
    </nav>
  );
};
