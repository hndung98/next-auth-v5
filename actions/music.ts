"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { withAdminOnly } from "@/actions/with-auth";
import { prisma } from "@/lib/db";
import { Playlist, Video } from "@prisma/client";

const defaultPlaylists = ["US UK", "Lofi"];

const defaultUSUKVideos = [
  {
    order: 0,
    title: "MLTR - That's Why",
    youtubeId: "F4w7BBTcltk",
    playlistId: "playlist-id",
  },
  {
    order: 1,
    title: "MLTR - 25 Minutes",
    youtubeId: "SIWcOdBtLRw",
    playlistId: "playlist-id",
  },
  {
    order: 2,
    title: "Westlife - Soledad",
    youtubeId: "dUkGrSPbSOE",
    playlistId: "playlist-id",
  },
  {
    order: 3,
    title: "Enrique Iglesias - Why Not Me",
    youtubeId: "dDVcO3seBgk",
    playlistId: "playlist-id",
  },
] as Video[];

const defaultLofiVideos = [
  {
    order: 0,
    title: "Thành Đạt - Xa Vắng",
    youtubeId: "aiQBUu34BGA",
    playlistId: "playlist-id",
  },
  {
    order: 1,
    title: "Thành Đạt - Cơn Mưa Băng Giá",
    youtubeId: "DXrY1pksXV8",
    playlistId: "playlist-id",
  },
  {
    order: 2,
    title: "Thành Đạt - Nếu Em Không Về",
    youtubeId: "HZnH6Xejj5s",
    playlistId: "playlist-id",
  },
  {
    order: 3,
    title: "Thành Đạt - Nếu Lúc Trước Em Đừng tới",
    youtubeId: "12KOgC6Kj5E",
    playlistId: "playlist-id",
  },
  {
    order: 4,
    title: "Thành Đạt - Hãy về đây bên anh",
    youtubeId: "YTJU5CQWfMw",
    playlistId: "playlist-id",
  },
  {
    order: 5,
    title: "Thành Đạt - Ánh Trăng Buồn",
    youtubeId: "RkD0dq6AJXU",
    playlistId: "playlist-id",
  },
] as Video[];

const _createDefaultPlaylists = async (formData: FormData) => {
  const data = {
    userId: formData.get("userId") as string,
  };
  const userId = data.userId;

  try {
    const playlistData = defaultPlaylists.map((playlist) => {
      return {
        name: playlist,
        userId: userId,
      } as Playlist;
    });
    const existingPlaylists = await prisma.playlist.findMany({
      take: 5,
      where: {
        userId: userId,
      },
    });
    if (existingPlaylists.length > 0) {
      return {
        message: "You had one playlist at least.",
        data: data,
      };
    }
    await prisma.playlist.createMany({
      data: playlistData,
    });
    const recentlyUSUKPlaylist = await prisma.playlist.findFirst({
      where: {
        userId: userId,
        name: "US UK",
      },
    });
    if (recentlyUSUKPlaylist) {
      const playlistId = recentlyUSUKPlaylist.id;
      const videoData = defaultUSUKVideos.map((video) => {
        return {
          order: video.order,
          playlistId: playlistId,
          title: video.title,
          youtubeId: video.youtubeId,
        } as Video;
      });
      await prisma.video.createMany({
        data: videoData,
      });
    }

    const recentlyLofiPlaylist = await prisma.playlist.findFirst({
      where: {
        userId: userId,
        name: "Lofi",
      },
    });
    if (recentlyLofiPlaylist) {
      const playlistId = recentlyLofiPlaylist.id;
      const videoData = defaultLofiVideos.map((video) => {
        return {
          order: video.order,
          playlistId: playlistId,
          title: video.title,
          youtubeId: video.youtubeId,
        } as Video;
      });
      await prisma.video.createMany({
        data: videoData,
      });
    }
  } catch (error) {
    console.log("createDefaultPlaylists", error);
    return {
      message: "You had one playlist at least.",
      data: data,
    };
  }

  // Revalidate the cache and redirect.
  revalidatePath("/music");
  redirect("/music");
};

// apply admin-only privileges
export const createDefaultPlaylists = withAdminOnly(_createDefaultPlaylists);
