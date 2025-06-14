import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Orders",
};

export default async function Page() {
  return (
    <div className="w-full min-h-screen">
      <main>
        <div className="mt-2 flex items-center justify-center">
          <h3>Orders Page</h3>
        </div>
        <div className="mt-4">
          <p>List of orders</p>
          <p>Item 1</p>
          <p>Item 2</p>
          <p>Item 3</p>
          <p>Item 4</p>
          <p>Item 5</p>
        </div>
        <div className="mt-4 text-end">
          <Button variant={"link"}>
            <Link href={"/shop"}>Back</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
