"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import RenderStars from "@/components/product/RenderStars";
import { FaHeart } from "react-icons/fa";
import { Product } from "@/types/products";
import { useRecommendedProducts } from "@/hooks/useRecommendedProducts";
import ProductCard from "@/components/product/ProductCard";
import ImageCustom from "@/components/visual/ImageCustom";

interface ProductViewProps {
  product: Product;
}

export default function ProductView({ product }: ProductViewProps) {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  const { recommendedProducts, loading } = useRecommendedProducts(
    product.product_id,
  );

  return (
    <main className="bg-background_alt w-full h-full">
      <div className="flex flex-col items-left justify-left p-8">
        <button
          onClick={onBack}
          className="hover:opacity-50 text-primary hover:opacity-50 w-24"
        >
          ← Back
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-2 w-5/6 mx-auto">
        <ImageCustom
          image_url={product.image_url}
          size="XXL"
          className="rounded-md shadow-md"
        />

        <div className="flex flex-col lg:w-1/2 items-left justify-left text-left bg-secondary rounded-md lg:p-12 p-6 shadow-md">
          <h1 className="lg:text-2xl text-xl text-primary font-outfit mb-4">
            {product.name}
          </h1>
          <RenderStars
            rating={product.average_score_percentage}
            size={20}
            reviewsCount={product.review_count}
          />
          <p className="lg:text-xl text-lg text-primary font-outfit my-8">
            ${product.list_price}
          </p>
          <div className="flex flex-row gap-2 mb-8">
            <button className="btn btn-accent text-secondary w-3/4 lg:w-36">
              Add to Cart
            </button>
            <button className="btn btn-accent text-secondary w-12">
              <FaHeart />
            </button>
          </div>
          <p className="lg:text-md text-sm text-primary font-outfit">
            {product.professional_review}
          </p>
          <hr className="border-accent border-1 my-8" />
          <h2 className="lg:text-lg text-md text-primary font-outfit mb-4">
            Ingredients
          </h2>
          <p className="lg:text-md text-sm text-primary font-outfit">
            {product.major_ingredients}
          </p>
        </div>
      </div>
      <div className="bg-background_blue p-10 flex flex-col items-center mt-16">
        <p className="text-primary text-xl lg:text-2xl font-outfit mb-10">
          Recommended for you
        </p>
        <div className="carousel carousel-center max-w-[100vw]">
          {recommendedProducts.map((product) => (
            <div
              key={product.product_id.toString()}
              className="carousel-item w-1/2 lg:w-64"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
