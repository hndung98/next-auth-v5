import { Metadata } from "next";

import { BlogNavLinks } from "@/app/(public)/_components/nav-link";
import Posts from "@/components/blog/posts";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blogs",
};

export default async function Page() {
  const posts = await getPosts(["content", "posts"]);

  return (
    <>
      <div className="w-full flex-none md:w-64 bg-gray-100 justify-center items-center space-y-2 pt-4">
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <BlogNavLinks />
          <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        </div>
      </div>
      <div className="flex-grow p-4 md:overflow-y-auto md:p-6 bg-gray-100">
        <Posts posts={posts} />
      </div>
    </>
  );
}
