import { FaUserPen } from "react-icons/fa6";

import { EditButton } from "@/components/common/button";
import { getAuthors } from "@/data/author";
import { DeleteAuthorButton } from "@/components/dashboard/authors/button";

export default async function AuthorsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const authors = await getAuthors(query, currentPage, 5);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0 my-dark-style">
          <div className="md:hidden">
            {authors?.map((author) => (
              <div
                key={"author-" + author.id}
                className="mb-2 w-full rounded-md bg-white p-4 my-dark-style"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{author.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {author.nationality}
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <EditButton href={`/dashboard/authors/${author.id}/edit`} />
                    <DeleteAuthorButton id={author.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Author
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Nationality
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white my-dark-style">
              {authors?.map((author) => (
                <tr
                  key={author.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <FaUserPen className="w-6 h-6" />
                      <p>{author.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {author.nationality}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <EditButton href={`/dashboard/authors/${author.id}/edit`} />
                      <DeleteAuthorButton id={author.id} />
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
}
