"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/components/CartContext";

export const PoloGetTheLook: React.FC = () => {
  const { addItem, openCart } = useCart();
  const [addedProduct, setAddedProduct] = useState<string | null>(null);

  const products = [
    {
      id: "gtl-joggers",
      name: "Crest Straight Leg Joggers",
      color: "Black",
      price: 44,
      image: "/gorilla_assets/gorilla_img_9.jpg",
    },
    {
      id: "gtl-tshirt",
      name: "Power T-Shirt",
      color: "Lifestyle Brown",
      price: 36,
      image: "/gorilla_assets/gorilla_img_10.jpg",
    },
  ];

  const handleQuickAdd = (product: (typeof products)[0]) => {
    addItem({
      id: product.id,
      title: product.name,
      variantTitle: `${product.color} / M`,
      price: product.price,
      image: product.image,
      color: product.color,
      size: "M",
      quantity: 1,
    });
    setAddedProduct(product.id);
    setTimeout(() => setAddedProduct(null), 2500);
    openCart();
  };

  return (
    <div className="border border-neutral-200 rounded-md p-4 bg-white mt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-baseline gap-2">
          <span className="font-black text-sm uppercase tracking-wide text-neutral-900">
            Get The Look
          </span>
          <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
            2 Products
          </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-neutral-400"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-2 gap-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="group flex flex-col gap-2 rounded bg-neutral-50/70 p-2.5 border border-neutral-100 hover:border-neutral-300 transition-all cursor-pointer"
          >
            <div className="aspect-[3/4] rounded overflow-hidden bg-neutral-200 relative">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="180px"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuickAdd(product);
                }}
                className={`absolute bottom-2 right-2 w-7 h-7 rounded-full shadow-md flex items-center justify-center transition-colors cursor-pointer ${
                  addedProduct === product.id
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-black hover:bg-black hover:text-white"
                }`}
                aria-label={`Quick add ${product.name}`}
              >
                {addedProduct === product.id ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                )}
              </button>
            </div>

            <div>
              <h5 className="font-bold text-xs text-neutral-900 line-clamp-1">
                {product.name}
              </h5>
              <div className="flex items-center justify-between mt-0.5 text-xs">
                <span className="text-neutral-500">{product.color}</span>
                <span className="font-extrabold text-neutral-900">
                  ${product.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
