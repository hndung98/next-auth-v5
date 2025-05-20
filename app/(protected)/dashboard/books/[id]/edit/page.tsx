import { Metadata } from "next";
import { notFound } from "next/navigation";

import { EditForm } from "@/components/dashboard/books/form";
import Breadcrumbs from "@/components/common/breadcrumbs";
import { getBookById } from "@/data/book";

export const metadata: Metadata = {
  title: "Edit Book",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const book = await getBookById(id);
  if (!book) notFound();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Books", href: "/dashboard/books" },
          {
            label: "Edit Book",
            href: `/dashboard/book/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditForm book={book} />
    </main>
  );
}
