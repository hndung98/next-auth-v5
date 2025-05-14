"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdLogIn } from "react-icons/io";

import { ThemeToggle } from "@/components/common/theme-toggle";
import CartToggle from "@/components/shop/nav/components/CartToggle";
import { NavLinks } from "@/components/shop/nav/components/NavLinks";
import {
  NotificationsToggle,
  NotificationsType,
} from "@/components/shop/nav/components/NotificationsToggle";
import { SearchBar } from "@/components/shop/nav/components/SearchBar";
import { UserToggle } from "@/components/shop/nav/components/UserToggle";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

export const Nav = ({ channel }: { channel: string }) => {
  const user = useCurrentUser();
  const pathname = usePathname();
  const encodedCallbackUrl = encodeURIComponent(pathname);
  const notifications = [
    {
      id: "no-101",
      type: "info",
      message: "This is a info message for testing",
      title: "System Notification",
      createdAt: "20/04/2025, 16:26:07",
    },
    {
      id: "no-102",
      type: "warning",
      message: "This is a warning message for testing. Siuuuu.",
      title: "System Notification",
      createdAt: "14/04/2025, 11:06:55",
    },
    {
      id: "no-103",
      type: "error",
      message: "This is a error message for testing",
      title: "System Notification",
      createdAt: "11/04/2025, 09:54:12",
    },
  ] as NotificationsType[];
  const cartItems = [
    { id: "p1", name: "book 1", price: 1200, quantity: 1 },
    { id: "p2", name: "book 2", price: 1650, quantity: 1 },
    { id: "p3", name: "book 3", price: 990, quantity: 1 },
    { id: "p4", name: "book 4", price: 1350, quantity: 1 },
  ];
  const removeItem = (id: string) => {
    console.log(id);
  };
  return (
    <nav className="flex w-full gap-4 lg:gap-6" aria-label="Main navigation">
      <ul className="hidden gap-4 overflow-x-auto whitespace-nowrap md:flex lg:gap-8 lg:px-0">
        <NavLinks />
      </ul>
      <div className="ml-auto flex items-center justify-center gap-4 whitespace-nowrap lg:gap-8">
        <div className="hidden md:flex">
          <SearchBar channel={channel} />
        </div>
        <div>
          <ThemeToggle />
        </div>
        {user && (
          <div>
            <NotificationsToggle notifications={notifications} />
          </div>
        )}
        <div>
          <CartToggle cartItems={cartItems} onRemoveItem={removeItem} />
        </div>
        <div>
          {user ? (
            <UserToggle user={user} />
          ) : (
            <Button asChild variant="outline" size="icon">
              <Link href={`/auth/login?callbackUrl=${encodedCallbackUrl}`}>
                <IoMdLogIn className="h-6 w-6" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
