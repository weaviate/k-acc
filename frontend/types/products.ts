export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviews: string[];
  reviewsCount: number;
  ingredients: string;
}

export const emptyProduct: Product = {
  id: "1234567890",
  name: "",
  description: "",
  price: 0,
  image: "",
  category: "",
  brand: "",
  rating: 0,
  reviews: [],
  reviewsCount: 0,
  ingredients: "",
};

export interface Review {
  id: string;
  rating: number;
  comment: string;
  title: string;
  author: string;
  date: string;
  img?: string;
}
