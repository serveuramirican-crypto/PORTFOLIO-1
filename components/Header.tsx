"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "./CartContext";

export const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currency, setCurrency] = useState("USD $");
  const { totalItems, openCart } = useCart();

  const navLinks = [
    { title: "Sherpa-Fur Leggings", href: "/products/sherpa-fur-leggings-toasty-warm-figure-shaping" },
    { title: "Everyday Stretch Pants", href: "/products/performance-work-trousers" },
    { title: "Everyday Stretch Capris", href: "/products/comfort-stretch-smart-capri-pants-high-rise-all-day-comfort", active: true },
    { title: "Shop All", href: "/collections/all" },
    { title: "Order Tracking", href: "/apps/17TRACK" },
    { title: "Help Center", href: "/pages/help-center" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 transition-shadow duration-200">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          {/* Left: Mobile Menu + Search */}
          <div className="flex items-center gap-3 md:gap-5 flex-1">
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-1 text-gray-800 hover:text-black transition"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 stroke-[1.8]" />
            </button>

            <button
              onClick={() => setSearchOpen(true)}
              className="p-1 text-gray-800 hover:text-black transition"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[1.8]" />
            </button>
          </div>

          {/* Center: Logo */}
          <div className="flex items-center justify-center flex-shrink-0">
            <Link href="/" className="inline-block relative">
              <div className="relative w-36 h-7 md:w-52 md:h-10">
                <Image
                  src="/images/logo_efa23b6a-47c7-410d-b4f2-fe8aa411615e.png"
                  alt="Curvd London"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Right: Currency + Bag */}
          <div className="flex items-center justify-end gap-3 md:gap-5 flex-1">
            <div className="hidden sm:flex items-center text-xs font-medium text-gray-700 hover:text-black cursor-pointer">
              <span>{currency}</span>
              <ChevronDown className="w-3.5 h-3.5 ml-0.5 opacity-70" />
            </div>

            <button
              onClick={openCart}
              className="relative p-1 text-gray-800 hover:text-black transition"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 stroke-[1.8]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2A3743] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col p-6 z-10 animate-in slide-in-from-left duration-200">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <div className="relative w-32 h-6">
                <Image
                  src="/images/logo_efa23b6a-47c7-410d-b4f2-fe8aa411615e.png"
                  alt="Curvd London"
                  fill
                  className="object-contain"
                />
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1 text-gray-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  onClick={() => setDrawerOpen(false)}
                  className={`block px-3 py-2.5 rounded-md text-sm font-medium transition ${
                    link.active
                      ? "text-black bg-gray-50 font-semibold"
                      : "text-gray-700 hover:text-black hover:bg-gray-50"
                  }`}
                >
                  {link.title}
                </Link>
              ))}
            </nav>

            <div className="pt-6 border-t border-gray-100 text-xs text-gray-500">
              <p>Currency: <strong>{currency}</strong></p>
              <p className="mt-2 text-gray-400">© Curvd London. All rights reserved.</p>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          />
          <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl p-5 z-10 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                autoFocus
                className="w-full text-base outline-none text-gray-800 placeholder-gray-400"
              />
              <button onClick={() => setSearchOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              <p className="font-semibold text-gray-700 mb-2">Popular Searches:</p>
              <div className="flex gap-2 flex-wrap">
                {["Everyday Stretch Capri", "Leggings", "Stretch Pants", "Petite Friendly"].map((t) => (
                  <span
                    key={t}
                    onClick={() => setSearchOpen(false)}
                    className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full cursor-pointer transition"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

