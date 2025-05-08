"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdLogIn } from "react-icons/io";

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

function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="cursor-pointer bg-transparent"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

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
        <ModeToggle />
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
