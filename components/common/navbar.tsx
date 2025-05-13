"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdLogIn, IoMdMore } from "react-icons/io";

import { MenuItemButton } from "@/components/common/button";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { UserButton } from "@/components/common/user-button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";

const navItems = [
  {
    name: "Shop",
    href: "/shop",
  },
  {
    name: "Chat",
    href: "/chat",
  },
];

export const NavBar = ({ showLogin }: { showLogin: boolean }) => {
  const user = useCurrentUser();
  const pathname = usePathname();
  const encodedCallbackUrl = encodeURIComponent(pathname);
  return (
    <nav className="bg-secondary flex justify-between items-center p-4 w-full shadow-sm my-dark-style">
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
      <div className="space-x-2 flex gap-x-0.5">
        <MoreToggle />
        <ThemeToggle />
        {user?.id ? (
          <UserButton isPublic={true} />
        ) : (
          showLogin && (
            <Button asChild variant="outline" size="icon">
              <Link href={`/auth/login?callbackUrl=${encodedCallbackUrl}`}>
                <IoMdLogIn className="h-[1.2rem] w-[1.2rem]" />
              </Link>
            </Button>
          )
        )}
      </div>
    </nav>
  );
};

function MoreToggle() {
  const items = [
    {
      name: "Blogs",
      href: "/blogs",
    },
    {
      name: "Gallery",
      href: "/gallery",
    },
    {
      name: "Quiz",
      href: "/quiz",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="cursor-pointer bg-transparent"
        >
          <IoMdMore className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {items.map((item, idx) => (
          <MenuItemButton key={"more-item-" + idx} href={item.href}>
            <DropdownMenuItem>{item.name}</DropdownMenuItem>
          </MenuItemButton>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
