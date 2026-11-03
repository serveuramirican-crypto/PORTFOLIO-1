import React from "react";

const VerifiedIcon = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
    <circle cx="8" cy="8" r="7.25" fill="none" stroke="currentColor" strokeWidth="1" />
    <path d="M5 8.2l2 2 4-4.2" fill="none" stroke="currentColor" strokeWidth="1.1" />
  </svg>
);

export const LovedByWomen: React.FC = () => {
  return (
    <section id="sb-loved-by-women">
      <div className="sb-lw-grid">
        <div className="sb-lw-left">
          <img
            className="sb-lw-stars"
            src="https://cdn.shopify.com/s/files/1/0779/6903/1342/files/001.svg?v=1792538867"
            alt="5 stars"
            width="103"
          />
          <p className="sb-lw-kicker">LOVED BY WOMEN OF</p>
          <h2 className="sb-lw-title">Every Shape &amp; Lifestyle</h2>
          <p className="sb-lw-text">
            Our wide leg tailored pants were designed to skim your body&#39;s natural shape while smoothly supporting your middle - helping you look and feel fantastic.
          </p>
          <ul className="sb-lw-feats">
            <li>
              <img
                src="https://cdn.shopify.com/s/files/1/0917/4633/6802/files/002_63975983-5e93-48bb-bc05-c16051dab76a.svg?v=1792538867"
                alt=""
                style={{ width: "23px" }}
              />
              <span>PETITE<br />FRIENDLY</span>
            </li>
            <li>
              <img
                src="https://cdn.shopify.com/s/files/1/1013/6675/9699/files/003.svg?v=1792538867"
                alt=""
                style={{ width: "36px" }}
              />
              <span>FLATTERS<br />EVERY SHAPE</span>
            </li>
            <li>
              <img
                src="https://cdn.shopify.com/s/files/1/0845/5893/8309/files/004.svg?v=1792538867"
                alt=""
                style={{ width: "42px" }}
              />
              <span>OFFICE<br />APPROVED</span>
            </li>
            <li>
              <img
                src="https://cdn.shopify.com/s/files/1/0862/1595/0561/files/005.svg?v=1792538867"
                alt=""
                style={{ width: "31px" }}
              />
              <span>TRAVEL-<br />FRIENDLY</span>
            </li>
          </ul>
        </div>
        <div className="sb-lw-cards">
          <article className="sb-lw-card">
            <img
              className="sb-lw-photo"
              src="https://cdn.shopify.com/s/files/1/0841/8512/0994/files/006_bd0b0ea9-f2af-4c1c-a80e-f832969aa21d.jpg?v=1792538868"
              alt="Sarah R."
              loading="lazy"
            />
            <div className="sb-lw-copy">
              <p className="sb-lw-quote">‘’At last, pants that don’t need hemming.’’</p>
              <img
                className="sb-lw-rate"
                src="https://cdn.shopify.com/s/files/1/0795/6109/7384/files/007.svg?v=1792538875"
                alt="5 stars"
                width="64"
              />
              <p className="sb-lw-who">
                <VerifiedIcon />
                <span>Sarah R.</span>
                <b>•</b>
                <span>5’2’’</span>
              </p>
            </div>
          </article>
          <article className="sb-lw-card">
            <img
              className="sb-lw-photo"
              src="https://cdn.shopify.com/s/files/1/0848/6780/9537/files/008.jpg?v=1792538882"
              alt="Jessica L."
              loading="lazy"
            />
            <div className="sb-lw-copy">
              <p className="sb-lw-quote">‘’Ideal for travel. No wrinkles, no hassle’’</p>
              <img
                className="sb-lw-rate"
                src="https://cdn.shopify.com/s/files/1/0795/6109/7384/files/007.svg?v=1792538875"
                alt="5 stars"
                width="64"
              />
              <p className="sb-lw-who">
                <VerifiedIcon />
                <span>Jessica L.</span>
                <b>•</b>
                <span>Manager</span>
              </p>
            </div>
          </article>
          <article className="sb-lw-card sb-lw-rev">
            <div className="sb-lw-copy">
              <p className="sb-lw-quote sb-lw-narrow">‘’Comfy through every body change.’’</p>
              <img
                className="sb-lw-rate"
                src="https://cdn.shopify.com/s/files/1/0795/6109/7384/files/007.svg?v=1792538875"
                alt="5 stars"
                width="64"
              />
              <p className="sb-lw-who">
                <VerifiedIcon />
                <span>Jessica L.</span>
                <b>•</b>
                <span>Mum of 2</span>
              </p>
            </div>
            <img
              className="sb-lw-photo sb-lw-photo-sm"
              src="https://cdn.shopify.com/s/files/1/1013/6675/9699/files/009_0294d2d8-1a8a-4abf-b3a9-51e25f5bb5d4.jpg?v=1792538874"
              alt="Jessica L."
              loading="lazy"
            />
          </article>
          <article className="sb-lw-card">
            <img
              className="sb-lw-photo"
              src="https://cdn.shopify.com/s/files/1/0748/2903/7612/files/010_357b977b-ad94-4e10-8b9b-06918f593089.jpg?v=1792538879"
              alt="Jessica L."
              loading="lazy"
            />
            <div className="sb-lw-copy">
              <p className="sb-lw-quote">‘’Makes every outfit look polished right away.’’</p>
              <img
                className="sb-lw-rate"
                src="https://cdn.shopify.com/s/files/1/0795/6109/7384/files/007.svg?v=1792538875"
                alt="5 stars"
                width="64"
              />
              <p className="sb-lw-who">
                <VerifiedIcon />
                <span>Jessica L.</span>
                <b>•</b>
                <span>Teacher</span>
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

