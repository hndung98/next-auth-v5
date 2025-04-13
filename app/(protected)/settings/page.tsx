"use client";

import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function Page() {
  const session = useSession();

  const onClick = () => {
    logout();
  };
  return (
    <div>
      <h1>Settings Page</h1>
      <p>{JSON.stringify(session)}</p>
      <Button onClick={onClick}>Log out</Button>
    </div>
  );
}
