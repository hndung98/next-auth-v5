import Link from "next/link";

import { LinkWithChannel } from "@/components/shop/products/LinkWithChannel";
import { ProductImageWrapper } from "@/components/shop/products/ProductImageWrapper";
import { formatCurrency } from "@/lib/utils";

export type ProductElementType = {
  id: string;
  slug: string;
  name: string;
  image: string[];
  price: number;
  thumbnail: {
    url: string;
    alt: string;
  };
  category: string;
  description: string[];
  options: string[];
};

export function ProductElement({
  product,
  loading,
  priority,
}: { product: ProductElementType } & {
  loading: "eager" | "lazy";
  priority?: boolean;
}) {
  return (
    <li data-testid="ProductElement">
      <LinkWithChannel href={`/shop/products/${product.slug}`} key={product.id}>
        <div>
          {product?.thumbnail?.url && (
            <ProductImageWrapper
              loading={loading}
              src={product.thumbnail.url}
              alt={product.thumbnail.alt ?? ""}
              width={512}
              height={512}
              sizes={"512px"}
              priority={priority}
            />
          )}
          <div className="mt-2 flex justify-between">
            <div>
              <h3 className="mt-1 text-sm font-semibold text-neutral-900 my-dark-style">
                {product.name}
              </h3>
              <p
                className="mt-1 text-sm text-neutral-500 dark:text-gray-300"
                data-testid="ProductElement_Category"
              >
                {product.category}
              </p>
            </div>
            <p
              className="mt-1 text-sm font-medium text-neutral-900 my-dark-style"
              data-testid="ProductElement_PriceRange"
            >
              {formatCurrency(product.price)}
            </p>
          </div>
        </div>
      </LinkWithChannel>
      <div className="mt-2">
        <Link href={"/test"}> View</Link>
      </div>
    </li>
  );
}
