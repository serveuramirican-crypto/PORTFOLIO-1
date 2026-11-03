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
          srcSet="https://cdn.shopify.com/s/files/1/0785/5502/1466/files/002_1f09838f-c645-49da-aea2-600b7e1b0310.jpg?v=1792538902"
        />
        <img
          src="https://cdn.shopify.com/s/files/1/0763/3030/3649/files/001_722aeb5a-39fb-4615-9cae-268e0892f8ff.jpg?v=1792538901"
          alt=""
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

