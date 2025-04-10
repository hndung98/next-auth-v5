import { Metadata } from "next";

import { NewVerificationForm } from "@/components/auth/new-verification-form";

export const metadata: Metadata = {
  title: "Verification",
};

export default function Page() {
  return <NewVerificationForm />;
}
