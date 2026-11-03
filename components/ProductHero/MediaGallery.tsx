"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

export interface GalleryImage {
  src: string;
  alt: string;
  color?: string;
}

interface MediaGalleryProps {
  images: GalleryImage[];
  selectedImageIndex: number;
  onSelectImage: (index: number) => void;
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({
  images,
  selectedImageIndex,
  onSelectImage,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const currentImage = images[selectedImageIndex] || images[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectImage(selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectImage(selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1);
  };

  return (
    <div className="flex flex-col gap-3 md:gap-4 select-none">
      {/* Main Image Container */}
      <div className="relative w-full aspect-[3/4] md:aspect-[4/5] bg-[#F7F7F7] rounded-xl overflow-hidden group border border-gray-100/80">
        <Image
          src={currentImage.src}
          alt={currentImage.alt || "Everyday Stretch Capri"}
          fill
          priority
          className={`object-cover object-center transition-transform duration-300 ${
            isZoomed ? "scale-125 cursor-zoom-out" : "hover:scale-105 cursor-zoom-in"
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          <span className="bg-[#2A3743] text-white text-[11px] md:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
            BUY 1 GET 1 FREE
          </span>
          <span className="bg-[#D2E1D7] text-[#244317] text-[10px] md:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm w-fit">
            BESTSELLER
          </span>
        </div>

        {/* Zoom Hint */}
        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md p-1.5 rounded-full text-gray-700 shadow-sm pointer-events-none opacity-80 group-hover:opacity-100 transition">
          <ZoomIn className="w-4 h-4" />
        </div>

        {/* Arrow Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-md flex items-center justify-center transition active:scale-95 opacity-90 hover:opacity-100 z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-md flex items-center justify-center transition active:scale-95 opacity-90 hover:opacity-100 z-10"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Mobile Page Indicator */}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full md:hidden">
          {selectedImageIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails Row */}
      <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
        {images.map((img, idx) => (
          <button
            key={`${img.src}-${idx}`}
            onClick={() => {
              onSelectImage(idx);
              setIsZoomed(false);
            }}
            className={`relative flex-shrink-0 w-16 h-20 md:w-20 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${
              selectedImageIndex === idx
                ? "border-[#2A3743] shadow-md scale-95"
                : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt || `Thumbnail ${idx + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

