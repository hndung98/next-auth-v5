import { Metadata } from "next";

import { UserInfo } from "@/components/auth/user-info";
import { currentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Server",
};

export default async function Page() {
  const user = await currentUser();
  return <UserInfo label="Server Component" user={user} />;
}
