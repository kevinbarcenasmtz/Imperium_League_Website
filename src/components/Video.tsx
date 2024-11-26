"use client";
import { useState } from "react";
import { Container } from "@/components/Container";

interface VideoProps {
  videoSrc: string; // Path to the local video file
}

export function Video({ videoSrc }: Readonly<VideoProps>) {
  const [playVideo, setPlayVideo] = useState(false);

  if (!videoSrc) return null;

  return (
    <Container>
      <div className="relative w-full h-[500px] max-w-4xl mx-auto overflow-hidden lg:mb-20 rounded-2xl bg-gray-900 cursor-pointer">
        {!playVideo && (
          <button
            onClick={() => setPlayVideo(true)}
            className="absolute inset-auto w-16 h-16 text-white transform -translate-x-1/2 -translate-y-1/2 lg:w-28 lg:h-28 top-1/2 left-1/2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 lg:w-28 lg:h-28"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <circle cx="10" cy="10" r="10" className="text-white fill-current" />
              <polygon points="8,6 14,10 8,14" fill="#000" />
            </svg>
            <span className="sr-only">Play Video</span>
          </button>
        )}
        {playVideo && (
          <video
            src="/video/img_0.mp4"
            controls
            autoPlay
            className="w-full h-full rounded-2xl"
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </Container>
  );
}
