"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ShieldCheck } from "lucide-react";
import { useCart } from "./CartContext";

export const UpsellCard: React.FC = () => {
  const [size, setSize] = useState("S");
  const [color, setColor] = useState("Cream Leopard");
  const [inseam, setInseam] = useState('29" Regular');
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddUpsell = (e: React.FormEvent) => {
    e.preventDefault();
    addItem({
      id: `stretch-pants-full-${size}-${color}-${inseam}`,
      title: "Everyday Stretch Pants | High Rise & All-Day Comfort",
      variantTitle: `${size} / ${color} / ${inseam}`,
      price: 65,
      originalPrice: 105,
      quantity: 1,
      image: "/assets/images/Desmond-and-Dempsey-Long-Pyjama-Set-The-Jag-Print-Cream-Cutout.jpg",
      color,
      size,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="max-w-[850px] mx-auto px-4 py-8 space-y-8">
      {/* Upsell Cross-sell Box */}
      <div className="bg-white rounded-2xl border border-[#E1D7CD] p-5 sm:p-7 shadow-2xs">
        <p className="text-center font-bold text-gray-800 text-sm sm:text-base mb-5">
          Adore the fit but want a longer option?
        </p>

        <div className="flex flex-col sm:flex-row gap-5 items-center">
          {/* Product Image */}
          <div className="relative w-36 h-44 sm:w-40 sm:h-48 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src="/assets/images/Desmond-and-Dempsey-Long-Pyjama-Set-The-Jag-Print-Cream-Cutout.jpg"
              alt="Everyday Stretch Pants"
              fill
              className="object-cover"
            />
          </div>

          {/* Details & Selectors */}
          <div className="flex-1 w-full space-y-3">
            <div className="flex items-center gap-1.5 text-[#F5A623]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current stroke-none" />
              ))}
              <span className="text-xs text-gray-500 font-semibold ml-1">5.0 (2,419)</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              Everyday Stretch Pants | High Rise &amp; All-Day Comfort
            </h3>

            {/* Selects */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-gray-600 block mb-1">Size</label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full text-xs font-medium py-1.5 px-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#704F30]"
                >
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="2XL">2XL</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-600 block mb-1">Color</label>
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full text-xs font-medium py-1.5 px-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#704F30]"
                >
                  <option value="Cream Leopard">Cream Leopard</option>
                  <option value="Classic Black">Classic Black</option>
                  <option value="Espresso">Espresso</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-600 block mb-1">Inseam</label>
                <select
                  value={inseam}
                  onChange={(e) => setInseam(e.target.value)}
                  className="w-full text-xs font-medium py-1.5 px-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#704F30]"
                >
                  <option value='27" Short'>27&quot; Short</option>
                  <option value='29" Regular'>29&quot; Regular</option>
                  <option value='31" Tall'>31&quot; Tall</option>
                </select>
              </div>
            </div>

            {/* Price and CTA */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-extrabold text-gray-900">$65.00</span>
                <span className="text-xs text-gray-400 line-through">$105.00</span>
              </div>

              <button
                type="button"
                onClick={handleAddUpsell}
                className="py-2.5 px-5 bg-[#704F30] hover:bg-[#5a3e25] text-white text-xs font-bold rounded-lg uppercase tracking-wider transition active:scale-95 shadow-2xs"
              >
                {added ? "Added ✓" : "SHOP NOW"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comfort-First Promise Banner */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-[#FAF8F6] rounded-2xl border border-[#EFE8E2] p-5 sm:p-6 text-center sm:text-left">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E8DFD7] flex items-center justify-center flex-shrink-0 text-[#704F30]">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <div>
          <h4 className="font-extrabold text-gray-900 text-base sm:text-lg mb-1">
            Comfort-First Promise
          </h4>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            We’re sure you’ll love the fit, the feel and the versatility. If not, our 30-Day Money-Back Guarantee has you covered.
          </p>
        </div>
      </div>
    </section>
  );
};
