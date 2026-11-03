"use client";

import React, { useRef } from "react";

const TESTIMONIALS = [
  {
    photo: "https://cdn.shopify.com/s/files/1/0605/0385/1066/files/002_68168995-64d5-4e66-b1f0-67a78e222f19.jpg?v=1792538950",
    quote: "“I put these on for my flight to Barcelona and headed directly to dinner after landing. Relaxed the whole day and they somehow still looked crisp.”",
    name: "Rachel B. — London, UK",
  },
  {
    photo: "https://cdn.shopify.com/s/files/1/0814/5371/1586/files/004_9f9df8fe-87b0-4c6f-bf94-0f0ae12bb81c.jpg?v=1792538950",
    quote: "“I’m a teacher and I’m on the move for most of the day. These never feel restricting, even while I’m constantly walking, bending and standing.”",
    name: "Michelle W. — Seattle, Washington",
  },
  {
    photo: "https://cdn.shopify.com/s/files/1/0770/5427/9878/files/005_4ebcfea8-0525-4bd9-a4e8-ad0777af6c74.jpg?v=1792538950",
    quote: "“My hips and thighs are on the fuller side and fit is usually a struggle. These drape so nicely without clinging in all the wrong places.”",
    name: "Jennifer L. — Atlanta, Georgia",
  },
  {
    photo: "https://cdn.shopify.com/s/files/1/0848/4316/7997/files/006_6147063e-1eb9-4eae-b4ef-279a964a93e4.jpg?v=1792538950",
    quote: "“At 5’8”, I worried the cropped length might look odd, but it lands in exactly the right spot and looks great with both sandals and sneakers.”",
    name: "Jessica R. — San Diego, California",
  },
  {
    photo: "https://cdn.shopify.com/s/files/1/0806/1989/6971/files/007_d7f2ac6d-16a8-43f3-8a27-fe52824c4fd0.jpg?v=1792538956",
    quote: "“I get more compliments on these pants than on pairs that cost me twice as much.”",
    name: "Karen D. — Dublin, Ireland",
  },
  {
    photo: "https://cdn.shopify.com/s/files/1/0797/2375/7651/files/008_3880178e-a3c3-48aa-93a5-de56f92bd28b.jpg?v=1792538957",
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
            src="https://cdn.shopify.com/s/files/1/0852/1456/0484/files/001.svg?v=1792538950"
            alt="5 stars"
            width="73"
            height="13"
            loading="lazy"
          />
          <p>
            Rated <strong>4.9/5</strong> based on <strong>+12,537</strong> Total Ratings
          </p>
        </div>
        <p className="sbhw-kicker">THE EVERYDAY ESSENTIAL OF</p>
        <h2 className="sbhw-title">50,000+ Happy Women</h2>
      </div>

      <div className="sbhw-viewport">
        <div className="sbhw-track" data-sbhw-track="" ref={trackRef}>
          {TESTIMONIALS.map((t, idx) => (
            <article key={idx} className="sbhw-card">
              <img
                className="sbhw-photo"
                src={t.photo}
                alt={`${t.name} wearing the capri pants`}
                width="326"
                height="384"
                loading="lazy"
              />
              <div className="sbhw-body">
                <img
                  className="sbhw-stars"
                  src="https://cdn.shopify.com/s/files/1/1028/9096/3315/files/003.svg?v=1792538950"
                  alt="5 stars"
                  width="86"
                  height="14"
                  loading="lazy"
                />
                <p className="sbhw-quote">{t.quote}</p>
                <p className="sbhw-name">
                  <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
                    <circle cx="6" cy="6" r="6" fill="rgb(168, 145, 128)"></circle>
                    <path
                      d="M3.3 6.2l1.8 1.7 3.6-3.7"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="1.4"
                    ></path>
                  </svg>
                  {t.name}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="sbhw-nav">
        <button
          type="button"
          className="sbhw-arrow"
          data-sbhw-prev=""
          aria-label="Previous reviews"
          onClick={() => scroll("left")}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              d="M15 5l-7 7 7 7"
              fill="none"
              stroke="rgb(18, 18, 18)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
        <button
          type="button"
          className="sbhw-arrow"
          data-sbhw-next=""
          aria-label="Next reviews"
          onClick={() => scroll("right")}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              d="M9 5l7 7-7 7"
              fill="none"
              stroke="rgb(18, 18, 18)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      </div>
    </section>
  );
};
