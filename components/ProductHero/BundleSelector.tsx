"use client";

import React from "react";
import Image from "next/image";

export interface ItemSelection {
  color: string;
  size: string;
}

export interface BundleTier {
  id: number;
  qty: number;
  title: string;
  label: string;
  subtitle: string;
  price: number;
  fullPrice: number;
  badge?: string;
}

export const COLOR_OPTIONS = [
  { name: "Black", image: "/images/capri_black.webp", hex: "#111111" },
  { name: "Espresso", image: "/images/capri_coffee.webp", hex: "#4A3728" },
  { name: "Navy Blue", image: "/images/capri_navy.webp", hex: "#1D2A44" },
  { name: "Light Khaki", image: "/images/capri_light_khaki.webp", hex: "#D6C7B2" },
  { name: "White", image: "/images/capri_white.webp", hex: "#FFFFFF" },
  { name: "Taupe", image: "/images/capri_taupe.webp", hex: "#A8988B" },
];

export const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "2XL"];

export const BUNDLE_TIERS: BundleTier[] = [
  {
    id: 0,
    qty: 2,
    title: "2 PAIRS",
    label: "SAVE $65",
    subtitle: "Buy 1 Get 1 Free",
    price: 65,
    fullPrice: 130,
  },
  {
    id: 1,
    qty: 3,
    title: "3 PAIRS",
    label: "SAVE $103",
    subtitle: "Save 53%",
    price: 92,
    fullPrice: 195,
  },
  {
    id: 2,
    qty: 4,
    title: "4 PAIRS",
    label: "SAVE $130",
    subtitle: "Best Value I Save 50%",
    price: 130,
    fullPrice: 260,
  },
];

interface BundleSelectorProps {
  selectedTierId: number;
  onSelectTier: (tierId: number) => void;
  tierSelections: Record<number, ItemSelection[]>;
  onUpdateItemSelection: (tierId: number, itemIndex: number, field: "color" | "size", value: string) => void;
}

export const BundleSelector: React.FC<BundleSelectorProps> = ({
  selectedTierId,
  onSelectTier,
  tierSelections,
  onUpdateItemSelection,
}) => {
  return (
    <div className="my-4 space-y-3 font-sans">
      <div className="flex flex-col gap-2.5">
        {BUNDLE_TIERS.map((tier) => {
          const isSelected = selectedTierId === tier.id;
          const items = tierSelections[tier.id] || [];

          return (
            <div
              key={tier.id}
              onClick={() => onSelectTier(tier.id)}
              className={`relative rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? "border-[#BAA694] bg-[#FAF8F6] ring-1 ring-[#BAA694] p-3.5 md:p-4 shadow-sm"
                  : "border-[#E1D7CD]/70 bg-white hover:border-[#BAA694]/60 p-3.5 md:p-4"
              }`}
            >
              {/* Radio + Info + Price header */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Radio circle */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                      isSelected
                        ? "border-[#704F30] bg-[#704F30]"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>

                  {/* Title & subtitle */}
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-gray-900 text-sm md:text-base">
                        {tier.title}
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#F4F2F0] text-[#6A574B]">
                        {tier.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 italic mt-0.5">{tier.subtitle}</p>
                  </div>
                </div>

                {/* Pricing */}
                <div className="text-right flex flex-col items-end">
                  <span className="text-base md:text-lg font-extrabold text-gray-900 leading-tight">
                    ${tier.price}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    ${tier.fullPrice}
                  </span>
                </div>
              </div>

              {/* Variant Rows (shown only when selected) */}
              {isSelected && (
                <div
                  className="mt-4 pt-3.5 border-t border-[#E8DFD7] space-y-2.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-xs font-semibold text-gray-500 mb-2">
                    Select Color and Size for each pair:
                  </div>

                  {items.map((item, idx) => {
                    const colorData = COLOR_OPTIONS.find((c) => c.name === item.color) || COLOR_OPTIONS[0];

                    return (
                      <div
                        key={`item-row-${idx}`}
                        className="flex items-center gap-2.5 sm:gap-3 bg-white p-2 sm:p-2.5 rounded-lg border border-[#EFE8E2] shadow-2xs"
                      >
                        <span className="text-xs font-bold text-gray-500 w-5 flex-shrink-0">
                          #{idx + 1}
                        </span>

                        {/* Thumbnail */}
                        <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                          <Image
                            src={colorData.image}
                            alt={colorData.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Color select */}
                        <div className="flex-1 min-w-0">
                          <select
                            value={item.color}
                            onChange={(e) =>
                              onUpdateItemSelection(tier.id, idx, "color", e.target.value)
                            }
                            className="w-full text-xs font-medium py-1.5 px-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#704F30] cursor-pointer"
                          >
                            {COLOR_OPTIONS.map((c) => (
                              <option key={c.name} value={c.name}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Size select */}
                        <div className="w-24 sm:w-28 flex-shrink-0">
                          <select
                            value={item.size}
                            onChange={(e) =>
                              onUpdateItemSelection(tier.id, idx, "size", e.target.value)
                            }
                            className="w-full text-xs font-medium py-1.5 px-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#704F30] cursor-pointer"
                          >
                            {SIZE_OPTIONS.map((s) => (
                              <option key={s} value={s}>
                                Size {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

