import Link from "next/link";

import { Post } from "@/lib/posts";

export default function Posts({ posts }: { posts: Post[] }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">📝All Posts</h1>
      <ul className="space-y-4">
        {posts.map((post, index) => (
          <li
            key={index}
            className="p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold text-blue-600 hover:underline cursor-pointer">
              <Link href={`/blogs/${post.slug}`}>{post.metadata.title}</Link>
            </h2>
            <div className="text-sm text-gray-500 mt-1">
              📅{" "}
              {new Date(post.metadata.publishedAt).toLocaleDateString("vi-VN")}
            </div>
            <div className="mt-2 inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
              #{post.metadata.tag ?? ""}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
