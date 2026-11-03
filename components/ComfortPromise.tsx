import React from "react";

export const ComfortPromise: React.FC = () => {
  return (
    <section id="sb-capri-promise">
      <div className="sbcp-wrap">
        <div className="sbcp-media">
          <img
            src="https://cdn.shopify.com/s/files/1/0748/2156/6647/files/001_b4e9bd9e-e135-4b1d-ad83-836f8b5dc3a6.jpg?v=1792538922"
            alt="50,000+ happy women and counting"
            loading="lazy"
            width="896"
            height="896"
          />
        </div>
        <div className="sbcp-text">
          <img
            className="sbcp-badge"
            src="https://cdn.shopify.com/s/files/1/0775/8456/4359/files/002_5abbbfbd-d805-40cc-9ce3-4e29a3b88c30.png?v=1792538922"
            alt="30-Day Money-Back Guarantee"
            loading="lazy"
            width="612"
            height="470"
          />
          <h2 className="sbcp-title">Our Comfort Promise</h2>
          <div className="sbcp-copy">
            <p>These capri pants were created to be the ones you reach for over and over.</p>
            <p>
              Should they fall short of the ease, self-assurance and flexibility you expected, return them within{" "}
              <strong>30 days and get all your money back.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

