import { notFound } from "next/navigation";

import { ProductDetails } from "@/components/shop/products/ProductDetails";
import { ProductCarousel } from "@/components/shop/products/Carousel";
import {
  getProductBySlug,
  getRelatedProducts,
} from "@/data/product";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 min-h-screen">
      <ProductDetails product={product} />
      <div className="mt-6">Related products</div>
      <ProductCarousel products={relatedProducts} />
      <div className="mt-4">Other products</div>
      <ProductCarousel products={relatedProducts} />
    </div>
  );
}
