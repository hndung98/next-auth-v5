"use client";

import { logout } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { HiOutlinePencil, HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";
import Link from "next/link";

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

export function CreateButton({
  href,
  buttonText,
}: {
  href: string;
  buttonText: string;
}) {
  return (
    <Link
      href={href}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">{buttonText}</span>{" "}
      <HiOutlinePlus className="h-5 md:ml-4" />
    </Link>
  );
}

export function EditButton({ href }: { href: string }) {
  return (
    <Link href={href} className="rounded-md border p-2 hover:bg-gray-100">
      <HiOutlinePencil className="h-5 w-5" />
    </Link>
  );
}

export function DeleteButton({
  onAction,
  id,
}: {
  onAction: (id: string) => Promise<{ hasError?: boolean; message?: string }>;
  id: string;
}) {
  return (
    <button
      className="rounded-md border p-2 hover:bg-gray-100 cursor-pointer"
      onClick={async () => {
        const confirmed = window.confirm("Are you sure?");
        if (confirmed) {
          const res = await onAction(id);
          if (res.hasError) {
            alert(res.message);
          }
        }
      }}
    >
      <span className="sr-only">Delete</span>
      <HiOutlineTrash className="h-5 w-5" />
    </button>
  );
}
