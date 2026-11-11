import React from "react";

const COMFORT_CARDS = [
  {
    photo: "/curvd_assets/pdp2/EUchV7A.jpg",
    alt: "Breathable lightweight luxury fabric",
    shade: "/images/s/files/1/0749/6102/7139/files/002_8c0a0754-74a4-4907-83bf-7365fabeab9c.png",
    title: "Buttery-Soft Organic Cotton",
    desc: "Moves with your body effortlessly while staying breathable, airy, and velvety soft all day long.",
  },
  {
    photo: "/curvd_assets/pdp2/nihKxOE.jpg",
    alt: "Crease-resistant luxury finish",
    shade: "/images/s/files/1/0786/3956/2806/files/004_9eae002b-f5b4-4457-bd56-c98546e84c53.png",
    title: "Wrinkle-Resistant Luxury Finish",
    desc: "Crafted to remain effortlessly crisp, vibrant, and neat from bed to lounging around.",
  },
  {
    photo: "/curvd_assets/pdp2/bCAFICI.jpg",
    alt: "Tailored relaxed silhouette",
    shade: "/images/s/files/1/0749/6102/7139/files/002_8c0a0754-74a4-4907-83bf-7365fabeab9c.png",
    title: "Comfortable Elastic Waistband",
    desc: "Gentle stretch that flatters your silhouette without digging in or pinching.",
  },
  {
    photo: "/curvd_assets/pdp2/cYZLNDj.jpg",
    alt: "Deep functional pockets",
    shade: "/images/s/files/1/0749/6102/7139/files/002_8c0a0754-74a4-4907-83bf-7365fabeab9c.png",
    title: "Deep Functional Pockets",
    desc: "Keep your phone, sleep mask, and essentials close by with elegant, seamless pockets.",
  },
];

export const SoComfortable2: React.FC = () => {
  return (
    <section id="sb-capri-comfort">
      <div className="sbcc-wrap">
        <p className="sbcc-kicker">SO COMFORTABLE</p>
        <h2 className="sbcc-title">You Won’t Believe These Are Work Pants.</h2>
        <div className="sbcc-grid">
          {COMFORT_CARDS.map((card, idx) => (
            <article key={idx} className="sbcc-card">
              <img
                className="sbcc-photo"
                src={card.photo}
                alt={card.alt}
                loading="lazy"
                width="562"
                height="784"
              />
              <img
                className="sbcc-shade"
                src={card.shade}
                alt=""
                loading="lazy"
                width="562"
                height="322"
              />
              <div className="sbcc-copy">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

