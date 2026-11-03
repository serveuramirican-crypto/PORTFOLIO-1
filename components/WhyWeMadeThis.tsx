import React from "react";

export const WhyWeMadeThis: React.FC = () => {
  return (
    <section id="sb-why-we-made-this">
      <picture className="sb-wwm-bg">
        <source
          media="(max-width: 749px)"
          srcSet="https://cdn.shopify.com/s/files/1/0797/2375/7651/files/002_bde86454-fc0f-43f1-8186-5acc165c1fbb.jpg?v=1792538839"
        />
        <img
          src="https://cdn.shopify.com/s/files/1/1036/8529/2311/files/001_665c1b73-34c0-48b0-8eea-9cad505c5183.jpg?v=1792538839"
          alt=""
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

