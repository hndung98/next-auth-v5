import { Metadata } from "next";

import { CreateForm } from "@/components/dashboard/customers/form";
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
            href: "/dashboard/customers",
            label: "Customers",
          },
          {
            href: "/dashboard/customers/create",
            label: "Create",
            active: true,
          },
        ]}
      />
      <CreateForm />
    </main>
  );
}
