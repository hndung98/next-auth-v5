import { Metadata } from "next";

import Breadcrumbs from "@/components/common/breadcrumbs";
import { CreateForm } from "@/components/dashboard/widgets/form";

export const metadata: Metadata = {
  title: "New Widget",
};

export default async function Page() {
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          {
            href: "/dashboard/widgets",
            label: "Widgets",
          },
          {
            href: "/dashboard/widgets/create",
            label: "New Widget",
            active: true,
          },
        ]}
      />
      <CreateForm />
    </>
  );
}
