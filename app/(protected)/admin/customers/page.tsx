import { Metadata } from "next";
import { Suspense } from "react";

import { CustomersTable } from "@/components/admin/customers/table";
import { CreateButton } from "@/components/common/button";
import Pagination from "@/components/common/pagination";
import Search from "@/components/common/search";
import { getTotalPages } from "@/data/customer";
import { lusitana } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Admin - Customers",
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
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      <div className="flex mt-4 gap-2 items-center justify-center md:mt-8">
        <Search placeholder="Search customer..." />
        <CreateButton buttonText="Create" href="/admin/customers/create" />
      </div>
      <Suspense key={"customers-table"}>
        <CustomersTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="flex mt-6 w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
