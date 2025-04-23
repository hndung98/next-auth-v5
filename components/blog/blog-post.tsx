import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { Post } from "@/lib/posts";
import Link from "next/link";

export default function BlogPost({ content, metadata }: Post) {
  return (
    <article className="prose dark:prose-invert max-w-3xl mx-auto py-10 px-4">
      <Link href="/blogs">Go Back</Link>
      <h1 className="text-3xl font-bold">{metadata.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        📅 {new Date(metadata.publishedAt).toLocaleDateString("vi-VN")}
        {metadata.tag && (
          <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
            #{metadata.tag}
          </span>
        )}
      </p>

      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
          },
        }}
      />
    </article>
  );
}
