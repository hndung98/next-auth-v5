import { Suspense } from "react";

import { ThemeToggle } from "@/components/common/theme-toggle";
import { CartIcon } from "@/components/shop/cart/CartIcon";
import { MobileMenu } from "@/components/shop/nav/components/MobileMenu";
import { NavLinks } from "@/components/shop/nav/components/NavLinks";
import { SearchBar } from "@/components/shop/nav/components/SearchBar";
import {
  NotificationsToggle,
  NotificationsType,
} from "./components/NotificationsToggle";

const showMobileMenu = false;

export const Nav = ({ channel }: { channel: string }) => {
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
        <Suspense fallback={<div className="w-7" />}>
          <NotificationsToggle notifications={notifications} />
        </Suspense>
        <div>
          <CartIcon itemCount={2} />
        </div>
      </div>
      <Suspense>{showMobileMenu && <MobileMenu></MobileMenu>}</Suspense>
    </nav>
  );
};
