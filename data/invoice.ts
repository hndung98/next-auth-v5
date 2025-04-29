import { prisma } from "@/lib/db";
import { InvoiceStatus } from "@prisma/client";

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
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    return invoices;
  } catch (error) {
    console.log("getInvoices", error);
    return [];
  }
};

export const getLatestInvoices = async (take = 5) => {
  try {
    const invoices = await prisma.invoice.findMany({
      take: take,
      orderBy: {
        date: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
            email: true,
          },
        },
      },
    });
    return invoices;
  } catch (error) {
    console.log("getInvgetLatestInvoicesoices", error);
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

export const getNumberOfInvoices = async (status?: InvoiceStatus) => {
  try {
    const count = await prisma.invoice.count({
      where: status
        ? {
            status: status,
          }
        : undefined,
    });
    return count;
  } catch (error) {
    console.log("getNumberOfInvoices", error);
    return 0;
  }
};

export const getAmountOfInvoices = async (status: InvoiceStatus) => {
  try {
    const data = await prisma.invoice.groupBy({
      by: ["status"],
      _sum: {
        amount: true,
      },
    });
    let amount = 0;
    data.forEach((item) => {
      if (status && item.status === status && item._sum.amount) {
        amount += item._sum.amount;
      }
    });

    return amount;
  } catch (error) {
    console.log("getAmountOfInvoices", error);
    return 0;
  }
};
