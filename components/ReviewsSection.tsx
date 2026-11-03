import React from "react";

const StarSvg = ({ off = false }: { off?: boolean }) => (
  <svg
    className={`sbot-reviews__star ${off ? "sbot-reviews__star--off" : ""}`}
    viewBox="0 0 20 20"
    width="16"
    height="16"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="currentColor"
      d="M10 1.6l2.6 5.5 6 .7-4.4 4.1 1.2 5.9L10 14.9l-5.4 2.9 1.2-5.9L1.4 7.8l6-.7z"
    ></path>
  </svg>
);

const VerifiedSvg = () => (
  <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M10 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zm-1.2 12.3L5.3 10.3l1.3-1.3 2.2 2.2 4.6-4.6 1.3 1.3-5.9 5.9z"
    ></path>
  </svg>
);

export const ReviewsSection: React.FC = () => {
  return (
    <section
      id="shopify-section-template--26949813928209__sbot_reviews"
      className="shopify-section sbot-reviews-section"
    >
      <div
        className="sbot-reviews color-background-1 gradient section-template--26949813928209__sbot_reviews-padding"
        id="sbot-reviews-template--26949813928209__sbot_reviews"
        data-sbot-reviews=""
        data-reviews-rating="4.8"
        data-reviews-count="6"
      >
        <div className="page-width">
          <div className="sbot-reviews__head">
            <h2 className="sbot-reviews__title h2 font-bold">Customer Reviews</h2>
            <div className="sbot-reviews__summary">
              <span className="sbot-reviews__stars" role="img" aria-label="4.8 / 5">
                <StarSvg />
                <StarSvg />
                <StarSvg />
                <StarSvg />
                <StarSvg />
              </span>
              <span className="sbot-reviews__rating">4.8</span>
              <span className="sbot-reviews__count">Based on 6 reviews</span>
            </div>
          </div>

          <div className="sbot-reviews__grid">
            {/* Review 1 */}
            <article className="sbot-reviews__card">
              <div className="sbot-reviews__card-top">
                <span className="sbot-reviews__stars" role="img" aria-label="5 / 5">
                  <StarSvg />
                  <StarSvg />
                  <StarSvg />
                  <StarSvg />
                  <StarSvg />
                </span>
                <time className="sbot-reviews__date" dateTime="2026-10-16">
                  Oct 16, 2026
                </time>
              </div>
              <p className="sbot-reviews__text">
                Really happy with this purchase. The quality is better than I thought it would be for the price.
              </p>
              <footer className="sbot-reviews__meta">
                <span className="sbot-reviews__author">Ashley S.</span>
              </footer>
            </article>

            {/* Review 2 */}
            <article className="sbot-reviews__card">
              <div className="sbot-reviews__card-top">
                <span className="sbot-reviews__stars" role="img" aria-label="4 / 5">
                  <StarSvg />
                  <StarSvg />
                  <StarSvg />
                  <StarSvg />
                  <StarSvg off />
                </span>
                <time className="sbot-reviews__date" dateTime="2026-09-29">
                  Sep 29, 2026
                </time>
              </div>
              <p className="sbot-reviews__text">
                Took a little longer to ship than I hoped, but the product itself is great.
              </p>
              <footer className="sbot-reviews__meta">
                <span className="sbot-reviews__author">Emma F.</span>
                <span className="sbot-reviews__verified">
                  <VerifiedSvg />
                  Verified buyer
                </span>
              </footer>
            </article>

            {/* Review 3 */}
            <article className="sbot-reviews__card">
              <div className="sbot-reviews__card-top">
                <span className="sbot-reviews__stars" role="img" aria-label="5 / 5">
                  <StarSvg />
                  <StarSvg />
                  <StarSvg />
                  <StarSvg />
                  <StarSvg />
                </span>
                <time className="sbot-reviews__date" dateTime="2026-09-05">
                  Sep 05, 2026
                </time>
              </div>
              <p className="sbot-reviews__text">
                Delivery was quick and the packaging was neat. Good service.
              </p>
              <img
                className="sbot-reviews__photo"
                src="https://cdn.shopify.com/s/files/1/0986/8666/4977/files/6_0cea1f16-59cb-43b2-8ed5-77b56e24c9b0.png?v=1792537769&width=320"
                loading="lazy"
                width="96"
                height="96"
                alt=""
              />
              <footer className="sbot-reviews__meta">
                <span className="sbot-reviews__author">Sarah P.</span>
                <span className="sbot-reviews__verified">
                  <VerifiedSvg />
                  Verified buyer
                </span>
              </footer>
            </article>

            {/* Review 4 */}
            <article className="sbot-reviews__card">
              <div className="sbot-reviews__card-top">
                <span className="sbot-reviews__stars" role="img" aria-label="5 / 5">
                  <StarSvg />
                  <StarSvg />
                  <StarSvg />
                  <StarSvg />
                  <StarSvg />
                </span>
                <time className="sbot-reviews__date" dateTime="2026-08-09">
                  Aug 09, 2026
                </time>
              </div>
              <p className="sbot-reviews__text">
                Arrived well packaged, nothing damaged. Looks and feels premium.
              </p>
              <footer className="sbot-reviews__meta">
                <span className="sbot-reviews__author">Chris K.</span>
                <span className="sbot-reviews__verified">
                  <VerifiedSvg />
                  Verified buyer
                </span>
              </footer>
            </article>

            {/* Review 5 */}
            <article className="sbot-reviews__card">
              <div className="sbot-reviews__card-top">
                <span className="sbot-reviews__stars" role="img" aria-label="5 / 5">
                  <StarSvg />
                  <StarSvg />
                  <StarSvg />
                  <StarSvg />
                  <StarSvg />
                </span>
                <time className="sbot-reviews__date" dateTime="2026-07-28">
                  Jul 28, 2026
                </time>
              </div>
              <p className="sbot-reviews__text">
                Works great. The instructions were clear and setup took a couple of minutes.
              </p>
              <footer className="sbot-reviews__meta">
                <span className="sbot-reviews__author">Ben L.</span>
                <span className="sbot-reviews__verified">
                  <VerifiedSvg />
                  Verified buyer
                </span>
              </footer>
            </article>

            {/* Review 6 */}
            <article className="sbot-reviews__card">
              <div className="sbot-reviews__card-top">
                <span className="sbot-reviews__stars" role="img" aria-label="5 / 5">
                  <StarSvg />
                  <StarSvg />
                  <StarSvg />
                  <StarSvg />
                  <StarSvg />
                </span>
                <time className="sbot-reviews__date" dateTime="2026-07-15">
                  Jul 15, 2026
                </time>
              </div>
              <p className="sbot-reviews__text">
                Second time ordering from Curvd London. Consistent quality and fast shipping.
              </p>
              <img
                className="sbot-reviews__photo"
                src="https://cdn.shopify.com/s/files/1/0986/8666/4977/files/1_dc78fe8f-3cb5-4cdb-ade4-b100fa0e4f7b.png?v=1792537770&width=320"
                loading="lazy"
                width="96"
                height="96"
                alt=""
              />
              <footer className="sbot-reviews__meta">
                <span className="sbot-reviews__author">Emily F.</span>
              </footer>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};
