import { Metadata } from "next";

import { CreateForm } from "@/components/admin/invoices/form";
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
            href: "/admin/invoices",
            label: "Invoices",
          },
          {
            href: "/admin/invoices/create",
            label: "New Invoice",
            active: true,
          },
        ]}
      />
      <CreateForm />
    </>
  );
}
