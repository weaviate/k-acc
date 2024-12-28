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
};

export const dummyProduct: Product = {
  id: "1111111111",
  name: "Product 1",
  description: "Product 1 description",
  price: 100,
  image:
    "https://d3o574pyao1sq3.cloudfront.net/fashion/136e178d-7519-49eb-bf97-4f53296a25f2.png",
  category: "Category 1",
  brand: "Brand 1",
  rating: 4.5,
  reviews: ["Review 1", "Review 2", "Review 3"],
};
