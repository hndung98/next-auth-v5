import { ProductElement } from "@/components/shop/products/ProductElement";
import { ProductElementType } from "@/types/product";

export const ProductList = ({
  products,
}: {
  products: readonly ProductElementType[];
}) => {
  return (
    <ul
      role="list"
      data-testid="ProductList"
      className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      {products.map((product, index) => (
        <ProductElement
          key={product.id}
          product={product}
          priority={index < 2}
          loading={index < 3 ? "eager" : "lazy"}
        />
      ))}
    </ul>
  );
};
