import { Metadata } from "next";
import { notFound } from "next/navigation";

import { EditForm } from "@/components/dashboard/customers/form";
import Breadcrumbs from "@/components/common/breadcrumbs";
import { getCustomerById } from "@/data/customer";

export const metadata: Metadata = {
  title: "Edit Customer",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const customer = await getCustomerById(id);
  if (!customer) notFound();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            href: "/dashboard/customers",
            label: "Customers",
          },
          {
            href: `/dashboard/customers/${id}/edit`,
            label: "Edit",
            active: true,
          },
        ]}
      />
      <EditForm customer={customer} />
    </main>
  );
}
