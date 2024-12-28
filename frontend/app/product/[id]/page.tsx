"use client"

import { dummyProduct } from "@/constants/constants";
import { useRouter } from "next/navigation";
import Image from "next/image";
import RenderStars from "@/components/product/RenderStars";
import { FaHeart } from "react-icons/fa";
import { recommendedProducts, dummyReviews } from "@/constants/constants";
import ProductCard from "@/components/product/ProductCard";
import ReviewDisplay from "@/components/visual/ReviewDisplay";

export default function ProductPage() {
    const product = dummyProduct;
    const router = useRouter();
    const onBack = () => {
        router.back();
    }

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
                <Image src={product.image} alt={product.name} width={500} height={500} className="rounded-md shadow-md" />

                <div className="flex flex-col lg:w-1/2 items-left justify-left text-left bg-secondary rounded-md lg:p-12 p-6 shadow-md">
                    <h1 className="lg:text-2xl text-xl text-primary font-outfit mb-4">{product.name}</h1>
                    <RenderStars rating={product.rating} size={20} reviewsCount={product.reviewsCount} />
                    <p className="lg:text-xl text-lg text-primary font-outfit my-8">${product.price}</p>
                    <div className="flex flex-row gap-2 mb-8">
                        <button className="btn btn-accent text-secondary w-3/4 lg:w-36">Add to Cart</button>
                        <button className="btn btn-accent text-secondary w-12"><FaHeart /></button>
                    </div>
                    <p className="lg:text-md text-sm text-primary font-outfit">{product.description}</p>
                    <hr className="border-accent border-1 my-8" />
                    <h2 className="lg:text-lg text-md text-primary font-outfit mb-4">Ingredients</h2>
                    <p className="lg:text-md text-sm text-primary font-outfit">{product.ingredients}</p>
                </div>
            </div>
            <div className="bg-background_purple p-10 flex flex-col items-center lg:mt-32 mt-12">
                <p className="text-primary text-xl lg:text-2xl font-outfit mb-10">Similar Items</p>
                <div className="carousel carousel-center max-w-[100vw]">
                    {recommendedProducts.map((product) => (
                        <div key={product.id} className="carousel-item w-1/2 lg:w-64">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="p-10 flex flex-col items-center">
                <p className="pt-5 text-primary text-xl lg:text-2xl font-outfit mb-8">Customer Reviews</p>
                <ReviewDisplay reviews={dummyReviews} />
            </div>
        </main>
    )
}