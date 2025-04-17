import { Metadata } from "next";

import { CreateForm } from "@/components/admin/authors/form";
import Breadcrumbs from "@/components/common/breadcrumbs";

export const metadata: Metadata = {
  title: "Add new author",
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Authors", href: "/admin/authors" },
          {
            label: "Create Author",
            href: "/admin/authors/create",
            active: true,
          },
        ]}
      />
      <CreateForm />
    </main>
  );
}
