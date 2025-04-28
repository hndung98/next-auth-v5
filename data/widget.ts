import { prisma } from "@/lib/db";

export const getTotalPages = async (query: string, perPage = 10) => {
  try {
    const search = query.trim();
    const count = await prisma.widget.count({
      where: search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                url: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : undefined,
    });
    return Math.ceil(count / perPage);
  } catch (error) {
    console.log("getTotalPages", error);
    return 0;
  }
};

export const getWidgets = async (query: string, page: number, perPage = 10) => {
  try {
    const search = query.trim();
    const widgets = await prisma.widget.findMany({
      where: search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                url: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : undefined,
      take: perPage,
      skip: (page - 1) * perPage,
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    return widgets;
  } catch (error) {
    console.log("getWidgets", error);
    return [];
  }
};

export const getWidgetById = async (id: string) => {
  try {
    const widget = await prisma.widget.findUnique({
      where: { id: id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return widget;
  } catch (error) {
    console.log("getWidgetById", error);
    return null;
  }
};
