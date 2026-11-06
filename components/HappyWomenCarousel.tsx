"use client";

import React, { useRef } from "react";

const TESTIMONIALS = [
  {
    photo: "/assets/images/260819_D_D_SHOT_126_7644.webp",
    quote: "“I put these on for my flight to Barcelona and headed directly to dinner after landing. Relaxed the whole day and they somehow still looked crisp.”",
    name: "Rachel B. — London, UK",
  },
  {
    photo: "/assets/images/260819_D_D_SHOT_126_7655.webp",
    quote: "“I’m a teacher and I’m on the move for most of the day. These never feel restricting, even while I’m constantly walking, bending and standing.”",
    name: "Michelle W. — Seattle, Washington",
  },
  {
    photo: "/assets/images/260819_D_D_SHOT_126_7662.webp",
    quote: "“My hips and thighs are on the fuller side and fit is usually a struggle. These drape so nicely without clinging in all the wrong places.”",
    name: "Jennifer L. — Atlanta, Georgia",
  },
  {
    photo: "/assets/images/260819_D_D_SHOT_126_7669.webp",
    quote: "“At 5’8”, I worried the cropped length might look odd, but it lands in exactly the right spot and looks great with both sandals and sneakers.”",
    name: "Jessica R. — San Diego, California",
  },
  {
    photo: "/assets/images/260819_D_D_SHOT_126_7676.webp",
    quote: "“I get more compliments on these pants than on pairs that cost me twice as much.”",
    name: "Karen D. — Dublin, Ireland",
  },
  {
    photo: "/assets/images/260819_D_D_SHOT_126_7687.webp",
    quote: "“At last, pants that don’t make me want to switch into leggings the moment I walk in the door.”",
    name: "Rebecca F. — Vancouver, Canada",
  },
];

export const HappyWomenCarousel: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (trackRef.current) {
      const offset = direction === "left" ? -370 : 370;
      trackRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section id="sb-capri-happy-women" className="sbhw">
      <div className="sbhw-head">
        <div className="sbhw-badge">
          <img
            src="/images/s/files/1/0852/1456/0484/files/001.svg"
            alt="5 stars"
            width="73"
            height="13"
            loading="lazy"
          />
          <p>
            Rated <strong>4.9/5</strong> based on <strong>+12,537</strong> Total Ratings
          </p>
        </div>
        <p className="sbhw-kicker">50,000+ HAPPY WOMEN</p>
        <h2 className="sbhw-title">And Counting</h2>
        <p className="sbhw-sub">Read our reviews to see what other women are saying!</p>
      </div>

      <div className="sbhw-slider">
        <button
          type="button"
          className="sbhw-btn sbhw-prev"
          aria-label="Previous reviews"
          onClick={() => scroll("left")}
        >
          <img
            src="/images/s/files/1/1028/9096/3315/files/003.svg"
            alt=""
            width="25"
            height="25"
          />
        </button>

        <div className="sbhw-track" ref={trackRef}>
          {TESTIMONIALS.map((t, idx) => (
            <article key={idx} className="sbhw-card">
              <div className="sbhw-photo">
                <img
                  src={t.photo}
                  alt={t.name}
                  loading="lazy"
                  width="478"
                  height="478"
                />
              </div>
              <div className="sbhw-body">
                <p className="sbhw-quote">{t.quote}</p>
                <div className="sbhw-foot">
                  <p className="sbhw-author">{t.name}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="sbhw-btn sbhw-next"
          aria-label="Next reviews"
          onClick={() => scroll("right")}
        >
          <img
            src="/images/s/files/1/1028/9096/3315/files/003.svg"
            alt=""
            width="25"
            height="25"
            style={{ transform: "rotate(180deg)" }}
          />
        </button>
      </div>
    </section>
  );
};
