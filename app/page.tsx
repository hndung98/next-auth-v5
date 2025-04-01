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
    <main className="flex h-full flex-col justify-center items-center">
      <div className="space-y-6 w-full bg-blue-500 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          Auth
        </h1>
        <p>A simple auth service</p>
        <div>
          <LoginButton mode="modal">
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
