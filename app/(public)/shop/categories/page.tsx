import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
};

export default async function Page() {
  return (
    <div className="w-full min-h-screen">
      <main>Categories Page</main>
    </div>
  );
}
