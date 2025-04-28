import { Metadata } from "next";

import { CreateForm } from "@/components/dashboard/authors/form";
import Breadcrumbs from "@/components/common/breadcrumbs";

export const metadata: Metadata = {
  title: "Add new author",
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Authors", href: "/dashboard/authors" },
          {
            label: "Create Author",
            href: "/dashboard/authors/create",
            active: true,
          },
        ]}
      />
      <CreateForm />
    </main>
  );
}
