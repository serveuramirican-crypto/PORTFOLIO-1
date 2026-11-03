"use client";

import React, { useState } from "react";
import { RevQuotesBar } from "./RevQuotesBar";
import { MediaGallery, GalleryImage } from "./ProductHero/MediaGallery";
import { ProductInfo } from "./ProductHero/ProductInfo";
import { TrustSection } from "./TrustSection";
import { VideoReels } from "./VideoReels";
import { DetailsTabs } from "./DetailsTabs";
import { UpsellCard } from "./UpsellCard";
import { ReviewsSection } from "./ReviewsSection";
import { WhyWeMadeThis } from "./WhyWeMadeThis";
import { Top3Reasons } from "./Top3Reasons";
import { DesignedToFlatter } from "./DesignedToFlatter";
import { LovedByWomen } from "./LovedByWomen";
import { CapriHeightGuide } from "./CapriHeightGuide";
import { OnePairEverywhere } from "./OnePairEverywhere";
import { SoComfortable } from "./SoComfortable";
import { MidPageOffer } from "./MidPageOffer";
import { ComfortPromise } from "./ComfortPromise";
import { ComparisonTable } from "./ComparisonTable";
import { SecondaryTrustBar } from "./SecondaryTrustBar";
import { HappyWomenCarousel } from "./HappyWomenCarousel";
import { MarqueeBanner } from "./MarqueeBanner";
import { FaqSection } from "./FaqSection";

const PRODUCT_GALLERY: GalleryImage[] = [
  { src: "/images/capri_black.webp", alt: "Everyday Stretch Capri in Black", color: "Black" },
  { src: "/images/HERO_IMAGE.webp", alt: "Everyday Stretch Capri front view" },
  { src: "/images/6_0cea1f16-59cb-43b2-8ed5-77b56e24c9b0.png", alt: "Everyday Stretch Capri lifestyle" },
  { src: "/images/1_dc78fe8f-3cb5-4cdb-ade4-b100fa0e4f7b.png", alt: "Everyday Stretch Capri pocket details" },
  { src: "/images/5_6e04c68f-879f-4c54-b50f-0f78e027a5de.png", alt: "4-way comfort stretch flex demonstration" },
  { src: "/images/2_5b9727e9-038e-4772-a3e7-856d7fd7a744.png", alt: "High rise supportive waistband" },
  { src: "/images/4_841938db-0542-4f7a-af9e-e6b536cef0c0.png", alt: "Buttery-soft fabric texture" },
  { src: "/images/3_09e160a5-2d29-48f5-aac7-b4bbd5a499d1.png", alt: "Everyday Stretch Capri casual styling" },
  { src: "/images/High-WaistWideLegCapriPantsFront.webp", alt: "Studio front angle" },
  { src: "/images/High-WaistWideLegCapriPantsRear.webp", alt: "Studio rear angle" },
  { src: "/images/capri_coffee.webp", alt: "Everyday Stretch Capri in Espresso", color: "Espresso" },
  { src: "/images/capri_navy.webp", alt: "Everyday Stretch Capri in Navy Blue", color: "Navy Blue" },
  { src: "/images/capri_light_khaki.webp", alt: "Everyday Stretch Capri in Light Khaki", color: "Light Khaki" },
  { src: "/images/capri_white.webp", alt: "Everyday Stretch Capri in White", color: "White" },
  { src: "/images/capri_taupe.webp", alt: "Everyday Stretch Capri in Taupe", color: "Taupe" },
];

export const ProductDetailView: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const handleColorChange = (colorName: string) => {
    const idx = PRODUCT_GALLERY.findIndex((img) => img.color === colorName);
    if (idx !== -1) {
      setSelectedImageIndex(idx);
    }
  };

  return (
    <div className="w-full bg-white">
      {/* 1. Review Quotes Top Bar */}
      <RevQuotesBar />

      {/* 2. Top Product Hero */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5 font-medium">
          <a href="/" className="hover:text-black transition">Home</a>
          <span>/</span>
          <span className="text-gray-400">Products</span>
          <span>/</span>
          <span className="text-gray-800 font-semibold truncate">Everyday Stretch Capri</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* Left Column: Media Gallery */}
          <div className="lg:col-span-7">
            <MediaGallery
              images={PRODUCT_GALLERY}
              selectedImageIndex={selectedImageIndex}
              onSelectImage={setSelectedImageIndex}
            />
          </div>

          {/* Right Column: Product Buy Box */}
          <div className="lg:col-span-5">
            <ProductInfo onColorChange={handleColorChange} />
          </div>
        </div>
      </main>

      {/* 3. Trust Badges Bar */}
      <TrustSection />

      {/* 4. Social Proof Video Reels */}
      <VideoReels />

      {/* 5. Interactive Tabs */}
      <DetailsTabs />

      {/* 6. Upsell / Cross-sell Full Length Pants */}
      <UpsellCard />

      {/* 7. Verified Customer Reviews Grid */}
      <ReviewsSection />

      {/* 8. Why We Made This Quote Banner */}
      <WhyWeMadeThis />

      {/* 9. Top 3 Reasons Why Women Wear It On Repeat */}
      <Top3Reasons />

      {/* 10. Designed to: Feel good, Look good, Fit better */}
      <DesignedToFlatter />

      {/* 11. Loved By Women Of Every Shape & Lifestyle */}
      <LovedByWomen />

      {/* 12. Universally Flattering Capri Length Guide */}
      <CapriHeightGuide />

      {/* 13. One Pair Everywhere Marquee */}
      <OnePairEverywhere />

      {/* 14. So Comfortable Work Pants */}
      <SoComfortable />

      {/* 15. Mid-page Offer Marquee */}
      <MidPageOffer />

      {/* 16. Our Comfort Promise */}
      <ComfortPromise />

      {/* 17. Comparison Table: CURVD London vs Ordinary Pants */}
      <ComparisonTable />

      {/* 18. Secondary Trust Bar */}
      <SecondaryTrustBar />

      {/* 19. 50,000+ Happy Women Testimonial Slider */}
      <HappyWomenCarousel />

      {/* 20. Offer Marquee Banner */}
      <MarqueeBanner />

      {/* 21. Frequently Asked Questions */}
      <FaqSection />
    </div>
  );
};
