import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
};

export default async function Page() {
  return (
    <div className="w-full min-h-screen">
      <main>Checkout Page</main>
    </div>
  );
}
