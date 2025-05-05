import { HiCalendar } from "react-icons/hi2";

import { getExampleData } from "@/actions/admin";
import { getRevenueOfYear } from "@/data/revenue";
import { lusitana } from "@/lib/fonts";
import { generateYAxis } from "@/lib/utils";

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function RevenueChart() {
  await getExampleData(1000);
  const revenue = await getRevenueOfYear();
  const revenueData = revenue.map((item) => {
    return { month: item.period, revenue: item.revenue };
  });

  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(revenueData);

  if (!revenue || revenue.length === 0) {
    return (
      <div className="w-full md:col-span-4 my-dark-style">
        <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Recent Revenue
        </h2>
        <div className="rounded-xl bg-gray-50 p-4 min-h-[300px] my-dark-style">
          <p className="mt-4 text-gray-400">No data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>
      <div className="rounded-xl bg-gray-50 p-4 my-dark-style">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4 my-dark-style">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {revenueData.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <HiCalendar className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
