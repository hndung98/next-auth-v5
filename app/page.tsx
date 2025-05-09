import { Lusitana } from "next/font/google";
import Link from "next/link";

import { ClientGreeting } from "@/components/common/greeting";
import { NavBar } from "@/components/common/navbar";
import { currentUser } from "@/lib/auth";
import { FloatingBox } from "@/components/common/floating-box";

const lusitana = Lusitana({ weight: "400", subsets: ["latin"] });

export default async function Home() {
  const user = await currentUser();
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="sticky top-0 z-50">
        <NavBar showLogin={false} />
      </div>
      <div className="flex h-screen flex-col md:flex-row">
        <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
          <div className="relative top-[50px]">
            <FloatingBox />
          </div>
          <div className="hidden flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
            <div className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black" />
            <p
              className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
            >
              <ClientGreeting />
            </p>
            {!user?.id && (
              <Link
                href="/auth/login"
                className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
              >
                <span>Login now</span> {"-->"}
              </Link>
            )}
          </div>
          <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12"></div>
        </div>
      </div>
    </main>
  );
}
