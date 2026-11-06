"use client";

import React from "react";
import Image from "next/image";

export const WhyTrustMetabolae: React.FC = () => {
  const trustFeatures = [
    {
      icon: "/metabolae_assets/img_58_metabolae-clinically-backed-icon.webp",
      alt: "Clinically Backed Formulas",
      title: "CLINICALLY BACKED FORMULAS",
    },
    {
      icon: "/metabolae_assets/img_59_metabolae-3rdparty-icon.webp",
      alt: "Third-Party Tested",
      title: "THIRD-PARTY TESTED",
    },
    {
      icon: "/metabolae_assets/img_60_metabolae-clean-assets-icon.webp",
      alt: "Clean Formulas",
      title: "CLEAN FORMULAS",
    },
    {
      icon: "/metabolae_assets/img_61_metabolae-globally-icon.webp",
      alt: "Globally Trusted Facilities",
      title: "GLOBALLY TRUSTED FACILITIES",
    },
  ];

  const bulletPoints = [
    { text: "True Ceylon Cinnamon" },
    { text: "12:1 Concentrated Extract" },
    { text: "MCT Oil Delivery System" },
    { text: "Gentle on the Stomach" },
    { text: "Non-GMO & Gluten-Free" },
    { text: "Third-Party Tested" },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#7f4a2b] text-white p-5 sm:p-6 mt-6 shadow-md border border-[#965a36]">
      {/* Background Doctor Watermark / Image */}
      <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-25 pointer-events-none">
        <Image
          src="/metabolae_assets/img_57_metabolae-doctor-information-product.webp"
          alt="Medical Doctor Metabolae Background"
          fill
          sizes="300px"
          className="object-cover object-right"
        />
      </div>

      <div className="relative z-10">
        <h3 className="text-center text-xl sm:text-2xl font-bold font-serif sm:font-sans tracking-tight mb-5 text-white">
          Why Trust Metabolae
        </h3>

        {/* 4 Feature Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 mb-5">
          {trustFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-white/20 bg-white/10 backdrop-blur-xs p-2.5 flex flex-col items-center justify-center text-center gap-1.5 hover:bg-white/15 transition"
            >
              <div className="relative w-8 h-8 flex items-center justify-center">
                <Image
                  src={feat.icon}
                  alt={feat.alt}
                  width={28}
                  height={28}
                  className="object-contain filter brightness-0 invert"
                />
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider leading-tight uppercase text-white/95">
                {feat.title}
              </span>
            </div>
          ))}
        </div>

        {/* 6 Bullet Points in 2 Columns */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 border-t border-white/15 text-xs sm:text-sm font-medium">
          {bulletPoints.map((pt, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-white/20 text-white flex items-center justify-center text-[11px] font-bold flex-shrink-0">
                ✓
              </span>
              <span className="text-white/95 font-medium">{pt.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

