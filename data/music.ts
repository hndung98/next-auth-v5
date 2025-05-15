import { prisma } from "@/lib/db";

export const getPlaylistsByUserId = async (userId: string) => {
  try {
    if (!userId) return [];
    const data = await prisma.playlist.findMany({
      where: {
        userId: userId,
      },
    });
    return data;
  } catch (error) {
    console.log("getPlaylistsByUserId", error);
    return [];
  }
};

export const getRecentPlaylists = async () => {
  try {
    const data = await prisma.playlist.findMany({
      take: 5,
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    return data;
  } catch (error) {
    console.log("getRecentPlaylists", error);
    return [];
  }
};

export const getVideoByPlaylistId = async (playlistId: string) => {
  try {
    const data = await prisma.video.findMany({
      where: {
        playlistId: playlistId,
      },
    });
    return data;
  } catch (error) {
    console.log("getPlaylists", error);
    return [];
  }
};
