import { PaymentForm } from "@/components/shop/payment/form";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment",
};

export default async function Page() {
  return (
    <div className="w-full min-h-screen">
      <main>
        <div className="mt-2 flex items-center justify-center">
          <h1>Payment Page</h1>
        </div>
        <div>
          <PaymentForm />
        </div>
        <div className="mt-2 pr-2 flex items-center justify-end gap-2">
          <Button variant="link">
            <Link href={"/shop/checkout"}>Back</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
