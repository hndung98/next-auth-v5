import { Metadata } from "next";

import { SettingsForm } from "@/components/settings/form";

export const metadata: Metadata = {
  title: "Admin - Settings",
};

export default async function Page() {
  return <SettingsForm />;
}
