"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface PoloGalleryProps {
  images: {
    src: string;
    alt: string;
  }[];
}

export const PoloGallery: React.FC<PoloGalleryProps> = ({ images }) => {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  // Track mobile carousel scroll position
  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const { scrollLeft, clientWidth } = mobileScrollRef.current;
    if (clientWidth === 0) return;
    const newIndex = Math.round(scrollLeft / clientWidth);
    if (newIndex !== activeMobileIndex && newIndex >= 0 && newIndex < images.length) {
      setActiveMobileIndex(newIndex);
    }
  };

  const scrollToMobileSlide = (index: number) => {
    if (!mobileScrollRef.current) return;
    const width = mobileScrollRef.current.clientWidth;
    mobileScrollRef.current.scrollTo({
      left: index * width,
      behavior: "smooth",
    });
    setActiveMobileIndex(index);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, images.length]);

  return (
    <div className="relative w-full">
      {/* ================= DESKTOP VIEW: 2x2 Image Grid with Hover Zoom & Floating Nav ================= */}
      <div className="hidden lg:block relative w-full group/gallery">
        {/* Flame Badge (Top Right) */}
        <div className="absolute top-4 right-4 z-20 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-sm border border-gray-100 text-xs font-semibold text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse"
            >
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
            </svg>
            <span>
              <strong className="font-bold">1.6k</strong> people viewed this in the last 24 hours
            </span>
          </div>
        </div>

        {/* Floating Side Nav Controls */}
        <div className="sticky top-1/2 -translate-y-1/2 z-20 float-left -ml-4 pl-4 flex flex-col items-center gap-3 opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300 pointer-events-auto">
          <button
            type="button"
            onClick={() => window.scrollBy({ top: -350, behavior: "smooth" })}
            className="w-9 h-9 flex items-center justify-center bg-white/95 hover:bg-white text-gray-700 rounded-full shadow-md border border-gray-100 transition-transform active:scale-90 cursor-pointer"
            aria-label="Previous image"
            title="Défiler vers le haut"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>

          <div className="w-1.5 h-28 bg-gray-200/80 rounded-full relative overflow-hidden">
            <div
              className="absolute left-0 w-full bg-black rounded-full transition-all duration-150"
              style={{ height: "40%", top: "10%" }}
            />
          </div>

          <button
            type="button"
            onClick={() => window.scrollBy({ top: 350, behavior: "smooth" })}
            className="w-9 h-9 flex items-center justify-center bg-white/95 hover:bg-white text-gray-700 rounded-full shadow-md border border-gray-100 transition-transform active:scale-90 cursor-pointer"
            aria-label="Next image"
            title="Défiler vers le bas pour voir toutes les photos"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>

        {/* 2×2 Desktop Image Grid */}
        <div className="grid grid-cols-2 gap-1">
          {images.map((img, idx) => {
            const isLastOdd = idx === images.length - 1 && images.length % 2 !== 0;
            return (
              <div
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className={`relative bg-neutral-100 overflow-hidden cursor-zoom-in group/img ${
                  isLastOdd ? "col-span-2 aspect-[16/10]" : "aspect-[3/4]"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={isLastOdd ? "(max-width: 1024px) 100vw, 760px" : "(max-width: 1024px) 50vw, 380px"}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-[1.03]"
                  priority={idx < 2}
                />
              {/* Maximize Icon */}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/60 text-white p-2 rounded-full backdrop-blur-sm flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" x2="14" y1="3" y2="10" />
                  <line x1="3" x2="10" y1="21" y2="14" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
      </div>

      {/* ================= MOBILE VIEW: Horizontal Swipe Carousel ================= */}
      <div className="lg:hidden relative w-full bg-neutral-100">
        {/* Flame Badge (Top Left) */}
        <div className="absolute top-3 left-3 z-20">
          <div className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm text-[11px] font-semibold text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5 text-orange-500 fill-orange-500"
            >
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
            </svg>
            <span>
              <strong>1.6k</strong> viewed in 24h
            </span>
          </div>
        </div>

        {/* Counter Badge (Bottom Right) */}
        <div className="absolute bottom-4 right-4 z-20 bg-black/70 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
          {activeMobileIndex + 1} / {images.length}
        </div>

        {/* Scrollable Slides Container */}
        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="w-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
          style={{ scrollBehavior: "smooth" }}
        >
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className="w-full flex-shrink-0 snap-start aspect-[3/4] relative bg-neutral-100 overflow-hidden cursor-zoom-in"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="100vw"
                className="w-full h-full object-cover object-top"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-1.5 py-3 bg-white">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToMobileSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeMobileIndex === idx ? "w-6 bg-black" : "w-1.5 bg-gray-300"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ================= FULLSCREEN LIGHTBOX MODAL ================= */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-black/40 hover:bg-black/70 transition-colors z-50 cursor-pointer"
            aria-label="Close image preview"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Previous Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-black/40 hover:bg-black/70 transition-colors z-50 cursor-pointer"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* Current Lightbox Image */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[85vh] max-w-[650px]">
              <Image
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                fill
                sizes="80vw"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-black/40 hover:bg-black/70 transition-colors z-50 cursor-pointer"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          {/* Bottom Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-xs font-semibold bg-black/50 px-3 py-1 rounded-full">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
};

