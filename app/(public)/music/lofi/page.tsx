"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

const videoIds = ["F4w7BBTcltk"];

export default function Page() {
  const playerRef = useRef<YT.Player | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < videoIds.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("player", {
        videoId: videoIds[0],
        events: {
          onReady: (event: YT.PlayerEvent) => event.target.playVideo(),
          onStateChange: (event: YT.OnStateChangeEvent) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              handleNext();
            }
          },
        },
      });
    };

    return () => {
      delete window.onYouTubeIframeAPIReady;
    };
  }, []);

  useEffect(() => {
    if (playerRef.current && playerRef.current.loadVideoById) {
      playerRef.current.loadVideoById(videoIds[currentIndex]);
    }
  }, [currentIndex]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-cyan-400 mb-4">Video player</h1>

      <div
        id="player"
        className="mb-6"
        style={{ width: "560px", height: "315px" }}
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
          disabled={currentIndex === videoIds.length - 1}
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
        {videoIds.map((id, index) => (
          <div key={`video-id-${id}`}>
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
              Video {index + 1}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
