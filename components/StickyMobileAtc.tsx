"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";

export const StickyMobileAtc: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [adding, setAdding] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past 650px on mobile
      if (window.scrollY > 650) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  const handleQuickAdd = () => {
    setAdding(true);
    setTimeout(() => {
      addItem({
        id: `ceylon-sticky-${Date.now()}`,
        title: "Ceylon Cinnamon 7200mg Equivalent with MCT Oil",
        variantTitle: "Buy 2 Get 1 FREE (Most Popular)",
        price: 59.99,
        originalPrice: 179.97,
        quantity: 1,
        image: "/metabolae_assets/img_47_Kaching-Bundles-metabolae-ceylon-cinnamon-3-pack-bundle_300x300.webp",
      });
      setAdding(false);
    }, 300);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-4 py-2.5 shadow-lg md:hidden animate-in slide-in-from-bottom duration-200">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-11 h-11 rounded-md overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200">
            <Image
              src="/metabolae_assets/img_47_Kaching-Bundles-metabolae-ceylon-cinnamon-3-pack-bundle_300x300.webp"
              alt="Ceylon Cinnamon 7200mg Softgels"
              fill
              className="object-contain p-0.5"
            />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-stone-900 truncate">Ceylon Cinnamon 7200mg</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-extrabold text-[#b8673a]">$59.99</span>
              <span className="text-[10px] text-stone-400 line-through">$179.97</span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 bg-[#fbf5f0] text-[#b8673a] rounded border border-[#e8d5c8]">
                SAVE 67%
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleQuickAdd}
          disabled={adding}
          className="flex-shrink-0 px-4 py-2.5 bg-[#b8673a] hover:bg-[#a1552a] text-white text-xs font-bold uppercase rounded-lg shadow-xs flex items-center gap-1.5 transition active:scale-95"
        >
          {adding ? (
            <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
