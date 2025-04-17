"use client";

import Image from "next/image";

import { DeleteButton, EditButton } from "@/components/common/button";

export default function AuthorsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const authors = [
    {
      id: "author-01",
      name: "Alan Turing",
      nationality: "England",
    },
    {
      id: "author-02",
      name: "Alexander Isak",
      nationality: "England",
    },
    {
      id: "author-03",
      name: "Bobby Chalton",
      nationality: "England",
    },
    {
      id: "author-04",
      name: "Chris Smalling",
      nationality: "England",
    },
    {
      id: "author-05",
      name: "Didier Drogba",
      nationality: "Ivory Coast",
    },
  ];

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {authors?.map((author) => (
              <div
                key={"author-" + author.id}
                className="mb-2 w-full rounded-md bg-white p-4"
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
                    <div>Upd</div>
                    <div>Del</div>
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
            <tbody className="bg-white">
              {authors?.map((author) => (
                <tr
                  key={author.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={"/image/users/tiger-01.png"}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${author.name}'s profile picture`}
                      />
                      <p>{author.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {author.nationality}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <EditButton href={`/admin/authors/${author.id}/edit`} />
                      <DeleteButton
                        onAction={async (id: string) => {
                          console.log({ currentPage, query });
                          if (id) {
                            return { message: "ok" };
                          }
                          return { hasError: true, message: "error" };
                        }}
                        id={author.id ?? "delete-id"}
                      />
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
