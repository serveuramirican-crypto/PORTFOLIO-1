import type { Metadata } from "next";
import "./globals.css";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import { CartDrawer } from "@/components/CartDrawer";
import { StickyMobileAtc } from "@/components/StickyMobileAtc";

export const metadata: Metadata = {
  title: "Everyday Stretch Capri | High Rise & All-Day Comfort – Curvd London",
  description:
    "These flattering capri pants have the stretch and softness of your go-to yoga leggings. Dress them up as a sleek cropped trouser, yet stay comfortable and move with ease from morning to night.",
  openGraph: {
    title: "Everyday Stretch Capri | High Rise & All-Day Comfort – Curvd London",
    description:
      "These flattering capri pants have the stretch and softness of your go-to yoga leggings. Dress them up as a sleek cropped trouser.",
    images: ["/assets/images/Desmond-and-Dempsey-Long-Pyjama-Set-The-Jag-Print-Cream-Cutout.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased text-[#252220] bg-white">
        <CartProvider>
          <AnnouncementBar />
          <Header />
          {children}
          <Footer />
          <CartDrawer />
          <StickyMobileAtc />
        </CartProvider>
      </body>
    </html>
  );
}

