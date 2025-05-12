import { notFound } from "next/navigation";

import { ProductDetails } from "@/components/shop/products/ProductDetails";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const product = {
    id: "prod-1001",
    name: "Les Miserables",
    category: "book",
    thumbnail: {
      alt: "Les Miserables",
      url: "http://localhost:3000/image/books/war-and-peace.jpg",
    },
    image: [],
    price: 1600,
    slug: "les-miserables",
    description: [
      "Wondering if this will look as good on you as it does on the screen? The answer is yes. A quality Monospace Tee variant art with smart styling.",
    ],
  };

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 min-h-screen">
      <div>{params.slug}</div>
      <ProductDetails product={product} />
    </div>
  );
}
