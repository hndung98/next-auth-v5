import { Metadata } from "next";

import { CreateForm } from "@/components/admin/books/form";
import Breadcrumbs from "@/components/common/breadcrumbs";

export const metadata: Metadata = {
  title: "Add new book",
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Books", href: "/admin/books" },
          {
            label: "Create Book",
            href: "/admin/books/create",
            active: true,
          },
        ]}
      />
      <CreateForm />
    </main>
  );
}
