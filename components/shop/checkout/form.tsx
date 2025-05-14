"use client";

import { useRouter } from "next/navigation";

import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";

export function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const onConfirmClick = () => {
    router.push("/shop/payment");
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      {items.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {items.map((item) => (
              <li
                key={item.id}
                className="border p-4 rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <p className="text-right">
                  Price: {formatCurrency(item.quantity * item.price)}
                </p>
              </li>
            ))}
          </ul>

          <div className="text-right text-lg font-semibold mb-6">
            Total: {formatCurrency(total)}
          </div>

          <button
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            onClick={onConfirmClick}
          >
            Confirm
          </button>
        </>
      )}
    </div>
  );
}
