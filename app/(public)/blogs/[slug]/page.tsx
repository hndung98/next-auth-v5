import { notFound } from "next/navigation";

import BlogPost from "@/components/blog/blog-post";
import { getPosts } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = await getPosts(["content", "posts"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const posts = await getPosts(["content", "posts"]);
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <BlogPost
        content={post.content}
        metadata={post.metadata}
        slug={post.slug}
      />
    </div>
  );
}
