import { prisma } from "@/lib/db";

export const getChatRooms = async (query: string) => {
  try {
    const search = query.trim();
    const rooms = await prisma.chatRoom.findMany({
      where: search
        ? {
            password: {
              equals: null,
            },
            name: {
              contains: search,
              mode: "insensitive",
            },
          }
        : {
            password: {
              equals: null,
            },
          },
      take: 10,
    });
    const res = rooms.map((room) => {
      return { id: room.id, name: room.name };
    });
    return res;
  } catch (error) {
    console.log("getChatRooms", error);
    return [];
  }
};

export const getChatRoomById = async (id: string) => {
  try {
    const room = await prisma.chatRoom.findUnique({
      where: {
        id: id,
      },
    });
    return {
      id: room?.id,
      name: room?.name,
    };
  } catch (error) {
    console.log("getChatRoomById", error);
    return null;
  }
};
