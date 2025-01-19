"use client";

import ComponentRotator from "@/components/visual/ComponentRotator";
import StackCard from "@/components/product/StackCard";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import { stackProducts, dummyReviews } from "@/constants/constants";
import ReviewDisplay from "@/components/visual/ReviewDisplay";
import { RiveAnimation } from "@/components/visual/RiveAnimation";

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
      <div className="hero min-h-[70vh] relative">
        <div className="hero-content w-full items-center lg:items-start justify-center lg:justify-start text-center lg:text-left">
          <div className="absolute right-0 lg:right-16 -top-12 lg:-top-28 h-[350px] lg:h-[700px] w-full lg:w-1/2">
            <RiveAnimation />
          </div>
          <div className="flex flex-col gap-4 mt-56 lg:mt-0 lg:ml-8 items-center lg:items-start justify-center lg:justify-start">
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
              className="btn btn-accent text-secondary mt-6 w-1/2 lg:w-5/6 lg:w-1/4"
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
