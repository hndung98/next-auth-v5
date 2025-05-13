import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders",
};

export default async function Page() {
  return (
    <div className="w-full min-h-screen">
      <main>Orders Page</main>
    </div>
  );
}
