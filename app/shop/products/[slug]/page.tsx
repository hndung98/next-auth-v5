import { notFound } from "next/navigation";

import { ProductDetails } from "@/components/shop/products/ProductDetails";
import { ProductCarousel } from "@/components/shop/products/Carousel";
import { ProductElementType } from "@/components/shop/products/ProductElement";

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
    slug: params.slug,
    description: [
      "Wondering if this will look as good on you as it does on the screen? The answer is yes. A quality Monospace Tee variant art with smart styling.",
    ],
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    averageRating: 4.5,
    totalReviews: 183,
  };

  if (!product) {
    notFound();
  }

  const relatedProducts = [
    {
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
      options: ["Red", "Blue", "White", "Random"],
      averageRating: 4.9,
      totalReviews: 163,
    },
    {
      id: "prod-1002",
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
      options: ["Red", "Blue", "White", "Random"],
      averageRating: 4.4,
      totalReviews: 68,
    },
    {
      id: "prod-1003",
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
      options: ["Red", "Blue", "White", "Random"],
      averageRating: 5.0,
      totalReviews: 41,
    },
  ] as ProductElementType[];

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
