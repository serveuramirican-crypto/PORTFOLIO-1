import React from "react";

export const SecondaryTrustBar: React.FC = () => {
  return (
    <section id="sb-cv-trust-bar">
      <div className="sbtb-row">
        <div className="sbtb-item">
          <img
            className="sbtb-ic"
            src="https://cdn.shopify.com/s/files/1/0748/2903/7612/files/001.svg?v=1792538942"
            alt=""
            width="38"
            height="38"
            loading="lazy"
            style={{ width: "38px" }}
          />
          <p className="sbtb-txt" style={{ width: "73px" }}>
            Free &amp; Fast Shipping
          </p>
        </div>
        <div className="sbtb-item sbtb-mid">
          <img
            className="sbtb-ic"
            src="https://cdn.shopify.com/s/files/1/0847/5908/5311/files/002.svg?v=1792538942"
            alt=""
            width="33"
            height="33"
            loading="lazy"
            style={{ width: "33px" }}
          />
          <p className="sbtb-txt" style={{ width: "77px" }}>
            Hassle-Free<br />Exchanges
          </p>
        </div>
        <div className="sbtb-item">
          <img
            className="sbtb-ic"
            src="https://cdn.shopify.com/s/files/1/0788/4131/5520/files/003.svg?v=1792538942"
            alt=""
            width="29"
            height="29"
            loading="lazy"
            style={{ width: "29px" }}
          />
          <p className="sbtb-txt" style={{ width: "85px" }}>
            100% Secure<br />Payments
          </p>
        </div>
      </div>
    </section>
  );
};

