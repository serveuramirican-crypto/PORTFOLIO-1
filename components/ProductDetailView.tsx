"use client";

import React from "react";
import { RevQuotesBar } from "./RevQuotesBar";
import { MetabolaeHero } from "./MetabolaeHero/MetabolaeHero";
import { TrustSection } from "./TrustSection";
import { BleameUgcSection } from "./BleameSection/BleameUgcSection";
import { PrimalsSocialProof } from "./PrimalsSection/PrimalsSocialProof";
import { VideoReels } from "./VideoReels";
import { DetailsTabs } from "./DetailsTabs";
import { BleameCustomerReviews } from "./BleameReviews/BleameCustomerReviews";
import { WhyWeMadeThis } from "./WhyWeMadeThis";
import { Top3Reasons } from "./Top3Reasons";
import { DesignedToFlatter } from "./DesignedToFlatter";
import { LovedByWomen } from "./LovedByWomen";
import { CapriHeightGuide } from "./CapriHeightGuide";
import { OnePairEverywhere } from "./OnePairEverywhere";
import { SoComfortable } from "./SoComfortable";
import { MidPageOffer } from "./MidPageOffer";
import { ComfortPromise } from "./ComfortPromise";
import { ComparisonTable } from "./ComparisonTable";
import { SecondaryTrustBar } from "./SecondaryTrustBar";
import { MarqueeBanner } from "./MarqueeBanner";
import { FaqSection } from "./FaqSection";

export const ProductDetailView: React.FC = () => {
  return (
    <div className="w-full bg-white">
      {/* 1. Review Quotes Top Bar */}
      <RevQuotesBar />

      {/* 2. Top Product Hero - Metabolae Softgels Ceylon Cinnamon */}
      <MetabolaeHero />

      {/* 3. Interactive Tabs - after "What our customers are saying:" */}
      <DetailsTabs />

      {/* 4. Trust Badges Bar */}
      <TrustSection />

      {/* 5. Bleame UGC Social Proof ("Look At How Others Are Loving Their Bleame") */}
      <BleameUgcSection />

      {/* 6. Why We Made This Quote Banner - after BleameUgcSection */}
      <WhyWeMadeThis />

      {/* 7. Top 3 Reasons Why Women Wear It On Repeat */}
      <Top3Reasons />

      {/* 8. Primals Video Carousel & Social Proof ("JOIN MILLIONS WHO DITCHED PLASTIC FOR GOOD") */}
      <PrimalsSocialProof />

      {/* 9. Social Proof Video Reels */}
      <VideoReels />

      {/* 10. Bleame Customer Photo & Video Reviews Grid */}
      <BleameCustomerReviews />

      {/* 10. Designed to: Feel good, Look good, Fit better */}
      <DesignedToFlatter />

      {/* 11. Loved By Women Of Every Shape & Lifestyle */}
      <LovedByWomen />

      {/* 12. Universally Flattering Capri Length Guide */}
      <CapriHeightGuide />

      {/* 13. One Pair Everywhere Marquee */}
      <OnePairEverywhere />

      {/* 14. So Comfortable Work Pants */}
      <SoComfortable />

      {/* 15. Mid-page Offer Marquee */}
      <MidPageOffer />

      {/* 16. Our Comfort Promise */}
      <ComfortPromise />

      {/* 17. Comparison Table: CURVD London vs Ordinary Pants */}
      <ComparisonTable />

      {/* 17. Secondary Trust Bar */}
      <SecondaryTrustBar />

      {/* 18. Offer Marquee Banner */}
      <MarqueeBanner />

      {/* 21. Frequently Asked Questions */}
      <FaqSection />
    </div>
  );
};
