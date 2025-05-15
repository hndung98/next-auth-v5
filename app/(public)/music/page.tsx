import { Metadata } from "next";

import { CreateForm } from "@/components/music/form";
import { currentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Music",
};

export default async function Page() {
  const user = await currentUser();
  return (
    <div className="w-full max-w-4xl">
      <h2 className="mb-6">Music home page</h2>
      {user && (
        <div>
          <CreateForm userId={user.id || ""} />
        </div>
      )}
    </div>
  );
}
