import { Suspense } from "react";

import CardWrapper from "@/app/(protected)/_components/cards";
import LatestInvoices from "@/app/(protected)/_components/latest-invoices";
import RevenueChart from "@/app/(protected)/_components/revenue-chart";
import {
  CardsSkeleton,
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
} from "@/app/(protected)/_components/skeletons";
import { AdminComponentExample } from "@/app/(protected)/_components/test";
import { lusitana } from "@/lib/fonts";

export default function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Overview
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
      <div className="mb-6"></div>
      <AdminComponentExample />
    </main>
  );
}
