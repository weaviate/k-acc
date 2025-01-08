"use client";

import ComponentRotator from "@/components/visual/ComponentRotator";
import StackCard from "@/components/product/StackCard";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import { stackProducts, dummyReviews } from "@/constants/constants";
import ReviewDisplay from "@/components/visual/ReviewDisplay";

export default function Home() {
  const router = useRouter();

  const cards: { id: string; component: React.ReactElement }[] = [
    {
      id: "1",
      component: <StackCard products={stackProducts} name="Dry & Acne" />,
    },
    {
      id: "2",
      component: <StackCard products={stackProducts} name="Dry & Acne" />,
    },
    {
      id: "3",
      component: <StackCard products={stackProducts} name="Dry & Acne" />,
    },
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
            <p className="text-3xl text-primary font-outfit lg:-mb-5">stakk</p>
            <p className="text-xl text-accent font-outfit">
              Find your perfect skin
            </p>
            <p className="text-primary text-lg py-4">
              Build a skin care routine that matches you.
              <br />
              and only you.
            </p>
            <button
              className="btn btn-accent text-secondary mt-6 w-1/2 lg:w-1/4"
              onClick={() => router.push("/survey")}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
      <div className="mb-16">
        <ComponentRotator cards={cards} />
        <div className="flex flex-row justify-center mb-10">
          <button
            className="btn btn-accent text-secondary mt-10 w-1/2 lg:w-1/6"
            onClick={() => router.push("/survey")}
          >
            Build your stack
          </button>
        </div>
      </div>
      {/* <div className="bg-background_blue p-10 flex flex-col items-center">
        <p className="text-primary text-xl lg:text-2xl font-outfit mb-10">
          Recommended for you
        </p>
        <div className="carousel carousel-center max-w-[100vw]">
          {recommendedProducts.map((product) => (
            <div key={product.product_id.toString()} className="carousel-item w-1/2 lg:w-64">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div> */}
      {/* <div className="p-10 flex flex-col items-center">
        <p className="pt-5 text-primary text-xl lg:text-2xl font-outfit mb-2">
          Customer Reviews
        </p>
        <p className="text-primary text-md font-outfit mb-10">
          Must-have beauty products highly rated by customers!
        </p>
        <ReviewDisplay reviews={dummyReviews} />
      </div> */}
    </main>
  );
}
