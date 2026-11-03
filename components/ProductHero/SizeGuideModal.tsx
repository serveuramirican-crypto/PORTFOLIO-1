"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const rows = [
    { size: "XS", us: "0-2", waistIn: '24-25"', waistCm: "61-64", hipIn: '34-35"', hipCm: "86-89" },
    { size: "S", us: "4-6", waistIn: '26-27"', waistCm: "66-69", hipIn: '36-37"', hipCm: "91-94" },
    { size: "M", us: "8-10", waistIn: '28-29"', waistCm: "71-74", hipIn: '38-39"', hipCm: "97-99" },
    { size: "L", us: "12-14", waistIn: '30-32"', waistCm: "76-81", hipIn: '40-42"', hipCm: "102-107" },
    { size: "XL", us: "16-18", waistIn: '33-35"', waistCm: "84-89", hipIn: '43-45"', hipCm: "109-114" },
    { size: "2XL", us: "20-22", waistIn: '36-38"', waistCm: "91-97", hipIn: '46-48"', hipCm: "117-122" },
  ];

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl p-6 z-10 overflow-hidden animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-black rounded-md transition"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Size guide</h3>

        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-center text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-700 font-semibold text-xs uppercase tracking-wider">
                <th className="py-2.5 px-3 border-r border-gray-200">Size</th>
                <th className="py-2.5 px-3 border-r border-gray-200">US</th>
                <th className="py-2.5 px-3 border-r border-gray-200">Waist (in)</th>
                <th className="py-2.5 px-3 border-r border-gray-200">Waist (cm)</th>
                <th className="py-2.5 px-3 border-r border-gray-200">Hip (in)</th>
                <th className="py-2.5 px-3">Hip (cm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-800">
              {rows.map((r) => (
                <tr key={r.size} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-2.5 px-3 font-bold border-r border-gray-200 bg-gray-50/30">
                    {r.size}
                  </td>
                  <td className="py-2.5 px-3 border-r border-gray-200">{r.us}</td>
                  <td className="py-2.5 px-3 border-r border-gray-200">{r.waistIn}</td>
                  <td className="py-2.5 px-3 border-r border-gray-200">{r.waistCm}</td>
                  <td className="py-2.5 px-3 border-r border-gray-200">{r.hipIn}</td>
                  <td className="py-2.5 px-3">{r.hipCm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-500 mt-4 leading-relaxed">
          Measurements are body measurements, not garment measurements. Between two sizes? Take the larger one.
        </p>
      </div>
    </div>
  );
};

