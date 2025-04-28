import { Metadata } from "next";

import { lusitana } from "@/lib/fonts";
import Search from "@/components/common/search";
import { Suspense } from "react";
import Pagination from "@/components/common/pagination";
import { CreateButton } from "@/components/common/button";
import AuthorsTable from "@/components/dashboard/authors/table";
import { getTotalPages } from "@/data/author";

export const metadata: Metadata = {
  title: "Admin - Authors",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getTotalPages(query, 5);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Authors</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search authors..." />
        <CreateButton buttonText="Create" href="/dashboard/authors/create" />
      </div>
      <Suspense key={query + currentPage}>
        <AuthorsTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
