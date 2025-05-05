import { Metadata } from "next";

import { BlogNavLinks } from "@/app/(public)/_components/nav-link";
import Posts from "@/components/blog/posts";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blogs",
};

export default async function Page(props: {
  searchParams?: Promise<{
    category?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const category = searchParams?.category || "";
  const posts = await getPosts(["content", "posts"], category);

  return (
    <>
      <div className="w-full flex-none md:w-64 bg-gray-100 my-dark-style justify-center items-center space-y-2 pt-2 my-dark-style">
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <BlogNavLinks />
          <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        </div>
      </div>
      <div className="flex-grow p-4 md:overflow-y-auto md:p-6 bg-gray-100 my-dark-style">
        <Posts posts={posts} />
      </div>
    </>
  );
}
