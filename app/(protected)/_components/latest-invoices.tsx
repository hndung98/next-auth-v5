import clsx from "clsx";
import Image from "next/image";
import { HiArrowPath } from "react-icons/hi2";

import { getExampleData } from "@/actions/admin";
import { getLatestInvoices } from "@/data/invoice";
import { lusitana } from "@/lib/fonts";

export default async function LatestInvoices() {
  const invoices = await getLatestInvoices();
  const latestInvoices = invoices.map((invoice) => {
    return {
      id: invoice.id,
      email: invoice.user.email,
      amount: invoice.amount,
      image_url: invoice.user.image,
      name: invoice.user.name,
    };
  });
  await getExampleData(1000);
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  "flex flex-row items-center justify-between py-4",
                  {
                    "border-t": i !== 0,
                  }
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={invoice.image_url ?? "/image/users/tiger-01.png"}
                    alt={`${invoice.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {invoice.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <HiArrowPath className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
