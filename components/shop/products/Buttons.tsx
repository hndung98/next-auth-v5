"use client";

import { useFormStatus } from "react-dom";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import { CartItemType } from "@/types/product";

export function AddButton({
  disabled,
  cartItem,
}: {
  disabled?: boolean;
  cartItem: CartItemType;
}) {
  const { pending } = useFormStatus();
  const isButtonDisabled = disabled || pending;

  const addItem = useCartStore((state) => state.addItem);

  return (
    <Button
      type="submit"
      aria-disabled={isButtonDisabled}
      aria-busy={pending}
      onClick={(e) => {
        if (isButtonDisabled) e.preventDefault();
        addItem(cartItem);
      }}
      className="cursor-pointer h-12 items-center rounded-md bg-neutral-900 px-6 py-3 text-base font-medium leading-6 text-white shadow hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70 hover:disabled:bg-neutral-700 aria-disabled:cursor-not-allowed aria-disabled:opacity-70 hover:aria-disabled:bg-neutral-700"
    >
      {pending ? (
        <div className="inline-flex items-center">
          <svg
            className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Processing...</span>
        </div>
      ) : (
        <span>Add to cart</span>
      )}
    </Button>
  );
}

export function FavoriteButton({
  pid,
  isLiked,
  action,
}: {
  pid: string;
  isLiked?: boolean;
  action: (id: string) => void;
}) {
  return (
    <Button
      variant="outline"
      className="cursor-pointer"
      onClick={() => {
        action(pid);
      }}
    >
      {isLiked && <MdFavorite className="w-6 h-6" />}
      {!isLiked && <MdFavoriteBorder className="w-6 h-6" />}
    </Button>
  );
}
