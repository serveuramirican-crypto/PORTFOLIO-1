"use client";

import React, { useState } from "react";
import { Star, Ruler, Check, Minus, Plus, ShoppingBag, ShieldCheck, Truck, Lock } from "lucide-react";
import { BundleSelector, BUNDLE_TIERS, ItemSelection, COLOR_OPTIONS } from "./BundleSelector";
import { SizeGuideModal } from "./SizeGuideModal";
import { useCart } from "../CartContext";

interface ProductInfoProps {
  onColorChange?: (colorName: string) => void;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ onColorChange }) => {
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [selectedTierId, setSelectedTierId] = useState<number>(1); // Default: Tier 2 (3 PAIRS)
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // Maintain selections for each tier
  const [tierSelections, setTierSelections] = useState<Record<number, ItemSelection[]>>({
    0: [
      { color: "Black", size: "M" },
      { color: "Black", size: "M" },
    ],
    1: [
      { color: "Black", size: "M" },
      { color: "Black", size: "M" },
      { color: "Black", size: "M" },
    ],
    2: [
      { color: "Black", size: "M" },
      { color: "Black", size: "M" },
      { color: "Black", size: "M" },
      { color: "Black", size: "M" },
    ],
  });

  const { addItem } = useCart();

  const handleUpdateItem = (
    tierId: number,
    itemIndex: number,
    field: "color" | "size",
    value: string
  ) => {
    setTierSelections((prev) => {
      const currentList = [...(prev[tierId] || [])];
      currentList[itemIndex] = {
        ...currentList[itemIndex],
        [field]: value,
      };
      return {
        ...prev,
        [tierId]: currentList,
      };
    });

    if (field === "color" && onColorChange) {
      onColorChange(value);
    }
  };

  const currentTier = BUNDLE_TIERS.find((t) => t.id === selectedTierId) || BUNDLE_TIERS[1];

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      const itemsForTier = tierSelections[selectedTierId] || [];
      const primaryColor = itemsForTier[0]?.color || "Black";
      const primarySize = itemsForTier[0]?.size || "M";
      const colorObj = COLOR_OPTIONS.find((c) => c.name === primaryColor) || COLOR_OPTIONS[0];

      // Add as bundle item
      addItem({
        id: `capri-bundle-${selectedTierId}-${Date.now()}`,
        title: `Everyday Stretch Capri (${currentTier.title} Bundle)`,
        variantTitle: `${currentTier.title} • ${itemsForTier.map(i => `${i.color}/${i.size}`).join(", ")}`,
        price: currentTier.price,
        originalPrice: currentTier.fullPrice,
        quantity: quantity,
        image: colorObj.image,
        color: primaryColor,
        size: primarySize,
      });

      setIsAdding(false);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2500);
    }, 400);
  };

  return (
    <div className="flex flex-col text-gray-900 font-sans">
      {/* Product Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#252220] leading-[1.2]">
        Everyday Stretch Capri | High Rise &amp; All-Day Comfort
      </h1>

      {/* Reviews Rating Link */}
      <div className="flex items-center gap-2 mt-2.5">
        <div className="flex text-[#F5A623]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current stroke-none" />
          ))}
        </div>
        <span className="text-xs font-bold text-gray-800">4.9 / 5.0</span>
        <a
          href="#customer-reviews"
          className="text-xs text-gray-500 hover:text-black underline underline-offset-2"
        >
          (12,537 reviews)
        </a>
      </div>

      {/* Base Price Display */}
      <div className="mt-3.5 flex items-baseline gap-3">
        <span className="text-2xl sm:text-3xl font-extrabold text-[#2A3743]">
          ${currentTier.price}.00
        </span>
        <span className="text-base text-gray-400 line-through">
          ${currentTier.fullPrice}.00
        </span>
        <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#D2E1D7] text-[#244317]">
          {currentTier.label}
        </span>
      </div>

      {/* Section sb-capri-088 */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="mb-2.5">
          <span className="inline-block bg-[#D2E1D7] text-[#244317] text-xs font-bold tracking-wide px-3 py-1 rounded">
            BUY 1 GET 1 FREE
          </span>
        </div>

        <ul className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-3.5 list-none p-0">
          {["Perfect Fit", "Petite Friendly", "Chic & Versatile"].map((chip) => (
            <li
              key={chip}
              className="bg-[#F4F4F4] text-[#0F0F0F] text-xs sm:text-sm font-medium py-1.5 px-2 rounded text-center whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {chip}
            </li>
          ))}
        </ul>

        <p className="text-sm text-[#252220] leading-relaxed mb-4">
          Sleek enough for the workplace, airy and relaxed for warm days, and so flattering it quickly turns into your go-to pair.
        </p>
      </div>

      {/* Offer Head with Size Guide Modal Trigger */}
      <div className="flex items-center justify-between border-t border-b border-gray-100 py-2.5 my-1 text-xs">
        <span className="font-bold tracking-wider text-gray-800 uppercase">
          LIMITED TIME OFFER:
        </span>
        <button
          type="button"
          onClick={() => setSizeGuideOpen(true)}
          className="inline-flex items-center gap-1 text-gray-700 hover:text-black font-semibold underline underline-offset-2 transition"
        >
          <Ruler className="w-3.5 h-3.5" />
          <span>What&apos;s My Size?</span>
        </button>
      </div>

      {/* Section sb-capri-089 (Fit + Demand indicators) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs py-2">
        <div className="flex items-center gap-2 text-gray-800">
          <div className="w-4 h-4 rounded-full bg-[#2C8349] flex items-center justify-center flex-shrink-0">
            <Check className="w-2.5 h-2.5 text-white stroke-[2.5]" />
          </div>
          <span>
            Customers say it fits{" "}
            <a href="#customer-reviews" className="font-bold underline text-gray-900">
              true to size
            </a>
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-800">
          <div className="relative flex items-center justify-center w-4 h-4">
            <span className="radar-ping absolute inline-flex h-full w-full rounded-full bg-[#C20000] opacity-40"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C20000]"></span>
          </div>
          <span className="font-semibold text-gray-900">Selling fast this season</span>
        </div>
      </div>

      {/* Bundle Selector Component */}
      <BundleSelector
        selectedTierId={selectedTierId}
        onSelectTier={setSelectedTierId}
        tierSelections={tierSelections}
        onUpdateItemSelection={handleUpdateItem}
      />

      {/* Quantity & Add to Cart Controls */}
      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        {/* Quantity selector */}
        <div className="flex items-center justify-between border border-gray-300 rounded-lg px-3 py-2 sm:w-32 bg-white">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className="p-1 text-gray-500 hover:text-black disabled:opacity-30 transition"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-sm font-bold text-gray-900 px-2">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-1 text-gray-500 hover:text-black transition"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Add to Cart CTA Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="flex-1 py-3.5 px-6 rounded-lg font-bold text-sm sm:text-base text-white bg-[#2A3743] hover:bg-[#1E293B] shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
        >
          {isAdding ? (
            <span className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
          ) : addedSuccess ? (
            <span className="flex items-center gap-1.5 text-green-300">
              <Check className="w-5 h-5 stroke-[2.5]" />
              Added to Cart!
            </span>
          ) : (
            <>
              <ShoppingBag className="w-5 h-5" />
              <span>Add to cart • ${(currentTier.price * quantity).toFixed(2)}</span>
            </>
          )}
        </button>
      </div>

      {/* Trust Mini-bar */}
      <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-gray-100 text-center text-[11px] sm:text-xs text-gray-600">
        <div className="flex flex-col items-center gap-1">
          <Truck className="w-5 h-5 text-[#704F30]" />
          <span className="font-medium leading-tight">Free Worldwide Shipping</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <ShieldCheck className="w-5 h-5 text-[#704F30]" />
          <span className="font-medium leading-tight">30-Day Money-Back</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Lock className="w-5 h-5 text-[#704F30]" />
          <span className="font-medium leading-tight">Safe &amp; Secure Checkout</span>
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />
    </div>
  );
};

