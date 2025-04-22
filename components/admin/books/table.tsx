import { DeleteBookButton } from "@/components/admin/books/button";
import { EditButton } from "@/components/common/button";
import { getBooks } from "@/data/book";

export default async function BooksTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const books = await getBooks(query, currentPage, 5);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {books.map((book) => (
              <div
                key={"mini-tlb-" + book.id}
                className="mb-2 w-full rounded-lg bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="mb-2 flex items-center">
                    <p>{book.title}</p>
                  </div>
                  <p className="text-sm text-gray-500">{book.author?.name}</p>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end  gap-2">
                    <EditButton href={`/admin/books/${book.id}/edit`} />
                    <DeleteBookButton id={book.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Author
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Published Year
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Page Count
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {books.map((book) => (
                <tr key={book.id}>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {book.title}
                  </td>
                  <td className="whitespace-nowrap py-3 pr-3">
                    {book.author?.name ?? ""}
                  </td>
                  <td className="whitespace-nowrap py-3 pr-3">
                    {book.publishedYear}
                  </td>
                  <td className="whitespace-nowrap py-3 pr-3">
                    {book.pageCount}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <EditButton href={`/admin/books/${book.id}/edit`} />
                      <DeleteBookButton id={book.id} />
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
