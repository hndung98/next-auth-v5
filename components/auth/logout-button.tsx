"use client";

import { logout } from "@/actions/auth";

type LogoutButtonProps = {
  children: React.ReactNode;
};

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    logout();
  };
  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};
