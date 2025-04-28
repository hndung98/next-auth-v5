import { Metadata } from "next";

import { CreateForm } from "@/components/dashboard/invoices/form";
import Breadcrumbs from "@/components/common/breadcrumbs";

export const metadata: Metadata = {
  title: "New Invoice",
};

export default async function Page() {
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          {
            href: "/dashboard/invoices",
            label: "Invoices",
          },
          {
            href: "/dashboard/invoices/create",
            label: "New Invoice",
            active: true,
          },
        ]}
      />
      <CreateForm />
    </>
  );
}
