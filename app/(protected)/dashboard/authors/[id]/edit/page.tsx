import { Metadata } from "next";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/common/breadcrumbs";
import { EditForm } from "@/components/dashboard/authors/form";
import { getAuthorById } from "@/data/author";

export const metadata: Metadata = {
  title: "Edit Author",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const author = await getAuthorById(id);

  if (!author) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Authors", href: "/dashboard/authors" },
          {
            label: "Edit Author",
            href: `/dashboard/authors/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditForm author={author} />
    </main>
  );
}
