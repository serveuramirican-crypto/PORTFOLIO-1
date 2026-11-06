"use client";

import React from "react";
import Image from "next/image";

interface SlideItem {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
}

// Exactly matching the visual sequence from bleame.com as captured in Screenshot 1:
// 1. Black DM testimonial card with purple hearts
// 2. @brogannicole2 video unboxing the purple Bleame box
// 3. Leg comparison story card
// 4. Additional customer stories
export const BLEAME_SLIDES: SlideItem[] = [
  {
    id: "card-1",
    type: "image",
    src: "/bleame_assets/bleame_0.jpg",
    alt: "Bleame Customer Review - DM Feedback on Strawberry Skin",
  },
  {
    id: "card-2",
    type: "video",
    src: "/bleame_assets/bleame_vid_2.mp4",
    poster: "/reference_bleame/real_frame_2.png",
    alt: "Bleame Video Review by brogannicole2 Unboxing",
  },
  {
    id: "card-3",
    type: "image",
    src: "/bleame_assets/bleame_1.jpg",
    alt: "Bleame Before and After Legs Comparison",
  },
  {
    id: "card-4",
    type: "video",
    src: "/bleame_assets/bleame_vid_1.mp4",
    poster: "/reference_bleame/real_frame_1.png",
    alt: "Bleame Customer Demonstration Video",
  },
  {
    id: "card-5",
    type: "image",
    src: "/bleame_assets/bleame_2.jpg",
    alt: "Bleame Customer Selfie with Purple Hearts",
  },
  {
    id: "card-6",
    type: "video",
    src: "/bleame_assets/bleame_vid_3.mp4",
    poster: "/bleame_assets/bleame_2.jpg",
    alt: "Bleame Customer Video Testimonial",
  },
  {
    id: "card-7",
    type: "image",
    src: "/bleame_assets/bleame_3.jpg",
    alt: "Bleame Customer Leg Results Story",
  },
];

export const BleameUgcSection: React.FC = () => {
  const handleClaimOffer = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-white py-14 sm:py-20 lg:py-24 border-b border-stone-200 overflow-hidden font-sans">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop Layout: Exactly matching Screenshot 1 (Text Left, Continuous Marquee Right) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 xl:gap-16 items-center">
          
          {/* Left Column: Heading + CTA + Rating */}
          <div className="lg:col-span-5 flex flex-col items-start pr-2 xl:pr-4 z-10">
            <h2 className="text-[36px] xl:text-[40px] font-semibold text-[#2E2A39] leading-[1.28] tracking-tight mb-2.5">
              Look At How Others Are<br />Loving Their Bleame
            </h2>

            <p className="text-[#71717A] text-[16px] font-normal mb-8">
              Real Reviews From Real People
            </p>

            <a
              href="#product-variants"
              onClick={handleClaimOffer}
              className="inline-flex items-center justify-center bg-[#7069BC] hover:bg-[#5f58a8] active:scale-98 text-white font-semibold text-[17px] px-[36px] py-[13px] rounded-[10px] shadow-xs transition-all duration-200 cursor-pointer tracking-normal mb-6"
            >
              CLAIM OFFER
            </a>

            {/* Stars & Social Proof */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    width="18"
                    height="17"
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.85156 16.3333L5.20573 10.4792L0.664062 6.54167L6.66406 6.02083L8.9974 0.5L11.3307 6.02083L17.3307 6.54167L12.7891 10.4792L14.1432 16.3333L8.9974 13.2292L3.85156 16.3333Z"
                      fill="#7069BC"
                    />
                  </svg>
                ))}
              </div>
              <span className="text-[14px] font-medium text-[#2E2A39]">
                Rated 4.8/5 by 1,319+ Happy Customers
              </span>
            </div>
          </div>

          {/* Right Column: Continuous Infinite Marquee Movement */}
          <div className="lg:col-span-7 overflow-hidden relative cursor-grab active:cursor-grabbing">
            <div className="animate-bleame-marquee flex gap-4 py-2">
              {/* Set 1 */}
              {BLEAME_SLIDES.map((slide, idx) => (
                <div
                  key={`slide-set1-${idx}`}
                  className="flex-shrink-0 w-[303px] h-[503px] rounded-[20px] overflow-hidden shadow-sm border border-stone-200/60 bg-[#111] relative group"
                >
                  {slide.type === "video" ? (
                    <video
                      src={slide.src}
                      poster={slide.poster}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      sizes="303px"
                      priority={idx === 0}
                      className="object-cover"
                    />
                  )}
                </div>
              ))}
              {/* Set 2 (for seamless infinite loop) */}
              {BLEAME_SLIDES.map((slide, idx) => (
                <div
                  key={`slide-set2-${idx}`}
                  className="flex-shrink-0 w-[303px] h-[503px] rounded-[20px] overflow-hidden shadow-sm border border-stone-200/60 bg-[#111] relative group"
                >
                  {slide.type === "video" ? (
                    <video
                      src={slide.src}
                      poster={slide.poster}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      sizes="303px"
                      className="object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Mobile Layout: Carousel on Top, Centered Content Below */}
        <div className="flex flex-col lg:hidden items-center text-center gap-6">
          
          {/* Mobile Continuous Marquee */}
          <div className="w-full overflow-hidden relative">
            <div className="animate-bleame-marquee flex gap-3.5 py-1">
              {BLEAME_SLIDES.map((slide, idx) => (
                <div
                  key={`mob-set1-${idx}`}
                  className="flex-shrink-0 w-[240px] h-[400px] sm:w-[260px] sm:h-[440px] rounded-[18px] overflow-hidden shadow-sm border border-stone-200 bg-[#111] relative"
                >
                  {slide.type === "video" ? (
                    <video
                      src={slide.src}
                      poster={slide.poster}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      sizes="260px"
                      className="object-cover"
                    />
                  )}
                </div>
              ))}
              {BLEAME_SLIDES.map((slide, idx) => (
                <div
                  key={`mob-set2-${idx}`}
                  className="flex-shrink-0 w-[240px] h-[400px] sm:w-[260px] sm:h-[440px] rounded-[18px] overflow-hidden shadow-sm border border-stone-200 bg-[#111] relative"
                >
                  {slide.type === "video" ? (
                    <video
                      src={slide.src}
                      poster={slide.poster}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      sizes="260px"
                      className="object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Centered Content Below */}
          <div className="max-w-md px-2">
            <h2 className="text-[26px] sm:text-[30px] font-semibold text-[#2E2A39] leading-tight mb-2">
              Look At How Others Are<br />Loving Their Bleame
            </h2>

            <p className="text-[#71717A] text-[15px] font-normal mb-5">
              Real Reviews From Real People
            </p>

            <a
              href="#product-variants"
              onClick={handleClaimOffer}
              className="inline-flex items-center justify-center bg-[#7069BC] hover:bg-[#5f58a8] active:scale-98 text-white font-semibold text-[16px] px-8 py-3 rounded-[10px] shadow-sm transition mb-4 tracking-normal"
            >
              CLAIM OFFER
            </a>

            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={`mob-star-${i}`}
                    width="16"
                    height="15"
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.85156 16.3333L5.20573 10.4792L0.664062 6.54167L6.66406 6.02083L8.9974 0.5L11.3307 6.02083L17.3307 6.54167L12.7891 10.4792L14.1432 16.3333L8.9974 13.2292L3.85156 16.3333Z"
                      fill="#7069BC"
                    />
                  </svg>
                ))}
              </div>
              <span className="text-[13px] font-medium text-[#2E2A39]">
                Rated 4.8/5 by 1,319+ Happy Customers
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
