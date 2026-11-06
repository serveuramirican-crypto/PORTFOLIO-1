import React from "react";

export const WhyWeMadeThis: React.FC = () => {
  return (
    <section id="sb-why-we-made-this">
      <picture className="sb-wwm-bg">
        <source
          media="(max-width: 749px)"
          srcSet="/assets/images/260819_D_D_SHOT_126_7644.webp"
        />
        <img
          src="/assets/images/260819_D_D_SHOT_126_7644.webp"
          alt="Why We Made This background"
          loading="lazy"
          width="2880"
          height="502"
        />
      </picture>
      <div className="sb-wwm-inner">
        <h2 className="sb-wwm-title">WHY WE MADE THIS</h2>
        <p className="sb-wwm-quote">
          “Women have long been led to believe that looking sharp and feeling at ease can&#39;t go together. We designed these capri pants to prove that you get both.”
        </p>
      </div>
    </section>
  );
};
