"use client";

import Link from "next/link";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/lib/utils";
import { CartItemType } from "@/types/product";

type CartToggleProps = {
  cartItems: CartItemType[];
  onRemoveItem?: (id: string) => void;
};

export default function CartToggle({
  cartItems,
  onRemoveItem,
}: CartToggleProps) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative cursor-pointer bg-transparent"
        >
          <FiShoppingCart className="w-6 h-6 text-gray-700 my-dark-style" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 bg-gray-200 my-dark-style">
        {cartItems.length === 0 ? (
          <DropdownMenuItem disabled>No product</DropdownMenuItem>
        ) : (
          <>
            {cartItems.map((item) => (
              <DropdownMenuItem
                key={item.id}
                className="flex justify-between items-center gap-2"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.quantity} × {formatCurrency(item.price)}
                  </span>
                </div>
                {onRemoveItem && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveItem(item.id);
                    }}
                    title="Remove"
                    className="cursor-pointer"
                  >
                    <FiTrash2 className="w-6 h-6 text-red-500" />
                  </button>
                )}
              </DropdownMenuItem>
            ))}
            <div className="px-3 py-2 border-t text-sm font-semibold flex justify-between items-center">
              <span>Total:</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
            <div className="px-3 pb-3 pt-1">
              <Link href="/shop/orders">
                <Button variant="link" className="w-full cursor-pointer">
                  Go to orders page
                </Button>
              </Link>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
