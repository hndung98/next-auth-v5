"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { UserButton } from "@/components/common/user-button";
import { Button } from "@/components/ui/button";
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
];

export const NavBar = ({ showLogin }: { showLogin: boolean }) => {
  const user = useCurrentUser();
  const pathname = usePathname();
  const encodedCallbackUrl = encodeURIComponent(pathname);
  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-full shadow-sm">
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
      {user?.id ? (
        <UserButton isPublic={true} />
      ) : (
        showLogin && (
          <Button asChild variant="link">
            <Link href={`/auth/login?callbackUrl=${encodedCallbackUrl}`}>
              Login
            </Link>
          </Button>
        )
      )}
    </nav>
  );
};
