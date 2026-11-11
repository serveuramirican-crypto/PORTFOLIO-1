import React from "react";

const VerifiedIcon = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
    <circle cx="8" cy="8" r="7.25" fill="none" stroke="currentColor" strokeWidth="1" />
    <path d="M5 8.2l2 2 4-4.2" fill="none" stroke="currentColor" strokeWidth="1.1" />
  </svg>
);

export const LovedByWomen2: React.FC = () => {
  return (
    <section id="sb-loved-by-women">
      <div className="sb-lw-grid">
        <div className="sb-lw-left">
          <img
            className="sb-lw-stars"
            src="/images/s/files/1/0779/6903/1342/files/001.svg"
            alt="5 stars"
            width="103"
          />
          <p className="sb-lw-kicker">LOVED BY WOMEN OF</p>
          <h2 className="sb-lw-title">Every Shape &amp; Lifestyle</h2>
          <p className="sb-lw-text">
            Our luxury pyjama set was designed to drape effortlessly over your body&#39;s natural contours while keeping you perfectly breezy, elegant, and completely at ease.
          </p>
          <ul className="sb-lw-feats">
            <li>
              <img
                src="/images/s/files/1/0917/4633/6802/files/002_63975983-5e93-48bb-bc05-c16051dab76a.svg"
                alt=""
                style={{ width: "23px" }}
              />
              <span>PETITE<br />FRIENDLY</span>
            </li>
            <li>
              <img
                src="/images/s/files/1/1013/6675/9699/files/003.svg"
                alt=""
                style={{ width: "36px" }}
              />
              <span>FLATTERS<br />EVERY SHAPE</span>
            </li>
            <li>
              <img
                src="/images/s/files/1/0845/5893/8309/files/004.svg"
                alt=""
                style={{ width: "42px" }}
              />
              <span>OFFICE<br />APPROVED</span>
            </li>
            <li>
              <img
                src="/images/s/files/1/0862/1595/0561/files/005.svg"
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
              src="/curvd_assets/pdp2/cYZLNDj.jpg"
              alt="Sarah R."
              loading="lazy"
            />
            <div className="sb-lw-copy">
              <p className="sb-lw-quote">‘’At last, luxury pyjamas that feel like pure silk.’’</p>
              <img
                className="sb-lw-rate"
                src="/images/s/files/1/0795/6109/7384/files/007.svg"
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
              src="/curvd_assets/pdp2/flY5KEn.jpg"
              alt="Jessica L."
              loading="lazy"
            />
            <div className="sb-lw-copy">
              <p className="sb-lw-quote">‘’Ideal for weekend getaways and morning coffee.’’</p>
              <img
                className="sb-lw-rate"
                src="/images/s/files/1/0795/6109/7384/files/007.svg"
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
              <p className="sb-lw-quote sb-lw-narrow">‘’The most flattering cut I&#39;ve ever worn.’’</p>
              <img
                className="sb-lw-rate"
                src="/images/s/files/1/0795/6109/7384/files/007.svg"
                alt="5 stars"
                width="64"
              />
              <p className="sb-lw-who">
                <VerifiedIcon />
                <span>Camilla K.</span>
                <b>•</b>
                <span>Designer</span>
              </p>
            </div>
            <img
              className="sb-lw-photo sb-lw-photo-sm"
              src="/curvd_assets/pdp2/kD8xFri.jpg"
              alt="Camilla K."
              loading="lazy"
            />
          </article>
          <article className="sb-lw-card">
            <img
              className="sb-lw-photo"
              src="/curvd_assets/pdp2/hero_3.jpg"
              alt="Elena D."
              loading="lazy"
            />
            <div className="sb-lw-copy">
              <p className="sb-lw-quote">‘’Makes every morning feel like a 5-star hotel.’’</p>
              <img
                className="sb-lw-rate"
                src="/images/s/files/1/0795/6109/7384/files/007.svg"
                alt="5 stars"
                width="64"
              />
              <p className="sb-lw-who">
                <VerifiedIcon />
                <span>Elena D.</span>
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

