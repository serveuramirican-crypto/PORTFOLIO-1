"use client";

import React from "react";
import { PoloGallery } from "../PoloHero/PoloGallery";
import { PoloBuyBox2 } from "./PoloBuyBox2";
import { MetabolaeBundleOffer } from "../PoloHero/MetabolaeBundleOffer";
import { MetabolaeVideoReviews, VideoReview } from "../MetabolaeHero/MetabolaeVideoReviews";

export const PoloHero2: React.FC = () => {
  const images = [
    {
      src: "/curvd_assets/pdp2/hero_1.jpg",
      alt: "Desmond & Dempsey Pyjama View 1",
    },
    {
      src: "/curvd_assets/pdp2/hero_2.jpg",
      alt: "Desmond & Dempsey Pyjama View 2",
    },
    {
      src: "/curvd_assets/pdp2/hero_3.jpg",
      alt: "Desmond & Dempsey Pyjama View 3",
    },
    {
      src: "/curvd_assets/pdp2/hero_4.jpg",
      alt: "Desmond & Dempsey Pyjama View 4",
    },
    {
      src: "/curvd_assets/pdp2/hero_5.jpg",
      alt: "Desmond & Dempsey Pyjama View 5",
    },
    {
      src: "/curvd_assets/pdp2/hero_6.jpg",
      alt: "Desmond & Dempsey Pyjama View 6",
    },
  ];

  const pyjamaVideos: VideoReview[] = [
    {
      id: "pyj-v1",
      videoSrc: "/curvd_assets/pdp2/pyj_v1.mp4",
      alt: "Customer review video 1",
      title: "Lookbook Styling & Fit",
      author: "Sarah M.",
      role: "Verified Buyer",
      quote: "The fabric feels like absolute luxury. Fits perfectly and moves effortlessly!",
    },
    {
      id: "pyj-v2",
      videoSrc: "/curvd_assets/pdp2/pyj_v2.mp4",
      alt: "Customer review video 2",
      title: "All Day Comfort & Elegance",
      author: "Chloe D.",
      role: "Verified Buyer",
      quote: "Hands down the most comfortable and stylish set I've ever owned. Love the print!",
    },
  ];

  return (
    <section className="w-full bg-white border-b border-neutral-200">
      <div className="w-full max-w-[1440px] mx-auto px-0 sm:px-6 lg:px-8 py-0 sm:py-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
          {/* ================= LEFT COLUMN: 2x2 Gallery & Mobile Carousel ================= */}
          <div className="w-full lg:w-[58%] xl:w-[60%] self-start">
            <PoloGallery images={images} />
          </div>

          {/* ================= RIGHT COLUMN: BuyBox, MetabolaeBundleOffer, Video Reviews ================= */}
          <div className="w-full lg:w-[42%] xl:w-[40%] px-4 sm:px-0 py-6 sm:py-2 flex flex-col gap-4 lg:sticky lg:top-20 self-start">
            {/* 1. Main BuyBox */}
            <PoloBuyBox2 />

            {/* 2. Metabolae Bundle Offer */}
            <MetabolaeBundleOffer />

            {/* 3. "What our customers are saying:" Video Reviews with Pyjama Videos */}
            <div className="w-full pt-1">
              <MetabolaeVideoReviews reviews={pyjamaVideos} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

