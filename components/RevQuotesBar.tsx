import React from "react";

const StarIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="#fff"
    className="inline-block"
  >
    <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7-6.2-3.8-6.2 3.8 1.6-7L2 9.5l7.1-.6z" />
  </svg>
);

export const RevQuotesBar: React.FC = () => {
  return (
    <div id="shopify-section-template--26949813928209__sb_rev_quotes" className="shopify-section">
      <div className="section-background"></div>
      <div
        className="section section--full-width spacing-style"
        style={{
          paddingBlockStart: 0,
          paddingBlockEnd: 0,
          paddingInlineStart: 0,
          paddingInlineEnd: 0,
        }}
      >
        <div className="sbot-cl">
          <div className="sbrq">
            <div className="sbrq__w">
              <div className="sbrq__i">
                <p className="sbrq__s">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />{" "}
                  <em>‘’I haven&#39;t touched my jeans since.’’</em>
                </p>
                <p className="sbrq__a">● Amanda L., Boston</p>
              </div>
              <div className="sbrq__i">
                <p className="sbrq__s">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />{" "}
                  <em>‘’The breezy alternative to shorts’’</em>
                </p>
                <p className="sbrq__a">● Jennie L., Chicago</p>
              </div>
              <div className="sbrq__i">
                <p className="sbrq__s">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />{" "}
                  <em>‘’The comfiest work pants I&#39;ve owned.’’</em>
                </p>
                <p className="sbrq__a">● Beatrice D., Las Vegas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

