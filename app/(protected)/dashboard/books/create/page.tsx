import { Metadata } from "next";

import { CreateForm } from "@/components/dashboard/books/form";
import Breadcrumbs from "@/components/common/breadcrumbs";

export const metadata: Metadata = {
  title: "Add new book",
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Books", href: "/dashboard/books" },
          {
            label: "Create Book",
            href: "/dashboard/books/create",
            active: true,
          },
        ]}
      />
      <CreateForm />
    </main>
  );
}
