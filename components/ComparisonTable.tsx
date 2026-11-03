import React from "react";

const CheckIconCurvd = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M8.86 17.03a8.17 8.17 0 1 0 0-16.35 8.17 8.17 0 0 0 0 16.35Z"
      fill="#FBFAF6"
    />
    <path
      d="M5.18 8.86l2.45 2.45 4.9-4.9M17.03 8.86a8.17 8.17 0 1 1-16.35 0 8.17 8.17 0 0 1 16.35 0Z"
      stroke="#AF9985"
      strokeWidth="1.37"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CrossIconOrdinary = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M8.86 17.03a8.17 8.17 0 1 0 0-16.35 8.17 8.17 0 0 0 0 16.35Z"
      fill="white"
    />
    <path
      d="M11.31 6.41l-4.9 4.9M6.41 6.41l4.9 4.9M17.03 8.86a8.17 8.17 0 1 1-16.35 0 8.17 8.17 0 0 1 16.35 0Z"
      stroke="#676363"
      strokeWidth="1.37"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ComparisonTable: React.FC = () => {
  return (
    <section id="sb-cv-why-switch">
      <div className="sbws-wrap">
        <div className="sbws-left">
          <p className="sbws-eyebrow">DISCOVER WHY</p>
          <h2 className="sbws-h2">Women Are Making The Switch</h2>
          <p className="sbws-intro">
            The everyday pant women keep coming back to, whether they’re off to work, out for brunch, or catching a flight.
          </p>
          <div className="sbws-table">
            <div className="sbws-head">
              <p className="sbws-h1c" aria-hidden="true">
                &nbsp;
              </p>
              <div className="sbws-h2c">
                <img
                  className="sbws-logo"
                  src="https://cdn.shopify.com/s/files/1/0795/6106/4616/files/001_46506fd0-4e16-493c-9585-20fdeb4b36a3.png?v=1792538929"
                  alt="CURVD London"
                  loading="lazy"
                />
                <p className="sbws-cap" aria-hidden="true">
                  &nbsp;
                </p>
              </div>
              <p className="sbws-most">most PANTS</p>
            </div>

            {/* Row 1: Comfort */}
            <div className="sbws-r sbws-first">
              <div className="sbws-c1" style={{ padding: "22px 12px 18px" }}>
                <img
                  src="https://cdn.shopify.com/s/files/1/0845/5893/8309/files/002.svg?v=1792538928"
                  alt=""
                  loading="lazy"
                  style={{ width: "30px" }}
                />
                <p className="sbws-lab">Comfort</p>
              </div>
              <div className="sbws-c2" style={{ padding: "32px 12px 29px" }}>
                <CheckIconCurvd />
                <p className="sbws-mid">All-day comfort</p>
              </div>
              <div className="sbws-c3" style={{ padding: "22px 10px 18px" }}>
                <CrossIconOrdinary />
                <p className="sbws-rt">
                  Stiff, restrictive<br />fabric
                </p>
              </div>
            </div>

            {/* Row 2: Movement */}
            <div className="sbws-r">
              <div className="sbws-c1" style={{ padding: "22px 12px 18px" }}>
                <img
                  src="https://cdn.shopify.com/s/files/1/1005/9058/4127/files/003_5f38df05-1308-4e04-83af-fc917248ef6b.svg?v=1792538928"
                  alt=""
                  loading="lazy"
                  style={{ width: "24px" }}
                />
                <p className="sbws-lab">Movement</p>
              </div>
              <div className="sbws-c2" style={{ padding: "16px 12px 26px" }}>
                <CheckIconCurvd />
                <p className="sbws-mid">Moves with you</p>
              </div>
              <div className="sbws-c3" style={{ padding: "12px 10px 10px" }}>
                <CrossIconOrdinary />
                <p className="sbws-rt">
                  Restricts<br />movement
                </p>
              </div>
            </div>

            {/* Row 3: Waistband */}
            <div className="sbws-r">
              <div className="sbws-c1" style={{ padding: "22px 12px 18px" }}>
                <img
                  src="https://cdn.shopify.com/s/files/1/1099/7281/6158/files/004.svg?v=1792538928"
                  alt=""
                  loading="lazy"
                  style={{ width: "28px" }}
                />
                <p className="sbws-lab">Waistband</p>
              </div>
              <div className="sbws-c2" style={{ padding: "13px 12px 13px" }}>
                <CheckIconCurvd />
                <p className="sbws-mid">
                  Smooth,<br />supportive fit
                </p>
              </div>
              <div className="sbws-c3" style={{ padding: "14px 10px 13px" }}>
                <CrossIconOrdinary />
                <p className="sbws-rt">
                  Digs, pinches,<br />or gaps
                </p>
              </div>
            </div>

            {/* Row 4: Pockets */}
            <div className="sbws-r">
              <div className="sbws-c1" style={{ padding: "22px 12px 18px" }}>
                <img
                  src="https://cdn.shopify.com/s/files/1/1025/9447/8378/files/005_0ae5355e-3692-425b-a8c1-7e8f55cf651c.svg?v=1792538929"
                  alt=""
                  loading="lazy"
                  style={{ width: "25px" }}
                />
                <p className="sbws-lab">Pockets</p>
              </div>
              <div className="sbws-c2" style={{ padding: "18px 12px 16px" }}>
                <CheckIconCurvd />
                <p className="sbws-mid">
                  Deep, functional<br />pockets
                </p>
              </div>
              <div className="sbws-c3" style={{ padding: "16px 10px 17px" }}>
                <CrossIconOrdinary />
                <p className="sbws-rt">
                  Tiny or<br />decorative
                </p>
              </div>
            </div>

            {/* Row 5: Look */}
            <div className="sbws-r">
              <div className="sbws-c1" style={{ padding: "22px 12px 18px 10px" }}>
                <img
                  src="https://cdn.shopify.com/s/files/1/0841/8512/0994/files/006_98ab3c45-5aba-48bb-abcf-915a546aaf3a.svg?v=1792538928"
                  alt=""
                  loading="lazy"
                  style={{ width: "34px" }}
                />
                <p className="sbws-lab">Look</p>
              </div>
              <div className="sbws-c2" style={{ padding: "24px 12px 24px" }}>
                <CheckIconCurvd />
                <p className="sbws-mid">
                  Polished +<br />comfortable
                </p>
              </div>
              <div className="sbws-c3" style={{ padding: "18px 10px 10px" }}>
                <CrossIconOrdinary />
                <p className="sbws-rt">Comfortable OR Polished - rarely both</p>
              </div>
            </div>

            {/* Row 6: Care */}
            <div className="sbws-r">
              <div className="sbws-c1" style={{ padding: "17px 12px 15px 10px" }}>
                <img
                  src="https://cdn.shopify.com/s/files/1/0775/8456/4359/files/007.svg?v=1792538935"
                  alt=""
                  loading="lazy"
                  style={{ width: "28px" }}
                />
                <p className="sbws-lab">Care</p>
              </div>
              <div className="sbws-c2" style={{ padding: "18px 12px 12px" }}>
                <CheckIconCurvd />
                <p className="sbws-mid">Wrinkle-resistant</p>
              </div>
              <div className="sbws-c3" style={{ padding: "16px 10px 22px" }}>
                <CrossIconOrdinary />
                <p className="sbws-rt">Creases easily</p>
              </div>
            </div>

            {/* Row 7: Fit */}
            <div className="sbws-r sbws-last">
              <div className="sbws-c1" style={{ padding: "22px 12px 18px 17px" }}>
                <img
                  src="https://cdn.shopify.com/s/files/1/1005/5368/7319/files/008_1623c223-65ec-496a-9711-61d9abe43c69.svg?v=1792538936"
                  alt=""
                  loading="lazy"
                  style={{ width: "22px" }}
                />
                <p className="sbws-lab">Fit</p>
              </div>
              <div className="sbws-c2" style={{ padding: "21px 12px 11px" }}>
                <CheckIconCurvd />
                <p className="sbws-mid">
                  Flattering ankle<br />crop
                </p>
              </div>
              <div className="sbws-c3" style={{ padding: "21px 10px 11px" }}>
                <CrossIconOrdinary />
                <p className="sbws-rt">Often needs tailoring</p>
              </div>
            </div>

            <div className="sbws-foot">
              <p className="sbws-h1c" aria-hidden="true">&nbsp;</p>
              <p className="sbws-capb" aria-hidden="true">&nbsp;</p>
            </div>
          </div>

          <div className="sbws-shades sbws-mob">
            <img
              src="https://cdn.shopify.com/s/files/1/0845/5893/8309/files/010.svg?v=1792538936"
              alt="Available colors"
              loading="lazy"
              className="sbws-sw"
            />
            <p className="sbws-avail">OFFERED IN 6 ELEGANT SHADES</p>
          </div>
        </div>

        <div className="sbws-right">
          <img
            className="sbws-photo"
            src="https://cdn.shopify.com/s/files/1/0822/0318/1297/files/009_afc5e689-b49c-49a2-9be2-b6d6cc2a4475.jpg?v=1792538936"
            alt="Woman wearing the capri pants"
            loading="lazy"
          />
          <div className="sbws-shades">
            <img
              src="https://cdn.shopify.com/s/files/1/0845/5893/8309/files/010.svg?v=1792538936"
              alt="Available colors"
              loading="lazy"
              className="sbws-sw"
            />
            <p className="sbws-avail">OFFERED IN 6 ELEGANT SHADES</p>
          </div>
        </div>
      </div>
    </section>
  );
};

