import { Metadata } from "next";
import { notFound } from "next/navigation";

import { EditForm } from "@/components/admin/invoices/form";
import Breadcrumbs from "@/components/common/breadcrumbs";
import { getInvoiceById } from "@/data/invoice";

export const metadata: Metadata = {
  title: "Edit Invoice",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const invoice = await getInvoiceById(id);
  if (!invoice) notFound();
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          {
            href: "/admin/invoices",
            label: "Invoices",
          },
          {
            href: `/admin/invoices/${id}/edit`,
            label: "Edit Invoice",
            active: true,
          },
        ]}
      />
      <EditForm invoice={invoice} />
    </>
  );
}
