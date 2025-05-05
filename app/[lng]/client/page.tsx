"use client";

import { useT } from "@/app/i18n/client";
import { UserInfo } from "@/components/auth/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function Page() {
  const user = useCurrentUser();
  const { i18n } = useT("translation");
  return (
    <>
      <UserInfo
        label="Client Component"
        user={user}
        i18n={i18n}
        lng={i18n.resolvedLanguage}
      />
    </>
  );
}
