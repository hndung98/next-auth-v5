import Link from "next/link";
import { FaFacebook, FaGithub } from "react-icons/fa";

const links = [
  {
    name: "Blogs",
    href: "/blogs",
  },
  {
    name: "Gallery",
    href: "/gallery",
  },
  {
    name: "Quiz",
    href: "/quiz",
  },
];

export const PublicFooter = () => {
  return (
    <footer className="row-start-3 flex gap-[24px] py-2">
      <div className="w-full gap-2 flex h-5 items-center text-xs">
        <span className="ml-2">{"Copyright @ 2025"}</span>
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
  );
};
