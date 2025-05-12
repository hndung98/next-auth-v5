import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
};

export default async function Page() {
  return (
    <div className="w-full min-h-screen">
      <main>Cart Page</main>
    </div>
  );
}
