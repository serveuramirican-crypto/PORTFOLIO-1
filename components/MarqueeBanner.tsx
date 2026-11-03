import React from "react";

export const MarqueeBanner: React.FC = () => {
  return (
    <section id="sb-capri-offer-bar" className="sbob" aria-label="New customer offer">
      <div className="sbob-move">
        <div className="sbob-group">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="sbob-item">
              <p className="sbob-txt">NEW CUSTOMER DEAL</p>
              <p className="sbob-pill">save up to 60%</p>
              <p className="sbob-txt">TODAY ONLY</p>
            </div>
          ))}
        </div>
        <div className="sbob-group" aria-hidden="true">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="sbob-item">
              <p className="sbob-txt">NEW CUSTOMER DEAL</p>
              <p className="sbob-pill">save up to 60%</p>
              <p className="sbob-txt">TODAY ONLY</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
