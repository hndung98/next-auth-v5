import { FiShoppingCart } from "react-icons/fi";

export const CartIcon = ({ itemCount }: { itemCount: number }) => {
  return (
    <div className="relative inline-block">
      <FiShoppingCart size={28} className="text-gray-700" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {itemCount}
        </span>
      )}
    </div>
  );
};
