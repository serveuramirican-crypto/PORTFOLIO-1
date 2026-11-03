"use client";

import React from "react";

export const AnnouncementBar: React.FC = () => {
  const items = [
    "FREE SHIPPING TODAY",
    "BUY 1 GET 1 FREE & UP TO 60% OFF",
    "FREE SHIPPING TODAY",
    "BUY 1 GET 1 FREE & UP TO 60% OFF",
    "FREE SHIPPING TODAY",
    "BUY 1 GET 1 FREE & UP TO 60% OFF",
    "FREE SHIPPING TODAY",
    "BUY 1 GET 1 FREE & UP TO 60% OFF",
  ];

  return (
    <div
      id="sb-curvd-announce"
      aria-label="Announcement"
      className="bg-black text-white overflow-hidden py-2 text-[12px] md:text-[13px] font-medium tracking-wide select-none group"
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <ul className="flex shrink-0 items-center list-none m-0 p-0">
          {items.map((item, idx) => (
            <li key={`grp1-${idx}`} className="flex items-center px-6 md:px-8 whitespace-nowrap">
              <span>{item}</span>
              <span className="inline-block w-1 h-1 rounded-full bg-neutral-500 ml-6 md:ml-8" />
            </li>
          ))}
        </ul>
        <ul className="flex shrink-0 items-center list-none m-0 p-0" aria-hidden="true">
          {items.map((item, idx) => (
            <li key={`grp2-${idx}`} className="flex items-center px-6 md:px-8 whitespace-nowrap">
              <span>{item}</span>
              <span className="inline-block w-1 h-1 rounded-full bg-neutral-500 ml-6 md:ml-8" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

