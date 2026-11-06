import React from "react";

const OCCASIONS = [
  "VACATIONS",
  "Weekend Errands",
  "Dinner Plans",
  "Teaching Days",
  "Everyday Wear",
  "Office Days",
  "Coffee Runs",
];

export const OnePairEverywhere: React.FC = () => {
  return (
    <section id="sb-capri-onepair">
      <picture className="sbop-bg">
        <source
          media="(max-width: 749px)"
          srcSet="/assets/images/260819_D_D_SHOT_126_7669.webp"
        />
        <img
          src="/assets/images/260819_D_D_SHOT_126_7669.webp"
          alt="One Pair Everywhere"
          loading="lazy"
        />
      </picture>
      <p className="sbop-head">ONE PAIR. EVERYWHERE.</p>
      <div
        className="sbop-marquee"
        aria-label="Vacations, Weekend Errands, Dinner Plans, Teaching Days, Everyday Wear, Office Days, Coffee Runs"
      >
        <div className="sbop-track">
          {[0, 1, 2, 3].map((groupIndex) => (
            <ul
              key={groupIndex}
              className="sbop-group"
              aria-hidden={groupIndex > 0 ? "true" : undefined}
            >
              {OCCASIONS.map((occ, idx) => (
                <li key={idx}>{occ}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};
