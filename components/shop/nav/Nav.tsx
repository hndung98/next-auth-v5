import { Suspense } from "react";
import { IoNotificationsSharp } from "react-icons/io5";

import { ThemeToggle } from "@/components/common/theme-toggle";
import { CartIcon } from "@/components/shop/cart/CartIcon";
import { NavLinks } from "@/components/shop/nav/components/NavLinks";
import { SearchBar } from "@/components/shop/nav/components/SearchBar";
import { MobileMenu } from "@/components/shop/nav/components/MobileMenu";

const showMobileMenu = false;

export const Nav = ({ channel }: { channel: string }) => {
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
        <Suspense fallback={<div className="w-8" />}>
          <IoNotificationsSharp className="w-6 h-6 cursor-pointer" />
          <CartIcon itemCount={2} />
        </Suspense>
      </div>
      <Suspense>{showMobileMenu && <MobileMenu></MobileMenu>}</Suspense>
    </nav>
  );
};
