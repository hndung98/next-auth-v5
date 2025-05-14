"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";

export function PaymentForm() {
  const { items, clear } = useCartStore();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert("payment successful!");
    clear();
    router.push("/shop");
  };

  if (items.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Nothing to do payment.</h1>
      </div>
    );
  }

  return (
    <div className="max-w-screen-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Confirm payment</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border rounded p-4">
          <h2 className="font-semibold mb-2">Products</h2>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatCurrency(item.quantity * item.price)} </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border rounded p-4">
          <h2 className="font-semibold mb-2">Payment Method</h2>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            <span>COD</span>
          </label>
          <label className="flex items-center space-x-2 mt-2">
            <input
              type="radio"
              name="paymentMethod"
              value="bank"
              checked={paymentMethod === "bank"}
              onChange={() => setPaymentMethod("bank")}
            />
            <span>Bank</span>
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Confirm
        </button>
      </form>
    </div>
  );
}
