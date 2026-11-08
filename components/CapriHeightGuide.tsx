import React from "react";

export const CapriHeightGuide: React.FC = () => {
  const features = [
    {
      icon: "/curvd_assets/height_feat_1.svg",
      title: (
        <>
          NO TAILORING
          <br />
          NEEDED
        </>
      ),
      desc: "Made to fit beautifully, whatever your height",
    },
    {
      icon: "/curvd_assets/height_feat_2.svg",
      title: (
        <>
          FLATTERING AT
          <br />
          EVERY HEIGHT
        </>
      ),
      desc: "Creates even, harmonious proportions on petite to tall frames",
    },
    {
      icon: "/curvd_assets/height_feat_3.svg",
      title: (
        <>
          ANKLE-GRAZING
          <br />
          SILHOUETTE
        </>
      ),
      desc: "The perfect cropped length for a sleek, lengthened line",
    },
    {
      icon: "/curvd_assets/height_feat_4.svg",
      title: (
        <>
          PAIRS EASILY
          <br />
          WITH ALL SHOES
        </>
      ),
      desc: "Pairs easily with ballet flats, high heels or trainers",
    },
  ];

  return (
    <section
      id="sb-capri-height"
      className="w-full bg-[#F0EEEC] py-12 sm:py-16 lg:py-20 border-t border-b border-[#E3DFDC] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12 xl:gap-16">
          {/* ================= LEFT COLUMN: Model Image ================= */}
          <div className="w-full lg:w-[45%] xl:w-[43%] flex-shrink-0 flex justify-center">
            <div className="relative w-full max-w-[480px] lg:max-w-none aspect-[3/4] rounded-2xl overflow-hidden shadow-sm bg-stone-200">
              <picture className="w-full h-full block">
                <source
                  media="(max-width: 768px)"
                  srcSet="/curvd_assets/asset_imgur.jpg"
                />
                <img
                  src="/curvd_assets/asset_next.jpg"
                  alt="Looks Good at Every Height"
                  className="w-full h-full object-cover object-top block"
                  loading="lazy"
                />
              </picture>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Content & Features ================= */}
          <div className="w-full lg:w-[55%] xl:w-[57%] flex flex-col justify-center text-center lg:text-left">
            <p className="text-[14px] sm:text-[16px] lg:text-[18px] font-medium text-[#A89180] tracking-[0.08em] uppercase mb-2">
              UNIVERSALLY FLATTERING CAPRI LENGTH
            </p>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] xl:text-[40px] font-bold text-[#4C423B] leading-[1.2] mb-3 sm:mb-4 tracking-[0.01em]">
              Looks Good at Every Height
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#252220] leading-[1.6] max-w-[660px] mx-auto lg:mx-0 mb-8 sm:mb-10">
              No matter if you&#39;re petite, tall, or somewhere between, the cut that skims the ankle delivers a neat, flattering line that seems made just for you — and needs no hemming.
            </p>

            {/* 4 Feature Columns */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 lg:gap-6 pt-2">
              {features.map((feat, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <img
                    src={feat.icon}
                    alt=""
                    width="58"
                    height="58"
                    className="w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] object-contain mb-3 sm:mb-4"
                    loading="lazy"
                  />
                  <p className="text-[12px] sm:text-[13px] font-semibold text-[#A89180] uppercase tracking-wider leading-[1.3] min-h-[34px] flex items-center justify-center">
                    {feat.title}
                  </p>
                  <div
                    style={{
                      width: "37px",
                      height: "1px",
                      backgroundColor: "#A89180",
                      marginTop: "11px",
                      marginBottom: "11px",
                    }}
                  />
                  <p className="text-[13px] sm:text-[14px] lg:text-[15px] text-[#68635D] leading-[1.35] max-w-[150px]">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
