import Link from "next/link";
import { FaFacebook, FaGithub, FaCopyright } from "react-icons/fa";

import { NavBar } from "@/components/common/navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="sticky top-0 z-50 mb-1">
        <NavBar showLogin />
      </div>
      <div className="flex h-screen flex-col md:flex-row">
        {children}
        <footer className="row-start-3 flex gap-[24px] py-2">
          <div className="w-full flex items-center gap-2">
            <FaCopyright className="w-4 h-4 ml-2" />
            <p className="text-sm">Copyright 2025</p>
          </div>
          <div className="w-full flex items-center justify-end gap-3">
            <Link
              className="hover:underline hover:underline-offset-4"
              href="https://hndung98.github.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub width={16} height={16} />
            </Link>
            <Link
              className="hover:underline hover:underline-offset-4 mr-2"
              href="https://fb.com/hndung98"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook width={16} height={16} />
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
}
