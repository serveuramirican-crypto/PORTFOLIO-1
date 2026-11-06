import React from "react";

export const MidPageOffer: React.FC = () => {
  return (
    <section id="sb-capri-offer">
      <img
        className="sbof-bg"
        src="/assets/images/260819_D_D_SHOT_126_7662.webp"
        alt="Special offer background"
        loading="lazy"
      />
      <div
        className="sbof-marquee"
        aria-label="New customer offer: up to 60% off, ends today"
      >
        <div className="sbof-track">
          {[0, 1, 2, 3].map((groupIndex) => (
            <ul
              key={groupIndex}
              className="sbof-group"
              aria-hidden={groupIndex > 0 ? "true" : undefined}
            >
              {[0, 1, 2, 3].map((itemIndex) => (
                <li key={itemIndex}>
                  <span className="sbof-t">NEW CUSTOMER DEAL</span>
                  <span className="sbof-badge">save up to 60%</span>
                  <span className="sbof-t">TODAY ONLY</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};
