import { Metadata } from "next";

import { ResetForm } from "@/components/auth/reset-form";

export const metadata: Metadata = {
  title: "Password reset",
};

export default function Page() {
  return <ResetForm />;
}
