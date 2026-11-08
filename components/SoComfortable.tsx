import React from "react";

const COMFORT_CARDS = [
  {
    photo: "https://i.imgur.com/8K5OOja.jpeg",
    alt: "Buttery-soft 4-way stretch fabric",
    shade: "/images/s/files/1/0749/6102/7139/files/002_8c0a0754-74a4-4907-83bf-7365fabeab9c.png",
    title: "Buttery-Soft 4-Way Stretch",
    desc: "Moves with your body effortlessly while staying breathable, flexible, and comfy all day long.",
  },
  {
    photo: "https://i.imgur.com/BDHnwrE.jpeg",
    alt: "Wrinkle-resistant fabric",
    shade: "/images/s/files/1/0786/3956/2806/files/004_9eae002b-f5b4-4457-bd56-c98546e84c53.png",
    title: "Wrinkle-Resistant Fabric",
    desc: "Designed to remain crease-free and neat throughout lengthy days in them.",
  },
  {
    photo: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/Y52902s3.jpg?im=Resize,width=480",
    alt: "Supportive high-rise waistband",
    shade: "/images/s/files/1/0749/6102/7139/files/002_8c0a0754-74a4-4907-83bf-7365fabeab9c.png",
    title: "Supportive High-Rise Waistband",
    desc: "Offers a snug, supportive feel that flatters your shape without ever being tight or limiting.",
  },
  {
    photo: "https://cdn.gorillareign.site/storage/v1/object/public/products/product-images/d52e69f0-c938-40a0-8667-944c4c5d6f69/1792706932892-26wspr_d1521_pnk_m04_f9a8fd94-69fd-4729--0a8e1d.jpg",
    alt: "Deep functional side pockets",
    shade: "/images/s/files/1/0749/6102/7139/files/002_8c0a0754-74a4-4907-83bf-7365fabeab9c.png",
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
