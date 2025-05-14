import { ProductElementType } from "@/components/shop/products/ProductElement";

const products = [
  {
    id: "prod-harry-potter-1",
    name: "Harry Potter 1",
    category: "book",
    thumbnail: {
      alt: "Harry Potter 1",
      url: "/image/books/harry-potter-1.jpg",
    },
    image: [],
    price: 1100,
    slug: "harry-potter-1",
    description: [
      "Wondering if this will look as good on you as it does on the screen? The answer is yes. A quality Monospace Tee variant art with smart styling.",
    ],
    options: ["Red", "Blue", "White", "Random"],
    averageRating: 5.0,
    totalReviews: 33,
  },
  {
    id: "prod-les-miserables",
    name: "Les Miserables",
    category: "book",
    thumbnail: {
      alt: "Les Miserables",
      url: "/image/books/les-miserables.jpg",
    },
    image: [],
    price: 1400,
    slug: "les-miserables",
    description: [
      "Wondering if this will look as good on you as it does on the screen? The answer is yes. A quality Monospace Tee variant art with smart styling.",
    ],
    options: ["Red", "Blue", "White", "Random"],
    averageRating: 5.0,
    totalReviews: 41,
  },
  {
    id: "prod-war-and-peace",
    name: "War And Peace",
    category: "book",
    thumbnail: {
      alt: "Les Miserables",
      url: "/image/books/war-and-peace.jpg",
    },
    image: [],
    price: 1650,
    slug: "war-and-peace",
    description: [
      "Wondering if this will look as good on you as it does on the screen? The answer is yes. A quality Monospace Tee variant art with smart styling.",
    ],
    options: ["Red", "Blue", "White", "Random"],
    averageRating: 5.0,
    totalReviews: 12,
  },
  {
    id: "prod-sherlock-holmes-1",
    name: "Sherlock Holmes 1",
    category: "book",
    thumbnail: {
      alt: "Sherlock Holmes 1",
      url: "/image/books/sherlock-holmes-1.jpg",
    },
    image: [],
    price: 1300,
    slug: "sherlock-holmes-1",
    description: [
      "Wondering if this will look as good on you as it does on the screen? The answer is yes. A quality Monospace Tee variant art with smart styling.",
    ],
    options: ["Red", "Blue", "White", "Random"],
    averageRating: 5.0,
    totalReviews: 65,
  },
  {
    id: "prod-sherlock-holmes-2",
    name: "Sherlock Holmes 2",
    category: "book",
    thumbnail: {
      alt: "Sherlock Holmes 2",
      url: "/image/books/sherlock-holmes-2.jpg",
    },
    image: [],
    price: 1300,
    slug: "sherlock-holmes-2",
    description: [
      "Wondering if this will look as good on you as it does on the screen? The answer is yes. A quality Monospace Tee variant art with smart styling.",
    ],
    options: ["Red", "Blue", "White", "Random"],
    averageRating: 5.0,
    totalReviews: 77,
  },
  {
    id: "prod-sherlock-holmes-3",
    name: "Sherlock Holmes 3",
    category: "book",
    thumbnail: {
      alt: "Sherlock Holmes 3",
      url: "/image/books/sherlock-holmes-3.png",
    },
    image: [],
    price: 1300,
    slug: "sherlock-holmes-3",
    description: [
      "Wondering if this will look as good on you as it does on the screen? The answer is yes. A quality Monospace Tee variant art with smart styling.",
    ],
    options: ["Red", "Blue", "White", "Random"],
    averageRating: 5.0,
    totalReviews: 79,
  },
] as ProductElementType[];

export const getProducts = async () => {
  try {
    return products;
  } catch (error) {
    console.log("getProducts", error);
    return [];
  }
};

export const getRelatedProducts = async (id: string) => {
  try {
    return products.filter((v) => v.id !== id);
  } catch (error) {
    console.log("getRelatedProducts", error);
    return [];
  }
};

export const getProductBySlug = async (slug: string) => {
  try {
    const product = products.find((v) => v.slug === slug);
    return product;
  } catch (error) {
    console.log("getProductBySlug", error);
    return undefined;
  }
};
