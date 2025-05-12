import { Metadata } from "next";

import { ProductList } from "@/components/shop/products/ProductList";

export const metadata: Metadata = {
  title: "Products",
};

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
};

export default async function Page() {
  const products = [
    {
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
    },
    {
      id: "prod-1002",
      name: "Les Miserables",
      category: "book",
      thumbnail: {
        alt: "Les Miserables",
        url: "http://localhost:3000/image/books/war-and-peace.jpg",
      },
      image: [],
      price: 1300,
      slug: "les-miserables",
      description: [
        "Wondering if this will look as good on you as it does on the screen? The answer is yes. A quality Monospace Tee variant art with smart styling.",
      ],
    },
  ] as ProductElementType[];
  return (
    <div className="w-full md:flex">
      <div className="w-full flex-none md:w-64 justify-center items-center">
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <div className="hidden h-auto w-full grow rounded-md md:block text-center">
            {"Categories"}
          </div>
          <div className="hidden h-auto w-full grow rounded-md md:block text-center mt-6">
            {"Item 1"}
          </div>
          <div className="hidden h-auto w-full grow rounded-md md:block text-center mt-6">
            {"Item 2"}
          </div>
          <div className="hidden h-auto w-full grow rounded-md md:block text-center mt-6">
            {"Item 3"}
          </div>
        </div>
      </div>
      <div className="flex-grow p-4 md:overflow-y-auto md:p-6 my-dark-style">
        <div className="p-4 text-center space-y-6 min-h-screen">
          <h1>{"(demo)"}</h1>
          <div>
            <ProductList products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}
