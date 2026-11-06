"use client";

import React, { useState } from "react";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export const MetabolaeAccordions: React.FC = () => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const items: AccordionItem[] = [
    {
      id: "benefits",
      title: "Clinically Supported Benefits",
      content: (
        <div className="space-y-2.5 text-stone-700 text-xs sm:text-sm leading-relaxed">
          <ul className="space-y-2 list-disc pl-5">
            <li>Supported by clinical studies on true Ceylon cinnamon (<em>Cinnamomum verum</em>)</li>
            <li>Helps maintain blood sugar levels that are already in a healthy range</li>
            <li>Promotes insulin sensitivity and efficient cellular use of glucose</li>
            <li>Encourages healthy cardiovascular circulation and everyday metabolic function</li>
            <li>Delivers potent antioxidant activity to shield cells from oxidative damage</li>
            <li>A mild, well-tolerated extract designed for consistent, long-term daily use</li>
            <li>Virtually coumarin-free Ceylon cinnamon — a critical distinction from common toxic Cassia</li>
          </ul>
          <p className="text-[11px] text-stone-500 pt-2 border-t border-stone-100 italic">
            *Findings drawn from clinical and observational research on genuine Ceylon cinnamon, used regularly alongside a healthy lifestyle. Individual results may vary.
          </p>
        </div>
      ),
    },
    {
      id: "ingredients",
      title: "Key ingredients",
      content: (
        <div className="space-y-3 text-stone-700 text-xs sm:text-sm leading-relaxed">
          <div className="border-b border-stone-100 pb-2.5">
            <h4 className="font-semibold text-stone-900 text-sm mb-1">
              🌿 True Ceylon Cinnamon Extract (Cinnamomum verum)
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-stone-600">
              <li>Authentically grown in Sri Lanka — never cheap, liver-toxic Cassia</li>
              <li>Potent 12:1 concentrated liquid extract</li>
              <li>Every softgel provides the equivalent of 7,200 mg of raw Ceylon cinnamon</li>
              <li>Naturally coumarin-free and safe for daily, continuous long-term use</li>
              <li>Promotes healthy glucose metabolism and steady daily vitality</li>
            </ul>
          </div>
          <div className="border-b border-stone-100 pb-2.5">
            <h4 className="font-semibold text-stone-900 text-sm mb-1">
              🥥 MCT Oil (Medium-Chain Triglycerides)
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-stone-600">
              <li>Natural lipid carrier designed to maximize nutrient bioavailability</li>
              <li>Cinnamon active bio-compounds are fat-soluble — MCT ensures rapid bloodstream uptake</li>
              <li>Prevents active compounds from passing through your digestive system unabsorbed</li>
              <li>Gentle on sensitive stomachs with zero gastrointestinal irritation</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-stone-900 text-sm mb-1">
              ✨ Softgel Delivery System
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-stone-600">
              <li>Smooth, easy-to-swallow softgels</li>
              <li>No chalky powders, bitter aftertaste, or throat irritation</li>
              <li>Convenient single daily softgel dosing</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "how-it-works",
      title: "How it works",
      content: (
        <div className="space-y-2.5 text-stone-700 text-xs sm:text-sm leading-relaxed">
          <p>
            Most ordinary cinnamon supplements fail because they rely on cheap dry Cassia bark powder pressed into hard capsules that are difficult for your stomach to break down. The active compounds get trapped in cellulose fiber and pass right through your digestive tract largely unused.
          </p>
          <p>
            <strong>Metabolae takes a completely different approach:</strong> We start with genuine Ceylon cinnamon from Sri Lanka, concentrate it 12-to-1 into a smooth liquid extract, then infuse it with organic MCT oil inside easy-to-swallow softgels.
          </p>
          <p>
            Once the softgel dissolves, the active cinnamaldehyde and polyphenols are already suspended in lipid carriers, allowing your body to absorb them immediately into the bloodstream.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-stone-600 font-medium">
            <li>No rough dry powders</li>
            <li>No cinnamon reflux or heartburn hours later</li>
            <li>Zero wasted active compounds</li>
          </ul>
          <p className="text-stone-600">
            A single softgel each day delivers the potency equivalent of 7,200 mg of raw Ceylon cinnamon — delivering genuine therapeutic-grade metabolic support.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full flex flex-col gap-2.5 my-2">
      {items.map((item) => {
        const isOpen = !!openItems[item.id];
        return (
          <div
            key={item.id}
            className="border border-stone-200/90 rounded-lg overflow-hidden bg-white shadow-xs transition-colors"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-stone-50/70 transition cursor-pointer"
            >
              <span className="font-semibold text-stone-900 text-sm sm:text-base">
                {item.title}
              </span>
              <span className="w-5 h-5 flex items-center justify-center text-stone-500 font-light text-xl leading-none">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 pt-1 bg-[#fffdfa] border-t border-stone-100">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

