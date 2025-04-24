import { prisma } from "@/lib/db";

export const getTotalPages = async (query: string, perPage = 10) => {
  try {
    const search = query.trim();
    const count = await prisma.invoice.count({
      where: search
        ? {
            user: {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          }
        : undefined,
    });
    return Math.ceil(count / perPage);
  } catch (error) {
    console.log("getTotalPages", error);
    return 0;
  }
};
export const getInvoices = async (
  query: string,
  page: number,
  perPage = 10
) => {
  try {
    const search = query.trim();
    const invoices = await prisma.invoice.findMany({
      where: search
        ? {
            user: {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          }
        : undefined,
      take: perPage,
      skip: (page - 1) * perPage,
    });
    return invoices;
  } catch (error) {
    console.log("getInvoices", error);
    return [];
  }
};
export const getInvoiceById = async (id: string) => {
  try {
    const invoice = await prisma.invoice.findUnique({ where: { id } });
    return invoice;
  } catch (error) {
    console.log("getInvoiceById", error);
    return null;
  }
};
