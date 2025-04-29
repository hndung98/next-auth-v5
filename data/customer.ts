import { prisma } from "@/lib/db";

export const getTotalPages = async (query: string, perPage = 10) => {
  try {
    const search = query.trim();
    const count = await prisma.user.count({
      where: search
        ? {
            OR: [
              {
                email: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
            role: "USER",
          }
        : {
            role: "USER",
          },
    });
    return Math.ceil(count / perPage);
  } catch (error) {
    console.log("getTotalPages", error);
    return 0;
  }
};

export const getCustomers = async (
  query: string,
  page: number,
  perPage = 10
) => {
  try {
    const search = query.trim();
    const customers = await prisma.user.findMany({
      where: search
        ? {
            OR: [
              {
                email: {
                  contains: query,
                  mode: "insensitive",
                },
                role: "USER",
              },
              {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
                role: "USER",
              },
            ],
          }
        : {
            role: "USER",
          },
      take: perPage,
      skip: (page - 1) * perPage,
    });
    return customers;
  } catch (error) {
    console.log("getCustomers", error);
    return [];
  }
};

export const getCustomerById = async (id: string) => {
  try {
    const customer = await prisma.user.findUnique({
      where: { id: id },
    });
    return customer;
  } catch (error) {
    console.log("getCustomerById", error);
    return null;
  }
};

export const getNumberOfCustomers = async () => {
  try {
    const count = await prisma.user.count({
      where: {
        role: "USER",
        emailVerified: {
          not: null,
        },
      },
    });
    return count;
  } catch (error) {
    console.log("getNumberOfCustomers", error);
    return 0;
  }
};
