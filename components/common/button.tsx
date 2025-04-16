"use client";

import { logout } from "@/actions/auth";
import { useRouter } from "next/navigation";

type LogoutButtonProps = {
  children: React.ReactNode;
  reload?: boolean;
};

export const LogoutButton = ({ children, reload }: LogoutButtonProps) => {
  const onClick = () => {
    logout()
      .then((data) => {
        console.log({ data });
      })
      .catch((err) => {
        console.log({ err });
      })
      .finally(() => {
        console.log({ reload });
        if (reload) {
          window.location.reload();
        }
      });
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
