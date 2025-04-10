import { Metadata } from "next";

import { NewPasswordForm } from "@/components/auth/new-password-form";

export const metadata: Metadata = {
  title: "New Password",
};

export default function Page() {
  return <NewPasswordForm />;
}
