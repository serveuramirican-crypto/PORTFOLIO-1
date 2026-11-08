"use client";

import React, { useState, useRef } from "react";

interface VideoReview {
  id: string;
  videoSrc: string;
  alt: string;
  title: string;
  author: string;
  role: string;
  quote: string;
}

export const MetabolaeVideoReviews: React.FC = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [modalVideoId, setModalVideoId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<{ [id: string]: boolean }>({
    "video-1": false,
    "video-2": false,
  });

  const videoRefs = useRef<{ [id: string]: HTMLVideoElement | null }>({});

  const reviews: VideoReview[] = [
    {
      id: "video-1",
      videoSrc: "/customer_videos/vsl_video_1.mp4",
      alt: "Customer review video 1",
      title: "Lookbook Styling & Fit",
      author: "Emma R.",
      role: "Verified Buyer",
      quote: "The fabric feels like absolute luxury. Fits perfectly and moves effortlessly!",
    },
    {
      id: "video-2",
      videoSrc: "/customer_videos/vsl_video_2.mp4",
      alt: "Customer review video 2",
      title: "All Day Comfort & Elegance",
      author: "Chloe D.",
      role: "Verified Buyer",
      quote: "Hands down the most comfortable and stylish set I've ever owned. Love the print!",
    },
  ];

  const handleTogglePlay = (id: string) => {
    const videoEl = videoRefs.current[id];
    if (!videoEl) return;

    if (playingId === id) {
      videoEl.pause();
      setPlayingId(null);
    } else {
      // Pause any other playing video first
      if (playingId && videoRefs.current[playingId]) {
        videoRefs.current[playingId]?.pause();
      }
      videoEl.muted = !!isMuted[id];
      videoEl.play().catch(() => {
        // Fallback to muted if browser blocks unmuted playback
        videoEl.muted = true;
        setIsMuted((prev) => ({ ...prev, [id]: true }));
        videoEl.play().catch(() => {});
      });
      setPlayingId(id);
    }
  };

  const handleToggleMute = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const videoEl = videoRefs.current[id];
    if (videoEl) {
      const nextMuted = !videoEl.muted;
      videoEl.muted = nextMuted;
      setIsMuted((prev) => ({ ...prev, [id]: nextMuted }));
    }
  };

  const activeModalReview = reviews.find((r) => r.id === modalVideoId);

  return (
    <div className="w-full mt-3 sm:mt-4">
      {/* Heading */}
      <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-3 text-left">
        What our customers are saying:
      </h3>

      {/* 2 Video Cards - Exactly matching the screenshot */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-[480px]">
        {reviews.map((rev) => {
          const isPlaying = playingId === rev.id;

          return (
            <div
              key={rev.id}
              onClick={() => handleTogglePlay(rev.id)}
              className="group relative aspect-[9/15.5] rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow bg-neutral-900 select-none"
            >
              {/* Video Element */}
              <video
                ref={(el) => {
                  videoRefs.current[rev.id] = el;
                }}
                src={`${rev.videoSrc}#t=0.001`}
                playsInline
                preload="metadata"
                onEnded={() => setPlayingId(null)}
                className="w-full h-full object-cover"
              />

              {/* Exact translucent Play Button from Screenshot (centered) */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-white/95 bg-black/45 backdrop-blur-[2px] flex items-center justify-center shadow-lg transition-transform group-hover:scale-108">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 fill-white ml-0.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Pause icon overlay on hover while playing */}
              {isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="w-10 h-10 rounded-full border-2 border-white/90 bg-black/50 backdrop-blur-[2px] flex items-center justify-center shadow-md">
                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Audio toggle button (only visible when playing) */}
              {isPlaying && (
                <button
                  type="button"
                  onClick={(e) => handleToggleMute(rev.id, e)}
                  aria-label="Toggle mute"
                  className="absolute top-2 right-2 z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center shadow transition-transform active:scale-90"
                >
                  {isMuted[rev.id] ? (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                    </svg>
                  )}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Video Modal if user wants full screen */}
      {modalVideoId && activeModalReview && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setModalVideoId(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-sm w-full relative shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalVideoId(null)}
              className="absolute top-3 right-3 z-20 bg-black/60 hover:bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold cursor-pointer transition"
              aria-label="Close video"
            >
              &times;
            </button>
            <div className="relative aspect-[9/16] w-full bg-black">
              <video
                src={activeModalReview.videoSrc}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 text-left bg-white">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-stone-900 text-sm">
                  {activeModalReview.author}
                </h4>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {activeModalReview.role}
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed italic">
                &ldquo;{activeModalReview.quote}&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
