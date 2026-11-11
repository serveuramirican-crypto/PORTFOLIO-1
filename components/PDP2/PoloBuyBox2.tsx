"use client";

import React, { useState } from "react";
import Image from "next/image";

export const PoloBuyBox2: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState("The Jag Print");
  const [selectedSize, setSelectedSize] = useState("S");
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Variant swatches data
  const swatches = [
    {
      id: "jag",
      name: "The Jag Print",
      image: "/curvd_assets/pdp2/hero_1.jpg",
      isCurrent: true,
    },
    {
      id: "alpine",
      name: "Alpine Blue",
      image: "/curvd_assets/pdp2/hero_6.jpg",
      hasLink: true,
    },
  ];

  // Sizes data matching original page
  const sizes = [
    { label: "XS", outOfStock: true },
    { label: "S", outOfStock: false },
    { label: "M", outOfStock: true },
    { label: "L", outOfStock: false },
    { label: "XL", outOfStock: false },
    { label: "XXL", outOfStock: false },
    { label: "3XL", outOfStock: false },
  ];

  const handleSizeClick = (size: (typeof sizes)[0]) => {
    if (size.outOfStock) {
      setAlertMessage(`Vous serez notifié par e-mail dès le réapprovisionnement de la taille ${size.label}.`);
      setTimeout(() => setAlertMessage(null), 4000);
      return;
    }
    setSelectedSize(size.label);
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {/* 1. Header Information */}
      <div className="flex flex-col gap-2">
        <div className="w-fit">
          <span className="inline-block bg-[#f4f4f5] text-[#111111] text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm">
            New Collection
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-neutral-900 leading-none mt-1">
          DESMOND &amp; DEMPSEY LUXURY COTTON PYJAMA SET - SIGNATURE PRINT
        </h1>

        <p className="text-sm font-semibold text-neutral-500 tracking-wide uppercase">
          Relaxed Luxury Fit
        </p>

        {/* Price & Rating */}
        <div className="flex items-center justify-between gap-4 mt-1.5 pb-2">
          <div className="flex items-baseline gap-2.5">
            <span className="text-2xl sm:text-2xl font-black text-neutral-900">
              350.00 MAD
            </span>
            <span className="text-base text-neutral-400 line-through font-medium">
              700.00 MAD
            </span>
          </div>

          <button
            type="button"
            className="flex items-center gap-1.5 text-neutral-900 hover:opacity-75 transition-opacity cursor-pointer"
            aria-label="Rated 4.9 out of 5 based on 214 reviews"
          >
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 fill-black text-black"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="text-sm font-bold">4.9</span>
            </div>
            <span className="text-sm text-neutral-500 underline font-medium">
              (214)
            </span>
          </button>
        </div>

        {/* Highlight Callout Box */}
        <div className="bg-neutral-50 border border-neutral-100 rounded-md p-3.5 text-xs text-neutral-700 leading-relaxed mt-1">
          <span>
            Woven from breathable organic cotton with tailored piping and deep functional pockets. Soft enough to sleep in, chic enough to wear all Sunday.{" "}
          </span>
          <button
            type="button"
            onClick={() => setShowLearnMore(true)}
            className="font-bold underline text-neutral-900 hover:text-black cursor-pointer"
          >
            Learn more
          </button>
        </div>
      </div>

      {/* 2. Color Swatches */}
      <div className="flex flex-col gap-2.5 pt-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold text-neutral-900">
            <span>Color: {selectedColor}</span>
          </div>
        </div>

        <div className="grid grid-cols-6 sm:grid-cols-6 gap-2">
          {swatches.map((swatch) => {
            const isSelected = selectedColor === swatch.name;
            return (
              <button
                key={swatch.id}
                type="button"
                onClick={() => setSelectedColor(swatch.name)}
                className={`relative aspect-[3/4] rounded-sm overflow-hidden bg-neutral-100 transition-all cursor-pointer ${
                  isSelected
                    ? "ring-2 ring-black ring-offset-1"
                    : "border border-neutral-200 hover:opacity-90"
                }`}
                title={swatch.name}
                aria-label={swatch.name}
              >
                <Image
                  src={swatch.image}
                  alt={swatch.name}
                  fill
                  sizes="80px"
                  className="w-full h-full object-cover object-top"
                />
                {swatch.hasLink && (
                  <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-blue-600 rounded-full flex items-center justify-center shadow-sm">
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Size Selector Grid */}
      <div className="flex flex-col gap-2.5 pt-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-neutral-900">
            Select a size
          </span>
          <button
            type="button"
            onClick={() => setShowSizeGuide(true)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 hover:text-neutral-600 transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="rotate-45"
            >
              <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" />
              <path d="m14.5 12.5 2-2" />
              <path d="m11.5 9.5 2-2" />
              <path d="m8.5 6.5 2-2" />
              <path d="m17.5 15.5 2-2" />
            </svg>
            <span className="underline underline-offset-2">Size Guide</span>
          </button>
        </div>

        {/* 4-column Size Grid */}
        <div className="grid grid-cols-4 border border-neutral-300 rounded-sm overflow-hidden bg-neutral-200 gap-[1px]">
          {sizes.map((size) => {
            const isSelected = selectedSize === size.label;
            return (
              <button
                key={size.label}
                type="button"
                onClick={() => handleSizeClick(size)}
                className={`relative h-12 flex items-center justify-center font-bold text-sm tracking-wide transition-all group cursor-pointer ${
                  isSelected
                    ? "bg-black text-white z-10"
                    : size.outOfStock
                    ? "bg-neutral-50/90 text-neutral-400 hover:bg-neutral-100"
                    : "bg-white text-neutral-900 hover:bg-neutral-50 active:bg-neutral-100"
                }`}
                title={
                  size.outOfStock
                    ? `${size.label} - Rupture de stock (Cliquez pour être alerté)`
                    : `Taille ${size.label}`
                }
              >
                <span className={`relative z-10 ${size.outOfStock ? "opacity-50" : ""}`}>
                  {size.label}
                </span>

                {/* Strikethrough diagonal line for out of stock */}
                {size.outOfStock && (
                  <>
                    <svg
                      className="absolute inset-0 w-full h-full text-neutral-300 pointer-events-none"
                      preserveAspectRatio="none"
                      viewBox="0 0 100 100"
                    >
                      <line
                        x1="0"
                        y1="100"
                        x2="100"
                        y2="0"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <span className="absolute top-1 right-1 text-neutral-400 group-hover:text-black transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                      </svg>
                    </span>
                  </>
                )}
              </button>
            );
          })}
          {/* 8th cell empty placeholder */}
          <div className="h-12 bg-white" />
        </div>

        {/* Stock Alert Toast Message */}
        {alertMessage && (
          <div className="p-2.5 rounded bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2 animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            <span>{alertMessage}</span>
          </div>
        )}

        {/* Note below size grid */}
        <p className="text-[11px] text-neutral-500 italic flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-neutral-400"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
          <span>
            Taille barrée ? Cliquez dessus pour être notifié par e-mail lors du réapprovisionnement.
          </span>
        </p>

        <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-700 mt-0.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-emerald-700 stroke-[2.5]"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <span>
            Customers say it fits true to size{" "}
            <button
              type="button"
              onClick={() => setShowSizeGuide(true)}
              className="underline text-neutral-900 font-semibold cursor-pointer"
            >
              Size Guide
            </button>
          </span>
        </div>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setShowSizeGuide(false)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-lg w-full relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSizeGuide(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-black text-2xl font-bold leading-none cursor-pointer"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold text-neutral-900 mb-3">Guide des Tailles (Size Guide)</h3>
            <p className="text-xs text-neutral-500 mb-4">
              Mesures en centimètres pour coupe Relaxed Luxury Fit.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-neutral-200 text-neutral-900 font-bold">
                    <th className="py-2 pr-3">Taille</th>
                    <th className="py-2 px-3">Tour de poitrine (cm)</th>
                    <th className="py-2 px-3">Tour de taille (cm)</th>
                    <th className="py-2 px-3">Longueur (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-neutral-700">
                  <tr><td className="py-2 pr-3 font-semibold">XS</td><td className="py-2 px-3">84 - 88</td><td className="py-2 px-3">64 - 68</td><td className="py-2 px-3">100</td></tr>
                  <tr><td className="py-2 pr-3 font-semibold">S</td><td className="py-2 px-3">88 - 94</td><td className="py-2 px-3">68 - 74</td><td className="py-2 px-3">101</td></tr>
                  <tr><td className="py-2 pr-3 font-semibold">M</td><td className="py-2 px-3">94 - 100</td><td className="py-2 px-3">74 - 80</td><td className="py-2 px-3">102</td></tr>
                  <tr><td className="py-2 pr-3 font-semibold">L</td><td className="py-2 px-3">100 - 106</td><td className="py-2 px-3">80 - 86</td><td className="py-2 px-3">103</td></tr>
                  <tr><td className="py-2 pr-3 font-semibold">XL</td><td className="py-2 px-3">106 - 114</td><td className="py-2 px-3">86 - 94</td><td className="py-2 px-3">104</td></tr>
                  <tr><td className="py-2 pr-3 font-semibold">XXL</td><td className="py-2 px-3">114 - 122</td><td className="py-2 px-3">94 - 102</td><td className="py-2 px-3">105</td></tr>
                  <tr><td className="py-2 pr-3 font-semibold">3XL</td><td className="py-2 px-3">122 - 130</td><td className="py-2 px-3">102 - 110</td><td className="py-2 px-3">106</td></tr>
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setShowSizeGuide(false)}
              className="mt-5 w-full py-2.5 bg-black text-white text-xs font-bold rounded-lg cursor-pointer"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Learn More Modal */}
      {showLearnMore && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setShowLearnMore(false)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-md w-full relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLearnMore(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-black text-2xl font-bold leading-none cursor-pointer"
            >
              &times;
            </button>
            <h3 className="text-base font-bold text-neutral-900 mb-2">Luxury Organic Cotton</h3>
            <p className="text-xs text-neutral-600 leading-relaxed mb-4">
              Hand-painted signature print digitally applied to 100% long-staple organic cotton. Exceptionally breathable, naturally cooling, and crafted to soften with every wash.
            </p>
            <button
              onClick={() => setShowLearnMore(false)}
              className="w-full py-2 bg-black text-white text-xs font-bold rounded-lg cursor-pointer"
            >
              Compris
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

