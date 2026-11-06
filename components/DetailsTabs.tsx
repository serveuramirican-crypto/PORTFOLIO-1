"use client";

import React, { useState } from "react";
import { Check, Sparkles, Feather, Move, Wind, Layers, ShieldCheck, HeartHandshake } from "lucide-react";

export const DetailsTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = ["The Details", "Fabric & Care", "Shipping"];

  const detailRows = [
    {
      title: "THE RUNDOWN:",
      desc: "Wide-leg capris that have the appearance of tailored trousers yet wear like your best-loved athletic gear.",
      icon: <Layers className="w-5 h-5 text-[#704F30]" />,
    },
    {
      title: "THE LOOK:",
      desc: "A high-waisted, figure-flattering cut designed to suit every body type.",
      icon: <Sparkles className="w-5 h-5 text-[#704F30]" />,
    },
    {
      title: "THE FEEL:",
      desc: "Ultra-smooth stretch material that you won't want to peel off.",
      icon: <Feather className="w-5 h-5 text-[#704F30]" />,
    },
    {
      title: "THE MOVES:",
      desc: "Flexes alongside you whether you're walking, sitting, reaching or running.",
      icon: <Move className="w-5 h-5 text-[#704F30]" />,
    },
    {
      title: "THE AIRFLOW:",
      desc: "A light, breathable stand-in for shorts that keeps you cool through the hot months and still offers the coverage you like.",
      icon: <Wind className="w-5 h-5 text-[#704F30]" />,
    },
    {
      title: "THE VERSATILITY:",
      desc: "A single pair. Office days, trips, days off and all the moments in the middle.",
      icon: <HeartHandshake className="w-5 h-5 text-[#704F30]" />,
    },
    {
      title: "THE DIFFERENCE:",
      desc: "The sharp appearance of tailored trousers blended with the ease, give and relaxed feel of athleisure.",
      icon: <ShieldCheck className="w-5 h-5 text-[#704F30]" />,
    },
  ];

  const shippingPoints = [
    "FAST & FREE Worldwide Shipping",
    "Fully Tracked Delivery",
    "30-Day Money-Back Guarantee",
    "Secure Checkout",
    "Dedicated Customer Support",
  ];

  return (
    <section className="max-w-[1000px] mx-auto px-4 py-8">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 justify-center gap-2 sm:gap-6 mb-8">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            onClick={() => setActiveTab(idx)}
            className={`py-3 px-4 sm:px-6 font-bold text-sm sm:text-base border-b-2 transition-all cursor-pointer ${
              activeTab === idx
                ? "border-[#704F30] text-[#704F30]"
                : "border-transparent text-gray-400 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab 0: The Details */}
      {activeTab === 0 && (
        <div className="space-y-4 max-w-2xl mx-auto animate-in fade-in duration-200">
          {detailRows.map((row, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-3.5 rounded-xl bg-[#FAF8F6] border border-[#EFE8E2]"
            >
              <div className="p-2 rounded-lg bg-white shadow-2xs flex-shrink-0 mt-0.5">
                {row.icon}
              </div>
              <div>
                <span className="font-extrabold text-xs tracking-wider text-[#704F30] block mb-0.5">
                  {row.title}
                </span>
                <p className="text-sm text-gray-800 leading-relaxed">{row.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 1: Fabric & Care */}
      {activeTab === 1 && (
        <div className="max-w-2xl mx-auto bg-[#FAF8F6] p-6 sm:p-8 rounded-2xl border border-[#EFE8E2] space-y-6 animate-in fade-in duration-200">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Curvd™ Comfort Stretch Fabric</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Our exclusive comfort-stretch material marries the cosiness of the yoga leggings you adore with the sleek appearance of daily-wear trousers. Light, airy and built to keep up through your most hectic days.
            </p>
          </div>

          {/* Ratings Grid */}
          <div className="grid grid-cols-2 gap-3 py-2">
            {[
              { label: "SOFTNESS", score: 5 },
              { label: "STRETCH", score: 5 },
              { label: "BREATHABILITY", score: 5 },
              { label: "WRINKLE-RESISTANCE", score: 5 },
            ].map((metric) => (
              <div key={metric.label} className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700">{metric.label}</span>
                <div className="flex gap-1 text-[#704F30]">
                  {[...Array(metric.score)].map((_, i) => (
                    <span key={i} className="w-2.5 h-2.5 rounded-full bg-[#704F30]" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-5">
            <h4 className="font-bold text-gray-900 text-sm mb-3">Care Instructions:</h4>
            <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
              <li>Machine wash cold</li>
              <li>Air dry flat or machine dry on a low setting</li>
              <li>Do not bleach</li>
              <li>No ironing required</li>
              <li>Built to retain its form and colour through wash after wash</li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab 2: Shipping */}
      {activeTab === 2 && (
        <div className="max-w-2xl mx-auto bg-[#FAF8F6] p-6 sm:p-8 rounded-2xl border border-[#EFE8E2] space-y-6 animate-in fade-in duration-200">
          <div>
            <h3 className="text-xs font-extrabold tracking-wider text-[#704F30] uppercase mb-4">
              YOUR ORDER INCLUDES:
            </h3>
            <div className="space-y-3">
              {shippingPoints.map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#E5F2E9] text-[#216D34] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-gray-500 pt-4 border-t border-gray-200 italic">
            From the moment you pay until it arrives at your door, every stage is easy, safe and worry-free.
          </p>
        </div>
      )}
    </section>
  );
};

