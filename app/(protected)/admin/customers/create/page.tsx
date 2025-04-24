import { Metadata } from "next";

import { CreateForm } from "@/components/admin/customers/form";
import Breadcrumbs from "@/components/common/breadcrumbs";

export const metadata: Metadata = {
  title: "New Customer",
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            href: "/admin/customers",
            label: "Customers",
          },
          {
            href: "/admin/customers/create",
            label: "Create",
            active: true,
          },
        ]}
      />
      <CreateForm />
    </main>
  );
}
