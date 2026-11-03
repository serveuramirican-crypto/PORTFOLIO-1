"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, CheckCircle2 } from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  const policyLinks = [
    { title: "Shipping Policy", href: "/policies/shipping-policy" },
    { title: "Terms of Service", href: "/policies/terms-of-service" },
    { title: "Privacy Policy", href: "/policies/privacy-policy" },
    { title: "Refund Policy", href: "/policies/refund-policy" },
    { title: "Contact Us", href: "/pages/contact" },
  ];

  return (
    <footer className="bg-[#2A3743] text-white pt-16 pb-12 border-t border-[#374756]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#3e4f5f]">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative w-40 h-8 brightness-0 invert">
              <Image
                src="/images/logo_efa23b6a-47c7-410d-b4f2-fe8aa411615e.png"
                alt="Curvd London"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-sm text-gray-300 max-w-sm leading-relaxed">
              Timeless apparel crafted with buttery-soft stretch materials for effortless all-day elegance and unrestricted comfort.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-gray-300 mb-4">
              Policies &amp; Support
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              {policyLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="hover:text-white hover:underline transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-gray-300">
              Join Our VIP Community
            </h4>
            <p className="text-sm text-gray-300">
              Subscribe to get exclusive deals, early access to new drops, and secret discounts.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 pt-1">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-[#1e2831] border border-gray-600 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-gray-400"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-white text-[#2A3743] hover:bg-gray-100 text-sm font-bold rounded-lg transition"
              >
                {subscribed ? "Joined ✓" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright & payment icons */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026, Curvd London. Powered by Shopify.</p>

          {/* Payment Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            {["VISA", "MASTERCARD", "AMEX", "APPLE PAY", "GOOGLE PAY", "PAYPAL"].map((badge) => (
              <span
                key={badge}
                className="px-2 py-1 bg-[#1e2831] border border-gray-700 rounded text-[10px] font-bold text-gray-300 tracking-wider"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

