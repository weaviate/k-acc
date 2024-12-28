"use client";

import ComponentRotator from "@/components/visual/ComponentRotator";
import StackCard from "@/components/product/StackCard";
import { Product, dummyProduct } from "@/types/products";

export default function Home() {
  const products = [
    {
      id: "1111111111",
      name: "Product 1",
      price: 100,
      description: "Description 1",
    },
    {
      id: "2222222222",
      name: "Product 2",
      price: 200,
      description: "Description 2",
    },
    {
      id: "3333333333",
      name: "Product 3",
      price: 300,
      description: "Description 3",
    },
  ];

  const cards: { id: string; component: React.ReactElement }[] = [
    { id: "1", component: <StackCard products={products} name="Dry & Acne" /> },
    { id: "2", component: <StackCard products={products} name="Dry & Acne" /> },
    { id: "3", component: <StackCard products={products} name="Dry & Acne" /> },
  ];

  return (
    <main className="flex-grow">
      <div className="hero min-h-[60vh]">
        <div className="hero-content flex-col lg:flex-row-reverse w-full gap-16">
          <img
            src="hero.png"
            className="lg:basis-1/3 object-contain h-[360px] w-auto"
          />
          <div className="flex flex-col gap-4 basis-2/3 ml-3 lg:ml-16">
            <h1 className="text-3xl text-primary font-outfit">stakk</h1>
            <h1 className="text-xl text-accent font-outfit">
              Find your perfect skin
            </h1>
            <p className="text-primary py-4">
              Build a skin care routine that matches you. and only you.
            </p>
            <button className="btn btn-accent text-secondary mt-6 w-1/2 lg:w-1/4">
              Get Started
            </button>
          </div>
        </div>
      </div>
      <ComponentRotator cards={cards} />
    </main>
  );
}
