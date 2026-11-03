"use client";

import React from "react";
import { useCart } from "./CartContext";
import { X, Trash2, Plus, Minus, Lock, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal, totalItems } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">Your Cart</h2>
            <span className="text-xs font-medium px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">
              {totalItems}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="bg-[#FAF7F5] px-5 py-3 border-b border-[#EFE8E2]">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2C8349] mb-1.5">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>You&apos;ve unlocked FREE Worldwide Tracked Shipping!</span>
          </div>
          <div className="w-full bg-[#E8DFD7] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#2C8349] h-full w-full rounded-full transition-all duration-500" />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <p className="text-gray-500 text-sm mb-4">Your shopping bag is empty</p>
              <button
                onClick={closeCart}
                className="px-6 py-2.5 bg-[#2A3743] text-white text-sm font-semibold rounded-md hover:bg-gray-800 transition"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="flex gap-4 p-3 border border-gray-100 rounded-lg bg-gray-50/50"
              >
                <div className="relative w-20 h-24 rounded-md overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium text-gray-900 leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 p-0.5 ml-1 transition"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {(item.color || item.size) && (
                      <p className="text-xs text-gray-500 mt-1">
                        {item.color} {item.size && `• Size ${item.size}`}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-gray-200 rounded bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-[#FAF7F5] space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-base font-bold text-gray-900">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-500">Taxes and shipping calculated at checkout</p>
            <button
              onClick={() => alert("Proceeding to secure checkout...")}
              className="w-full py-3.5 bg-[#2A3743] hover:bg-[#1f2933] text-white font-bold rounded-lg flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99]"
            >
              <Lock className="w-4 h-4" />
              <span>Checkout • ${subtotal.toFixed(2)}</span>
            </button>
            <p className="text-[11px] text-center text-gray-500 flex items-center justify-center gap-1">
              <span>🔒 256-bit SSL encrypted checkout</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

