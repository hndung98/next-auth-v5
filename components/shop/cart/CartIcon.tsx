import { FiShoppingCart } from "react-icons/fi";

import { Button } from "@/components/ui/button";

export const CartIcon = ({ itemCount }: { itemCount: number }) => {
  return (
    <Button
      variant="outline"
      size="icon"
      className="relative cursor-pointer bg-transparent"
    >
      <FiShoppingCart className="w-6 h-6 text-gray-700" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
          {itemCount}
        </span>
      )}
    </Button>
  );
};
