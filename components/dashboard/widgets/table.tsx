import { EditButton } from "@/components/common/button";
import { DeleteWidgetButton } from "@/components/dashboard/widgets/button";
import { getWidgets } from "@/data/widget";
import Link from "next/link";

export const WidgetsTable = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const widgets = await getWidgets(query, currentPage, 5);
  return (
    <div className="flow-root mt-6">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {widgets.map((widget) => (
              <div
                key={"mini-tlb-" + widget.id}
                className="mb-2 w-full rounded-lg bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{widget.name}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{widget.user.name}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between border-b py-5">
                  <div className="flex w-1/2 flex-col">
                    <p className="text-xs">URL</p>
                    <Link href={widget.url} target="_blank">
                      <p className="font-medium">{widget.url}</p>
                    </Link>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end  gap-2">
                    <EditButton href={`/dashboard/widgets/${widget.id}/edit`} />
                    <DeleteWidgetButton id={widget.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  User
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  URL
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {widgets.map((widget) => (
                <tr key={widget.id}>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {widget.user.name}
                  </td>
                  <td className="whitespace-nowrap py-3 pr-3">{widget.name}</td>
                  <td className="whitespace-nowrap py-3 pr-3">
                    <Link href={widget.url} target="_blank">
                      {widget.url}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <EditButton
                        href={`/dashboard/widgets/${widget.id}/edit`}
                      />
                      <DeleteWidgetButton id={widget.id} />
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
