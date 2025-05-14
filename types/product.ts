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
  averageRating: number;
  totalReviews: number;
};

export type CartItemType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};
