import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="flex h-full flex-col justify-center items-center bg-radial-[at_0%_25%] from-sky-300 via-blue-500 to-indigo-900 to-90%">
      <div className="space-y-6 w-full text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          🔐 Auth
        </h1>
        <p className="text-white">A simple auth service</p>
        <div>
          <LoginButton>
            <Button size={"lg"} variant={"secondary"}>
              Sign in
            </Button>
          </LoginButton>
        </div>
        <footer>___</footer>
      </div>
    </main>
  );
}
