"use client";

import React, { useState, useRef } from "react";

const CARDS = [
  {
    num: "/images/s/files/1/0797/2375/7651/files/001.svg",
    numAlt: "01",
    photo: "/curvd_assets/pdp2/hero_4.jpg",
    shade: "/images/s/files/1/0847/5908/5311/files/005.png",
    name: "Confidence in Every Outfit",
    bullets: [
      "Lifts even the simplest look",
      "Polished and chic with no effort",
      "Simple to style casual or smart",
    ],
  },
  {
    num: "/images/s/files/1/1091/2985/9441/files/002.svg",
    numAlt: "02",
    photo: "/curvd_assets/pdp2/hero_5.jpg",
    shade: "/images/s/files/1/0806/1989/6971/files/007_86e81280-687e-4ea5-a725-edf9aa09b732.png",
    name: "Cool & Comfortable",
    bullets: [
      "Light, breathable fabric",
      "Helps you stay cool on warm days",
      "Comfortable from morning till night",
    ],
  },
  {
    num: "/images/s/files/1/1091/2982/6673/files/003.svg",
    numAlt: "03",
    photo: "/curvd_assets/pdp2/cYZLNDj.jpg",
    shade: "/images/s/files/1/0845/2731/7054/files/009_66e6f004-fa70-4089-8619-df1b7a72b62d.png",
    name: "Designed to Flatter",
    bullets: [
      "Works with your natural shape",
      "Gives a smooth, held-in silhouette",
      "Keeps its shape wear after wear",
    ],
  },
];

export const Top3Reasons2: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (idx: number) => {
    setActiveIndex(idx);
    if (trackRef.current) {
      const card = trackRef.current.children[idx] as HTMLElement | undefined;
      if (card) {
        trackRef.current.scrollTo({
          left: card.offsetLeft - 16,
          behavior: "smooth",
        });
      }
    }
  };

  const handleScroll = () => {
    if (trackRef.current) {
      const scrollLeft = trackRef.current.scrollLeft;
      const cardWidth = trackRef.current.clientWidth * 0.83;
      const idx = Math.round(scrollLeft / (cardWidth + 12));
      setActiveIndex(Math.min(Math.max(idx, 0), CARDS.length - 1));
    }
  };

  return (
    <section id="sb-top3-reasons">
      <div className="sb-t3-head">
        <h2 className="sb-t3-kicker">TOP 3 REASONS</h2>
        <h2 className="sb-t3-title">Why Women Wear It On Repeat</h2>
        <p className="sb-t3-sub">
          Made for the days you want to look put-together without giving it a second thought.
        </p>
      </div>
      <div className="sb-t3-wrap">
        <div
          className="sb-t3-track"
          data-sb-track=""
          ref={trackRef}
          onScroll={handleScroll}
        >
          {CARDS.map((card, idx) => (
            <article key={idx} className="sb-t3-card">
              <img
                className="sb-t3-photo"
                src={card.photo}
                alt={card.name}
                loading="lazy"
                width="666"
                height="1184"
              />
              <div className="sb-t3-body">
                <img
                  className="sb-t3-shade"
                  src={card.shade}
                  alt=""
                  loading="lazy"
                />
                <img
                  className="sb-t3-num"
                  src={card.num}
                  alt={card.numAlt}
                  width="46"
                  height="46"
                />
                <p className="sb-t3-name">{card.name}</p>
                <ul className="sb-t3-list">
                  {card.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <div className="sb-t3-dots" data-sb-dots="">
          {CARDS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Slide ${idx + 1}`}
              className={activeIndex === idx ? "is-active" : ""}
              onClick={() => scrollToIndex(idx)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

