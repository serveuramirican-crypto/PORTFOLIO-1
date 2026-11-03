import React from "react";

const COMFORT_CARDS = [
  {
    photo: "https://cdn.shopify.com/s/files/1/0769/7314/6282/files/001_991f1ac9-6437-4f0a-b9a1-80308dab3177.jpg?v=1792538909",
    alt: "Buttery-soft 4-way stretch fabric",
    shade: "https://cdn.shopify.com/s/files/1/0749/6102/7139/files/002_8c0a0754-74a4-4907-83bf-7365fabeab9c.png?v=1792538908",
    title: "Buttery-Soft 4-Way Stretch",
    desc: "Moves with your body effortlessly while staying breathable, flexible, and comfy all day long.",
  },
  {
    photo: "https://cdn.shopify.com/s/files/1/0763/3036/9185/files/003_fc59dfd4-091f-4763-a5fd-17348a171db1.jpg?v=1792538909",
    alt: "Wrinkle-resistant fabric",
    shade: "https://cdn.shopify.com/s/files/1/0786/3956/2806/files/004_9eae002b-f5b4-4457-bd56-c98546e84c53.png?v=1792538908",
    title: "Wrinkle-Resistant Fabric",
    desc: "Designed to remain crease-free and neat throughout lengthy days in them.",
  },
  {
    photo: "https://cdn.shopify.com/s/files/1/0788/4131/5520/files/005_31480dcc-aba8-48b8-9c00-1bac7dcfe3c7.jpg?v=1792538909",
    alt: "Supportive high-rise waistband",
    shade: "https://cdn.shopify.com/s/files/1/0749/6102/7139/files/002_8c0a0754-74a4-4907-83bf-7365fabeab9c.png?v=1792538908",
    title: "Supportive High-Rise Waistband",
    desc: "Offers a snug, supportive feel that flatters your shape without ever being tight or limiting.",
  },
  {
    photo: "https://cdn.shopify.com/s/files/1/0775/8456/4359/files/006_62197497-fb21-4975-9e1b-475b3097785d.jpg?v=1792538908",
    alt: "Deep functional side pockets",
    shade: "https://cdn.shopify.com/s/files/1/0749/6102/7139/files/002_8c0a0754-74a4-4907-83bf-7365fabeab9c.png?v=1792538908",
    title: "Deep Functional Side Pockets",
    desc: "Carry your phone, keys and daily necessities easily, with no added bulk and no sacrifice in looks.",
  },
];

export const SoComfortable: React.FC = () => {
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

