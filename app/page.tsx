"use client";

import React, { useEffect, useState } from "react";
import { ProductDetailView } from "@/components/ProductDetailView";
import { ProductDetailView2 } from "@/components/PDP2/ProductDetailView2";

export default function HomePage() {
  const [isPort5000, setIsPort5000] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.port === "5000" || window.location.search.includes("pdp=2")) {
        setIsPort5000(true);
      }
    }
  }, []);

  if (isPort5000) {
    return <ProductDetailView2 />;
  }

  return <ProductDetailView />;
}
