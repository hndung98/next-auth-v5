import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
};

export default async function Page() {
  return (
    <div className="w-full min-h-screen">
      <main>
        <div className="mt-2 flex items-center">
          <h3>Cart Page</h3>
        </div>
        <div className="mt-4"></div>
      </main>
    </div>
  );
}
