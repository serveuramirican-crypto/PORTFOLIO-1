"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "./CartContext";

export const StickyMobileAtc: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [adding, setAdding] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past 700px on mobile
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
        id: `capri-sticky-${Date.now()}`,
        title: "Everyday Stretch Capri (3 PAIRS Bundle)",
        variantTitle: "3 PAIRS • Black / M",
        price: 92,
        originalPrice: 195,
        quantity: 1,
        image: "/images/capri_black.webp",
        color: "Black",
        size: "M",
      });
      setAdding(false);
    }, 300);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-2.5 shadow-lg md:hidden animate-in slide-in-from-bottom duration-200">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-11 h-11 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
            <Image
              src="/images/capri_black.webp"
              alt="Everyday Stretch Capri"
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-gray-900 truncate">Everyday Stretch Capri</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-extrabold text-[#2A3743]">$92.00</span>
              <span className="text-[10px] text-gray-400 line-through">$195.00</span>
              <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#D2E1D7] text-[#244317] rounded">
                SAVE $103
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleQuickAdd}
          disabled={adding}
          className="flex-shrink-0 px-4 py-2.5 bg-[#2A3743] hover:bg-black text-white text-xs font-bold uppercase rounded-lg shadow-sm flex items-center gap-1.5 transition active:scale-95"
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

