"use client";

import React, { useState } from "react";
import Image from "next/image";

interface VideoReview {
  id: string;
  image: string;
  alt: string;
  title: string;
  author: string;
  role: string;
  quote?: string;
}

export const MetabolaeVideoReviews: React.FC = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const reviews: VideoReview[] = [
    {
      id: "doc-1",
      image: "/metabolae_assets/img_39_metabolae-doctor-blood-sugar-thumbnail.png",
      alt: "Medical Doctor Explaining Ceylon Cinnamon Blood Sugar Benefits",
      title: "Doctor Review on Blood Sugar",
      author: "Dr. Henderson, M.D.",
      role: "Endocrine Specialist",
    },
    {
      id: "ugc-1",
      image: "/metabolae_assets/img_40_metabolae-ugc-cravings-blood-sugar-thumbnail.png",
      alt: "Customer Review Holding Ceylon Cinnamon Softgels",
      title: "Real Customer Ceylon Cinnamon Results",
      author: "Sarah M.",
      role: "Verified Customer",
    },
    {
      id: "doc-2",
      image: "/metabolae_assets/img_41_metabolae-doctor-diabetes-industry-thumbnail.png",
      alt: "Medical Professional Discussing Metabolic Health & Ceylon Cinnamon",
      title: "Why Standard Cinnamon Fails",
      author: "Dr. Lin, Ph.D.",
      role: "Clinical Nutritionist",
    },
  ];

  return (
    <div className="w-full mt-4 sm:mt-5">
      <h3 className="text-base sm:text-lg font-bold text-center text-stone-900 mb-3 sm:mb-4">
        What our customers are saying:
      </h3>

      {/* 3 Video Cards - Increased size and aspect ratio matching Screenshot 3 */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3.5">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            onClick={() => setPlayingId(rev.id)}
            className="group relative aspect-[9/14.5] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all border border-stone-200/90 bg-stone-100"
          >
            <Image
              src={rev.image}
              alt={rev.alt}
              fill
              sizes="(max-width: 768px) 33vw, 220px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Subtle dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-black/10 group-hover:from-black/55 transition-colors" />

            {/* Play Button Overlay - Matching Screenshot 3 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/85 sm:bg-white/90 border border-white/60 text-stone-900 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 fill-stone-900 ml-0.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next Slider Controls */}
      <div className="flex items-center justify-center gap-3 mt-3.5">
        <button
          type="button"
          aria-label="Previous customer review"
          className="w-8 h-8 rounded-full border border-stone-300 hover:border-stone-500 text-stone-600 flex items-center justify-center transition active:scale-95 bg-white shadow-xs"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next customer review"
          className="w-8 h-8 rounded-full border border-stone-300 hover:border-stone-500 text-stone-600 flex items-center justify-center transition active:scale-95 bg-white shadow-xs"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Video Modal if clicked */}
      {playingId && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setPlayingId(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-sm w-full text-center relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPlayingId(null)}
              className="absolute top-3 right-3 text-stone-400 hover:text-stone-700 text-2xl font-bold leading-none"
            >
              &times;
            </button>
            <div className="w-12 h-12 rounded-full bg-[#fbf5f0] text-[#c47245] flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <h4 className="font-bold text-stone-900 text-base mb-1">
              Customer Video Testimonial
            </h4>
            <p className="text-xs text-stone-600 mb-4">
              &ldquo;I have been taking Metabolae Ceylon Cinnamon for 3 months now. My fasting numbers stabilized and I haven&apos;t experienced any afternoon energy crashes!&rdquo;
            </p>
            <button
              onClick={() => setPlayingId(null)}
              className="w-full py-2 bg-[#c47245] hover:bg-[#b05d30] text-white rounded-lg text-sm font-semibold transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
