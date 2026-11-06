"use client";

import React, { useRef, useState } from "react";
import { Play, Pause, Instagram } from "lucide-react";

interface ReelItem {
  videoSrc: string;
  poster: string;
}

const REELS_DATA: ReelItem[] = [
  {
    videoSrc: "/assets/f431405622bc4a5984cd7070a5a5d99a.HD-1080p-7.2Mbps-92682564.mp4",
    poster: "/assets/images/260819_D_D_SHOT_126_7644.webp",
  },
  {
    videoSrc: "/assets/f68bb583b0464ec8974b542e02be3a27.HD-1080p-7.2Mbps-92681580.mp4",
    poster: "/assets/images/260819_D_D_SHOT_126_7669.webp",
  },
  {
    videoSrc: "/assets/ff371fbbc9e747efb1fd42d1b7c2eab4.HD-1080p-7.2Mbps-92681768.mp4",
    poster: "/assets/images/260819_D_D_SHOT_126_7676.webp",
  },
];

export const VideoReels: React.FC = () => {
  const [playingStates, setPlayingStates] = useState<boolean[]>([true, true, true]);
  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
  ];

  const togglePlay = (index: number) => {
    const video = videoRefs[index].current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setPlayingStates((prev) => {
        const next = [...prev];
        next[index] = true;
        return next;
      });
    } else {
      video.pause();
      setPlayingStates((prev) => {
        const next = [...prev];
        next[index] = false;
        return next;
      });
    }
  };

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-10 md:py-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#252220] tracking-tight">
          The Pants Everyone’s Wearing—For A Reason
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
        {REELS_DATA.map((reel, idx) => {
          const isPlaying = playingStates[idx];
          return (
            <div
              key={idx}
              className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-lg group cursor-pointer"
              onClick={() => togglePlay(idx)}
            >
              <video
                ref={videoRefs[idx]}
                src={reel.videoSrc}
                poster={reel.poster}
                playsInline
                muted
                loop
                autoPlay
                className="w-full h-full object-cover"
              />

              {/* Play / Pause Overlay Button */}
              <button
                type="button"
                className={`absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/40 text-white backdrop-blur-xs flex items-center justify-center transition-all ${
                  isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100 scale-110"
                }`}
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
            </div>
          );
        })}
      </div>

      {/* Instagram Views Pill Link */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF7F5] border border-[#EFE8E2] text-xs sm:text-sm font-bold text-gray-800 shadow-2xs">
          <Instagram className="w-4 h-4 text-[#E1306C]" />
          <span>Over 55M Views on Instagram</span>
        </div>
      </div>
    </section>
  );
};
