import { MdOutlineElderlyWoman } from "react-icons/md";
import { GiKatana, GiWhirlwind } from "react-icons/gi";

import { lusitana } from "@/lib/fonts";

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-end leading-none text-white`}
    >
      <MdOutlineElderlyWoman className="h-2/12 w-2/12" />
      <GiKatana className="h-2/12 w-2/12" />
      <GiWhirlwind className="h-2/12 w-2/12" />
      <GiWhirlwind className="h-3/12 w-3/12" />
      <GiWhirlwind className="h-5/12 w-5/12" />
    </div>
  );
}
