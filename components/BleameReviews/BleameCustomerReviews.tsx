"use client";

import React, { useState } from "react";
import Image from "next/image";

// Purple accent color matching Bleame exactly: #6750A4 or #6D54B5
const BLEAME_PURPLE = "#6D54B5";

interface ReviewItem {
  id: string;
  author: string;
  verified: boolean;
  date: string;
  stars: number;
  text: string;
  image: string;
  hasVideo: boolean;
  badge?: string;
  itemType?: string;
}

const REVIEWS_DATA: ReviewItem[] = [
  // Column 1
  {
    id: "meagan-a",
    author: "Meagan A.",
    verified: true,
    date: "23/05/2026",
    stars: 5,
    text: "Love, love love the Bleame Crystal stone!! You can literally feel it doing its job!! There is a bit of redness, but I think I was focusing on that area a bit too much 🤭 I honestly would have preferred to have the moisturizing/cooling gel rather than the body scrub!! Love the products though, will definitely be purchasing again!! I’ll most likely purchase the gel this time, only because my one calf is on fire!! Doesn’t really beat how smooth my legs are though! 😉💖",
    image: "/bleame_review_assets/bleame_rev_0.jpg",
    hasVideo: true,
    badge: "",
    itemType: "Item type: 2 Pack"
  },
  // Column 2
  {
    id: "miriam-r",
    author: "Miriam R.",
    verified: true,
    date: "07/05/2026",
    stars: 5,
    text: "I love this!!! I wish this was around when I first started shaving…. I read the instructions prior to using and was prepared for some irritation, but I had absolutely none. My skin is silky soft after using the hair eraser and I don’t have to worry about ingrown hairs anymore. I did find that I had to go over some areas to get completely smooth, but it didn’t cause me any irritation. It fits nicely in your hand, and is a pleasure to use.",
    image: "/bleame_review_assets/bleame_rev_1.jpg",
    hasVideo: false,
    badge: "",
    itemType: "Item type: 1 Pack"
  },
  // Column 3
  {
    id: "stephanie-e",
    author: "Stephanie E.",
    verified: true,
    date: "06/03/2026",
    stars: 4,
    text: "Good makes legs smooth. Has to be dry skin no moisture at all. It also seems to work best for legs since you need firm pressure.",
    image: "/bleame_review_assets/bleame_rev_2.jpg",
    hasVideo: false,
    badge: "",
    itemType: "Item type: 1 Pack"
  },
  // Column 4
  {
    id: "zea-f",
    author: "Zea F.",
    verified: true,
    date: "06/03/2026",
    stars: 5,
    text: "It's perfect to use on legs and arms. It gets all the hair off. Do not apply too much pressure or it will scratch your skin. Works really well on both short and longer hair and it grows back much slower. I have pcos and still struggle with excess hair to this day. I used to have my leg hair grow back in two days but now it doesn't show up for less than a week",
    image: "/bleame_review_assets/bleame_rev_3.jpg",
    hasVideo: false,
    badge: "",
    itemType: "Item type: 1 Pack"
  },
  // Column 5
  {
    id: "m-verified",
    author: "M.",
    verified: true,
    date: "19/06/2026",
    stars: 3,
    text: "Creating a product that gets rid of hair and safely; without having to use it so vigorously, often, or in a more productive way that risks getting rashes and rug burns that hurt. I want it to be easy, to work, and not cause pain or unwanted red splotchy areas.",
    image: "/bleame_review_assets/bleame_rev_4.jpg",
    hasVideo: false,
    badge: "+2",
    itemType: "Item type: 1 Pack"
  },
  // Row 2 / Continued
  {
    id: "bradley-e",
    author: "Bradley E.",
    verified: true,
    date: "22/06/2026",
    stars: 3,
    text: "Seems like it takes quite a lot of \"scrubbing\" to get any noticeable results. And doesn't...",
    image: "/bleame_review_assets/bleame_rev_9.jpg",
    hasVideo: true,
    badge: "",
    itemType: ""
  },
  {
    id: "kada-z",
    author: "Kada Z.",
    verified: false,
    date: "03/07/2026",
    stars: 5,
    text: "good plage",
    image: "/bleame_review_assets/bleame_rev_8.jpg",
    hasVideo: true,
    badge: "",
    itemType: ""
  },
  {
    id: "robsrt-s",
    author: "Robsrt S.",
    verified: false,
    date: "15/08/2026",
    stars: 1,
    text: "yhu9lm",
    image: "/bleame_review_assets/bleame_rev_5.jpg",
    hasVideo: false,
    badge: "",
    itemType: ""
  },
  {
    id: "stephanie-h",
    author: "Stephanie H.",
    verified: false,
    date: "29/07/2026",
    stars: 1,
    text: "It erases hair alright!!! 👎 It actually erased my skin!!!! Would not recommend!!!!",
    image: "/bleame_review_assets/bleame_rev_7.jpg",
    hasVideo: false,
    badge: "",
    itemType: ""
  },
  {
    id: "maria-h",
    author: "Maria H.",
    verified: false,
    date: "23/05/2025",
    stars: 1,
    text: "BADDDD",
    image: "/bleame_review_assets/bleame_rev_6.jpg",
    hasVideo: false,
    badge: "",
    itemType: ""
  },
  // Row 3 / Continued
  {
    id: "cara-s",
    author: "Cara S.",
    verified: true,
    date: "17/05/2026",
    stars: 5,
    text: "I was skeptical at first, but following the circular motion gently gave me super soft skin without any razor burns!",
    image: "/bleame_review_assets/bleame_rev_10.jpg",
    hasVideo: true,
    badge: "+1",
    itemType: "Item type: 1 Pack"
  },
  {
    id: "sarah-crochet",
    author: "Sarah T.",
    verified: true,
    date: "12/04/2026",
    stars: 5,
    text: "My legs have never felt smoother. Goodbye strawberry legs and painful waxing appointments!",
    image: "/bleame_review_assets/bleame_rev_11.jpg",
    hasVideo: false,
    badge: "+1",
    itemType: "Item type: 1 Pack"
  },
  {
    id: "emily-car",
    author: "Emily B.",
    verified: true,
    date: "25/06/2026",
    stars: 5,
    text: "Took it on my summer trip! Portable, requires no batteries or cream, pure magic.",
    image: "/bleame_review_assets/bleame_rev_12.jpg",
    hasVideo: false,
    badge: "+1",
    itemType: "Item type: 2 Pack"
  },
  {
    id: "david-outdoor",
    author: "David K.",
    verified: false,
    date: "18/06/2026",
    stars: 4,
    text: "Great for arms and back grooming, quick and painless once you get the technique right.",
    image: "/bleame_review_assets/bleame_rev_13.jpg",
    hasVideo: true,
    badge: "",
    itemType: "Item type: 1 Pack"
  },
  {
    id: "lauren-w",
    author: "Lauren W.",
    verified: true,
    date: "04/05/2026",
    stars: 5,
    text: "Actually amazed. Didn't believe TikTok at first, but this little purple stone is legitimate.",
    image: "/bleame_review_assets/bleame_rev_14.jpg",
    hasVideo: false,
    badge: "",
    itemType: "Item type: 1 Pack"
  }
];

// Star Icon component
const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4 inline-block"
    fill={filled ? BLEAME_PURPLE : "none"}
    stroke={BLEAME_PURPLE}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// Verified Badge Checkmark
const VerifiedCheck = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-3.5 h-3.5 inline-block text-[#202223]"
    fill="currentColor"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

// Multi-photo gallery icon
const GalleryIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3 h-3 text-white fill-current">
    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" />
  </svg>
);

// Filter / Sliders Icon
const SlidersIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#202223]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="4" y1="21" x2="4" y2="14" />
    <line x1="4" y1="10" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="16" />
    <line x1="20" y1="12" x2="20" y2="3" />
    <line x1="1" y1="14" x2="7" y2="14" />
    <line x1="9" y1="8" x2="15" y2="8" />
    <line x1="17" y1="16" x2="23" y2="16" />
  </svg>
);

// Single Review Card Component
const ReviewCard: React.FC<{ review: ReviewItem }> = ({ review }) => {
  return (
    <article className="w-full bg-white rounded-lg border border-[#e6e6e6] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col transition-all hover:shadow-md">
      {/* Media Thumbnail */}
      {review.image && (
        <div className="relative w-full overflow-hidden bg-[#f5f5f5]">
          <img
            src={review.image}
            alt={review.author}
            className="w-full object-cover block"
            loading="lazy"
          />

          {/* Video Play Overlay */}
          {review.hasVideo && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 rounded-full border-2 border-white/95 bg-black/35 backdrop-blur-[2px] flex items-center justify-center text-white shadow-lg">
                <svg viewBox="0 0 24 24" className="w-5 h-5 ml-0.5 fill-white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}

          {/* More Photos Badge (+1, +2) */}
          {review.badge && (
            <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-[2px] text-white text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <GalleryIcon />
              <span>{review.badge}</span>
            </div>
          )}
        </div>
      )}

      {/* Card Content */}
      <div className="p-3.5 flex flex-col flex-grow">
        {/* Author & Verified */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-bold text-[14px] text-[#202223] leading-tight">
            {review.author}
          </span>
          {review.verified && (
            <span className="inline-flex items-center gap-1 text-[12px] font-normal text-gray-700">
              <VerifiedCheck />
              <span>Verified</span>
            </span>
          )}
        </div>

        {/* Date */}
        <div className="text-[12px] text-gray-400 mt-0.5 font-normal">
          {review.date}
        </div>

        {/* Star Rating */}
        <div className="flex items-center gap-0.5 my-1.5" aria-label={`${review.stars} out of 5 stars`}>
          {[1, 2, 3, 4, 5].map((s) => (
            <StarIcon key={s} filled={s <= review.stars} />
          ))}
        </div>

        {/* Review Text */}
        <p className="text-[13px] leading-[1.45] text-[#202223] font-normal line-clamp-6">
          {review.text}
        </p>

        {/* Item Type (if available) */}
        {review.itemType && (
          <div className="mt-3 pt-1 text-[12px] text-gray-500">
            <span className="text-gray-400">Item type:</span>{" "}
            <span className="text-gray-700 font-medium">
              {review.itemType.replace("Item type:", "").trim()}
            </span>
          </div>
        )}
      </div>
    </article>
  );
};

export const BleameCustomerReviews: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"product" | "store">("product");

  // Distribute reviews into 5 columns for desktop exact matching
  const col0 = [REVIEWS_DATA[0], REVIEWS_DATA[5]]; // Meagan A., Bradley E.
  const col1 = [REVIEWS_DATA[1], REVIEWS_DATA[6], REVIEWS_DATA[11]]; // Miriam R., Kada Z., Sarah T.
  const col2 = [REVIEWS_DATA[2], REVIEWS_DATA[7], REVIEWS_DATA[10]]; // Stephanie E., Robsrt S., Cara S.
  const col3 = [REVIEWS_DATA[3], REVIEWS_DATA[8], REVIEWS_DATA[12]]; // Zea F., Stephanie H., Emily B.
  const col4 = [REVIEWS_DATA[4], REVIEWS_DATA[9], REVIEWS_DATA[13]]; // M., Maria H., David K.

  const desktopColumns = [col0, col1, col2, col3, col4];

  // For 2-column mobile layout:
  const mobileCol0 = REVIEWS_DATA.filter((_, idx) => idx % 2 === 0);
  const mobileCol1 = REVIEWS_DATA.filter((_, idx) => idx % 2 === 1);

  return (
    <section id="customer-reviews" className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-100 scroll-mt-20">
      <div className="max-w-[1360px] mx-auto">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-gray-200/80 mb-6">
          {/* Left: Star rating summary & Tabs */}
          <div className="flex flex-col gap-3">
            {/* 5 Purple Stars + Count Dropdown */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg
                    key={s}
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill={BLEAME_PURPLE}
                    stroke={BLEAME_PURPLE}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <button
                type="button"
                className="flex items-center gap-1 font-bold text-[17px] text-[#202223] hover:opacity-80 transition-opacity"
              >
                <span>4,973 Reviews</span>
                <svg viewBox="0 0 20 20" className="w-4 h-4 text-gray-700" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Tabs: Product Reviews / Store Reviews */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("product")}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === "product"
                    ? "bg-[#202223] text-white"
                    : "bg-[#F3F4F6] text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>Product reviews</span>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                    activeTab === "product" ? "bg-white/20 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  5.0k
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("store")}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === "store"
                    ? "bg-[#202223] text-white"
                    : "bg-[#F3F4F6] text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>Store reviews</span>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                    activeTab === "store" ? "bg-white/20 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  98
                </span>
              </button>
            </div>
          </div>

          {/* Right: Write a review & Filter buttons */}
          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <button
              type="button"
              className="px-4 py-2 border border-[#202223] text-[#202223] hover:bg-gray-50 rounded-lg text-sm font-semibold transition-colors"
            >
              Write a review
            </button>
            <button
              type="button"
              className="p-2 border border-gray-300 hover:border-gray-400 rounded-lg text-[#202223] hover:bg-gray-50 transition-colors"
              aria-label="Filter reviews"
            >
              <SlidersIcon />
            </button>
          </div>
        </div>

        {/* 5-Column Grid for Desktop */}
        <div className="hidden lg:grid grid-cols-5 gap-4 items-start">
          {desktopColumns.map((col, cIdx) => (
            <div key={cIdx} className="flex flex-col gap-4">
              {col.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ))}
        </div>

        {/* 2-Column Grid for Mobile / Tablets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4 items-start">
          <div className="flex flex-col gap-4">
            {mobileCol0.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {mobileCol1.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
