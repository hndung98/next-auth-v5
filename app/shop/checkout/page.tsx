import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkout",
};

export default async function Page() {
  return (
    <div className="w-full min-h-screen">
      <main>
        <div className="mt-2 flex items-center justify-center">
          <h2>Checkout Page</h2>
        </div>
        <div className="mt-2 pl-2 flex flex-col gap-2">
          <h3>Payment Info</h3>
          <h3>Order ID</h3>
          <h3>Customer</h3>
          <h3>QR Code</h3>
        </div>
        <div className="mt-2 flex items-center justify-end gap-2">
          <Button>Confirm</Button>
          <Button>
            <Link href={"/shop/orders"}>Back</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
