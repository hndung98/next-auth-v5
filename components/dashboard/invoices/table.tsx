import { DeleteInvoiceButton } from "@/components/dashboard/invoices/button";
import { EditButton } from "@/components/common/button";
import { getInvoices } from "@/data/invoice";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";

export const InvoicesTable = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const invoices = await getInvoices(query, currentPage, 5);
  return (
    <div className="flow-root mt-6">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {invoices.map((invoice) => (
              <div
                key={"mini-tlb-" + invoice.id}
                className="mb-2 w-full rounded-lg bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={invoice.user.image ?? "/image/users/tiger-02.png"}
                      className="rounded-full"
                      alt={`${invoice.user.name}'s profile picture`}
                      width={28}
                      height={28}
                    />
                    <p>{invoice.user.name}</p>
                  </div>
                  <p className="text-sm text-gray-500">{invoice.date}</p>
                </div>
                <div className="flex w-full items-center justify-between border-b py-5">
                  <div className="flex w-1/2 flex-col">
                    <p className="text-xs">Method</p>
                    <p className="font-medium">{invoice.paymentMethod}</p>
                  </div>
                  <div className="flex w-1/2 flex-col">
                    <p className="text-xs">Amount</p>
                    <p className="font-medium">
                      {formatCurrency(invoice.amount)}
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end  gap-2">
                    <EditButton href={`/dashboard/invoices/${invoice.id}/edit`} />
                    <DeleteInvoiceButton id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {invoice.date}
                  </td>
                  <td className="whitespace-nowrap py-3 pr-3">
                    {invoice.user.name}
                  </td>
                  <td className="whitespace-nowrap py-3 pr-3">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="whitespace-nowrap py-3 pr-3">
                    {invoice.status}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <EditButton href={`/dashboard/invoices/${invoice.id}/edit`} />
                      <DeleteInvoiceButton id={invoice.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
