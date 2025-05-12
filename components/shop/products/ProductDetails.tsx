"use client";

import xss from "xss";

import { AddButton } from "@/components/shop/products/AddButton";
import { AvailabilityMessage } from "@/components/shop/products/AvailabilityMessage";
import { ProductElementType } from "@/components/shop/products/ProductElement";
import { ProductImageWrapper } from "@/components/shop/products/ProductImageWrapper";
import { formatCurrency } from "@/lib/utils";

export const ProductDetails = ({
  product,
}: {
  product: ProductElementType;
}) => {
  const firstImage = product.thumbnail;
  const description = product.description;
  const price = product.price;
  const isAvailable = true;
  const disabled = false;
  return (
    <>
      <form
        className="grid gap-2 sm:grid-cols-2 lg:grid-cols-8"
        action={(data) => {
          console.log(data);
        }}
      >
        <div className="md:col-span-1 lg:col-span-5">
          {firstImage && (
            <ProductImageWrapper
              priority={true}
              alt={firstImage.alt ?? ""}
              width={1024}
              height={1024}
              src={firstImage.url}
            />
          )}
        </div>
        <div className="flex flex-col pt-6 sm:col-span-1 sm:px-6 sm:pt-0 lg:col-span-3 lg:pt-16">
          <div>
            <h1 className="mb-4 flex-auto text-3xl font-medium tracking-tight text-neutral-900 my-dark-style">
              {product?.name}
            </h1>
            <p className="mb-8 text-sm " data-testid="ProductElement_Price">
              {formatCurrency(price)}
            </p>

            {/* {variants && (
              <VariantSelector
                selectedVariant={selectedVariant}
                variants={variants}
                product={product}
                channel={params.channel}
              />
            )} */}
            <AvailabilityMessage isAvailable={isAvailable} />
            <div className="mt-8">
              <AddButton disabled={disabled} />
            </div>
            {description && (
              <div className="mt-8 space-y-6 text-sm text-neutral-500 my-dark-style">
                {description.map((content) => (
                  <div
                    key={content}
                    dangerouslySetInnerHTML={{ __html: xss(content) }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
};
