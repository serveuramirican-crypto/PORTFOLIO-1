"use client";

import React, { useState } from "react";
import Image from "next/image";

export const METABOLAE_GALLERY = [
  {
    src: "/metabolae_assets/img_21_metabolae-new-foto-pdp-1.webp",
    alt: "Metabolae Ceylon Cinnamon Bottle & Softgels Front View",
  },
  {
    src: "/metabolae_assets/img_22_metabolae-new-foto-pdp-2.webp",
    alt: "New Look! Same Trusted Formula - Metabolae Ceylon Cinnamon Rebrand",
  },
  {
    src: "/metabolae_assets/img_23_metabolae-new-foto-pdp-3.webp",
    alt: "Key Benefits with Medical Doctor Endorsement",
  },
  {
    src: "/metabolae_assets/img_24_metabolae-new-foto-pdp-4.webp",
    alt: "12:1 Ceylon Cinnamon Concentrated Extract with MCT Oil",
  },
  {
    src: "/metabolae_assets/img_25_metabolae-new-foto-pdp-5.webp",
    alt: "90-Day Money-Back Guarantee Satisfaction Seal",
  },
  {
    src: "/metabolae_assets/img_26_metabolae-new-foto-pdp-6.webp",
    alt: "Ceylon Cinnamon Supplement Facts & Clean Ingredients",
  },
  {
    src: "/metabolae_assets/img_27_metabolae-new-foto-pdp-7.webp",
    alt: "Clinical Research & Third-Party Lab Testing",
  },
  {
    src: "/metabolae_assets/img_28_metabolae-new-foto-pdp-8.webp",
    alt: "Metabolae Ceylon Cinnamon vs Cassia Cinnamon Comparison",
  },
  {
    src: "/metabolae_assets/img_29_metabolae-new-foto-pdp-9.webp",
    alt: "Certificate of Authenticity Sri Lanka Ceylon Cinnamon",
  },
];

interface MetabolaeGalleryProps {
  selectedIndex?: number;
  onSelectIndex?: (index: number) => void;
}

export const MetabolaeGallery: React.FC<MetabolaeGalleryProps> = ({
  selectedIndex: propIndex,
  onSelectIndex,
}) => {
  // Default to index 1 ("New Look! Same Trusted Formula.") to match screenshot 2
  const [internalIndex, setInternalIndex] = useState(1);
  const currentIndex = propIndex !== undefined ? propIndex : internalIndex;

  const handleSelect = (idx: number) => {
    if (onSelectIndex) {
      onSelectIndex(idx);
    } else {
      setInternalIndex(idx);
    }
  };

  const handlePrev = () => {
    const next = (currentIndex - 1 + METABOLAE_GALLERY.length) % METABOLAE_GALLERY.length;
    handleSelect(next);
  };

  const handleNext = () => {
    const next = (currentIndex + 1) % METABOLAE_GALLERY.length;
    handleSelect(next);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Image Stage */}
      <div className="relative w-full aspect-square bg-[#fcfaf7] rounded-xl overflow-hidden border border-stone-200/80 group">
        <Image
          src={METABOLAE_GALLERY[currentIndex].src}
          alt={METABOLAE_GALLERY[currentIndex].alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          className="object-contain transition-all duration-300"
        />

        {/* Prev Arrow */}
        <button
          onClick={handlePrev}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-700 shadow-md flex items-center justify-center transition border border-stone-200/60 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next Arrow */}
        <button
          onClick={handleNext}
          aria-label="Next image"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-700 shadow-md flex items-center justify-center transition border border-stone-200/60 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide Counter on mobile */}
        <div className="absolute bottom-3 right-3 sm:hidden bg-black/60 text-white text-[11px] px-2 py-0.5 rounded-full font-medium">
          {currentIndex + 1} / {METABOLAE_GALLERY.length}
        </div>
      </div>

      {/* Thumbnails Row */}
      <div className="w-full flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-stone-300">
        {METABOLAE_GALLERY.map((img, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`relative flex-shrink-0 w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-[#faf8f5] ${
                isActive
                  ? "border-[#a65e39] shadow-sm ring-1 ring-[#a65e39]"
                  : "border-stone-200 hover:border-stone-400 opacity-80 hover:opacity-100"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="80px"
                className="object-contain p-0.5"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

