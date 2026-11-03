"use client";

import React from "react";
import Image from "next/image";

export const TrustSection: React.FC = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#FAF7F5] rounded-2xl p-6 md:p-8 border border-[#EFE8E2]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-xs flex-shrink-0">
            <svg width="28" height="28" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1h22v16H1V1zm22 5h7l5 5v6h-12V6z" stroke="#704F30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="7" cy="19" r="3" stroke="#704F30" strokeWidth="2"/>
              <circle cx="26" cy="19" r="3" stroke="#704F30" strokeWidth="2"/>
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm md:text-base leading-snug">
              FREE Worldwide Shipping
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">Tracked &amp; insured delivery to your door</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-xs flex-shrink-0">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#704F30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="m9 12 2 2 4-4" stroke="#704F30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm md:text-base leading-snug">
              30-Day Money-Back Guarantee
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">Love the comfort or return hassle-free</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-xs flex-shrink-0">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="#704F30" strokeWidth="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#704F30" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm md:text-base leading-snug">
              Easy &amp; Secure Checkout
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">256-bit encrypted SSL checkout</p>
          </div>
        </div>
      </div>
    </section>
  );
};

