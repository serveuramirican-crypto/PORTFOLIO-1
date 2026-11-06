"use client";

import React, { useState } from "react";
import { MetabolaeGallery } from "./MetabolaeGallery";
import { MetabolaeAccordions } from "./MetabolaeAccordions";
import { MetabolaeBuyBox } from "./MetabolaeBuyBox";

export const MetabolaeHero: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(1);

  return (
    <section className="w-full bg-[#fdfbf9] py-4 sm:py-8 border-b border-stone-200">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-stone-500 mb-4 sm:mb-6 flex items-center gap-1.5 font-medium">
          <a href="/" className="hover:text-stone-900 transition">Home</a>
          <span>/</span>
          <span className="text-stone-400">Products</span>
          <span>/</span>
          <span className="text-stone-800 font-semibold truncate">
            Ceylon Cinnamon 7200mg Equivalent with MCT Oil
          </span>
        </nav>

        {/* Desktop View: 2 Columns (Gallery + Accordions on Left; BuyBox + Video Reviews on Right) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Gallery & Accordions */}
          <div className="lg:col-span-6 flex flex-col">
            <MetabolaeGallery
              selectedIndex={selectedImageIndex}
              onSelectIndex={setSelectedImageIndex}
            />

            <div className="mt-6">
              <MetabolaeAccordions />
            </div>
          </div>

          {/* Right Column: Buy Box & "What our customers are saying:" Videos */}
          <div className="lg:col-span-6">
            <MetabolaeBuyBox />
          </div>
        </div>

        {/* Mobile View: Gallery -> Buy Box (with Videos) -> Accordions */}
        <div className="flex flex-col lg:hidden gap-6">
          <MetabolaeGallery
            selectedIndex={selectedImageIndex}
            onSelectIndex={setSelectedImageIndex}
          />

          <MetabolaeBuyBox />

          <div className="mt-2">
            <MetabolaeAccordions />
          </div>
        </div>
      </div>
    </section>
  );
};
