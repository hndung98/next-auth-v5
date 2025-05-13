import { ThemeToggle } from "@/components/common/theme-toggle";
import { Suspense } from "react";
import { CartNavItem } from "./components/CartNavItem";
import { MobileMenu } from "./components/MobileMenu";
import { NavLinks } from "./components/NavLinks";
import { SearchBar } from "./components/SearchBar";
import { CartIcon } from "../cart/CartIcon";

const showMobileMenu = false;

export const Nav = ({ channel }: { channel: string }) => {
  return (
    <nav className="flex w-full gap-4 lg:gap-6" aria-label="Main navigation">
      <ul className="hidden gap-4 overflow-x-auto whitespace-nowrap md:flex lg:gap-8 lg:px-0">
        <NavLinks channel={channel} />
      </ul>
      <div className="ml-auto flex items-center justify-center gap-4 whitespace-nowrap lg:gap-8">
        <div className="hidden md:flex">
          <SearchBar channel={channel} />
        </div>
        <div>
          <ThemeToggle />
        </div>
        <Suspense fallback={<div className="w-8" />}>
          <span>User</span>
          <CartIcon itemCount={2}/>
        </Suspense>
      </div>
      <div className="flex items-center">
        <Suspense fallback={<div className="w-6" />}>
          <CartNavItem channel={channel} />
        </Suspense>
      </div>
      <Suspense>{showMobileMenu && <MobileMenu></MobileMenu>}</Suspense>
    </nav>
  );
};
