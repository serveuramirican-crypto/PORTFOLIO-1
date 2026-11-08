"use client";

import React, { useState } from "react";

export const PoloAccordions: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div id="details-accordion" className="w-full">
      <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200 mt-4">
        {/* 1. Designed For */}
        <div className="py-1">
          <button
            type="button"
            onClick={() => toggleSection("designed-for")}
            className="w-full flex items-center justify-between py-4 text-left font-bold text-sm text-neutral-900 hover:text-neutral-600 transition-colors cursor-pointer"
            aria-expanded={openSection === "designed-for"}
          >
            <span>Designed For</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`text-neutral-500 transition-transform duration-200 ${
                openSection === "designed-for" ? "rotate-180" : ""
              }`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {openSection === "designed-for" && (
            <div className="pb-5 pt-1 text-xs text-neutral-600 animate-fade-in">
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p className="font-semibold text-neutral-900">
                  Designed for lifting. Built with heavyweight durable cotton and an oversized athletic silhouette that moves with you.
                </p>
                <p>
                  Comfortable, oversized fit means it hangs off the body for a classic lifting shape (and makes it great as a pump cover).
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 2. Description */}
        <div className="py-1">
          <button
            type="button"
            onClick={() => toggleSection("description")}
            className="w-full flex items-center justify-between py-4 text-left font-bold text-sm text-neutral-900 hover:text-neutral-600 transition-colors cursor-pointer"
            aria-expanded={openSection === "description"}
          >
            <span>Description</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`text-neutral-500 transition-transform duration-200 ${
                openSection === "description" ? "rotate-180" : ""
              }`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {openSection === "description" && (
            <div className="pb-5 pt-1 text-xs text-neutral-600 animate-fade-in">
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p>
                  Power was built for lifting. Heavyweight, durable cotton fabric gives you the confidence to lift heavy, while an oversized athletic silhouette gives you complete freedom of movement.
                </p>
                <p>
                  Finished with our iconic screenprinted wordmark across the back shoulders, this is the staple pump cover your gym bag is missing.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 3. Features & Fabric */}
        <div className="py-1">
          <button
            type="button"
            onClick={() => toggleSection("features")}
            className="w-full flex items-center justify-between py-4 text-left font-bold text-sm text-neutral-900 hover:text-neutral-600 transition-colors cursor-pointer"
            aria-expanded={openSection === "features"}
          >
            <span>Features &amp; Fabric</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`text-neutral-500 transition-transform duration-200 ${
                openSection === "features" ? "rotate-180" : ""
              }`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {openSection === "features" && (
            <div className="pb-5 pt-1 text-xs text-neutral-600 animate-fade-in">
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <div>
                  <h5 className="font-bold text-neutral-900 text-xs uppercase tracking-wider mb-2">
                    Size &amp; Fit
                  </h5>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>Oversized fit</li>
                    <li>Classic ribbed crew neckline</li>
                    <li>Drop shoulder seam for shoulder mobility</li>
                    <li>Model is 6&apos;2&quot; (188cm) and wears a size L</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold text-neutral-900 text-xs uppercase tracking-wider mb-2">
                    Materials &amp; Care
                  </h5>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>100% Durable Heavyweight Cotton, 230 GSM</li>
                    <li>230 GSM dense breathable fabric</li>
                    <li>Machine wash cold (30°C) with similar colours</li>
                    <li>Do not tumble dry; lay flat to dry</li>
                    <li>Do not dry clean; iron on low heat (inside out)</li>
                  </ul>
                </div>
                <div className="pt-2 text-[11px] text-neutral-400">
                  <span>SKU: A4B9W-NC0S-AW26</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. Delivery & Returns */}
        <div className="py-1">
          <button
            type="button"
            onClick={() => toggleSection("delivery")}
            className="w-full flex items-center justify-between py-4 text-left font-bold text-sm text-neutral-900 hover:text-neutral-600 transition-colors cursor-pointer"
            aria-expanded={openSection === "delivery"}
          >
            <span>Delivery &amp; Returns</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`text-neutral-500 transition-transform duration-200 ${
                openSection === "delivery" ? "rotate-180" : ""
              }`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {openSection === "delivery" && (
            <div className="pb-5 pt-1 text-xs text-neutral-600 animate-fade-in">
              <div className="space-y-3 text-neutral-600 leading-relaxed text-xs">
                <p>
                  <strong className="text-neutral-900">Standard Delivery:</strong> 3-5 working days. Free on orders over $75 / 500 MAD.
                </p>
                <p>
                  <strong className="text-neutral-900">Express Delivery:</strong> 1-2 working days available at checkout.
                </p>
                <p>
                  <strong className="text-neutral-900">Free 30-Day Returns:</strong> You have 30 days from receiving your order to return items for free. Items must be unworn, unwashed, and in their original packaging with tags intact.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 5. Share */}
        <div className="py-1">
          <button
            type="button"
            onClick={() => toggleSection("share")}
            className="w-full flex items-center justify-between py-4 text-left font-bold text-sm text-neutral-900 hover:text-neutral-600 transition-colors cursor-pointer"
            aria-expanded={openSection === "share"}
          >
            <span>Share</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`text-neutral-500 transition-transform duration-200 ${
                openSection === "share" ? "rotate-180" : ""
              }`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {openSection === "share" && (
            <div className="pb-5 pt-1 text-xs text-neutral-600 animate-fade-in">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-3.5 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                  <span>{copiedLink ? "Lien copié !" : "Copier le lien"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

