import {
  HiOutlineBanknotes,
  HiOutlineClock,
  HiOutlineInbox,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import { getExampleData } from "@/actions/admin";
import { getNumberOfCustomers } from "@/data/customer";
import { getAmountOfInvoices, getNumberOfInvoices } from "@/data/invoice";
import { lusitana } from "@/lib/fonts";

const iconMap = {
  collected: HiOutlineBanknotes,
  customers: HiOutlineClock,
  pending: HiOutlineInbox,
  invoices: HiOutlineUserGroup,
};

export default async function CardWrapper() {
  const data = await Promise.all([
    getNumberOfCustomers(),
    getNumberOfInvoices(),
    getAmountOfInvoices("PAID"),
    getAmountOfInvoices("PENDING"),
  ]);
  const numberOfCustomers = data[0];
  const numberOfInvoices = data[1];
  const totalPaidInvoices = data[2];
  const totalPendingInvoices = data[3];
  await getExampleData(1200);

  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "invoices" | "customers" | "pending" | "collected";
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
