import { Metadata } from "next";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/common/breadcrumbs";
import { EditForm } from "@/components/dashboard/widgets/form";
import { getWidgetById } from "@/data/widget";

export const metadata: Metadata = {
  title: "Edit Widget",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const widget = await getWidgetById(id);
  if (!widget) notFound();

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          {
            href: "/dashboard/widgets",
            label: "Widgets",
          },
          {
            href: `/dashboard/widgets/${id}/edit`,
            label: "Edit Widget",
            active: true,
          },
        ]}
      />
      <EditForm widget={widget} />
    </>
  );
}
