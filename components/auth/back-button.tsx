"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

type BackButtonProps = {
  label: string;
  href: string;
  isPending?: boolean;
};

export const BackButton = ({ isPending, label, href }: BackButtonProps) => {
  return (
    <Button variant="link" className="w-full font-normal" size="sm" asChild>
      <Link
        className={`${isPending ? "opacity-75 pointer-events-none" : ""}`}
        href={href}
      >
        {label}
      </Link>
    </Button>
  );
};
