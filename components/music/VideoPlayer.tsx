"use client";

import { Video } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

type VideoPlayerProps = {
  videos: Video[];
};

export default function VideoPlayer({ videos }: VideoPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(currentIndex);
  const playerRef = useRef<YT.Player | null>(null);

  const handleNext = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("player", {
        videoId: videos[currentIndex]?.youtubeId,
        events: {
          onReady: (event: YT.PlayerEvent) => event.target.playVideo(),
          onStateChange: (event: YT.OnStateChangeEvent) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              const current = currentIndexRef.current;
              if (current < videos.length - 1) {
                setCurrentIndex(current + 1);
              }
            }
          },
        },
      });
    };

    return () => {
      delete window.onYouTubeIframeAPIReady;
    };
  }, [videos]);

  useEffect(() => {
    if (playerRef.current && playerRef.current.loadVideoById) {
      playerRef.current.loadVideoById(videos[currentIndex]?.youtubeId);
    }
  }, [currentIndex, videos]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-cyan-400 mb-4">Video player</h1>

      <div
        id="player"
        className="aspect-video w-full max-w-3xl mx-auto mb-6"
      ></div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="bg-gray-700 px-4 py-2 rounded disabled:opacity-50 hover:bg-gray-600"
        >
          ◀ Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === videos.length - 1}
          className="bg-gray-700 px-4 py-2 rounded disabled:opacity-50 hover:bg-gray-600"
        >
          ▶ Next
        </button>
      </div>

      <div className="mb-4">
        <Link href={"/music"} className="text-cyan-400 hover:underline">
          Back
        </Link>
      </div>
      <h2 className="text-xl mb-2 text-cyan-300">Playlist:</h2>
      <div className="m-2">
        {videos.map((video, index) => (
          <div key={`video-id-${video.id}-${index}`}>
            <Button
              variant={"ghost"}
              onClick={() => {
                setCurrentIndex(index);
              }}
              className={clsx(
                "hover:underline",
                {
                  "text-cyan-400": currentIndex === index,
                },
                {
                  "text-cyan-700": currentIndex !== index,
                }
              )}
            >
              {video.title}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
