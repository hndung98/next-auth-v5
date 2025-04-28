import { NextRequest, NextResponse } from "next/server";

import { getCustomers } from "@/data/customer";
import { currentUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user?.role) return new NextResponse(null, { status: 403 });

    if (user.role === "USER") {
      const res = [
        {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      ];
      return NextResponse.json(res);
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";

    const customers = await getCustomers(query, 1);

    const res = customers.map((customer) => ({
      id: customer.id,
      email: customer.email,
      name: customer.name,
    }));

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}
