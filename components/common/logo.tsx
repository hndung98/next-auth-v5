import { lusitana } from "@/lib/fonts";
import { GiKatana } from "react-icons/gi";

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <GiKatana className="h-12 w-12" />
      <p className="text-[44px]">{"Hasagi"}</p>
    </div>
  );
}
