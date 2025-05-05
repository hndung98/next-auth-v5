import { Metadata } from "next";

import { getT } from "@/app/i18n";
import { UserInfo } from "@/components/auth/user-info";
import { currentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Server",
};

export default async function Page() {
  const user = await currentUser();
  const { i18n } = await getT("translation");
  return (
    <>
      <UserInfo
        label="Server Component"
        user={user}
        i18n={i18n}
        lng={i18n.resolvedLanguage}
      />
    </>
  );
}
