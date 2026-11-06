"use client";

import React, { useState } from "react";

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

const FAQS: FaqItem[] = [
  {
    question: "How are these unlike ordinary PANTS?",
    answer: (
      <p>
        Rather than stiff, confining office trousers, these are made from an ultra-smooth{" "}
        <span className="sbfq-nw">4-way</span> stretchy material that flexes with your body and still
        delivers a sleek, pulled-together appearance.
      </p>
    ),
  },
  {
    question: "Is the comfort good enough for a full day of wear?",
    answer: (
      <p>
        Absolutely. The lightweight stretch material, supportive waistband and easy wide-leg cut are
        designed for all-day ease, whether it&#39;s morning meetings or dinner plans later on.
      </p>
    ),
  },
  {
    question: "Which heights were these made for?",
    answer: (
      <>
        <p>The cut that skims the ankle was intentionally shaped to suit a wide spread of heights.</p>
        <p>Around 5’2”: Lands a touch above the ankle</p>
        <p>Around 5’5”: Reaches the ankle</p>
        <p>Around 5’8” and taller: Gives a stylish cropped effect</p>
      </>
    ),
  },
  {
    question: "Is there a longer-length option?",
    answer: (
      <>
        <p>
          Yes. Should you adore the ease and fit of our cropped wide-leg trousers but prefer slightly
          longer coverage, we also offer a Full-Length Wide Leg Trouser featuring the identical
          buttery-soft stretch material, supportive waistband, deep pockets and sleek shape.
        </p>
        <p className="sbfq-gap">→ Browse The Full-Length Version</p>
      </>
    ),
  },
];

export const FaqSection: React.FC = () => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="sb-capri-faq" className="sbfq">
      <picture className="sbfq-bg">
        <source
          media="(max-width: 749px)"
          srcSet="/assets/images/260819_D_D_SHOT_126_7662.webp"
        />
        <img
          src="/assets/images/260819_D_D_SHOT_126_7662.webp"
          alt="Frequently Asked Questions background"
          loading="lazy"
        />
      </picture>
      <div className="sbfq-inner">
        <div className="sbfq-col">
          <div className="mb-4">
            <h2 className="sbfq-title bg-white/85 backdrop-blur-xs px-6 py-2 rounded-xl inline-block shadow-2xs border border-stone-200/40">
              frequently asked questions
            </h2>
          </div>
          <div className="sbfq-list" data-sbfq-list="">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndexes.includes(idx);
              return (
                <div key={idx} className={`sbfq-item ${isOpen ? "is-open" : ""}`}>
                  <button
                    type="button"
                    className="sbfq-head"
                    aria-expanded={isOpen}
                    onClick={() => toggleIndex(idx)}
                  >
                    <span className="sbfq-icon" aria-hidden="true">
                      <svg viewBox="0 0 26 26" width="26" height="26">
                        <circle
                          cx="13"
                          cy="13"
                          r="12.4"
                          fill="#fff"
                          stroke="#704F30"
                          strokeWidth="0.45"
                        ></circle>
                        <path
                          className="sbfq-h"
                          d="M8.2 13h9.6"
                          stroke="#704F30"
                          strokeWidth="1.3"
                        ></path>
                        <path
                          className="sbfq-v"
                          d="M13 8.2v9.6"
                          stroke="#704F30"
                          strokeWidth="1.3"
                        ></path>
                      </svg>
                    </span>
                    <span className="sbfq-q">{faq.question}</span>
                  </button>
                  <div className="sbfq-panel">
                    <div className="sbfq-body">{faq.answer}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
