"use client";

import { logout } from "@/actions/auth";
import { useRouter } from "next/navigation";

type ButtonProps = {
  children: React.ReactNode;
};

export const LogoutButton = ({ children }: ButtonProps) => {
  const onClick = () => {
    logout();
  };
  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};

type MenuItemButtonProps = {
  children: React.ReactNode;
  href?: string;
};

export const MenuItemButton = ({ children, href }: MenuItemButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    if (href) {
      router.push(href);
    }
  };
  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};
