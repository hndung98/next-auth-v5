import { DeleteInvoiceButton } from "@/components/admin/invoices/button";
import { EditButton } from "@/components/common/button";
import { getInvoices } from "@/data/invoice";

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
                  <div className="mb-2 flex items-center">
                    <p>{invoice.amount}</p>
                  </div>
                  <p className="text-sm text-gray-500">{invoice.date}</p>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end  gap-2">
                    <EditButton href={`/admin/invoices/${invoice.id}/edit`} />
                    <DeleteInvoiceButton id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden md:table">table</div>
        </div>
      </div>
    </div>
  );
};
