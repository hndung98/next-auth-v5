import { ShoppingBagIcon } from "lucide-react";
import clsx from "clsx";
import { LinkWithChannel } from "../../products/LinkWithChannel";

export const CartNavItem = async ({ channel }: { channel: string }) => {
  const lineCount = 3;

  return (
    <LinkWithChannel
      href="/cart"
      className="relative flex items-center"
      data-testid="CartNavItem"
    >
      <ShoppingBagIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
      {lineCount > 0 ? (
        <div
          className={clsx(
            "absolute bottom-0 right-0 -mb-2 -mr-2 flex h-4 flex-col items-center justify-center rounded bg-neutral-900 text-xs font-medium text-white",
            lineCount > 9 ? "w-[3ch]" : "w-[2ch]"
          )}
        >
          {lineCount}{" "}
          <span className="sr-only">
            item{lineCount > 1 ? "s" : ""} in cart, view bag
          </span>
        </div>
      ) : (
        <span className="sr-only">0 items in cart</span>
      )}
    </LinkWithChannel>
  );
};
