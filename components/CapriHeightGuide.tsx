import React from "react";

export const CapriHeightGuide: React.FC = () => {
  return (
    <section id="sb-capri-height">
      <picture className="sbch-bg">
        <source
          media="(max-width: 749px)"
          srcSet="https://cdn.shopify.com/s/files/1/0684/1814/2295/files/006_d7f7fd90-1e17-4b47-ba2d-c13890aa6035.jpg?v=1792538894"
        />
        <img
          src="https://cdn.shopify.com/s/files/1/1099/7281/6158/files/005_f225e125-7479-4032-af21-5ab21ad79d51.jpg?v=1792538894"
          alt="Three women wearing capri pants"
          loading="lazy"
        />
      </picture>
      <div className="sbch-inner">
        <div className="sbch-text">
          <p className="sbch-kicker">UNIVERSALLY FLATTERING CAPRI LENGTH</p>
          <h2 className="sbch-title">Looks Good at Every Height</h2>
          <p className="sbch-body">
            No matter if you&#39;re petite, tall, or somewhere between, the cut that skims the ankle delivers a neat, flattering line that seems made just for you — and needs no hemming.
          </p>
          <ul className="sbch-feats">
            <li>
              <img
                src="https://cdn.shopify.com/s/files/1/0822/0318/1297/files/001.svg?v=1792538894"
                alt=""
                width="58"
                height="58"
                loading="lazy"
              />
              <p className="sbch-ft">
                No Tailoring<br />Needed
              </p>
              <p className="sbch-fd">Made to fit beautifully, whatever your height</p>
            </li>
            <li>
              <img
                src="https://cdn.shopify.com/s/files/1/0848/4316/7997/files/002.svg?v=1792538893"
                alt=""
                width="58"
                height="58"
                loading="lazy"
              />
              <p className="sbch-ft">
                Flattering At<br />Every Height
              </p>
              <p className="sbch-fd">Creates even, harmonious proportions on petite to tall frames</p>
            </li>
            <li>
              <img
                src="https://cdn.shopify.com/s/files/1/0847/5908/5311/files/003.svg?v=1792538894"
                alt=""
                width="58"
                height="58"
                loading="lazy"
              />
              <p className="sbch-ft">
                Ankle-Grazing<br />Silhouette
              </p>
              <p className="sbch-fd">The perfect cropped length for a sleek, lengthened line</p>
            </li>
            <li>
              <img
                src="https://cdn.shopify.com/s/files/1/1091/2982/6673/files/004.svg?v=1792538893"
                alt=""
                width="58"
                height="58"
                loading="lazy"
              />
              <p className="sbch-ft">
                pairs easily<br />with all shoes
              </p>
              <p className="sbch-fd">Pairs easily with ballet flats, high heels or trainers</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

