"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "../CartContext";
import { MetabolaeVideoReviews } from "./MetabolaeVideoReviews";

interface BundleTier {
  id: string;
  name: string;
  savings: string;
  price: number;
  originalPrice: number;
  discountBadge?: string;
  badge?: string;
  image: string;
  popular?: boolean;
}

interface MetabolaeBuyBoxProps {
  showTrustCard?: boolean;
}

export const MetabolaeBuyBox: React.FC<MetabolaeBuyBoxProps> = ({ showTrustCard = true }) => {
  const { addItem } = useCart();

  const bundles: BundleTier[] = [
    {
      id: "1-pack",
      name: "Buy One",
      savings: "You save 50%",
      price: 29.99,
      originalPrice: 59.99,
      discountBadge: "Save 50%",
      image: "/metabolae_assets/img_46_Kaching-Bundles-metabolae-ceylon-cinnamon-1-pack-bundle_300x300.webp",
    },
    {
      id: "3-pack",
      name: "Buy 2 Get 1 FREE",
      savings: "You save 67%",
      price: 59.99,
      originalPrice: 179.97,
      badge: "Most Popular",
      discountBadge: "Fall Sale - Save 67%",
      image: "/metabolae_assets/img_47_Kaching-Bundles-metabolae-ceylon-cinnamon-3-pack-bundle_300x300.webp",
      popular: true,
    },
    {
      id: "5-pack",
      name: "Buy 3 Get 2 FREE",
      savings: "You save 70%",
      price: 89.99,
      originalPrice: 299.95,
      badge: "Free Shipping",
      discountBadge: "Mega Value - Save 70%",
      image: "/metabolae_assets/img_48_Kaching-Bundles-metabolae-ceylon-cinnamon-5-pack-bundle_300x300.webp",
    },
  ];

  // Default to 3-pack (Most Popular) to match screenshot 2
  const [selectedBundleId, setSelectedBundleId] = useState<string>("3-pack");
  const activeBundle = bundles.find((b) => b.id === selectedBundleId) || bundles[1];

  const handleAddToCart = () => {
    addItem({
      id: `metabolae-ceylon-${activeBundle.id}`,
      title: "Ceylon Cinnamon 7200mg Equivalent with MCT Oil",
      variantTitle: activeBundle.name,
      price: activeBundle.price,
      originalPrice: activeBundle.originalPrice,
      quantity: 1,
      image: activeBundle.image,
    });
  };

  return (
    <div className="w-full flex flex-col font-sans">
      {/* 1. Rating Header */}
      <div className="flex items-center gap-2 mb-1.5">
        <div className="flex text-[#d97706] text-sm">
          {"★".repeat(5)}
        </div>
        <span className="text-xs sm:text-sm font-medium text-stone-700">
          Rated 4.9 • Thousands of 5-Star Reviews
        </span>
      </div>

      {/* 2. Product Title */}
      <h1 className="text-2xl sm:text-[28px] lg:text-[32px] font-bold text-stone-900 leading-tight tracking-tight mb-3">
        Ceylon Cinnamon 7200mg Equivalent with MCT Oil
      </h1>

      {/* 3. Key Benefits Bullets */}
      <div className="space-y-1.5 mb-4 text-stone-800 text-xs sm:text-sm font-medium">
        {[
          "Restores Insulin Sensitivity",
          "Stabilizes Blood Sugar Levels",
          "Supports Blood Pressure Naturally",
          "Supports Steady Energy",
        ].map((benefit, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#9e5932] text-white flex items-center justify-center flex-shrink-0 text-[10px] font-bold">
              ✓
            </div>
            <span>{benefit}</span>
          </div>
        ))}
      </div>

      {/* 4. Stock Progress Bar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 bg-stone-200/80 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#a65e39] h-full rounded-full transition-all duration-500"
            style={{ width: "93%" }}
          />
        </div>
        <span className="text-xs font-bold text-stone-700 whitespace-nowrap">
          93% Sold
        </span>
      </div>

      {/* 5. Price & Badge */}
      <div className="flex items-center flex-wrap gap-2.5 mb-3">
        <span className="text-2xl sm:text-3xl font-extrabold text-stone-900">
          ${activeBundle.price.toFixed(2)}
        </span>
        <span className="text-stone-400 line-through text-base sm:text-lg">
          ${activeBundle.originalPrice.toFixed(2)}
        </span>
        <span className="bg-[#b8673a] text-white text-xs font-bold px-2.5 py-1 rounded-md tracking-wide">
          {activeBundle.discountBadge || "Fall Sale - Save 67%"}
        </span>
      </div>

      {/* 6. Urgency Divider */}
      <div className="flex items-center my-2 text-stone-400">
        <div className="flex-1 border-t border-stone-200"></div>
        <span className="px-3 text-xs sm:text-sm font-semibold text-[#a65e39] tracking-wide">
          — Low Stock - Selling Fast —
        </span>
        <div className="flex-1 border-t border-stone-200"></div>
      </div>

      {/* 7. Bundle Selection Cards */}
      <div className="space-y-2.5 my-3">
        {bundles.map((bundle) => {
          const isSelected = bundle.id === selectedBundleId;
          return (
            <div
              key={bundle.id}
              onClick={() => setSelectedBundleId(bundle.id)}
              className={`relative flex items-center justify-between p-3 sm:p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                isSelected
                  ? "border-[#b8673a] bg-[#fffaf5] shadow-xs"
                  : "border-stone-200 hover:border-stone-300 bg-white"
              }`}
            >
              {/* Optional Top Badge for Popular / Free Shipping */}
              {bundle.badge && (
                <div className="absolute -top-2.5 right-4 bg-[#b8673a] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
                  {bundle.badge}
                </div>
              )}

              {/* Left Side: Thumbnail + Info */}
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-lg overflow-hidden border border-stone-100 bg-[#faf8f6]">
                  <Image
                    src={bundle.image}
                    alt={bundle.name}
                    fill
                    sizes="60px"
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm sm:text-base leading-snug">
                    {bundle.name}
                  </h4>
                  <p className="text-xs text-stone-500 font-medium">
                    {bundle.savings}
                  </p>
                </div>
              </div>

              {/* Right Side: Price */}
              <div className="text-right">
                <div className="font-bold text-stone-900 text-base sm:text-lg">
                  ${bundle.price.toFixed(2)}
                </div>
                <div className="text-xs text-stone-400 line-through">
                  ${bundle.originalPrice.toFixed(2)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 8. Add To Cart Button */}
      <button
        onClick={handleAddToCart}
        className="mt-2 w-full bg-[#b8673a] hover:bg-[#a1552a] active:scale-[0.99] text-white rounded-xl py-3.5 px-6 shadow-md transition-all cursor-pointer text-center group"
      >
        <div className="text-base sm:text-lg font-bold flex items-center justify-center gap-2">
          <span>Add To Cart</span>
          <span>|</span>
          <span>${activeBundle.price.toFixed(2)}</span>
          <span className="text-white/70 line-through text-sm font-normal">
            ${activeBundle.originalPrice.toFixed(2)}
          </span>
        </div>
        <div className="text-xs text-white/90 font-medium mt-0.5">
          90-Day Money-Back Guarantee
        </div>
      </button>

      {/* 9. Subscription / Reassurance Line */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs text-stone-600 mt-3 pt-1">
        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Refills Ship Every 30 Days</span>
        </div>
        <span className="text-stone-300">|</span>
        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Stop or Cancel Anytime</span>
        </div>
      </div>

      {/* 10. 90-Day Money Back Guarantee Box */}
      <div className="mt-4 p-3.5 sm:p-4 rounded-xl bg-[#fcfaf7] border border-[#eee4db] flex items-center gap-3.5">
        <div className="relative w-11 h-11 flex-shrink-0">
          <Image
            src="/metabolae_assets/img_53_Frame_2147242495.png"
            alt="90 Day Money Back Guarantee Seal"
            fill
            sizes="44px"
            className="object-contain"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-stone-900 text-xs sm:text-sm">
            90-Day Money Back Guarantee
          </h4>
          <p className="text-xs text-stone-600 leading-snug mt-0.5">
            Less than 1% of customers claim our 90-Days Money Back Guarantee.
          </p>
        </div>
      </div>

      {/* 11. Low Stock Notice Box */}
      <div className="mt-3 p-3.5 sm:p-4 rounded-xl border border-red-200 bg-red-50/60 flex items-start gap-3">
        <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
          !
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-red-600 text-xs tracking-wider uppercase mb-1">
            WARNING: Low Stock Notice
          </h4>
          <p className="text-xs text-stone-700 leading-relaxed">
            This product sold out 12 times last year. We encourage you to take advantage of the limited sale and buy now. Subscribing protects you against future stockouts. PS: Only available here, don&apos;t buy fakes on Amazon/eBay.
          </p>
        </div>
      </div>

      {/* 12. What our customers are saying: video reviews (replaced Why Trust Metabolae) */}
      <MetabolaeVideoReviews />
    </div>
  );
};

