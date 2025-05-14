"use client";

import { FaRegStar } from "react-icons/fa";

import { FavoriteButton } from "@/components/shop/products/Buttons";
import { LinkWithChannel } from "@/components/shop/products/LinkWithChannel";
import { ProductImageWrapper } from "@/components/shop/products/ProductImageWrapper";
import { formatCurrency } from "@/lib/utils";
import { useFavoriteProducts } from "@/stores/fav-products";
import { ProductElementType } from "@/types/product";

export function ProductElement({
  product,
  loading,
  priority,
}: { product: ProductElementType } & {
  loading: "eager" | "lazy";
  priority?: boolean;
}) {
  const favIdList = useFavoriteProducts((state) => state.pidList);
  const addFavoriteProduct = useFavoriteProducts((state) => state.addProductId);
  const removeFavoriteProduct = useFavoriteProducts(
    (state) => state.removeProductId
  );
  const isLiked = favIdList.includes(product.id);
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
              <h6
                className="mt-1 text-sm text-neutral-500 text-left dark:text-gray-300"
                data-testid="ProductElement_Category"
              >
                {"#" + product.category}
              </h6>
            </div>
            <div>
              <span className="flex items-center gap-1">
                <FaRegStar />
                <p>{product.averageRating}</p>
              </span>
              <p
                className="mt-1 text-sm font-medium text-neutral-900 my-dark-style"
                data-testid="ProductElement_PriceRange"
              >
                {formatCurrency(product.price)}
              </p>
            </div>
          </div>
        </div>
      </LinkWithChannel>
      <div className="mt-1 gap-2 flex items-center justify-end">
        {isLiked && (
          <FavoriteButton
            pid={product.id}
            action={removeFavoriteProduct}
            isLiked
          />
        )}
        {!isLiked && (
          <FavoriteButton pid={product.id} action={addFavoriteProduct} />
        )}
      </div>
    </li>
  );
}
