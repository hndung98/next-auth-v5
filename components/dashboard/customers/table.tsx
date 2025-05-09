import { DeleteCustomerButton } from "@/components/dashboard/customers/button";
import { EditButton } from "@/components/common/button";
import { getCustomers } from "@/data/customer";

export const CustomersTable = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const customers = await getCustomers(query, currentPage, 5);
  return (
    <div className="flow-root mt-6">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0 my-dark-style">
          <div className="md:hidden">
            {customers.map((customer) => (
              <div
                key={"mini-tlb-" + customer.id}
                className="mb-2 w-full rounded-lg bg-white p-4 my-dark-style"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="mb-2 flex items-center">
                    <p>{customer.name}</p>
                  </div>
                  <p className="text-sm text-gray-500">{customer.email}</p>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end  gap-2">
                    <EditButton href={`/dashboard/customers/${customer.id}/edit`} />
                    <DeleteCustomerButton id={customer.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table my-dark-style">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Role
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Is Verified
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {customer.name}
                  </td>
                  <td className="whitespace-nowrap py-3 pr-3">
                    {customer.email}
                  </td>
                  <td className="whitespace-nowrap py-3 pr-3">
                    {customer.role}
                  </td>
                  <td className="whitespace-nowrap py-3 pr-3">
                    {customer.emailVerified ? "Yes" : "No"}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <EditButton
                        href={`/dashboard/customers/${customer.id}/edit`}
                      />
                      <DeleteCustomerButton id={customer.id} />
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
