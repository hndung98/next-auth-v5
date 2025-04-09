import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const session = await auth();
  return (
    <div>
      <h1>Settings Page</h1>
      <p>{JSON.stringify(session)}</p>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <Button type="submit">Log out</Button>
      </form>
    </div>
  );
}
