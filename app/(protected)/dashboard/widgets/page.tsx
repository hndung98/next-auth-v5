import { Metadata } from "next";
import { Suspense } from "react";

import { CreateButton } from "@/components/common/button";
import Pagination from "@/components/common/pagination";
import Search from "@/components/common/search";
import { WidgetsTable } from "@/components/dashboard/widgets/table";
import { getTotalPages } from "@/data/widget";
import { lusitana } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Widgets",
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
        <Search placeholder="Search widgets..." />
        <CreateButton buttonText="Create" href="/dashboard/widgets/create" />
      </div>
      <Suspense key={"widgets-table"}>
        <WidgetsTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="flex mt-6 w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
