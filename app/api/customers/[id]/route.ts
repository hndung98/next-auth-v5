import { NextRequest, NextResponse } from "next/server";

import { getCustomerById } from "@/data/customer";
import { currentUser } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const customerId = (await params).id;

    const user = await currentUser();
    if (!user?.role) return new NextResponse(null, { status: 403 });

    if (user.role === "USER") {
      if (customerId !== user.id) {
        if (!user?.role) return new NextResponse(null, { status: 403 });
      }
      const res = {
        id: user.id,
        email: user.email,
        name: user.name,
      };
      return NextResponse.json(res);
    }

    const customer = await getCustomerById(customerId);

    if (!customer) {
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 }
      );
    }

    const res = {
      id: customer.id,
      email: customer.email,
      name: customer.name,
    };
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}
