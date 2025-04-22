import BooksTable from "@/components/admin/books/table";
import { CreateButton } from "@/components/common/button";
import Pagination from "@/components/common/pagination";
import Search from "@/components/common/search";
import { getTotalPages } from "@/data/book";
import { lusitana } from "@/lib/fonts";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin - Books",
};

export default async function Page(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getTotalPages(query, 5);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Books</h1>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 md:mt-8">
        <Search placeholder="Search books..." />
        <CreateButton buttonText="Create" href="/admin/books/create" />
      </div>
      <Suspense key={"books-table"}>
        <BooksTable currentPage={currentPage} query={query} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
