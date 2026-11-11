"use client";

import React from "react";
import { RevQuotesBar } from "../RevQuotesBar";
import { PoloHero2 } from "./PoloHero2";
import { DetailsTabs } from "../DetailsTabs";
import { TrustSection } from "../TrustSection";
import { BleameUgcSection } from "../BleameSection/BleameUgcSection";
import { WhyWeMadeThis } from "../WhyWeMadeThis";
import { Top3Reasons2 } from "./Top3Reasons2";
import { BleameCustomerReviews } from "../BleameReviews/BleameCustomerReviews";
import { DesignedToFlatter } from "../DesignedToFlatter";
import { LovedByWomen2 } from "./LovedByWomen2";
import { CapriHeightGuide } from "../CapriHeightGuide";
import { OnePairEverywhere } from "../OnePairEverywhere";
import { SoComfortable2 } from "./SoComfortable2";
import { MidPageOffer } from "../MidPageOffer";
import { ComfortPromise } from "../ComfortPromise";
import { ComparisonTable } from "../ComparisonTable";
import { SecondaryTrustBar } from "../SecondaryTrustBar";
import { MarqueeBanner } from "../MarqueeBanner";
import { FaqSection } from "../FaqSection";

export const ProductDetailView2: React.FC = () => {
  return (
    <div className="w-full bg-white">
      {/* 1. Review Quotes Top Bar */}
      <RevQuotesBar />

      {/* 2. Top Product Hero - Desmond & Dempsey Pyjama Set */}
      <PoloHero2 />

      {/* 3. Interactive Tabs */}
      <DetailsTabs />

      {/* 4. Trust Badges Bar */}
      <TrustSection />

      {/* 5. Bleame UGC Social Proof */}
      <BleameUgcSection />

      {/* 6. Why We Made This Quote Banner */}
      <WhyWeMadeThis />

      {/* 7. Top 3 Reasons Why Women Wear It On Repeat */}
      <Top3Reasons2 />

      {/* 8. Customer Photo & Video Reviews Grid */}
      <BleameCustomerReviews />

      {/* 9. Designed to: Feel good, Look good, Fit better */}
      <DesignedToFlatter />

      {/* 10. Loved By Women Of Every Shape & Lifestyle */}
      <LovedByWomen2 />

      {/* 11. Capri / Height Length Guide */}
      <CapriHeightGuide />

      {/* 12. One Pair Everywhere Marquee */}
      <OnePairEverywhere />

      {/* 13. So Comfortable */}
      <SoComfortable2 />

      {/* 14. Mid-page Offer Marquee */}
      <MidPageOffer />

      {/* 15. Our Comfort Promise */}
      <ComfortPromise />

      {/* 16. Comparison Table */}
      <ComparisonTable />

      {/* 17. Secondary Trust Bar */}
      <SecondaryTrustBar />

      {/* 18. Offer Marquee Banner */}
      <MarqueeBanner />

      {/* 19. Frequently Asked Questions */}
      <FaqSection />
    </div>
  );
};

