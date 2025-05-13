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
      url: "/image/books/war-and-peace.jpg",
    },
    image: [],
    price: 1600,
    slug: "les-miserables",
    description: [
      "Wondering if this will look as good on you as it does on the screen? The answer is yes. A quality Monospace Tee variant art with smart styling.",
    ],
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  };

  if (!product) {
    notFound();
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 min-h-screen">
      <ProductDetails product={product} />
      <div className="mt-6">Related products</div>
      <div className="mt-4">Other products</div>
    </div>
  );
}
