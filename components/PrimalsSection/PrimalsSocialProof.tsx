"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

interface VideoCardItem {
  id: number;
  poster: string;
  videoSrc: string; // Left empty as instructed: "don't copy the assets videos, make them empty, so i can add them manuell"
  alt: string;
}

const PRIMALS_VIDEOS: VideoCardItem[] = [
  {
    id: 1,
    poster: "/primals_assets/primals_poster_1.png",
    videoSrc: "",
    alt: "Primals Boar Bristle Toothbrush Customer Review - Plastic-Free Dental Care",
  },
  {
    id: 2,
    poster: "/primals_assets/primals_poster_2.png",
    videoSrc: "",
    alt: "Primals Customer Unboxing Natural Wooden Boar Hair Toothbrush",
  },
  {
    id: 3,
    poster: "/primals_assets/primals_poster_3.png",
    videoSrc: "",
    alt: "Primals Customer Showing Boar Bristle Firmness and Clean",
  },
  {
    id: 4,
    poster: "/primals_assets/primals_poster_4.png",
    videoSrc: "",
    alt: "Customer Explaining Why They Switched From Nylon Bristles",
  },
  {
    id: 5,
    poster: "/primals_assets/primals_poster_5.png",
    videoSrc: "",
    alt: "Bamboo Handle and Genuine Boar Bristle Close Up Review",
  },
  {
    id: 6,
    poster: "/primals_assets/primals_poster_6.png",
    videoSrc: "",
    alt: "Daily Morning Routine with Primals Boar Bristle Brush",
  },
  {
    id: 7,
    poster: "/primals_assets/primals_poster_7.png",
    videoSrc: "",
    alt: "Natural Boar Hair Bristle Texture Testimonial",
  },
  {
    id: 8,
    poster: "/primals_assets/primals_poster_8.png",
    videoSrc: "",
    alt: "Zero Waste Plastic Free Bathroom Switch Customer Video",
  },
  {
    id: 9,
    poster: "/primals_assets/primals_poster_9.png",
    videoSrc: "",
    alt: "Comparing Synthetic Toothbrush vs Genuine Boar Hair",
  },
  {
    id: 10,
    poster: "/primals_assets/primals_poster_10.png",
    videoSrc: "",
    alt: "Long Term User Review of Primals Boar Hair Toothbrush",
  },
];

const FILTER_PILLS = [
  "MICROPLASTIC-FREE",
  "MOLD-FREE",
  "GLUE-FREE",
  "FIRM CLEAN",
];

const TESTIMONIALS = [
  {
    title: "Plastic out of my routine",
    quote:
      "The thought of scrubbing synthetic bristles across my teeth twice a day put me off. Real boar bristle means nothing plastic in my routine.",
    author: "DION R.",
  },
  {
    title: "Real bristle, nothing fake",
    quote:
      "I wanted a brush that wasn't made of plastic from tip to handle. Bamboo and boar bristle, that's the whole thing, and that's the point.",
    author: "KAI M.",
  },
  {
    title: "No synthetic anything",
    quote:
      "Made the switch to get plastic out of my body where I could. Starting with the brush I use twice a day felt like the obvious first move.",
    author: "SERENA P.",
  },
];

export const PrimalsSocialProof: React.FC = () => {
  const [activePill, setActivePill] = useState<string>("MICROPLASTIC-FREE");
  const [mutedStates, setMutedStates] = useState<{ [key: number]: boolean }>({});
  const [activeModalVideo, setActiveModalVideo] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const toggleMute = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setMutedStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const progress = scrollWidth > clientWidth ? (scrollLeft / (scrollWidth - clientWidth)) * 100 : 0;
      setScrollProgress(progress);
    }
  };

  const scrollByAmount = (amount: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#e8f1e7] py-14 sm:py-18 lg:py-24 border-b border-[#d7e5d5] overflow-hidden font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <h2 className="text-center font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[42px] uppercase tracking-tight text-[#0d3b24] mb-8 sm:mb-12 font-serif sm:font-sans">
          JOIN MILLIONS WHO DITCHED PLASTIC FOR GOOD
        </h2>

        {/* Video Carousel Container */}
        <div className="relative group">
          
          {/* Left Arrow Button */}
          <button
            onClick={() => scrollByAmount(-300)}
            aria-label="Previous video"
            className="absolute -left-2 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 text-stone-800 shadow-lg border border-stone-200/60 flex items-center justify-center hover:bg-white hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => scrollByAmount(300)}
            aria-label="Next video"
            className="absolute -right-2 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 text-stone-800 shadow-lg border border-stone-200/60 flex items-center justify-center hover:bg-white hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scrollable Carousel Track */}
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-3 sm:gap-4.5 overflow-x-auto pb-4 pt-1 px-4 scroll-smooth snap-x scrollbar-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {PRIMALS_VIDEOS.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveModalVideo(item.id)}
                className="relative flex-shrink-0 w-[190px] sm:w-[220px] md:w-[245px] aspect-[9/15] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-[#0d3b24]/10 bg-[#d9e8d7] cursor-pointer group/card snap-start transition-transform hover:-translate-y-1"
              >
                {/* Poster Cover Image */}
                <Image
                  src={item.poster}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 200px, 260px"
                  className="object-cover group-hover/card:scale-103 transition-transform duration-300"
                />

                {/* Video Tag (rendered only when videoSrc is provided to prevent empty src browser error) */}
                {item.videoSrc ? (
                  <video
                    className="hidden w-full h-full object-cover"
                    src={item.videoSrc}
                    poster={item.poster}
                    playsInline
                    controls
                  />
                ) : null}

                {/* Sound / Mute Icon Button (Top Right) */}
                <button
                  onClick={(e) => toggleMute(item.id, e)}
                  aria-label="Toggle sound"
                  className="absolute top-3 right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0d3b24]/80 hover:bg-[#0d3b24] text-white flex items-center justify-center shadow transition-transform active:scale-90"
                >
                  {mutedStates[item.id] ? (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                    </svg>
                  )}
                </button>

                {/* Center Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#0d3b24]/75 group-hover/card:bg-[#0d3b24] text-white flex items-center justify-center shadow-lg transition-transform group-hover/card:scale-110">
                    <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Slider Track */}
          <div className="max-w-xs mx-auto mt-4 px-4 flex items-center gap-2">
            <span className="text-[10px] text-[#0d3b24]/60">◀</span>
            <div className="flex-1 h-1 bg-[#0d3b24]/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0d3b24] rounded-full transition-all duration-150"
                style={{ width: `${Math.max(15, scrollProgress)}%` }}
              />
            </div>
            <span className="text-[10px] text-[#0d3b24]/60">▶</span>
          </div>
        </div>

        {/* 4 Interactive Tag Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mt-8 sm:mt-10">
          {FILTER_PILLS.map((pill) => {
            const isActive = pill === activePill;
            return (
              <button
                key={pill}
                onClick={() => setActivePill(pill)}
                className={`text-xs sm:text-sm font-extrabold uppercase px-5 py-2 rounded-full border transition-all cursor-pointer tracking-wider ${
                  isActive
                    ? "bg-[#0d3b24] text-white border-[#0d3b24] shadow-xs"
                    : "bg-transparent text-[#0d3b24] border-[#0d3b24]/60 hover:border-[#0d3b24] hover:bg-[#0d3b24]/5"
                }`}
              >
                {pill}
              </button>
            );
          })}
        </div>

        {/* 3 Customer Review Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mt-10 sm:mt-14 max-w-5xl mx-auto text-center">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="flex flex-col items-center px-4">
              {/* 5 Green Stars */}
              <div className="flex text-[#0d3b24] text-base mb-2.5 tracking-wider">
                {"★★★★★"}
              </div>

              {/* Title */}
              <h3 className="font-extrabold text-[#0d3b24] text-base sm:text-lg mb-2">
                {t.title}
              </h3>

              {/* Quote Body */}
              <p className="text-xs sm:text-sm text-[#274f38] leading-relaxed mb-4 max-w-sm">
                {t.quote}
              </p>

              {/* Author */}
              <span className="text-xs font-extrabold tracking-widest text-[#0d3b24] uppercase mt-auto">
                {t.author}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* Video Placeholder Modal (allows manual insertion notification) */}
      {activeModalVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setActiveModalVideo(null)}
        >
          <div
            className="bg-[#f3f7f2] rounded-2xl p-6 max-w-sm w-full text-center relative shadow-2xl border border-[#0d3b24]/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalVideo(null)}
              className="absolute top-3 right-3 text-stone-400 hover:text-stone-700 text-2xl font-bold leading-none cursor-pointer"
            >
              &times;
            </button>
            <div className="w-12 h-12 rounded-full bg-[#0d3b24]/10 text-[#0d3b24] flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <h4 className="font-bold text-[#0d3b24] text-base mb-1">
              Video Player Ready
            </h4>
            <p className="text-xs text-stone-600 mb-4 leading-relaxed">
              Video slot #{activeModalVideo} is initialized with empty asset source as requested. You can manually assign your custom video URL in <code>components/PrimalsSection/PrimalsSocialProof.tsx</code>.
            </p>
            <button
              onClick={() => setActiveModalVideo(null)}
              className="w-full py-2.5 bg-[#0d3b24] hover:bg-[#072517] text-white rounded-lg text-sm font-semibold transition cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

