import React from "react";

export const DesignedToFlatter: React.FC = () => {
  return (
    <section id="sb-designed-to">
      <picture className="sb-dt-bg">
        <source
          media="(max-width: 749px)"
          srcSet="https://cdn.shopify.com/s/files/1/0841/7722/3906/files/005_bc29750c-9ed2-478e-abab-abf4f869101f.jpg?v=1792538860"
        />
        <img
          src="https://cdn.shopify.com/s/files/1/0841/7722/3906/files/005_bc29750c-9ed2-478e-abab-abf4f869101f.jpg?v=1792538860"
          alt="Designed to Flatter"
          loading="lazy"
        />
      </picture>
      <div className="sb-dt-inner">
        <img
          className="sb-dt-kicker"
          src="/images/s/files/1/1036/5606/3255/files/001.svg"
          alt="Designed to:"
        />
        <ul className="sb-dt-row">
          <li className="sb-dt-a">
            <img
              src="/images/s/files/1/0763/3030/3649/files/002_3ddd4748-8566-40ed-bcbe-bbb4a3e5b433.svg"
              alt="Feel good"
            />
          </li>
          <li className="sb-dt-b">
            <img
              src="/images/s/files/1/0848/4316/7997/files/003.svg"
              alt="Look good"
            />
          </li>
          <li className="sb-dt-c">
            <img
              src="/images/s/files/1/0795/6109/7384/files/004.svg"
              alt="Fit better"
            />
          </li>
        </ul>
      </div>
    </section>
  );
};
