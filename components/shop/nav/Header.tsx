import { IoLogoFreebsdDevil } from "react-icons/io";
import Link from "next/link";

import { Nav } from "@/components/shop/nav/Nav";

export function Header({ channel }: { channel: string }) {
  return (
    <header className="sticky top-0 z-20 bg-neutral-100/50 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-3 sm:px-8">
        <div className="flex h-16 justify-between gap-4 md:gap-8">
          <div className="flex items-center">
            <Link href={"/shop"}>
              <IoLogoFreebsdDevil className="w-8 h-8" />
            </Link>
          </div>
          <Nav channel={channel} />
        </div>
      </div>
    </header>
  );
}
