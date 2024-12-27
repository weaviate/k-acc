"use client"

import ComponentRotator from "@/components/visual/ComponentRotator";
import StackCard from "@/components/product/StackCard";
import { Product } from "@/types/products";

export default function Home() {
  const products: Product[] = [
    {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      price: 100,
      image: "https://d3o574pyao1sq3.cloudfront.net/fashion/136e178d-7519-49eb-bf97-4f53296a25f2.png",
      category: "Category 1",
      brand: "Brand 1",
      rating: 4.5,
      reviews: ["Review 1", "Review 2", "Review 3"],
    },
    {
      id: "2",
      name: "Product 2",
      description: "Product 2 description",
      price: 200,
      image: "https://d3o574pyao1sq3.cloudfront.net/fashion/136e178d-7519-49eb-bf97-4f53296a25f2.png",
      category: "Category 2",
      brand: "Brand 2",
      rating: 4.5,
      reviews: ["Review 1", "Review 2", "Review 3"],
    },
    {
      id: "3",
      name: "Product 3",
      description: "Product 3 description",
      price: 300,
      image: "https://d3o574pyao1sq3.cloudfront.net/fashion/136e178d-7519-49eb-bf97-4f53296a25f2.png",
      category: "Category 3",
      brand: "Brand 3",
      rating: 4.5,
      reviews: ["Review 1", "Review 2", "Review 3"],
    }
  ];

  const cards: { id: string; component: React.ReactElement }[] = [
    { id: "1", component: <StackCard products={products} name="Dry & Acne" /> },
    { id: "2", component: <StackCard products={products} name="Dry & Acne" /> },
    { id: "3", component: <StackCard products={products} name="Dry & Acne" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* <StackCard products={products} name="Dry & Acne" /> */}
        <ComponentRotator cards={cards} />
      </main>
    </div>
  );
} 
