"use client";

import React, { useState } from "react";

export const DetailsTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = ["The Details", "Fabric & Care", "Shipping"];

  const detailRows = [
    {
      title: "THE RUNDOWN:",
      desc: "Wide-leg capris that have the appearance of tailored trousers yet wear like your best-loved athletic gear.",
      icon: "/curvd_assets/011.svg",
    },
    {
      title: "THE LOOK:",
      desc: "A high-waisted, figure-flattering cut designed to suit every body type.",
      icon: "/curvd_assets/012.svg",
    },
    {
      title: "THE FEEL:",
      desc: "Ultra-smooth stretch material that you won't want to peel off.",
      icon: "/curvd_assets/013.svg",
    },
    {
      title: "THE MOVES:",
      desc: "Flexes alongside you whether you're walking, sitting, reaching or running.",
      icon: "/curvd_assets/014.svg",
    },
    {
      title: "THE AIRFLOW:",
      desc: "A light, breathable stand-in for shorts that keeps you cool through the hot months and still offers the coverage you like.",
      icon: "/curvd_assets/015.svg",
    },
    {
      title: "THE VERSATILITY:",
      desc: "A single pair. Office days, trips, days off and all the moments in the middle.",
      icon: "/curvd_assets/016.svg",
    },
    {
      title: "THE DIFFERENCE:",
      desc: "The sharp appearance of tailored trousers blended with the ease, give and relaxed feel of athleisure.",
      icon: "/curvd_assets/017.svg",
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
    <section className="w-full py-8 sm:py-12 bg-white">
      <div className="w-full max-w-[560px] sm:max-w-[580px] lg:max-w-[600px] mx-auto px-4">
        {/* Tab Navigation Bar matching curvdlondonclothing.com */}
        <div className="grid grid-cols-3 mb-6" role="tablist">
          {tabs.map((tab, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                onClick={() => setActiveTab(idx)}
                className={`py-2 pb-2.5 px-2 text-center text-[16px] sm:text-[18px] transition-all cursor-pointer border-b-[3px] ${
                  isActive
                    ? "border-[rgb(186,166,148)] text-[rgb(134,114,99)] font-semibold"
                    : "border-[rgb(217,217,217)] text-[rgb(15,15,15)] font-normal hover:text-black"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* ================= Tab 0: The Details (Single Outer Bordered Box) ================= */}
        {activeTab === 0 && (
          <div className="border border-[rgb(186,166,148)] rounded-[12px] p-5 sm:py-7 sm:px-6 bg-white animate-in fade-in duration-200">
            {detailRows.map((row, idx) => (
              <div
                key={idx}
                className="flex gap-4 items-start mb-7 last:mb-0"
              >
                <img
                  src={row.icon}
                  alt=""
                  width={42}
                  height={44}
                  className="w-[42px] h-auto flex-shrink-0 mt-0.5 object-contain"
                  loading="lazy"
                />
                <div>
                  <p className="text-[17px] sm:text-[18px] font-bold text-[#907362] uppercase leading-[1.2] mb-2 sm:mb-2.5 tracking-tight">
                    {row.title}
                  </p>
                  <p className="text-[15px] sm:text-[17px] font-normal text-[#797673] leading-[1.4]">
                    {row.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= Tab 1: Fabric & Care ================= */}
        {activeTab === 1 && (
          <div className="bg-[#f7f7f7] border border-[#e8e8e8] rounded-[12px] p-5 sm:p-6 text-left animate-in fade-in duration-200">
            <p className="text-[17px] sm:text-[18px] font-bold text-[#313131] leading-[1.2] mb-4">
              Curvd™ Comfort Stretch Fabric
            </p>

            {/* Swatch & Metric Bars Row */}
            <div className="flex flex-col sm:flex-row gap-5 items-center mb-4.5">
              <div className="w-full sm:w-[46%] flex-shrink-0 rounded-[8px] overflow-hidden bg-neutral-200">
                <img
                  src="/curvd_assets/018.png"
                  alt="Curvd Comfort Stretch Fabric"
                  width={198}
                  height={111}
                  className="w-full h-auto block object-cover"
                />
              </div>

              <ul className="w-full flex flex-col gap-3">
                <li className="flex items-center gap-2.5">
                  <img
                    src="/curvd_assets/019.svg"
                    alt=""
                    width={49}
                    height={18}
                    className="w-[49px] h-[18px] flex-shrink-0"
                  />
                  <span className="text-[#baa694] text-xs sm:text-[13px] font-bold uppercase tracking-wider">
                    SOFTNESS
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <img
                    src="/curvd_assets/019.svg"
                    alt=""
                    width={49}
                    height={18}
                    className="w-[49px] h-[18px] flex-shrink-0"
                  />
                  <span className="text-[#baa694] text-xs sm:text-[13px] font-bold uppercase tracking-wider">
                    STRETCH
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <img
                    src="/curvd_assets/020.svg"
                    alt=""
                    width={49}
                    height={18}
                    className="w-[49px] h-[18px] flex-shrink-0"
                  />
                  <span className="text-[#baa694] text-xs sm:text-[13px] font-bold uppercase tracking-wider">
                    BREATHABILITY
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <img
                    src="/curvd_assets/020.svg"
                    alt=""
                    width={49}
                    height={18}
                    className="w-[49px] h-[18px] flex-shrink-0"
                  />
                  <span className="text-[#baa694] text-xs sm:text-[13px] font-bold uppercase tracking-wider">
                    WRINKLE-RESISTANCE
                  </span>
                </li>
              </ul>
            </div>

            <p className="text-[15px] sm:text-[16px] text-[#797673] leading-[1.4] mb-5">
              Our exclusive comfort-stretch material marries the cosiness of the yoga leggings you adore with the sleek appearance of daily-wear trousers. Light, airy and built to keep up through your most hectic days.
            </p>

            <p className="text-[17px] sm:text-[18px] font-bold text-[#313131] leading-[1.2] mb-3">
              Care Instructions:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-[15px] sm:text-[16px] text-[#797673] font-medium leading-[1.4] pl-2">
              <li>Machine wash cold</li>
              <li>Air dry flat or machine dry on a low setting</li>
              <li>Do not bleach</li>
              <li>No ironing required</li>
              <li>Built to retain its form and colour through wash after wash</li>
            </ul>
          </div>
        )}

        {/* ================= Tab 2: Shipping ================= */}
        {activeTab === 2 && (
          <div className="border border-[rgb(186,166,148)] rounded-[12px] p-5 sm:py-7 sm:px-6 bg-white animate-in fade-in duration-200">
            <p className="text-[15px] sm:text-[16px] font-semibold text-[#313131] uppercase tracking-wider mb-4">
              YOUR ORDER INCLUDES:
            </p>
            <ul className="space-y-3 mb-4.5">
              {shippingPoints.map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-[15px] sm:text-[16px] font-semibold text-[#797673]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 18 18"
                    fill="none"
                    aria-hidden="true"
                    className="flex-shrink-0"
                  >
                    <path
                      d="M8.88 17.08A8.2 8.2 0 1 0 8.88.69a8.2 8.2 0 0 0 0 16.39Z"
                      fill="#FBFAF6"
                      stroke="#216D34"
                      strokeWidth="1.37"
                    />
                    <path
                      d="M5.2 8.88L7.65 11.34L12.57 6.42"
                      stroke="#216D34"
                      strokeWidth="1.37"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="text-[15px] sm:text-[16px] text-[#797673] leading-[1.4] pt-1">
              From the moment you pay until it arrives at your door, every stage is easy, safe and worry-free.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
