import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
};

export default async function Page() {
  return (
    <div className="w-full min-h-screen">
      <main>
        <h3>Cart Page</h3>
        <div className="mt-4"></div>
      </main>
    </div>
  );
}
