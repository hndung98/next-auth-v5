import { Metadata } from "next";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/common/breadcrumbs";
import { EditForm } from "@/components/admin/authors/form";

export const metadata: Metadata = {
  title: "Edit Author",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const author = {};

  if (!author && !id) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Authors", href: "/admin/authors" },
          {
            label: "Edit Author",
            href: `/admin/authors/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditForm />
    </main>
  );
}
