"use client";

import React from "react";
import { PoloGallery } from "./PoloGallery";
import { PoloBuyBox } from "./PoloBuyBox";
import { MetabolaeBundleOffer } from "./MetabolaeBundleOffer";
import { MetabolaeVideoReviews } from "../MetabolaeHero/MetabolaeVideoReviews";

export const PoloHero: React.FC = () => {
  const images = [
    {
      src: "https://cdn.gorillareign.site/storage/v1/object/public/products/product-images/d52e69f0-c938-40a0-8667-944c4c5d6f69/1792706933503-26wspr_d1521_pnk_v1_658d66d4-2215-4a35-a-f93c0a.jpg",
      alt: "Product view 1",
    },
    {
      src: "https://cdn.gorillareign.site/storage/v1/object/public/products/product-images/d52e69f0-c938-40a0-8667-944c4c5d6f69/1792706932892-26wspr_d1521_pnk_m04_f9a8fd94-69fd-4729--0a8e1d.jpg",
      alt: "Product view 2",
    },
    {
      src: "https://cdn.gorillareign.site/storage/v1/object/public/products/product-images/d52e69f0-c938-40a0-8667-944c4c5d6f69/1792706931876-26wspr_d1521_pnk_m01_1b672ef8-65aa-4756--ba1fde.jpg",
      alt: "Product view 3",
    },
    {
      src: "https://cdn.gorillareign.site/storage/v1/object/public/products/product-images/d52e69f0-c938-40a0-8667-944c4c5d6f69/1792706932479-26wspr_d1521_pnk_m03_9377987d-bf74-44bc--7cc906.jpg",
      alt: "Product view 4",
    },
    {
      src: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/Y52902s3.jpg?im=Resize,width=480",
      alt: "Product view 5",
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

          {/* ================= RIGHT COLUMN: BuyBox, MetabolaeBundleOffer, Get The Look ================= */}
          <div className="w-full lg:w-[42%] xl:w-[40%] px-4 sm:px-0 py-6 sm:py-2 flex flex-col gap-4 lg:sticky lg:top-20 self-start">
            {/* 1. Main BuyBox with title, prices, ratings, color swatches, sizes */}
            <PoloBuyBox />

            {/* 2. Metabolae Bundle Offer (Progress Bar, Pricing, Bundles, CTA, 90-Day Guarantee, Warning Low Stock) */}
            <MetabolaeBundleOffer />

            {/* 3. "What our customers are saying:" Video Reviews (3 Videos) */}
            <div className="w-full pt-1">
              <MetabolaeVideoReviews />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

