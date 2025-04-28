import { CreateButton } from "@/components/common/button";
import Pagination from "@/components/common/pagination";
import Search from "@/components/common/search";
import { getTotalPages } from "@/data/widget";
import { lusitana } from "@/lib/fonts";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin - Widgets",
};

export default async function Page(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page || 1);
  const totalPages = await getTotalPages(query, 5);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Widgets</h1>
      </div>
      <div className="flex mt-4 gap-2 items-center justify-center md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateButton buttonText="Create" href="/dashboard/invoices/create" />
      </div>
      <Suspense key={"invoices-table"}>
        <div>currentPage: {currentPage}</div>
        {/* <InvoicesTable query={query} currentPage={currentPage} /> */}
      </Suspense>
      <div className="flex mt-6 w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
