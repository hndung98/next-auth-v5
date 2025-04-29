import { NextRequest, NextResponse } from "next/server";

import { getAmountOfInvoices } from "@/data/invoice";
import { InvoiceStatus } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "PAID";
    const invoiceStatus =
      status === "PAID" ? InvoiceStatus.PAID : InvoiceStatus.PENDING;

    const amount = await getAmountOfInvoices(invoiceStatus);

    return NextResponse.json({ amount: amount, status: status });
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}
