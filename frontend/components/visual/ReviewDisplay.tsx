import React from "react";
import { Review } from "@/types/products";
import Image from "next/image";
import RenderStars from "@/components/product/RenderStars";

interface ReviewDisplayProps {
  reviews: Review[];
}

const ReviewDisplay: React.FC<ReviewDisplayProps> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <div className="text-gray-500">No reviews yet</div>;
  }

  return (
    <div className="flex flex-wrap gap-5 justify-center items-center">
      {reviews.map((review) => (
        <div key={review.id} className="relative w-64">
          {review.img ? (
            <div className="border bg-secondary rounded-lg shadow-sm">
              <div className="relative">
                <Image
                  src={review.img}
                  alt={review.author}
                  className=""
                  width={500}
                  height={500}
                />
                <div className="absolute bottom-2 left-2">
                  <RenderStars rating={review.rating} size={16} />
                </div>
              </div>
              <div className="flex flex-col p-4">
                <p className="text-primary text-md font-outfit">
                  {review.title}
                </p>
                <p className="text-gray-700 text-sm font-outfit">
                  {review.comment}
                </p>
              </div>
              <div className="flex flex-col items-left justify-left mb-4 px-4">
                <div className="text-xs text-primary opacity-50">
                  {review.date}
                </div>
                <div className="text-xs text-primary opacity-50">
                  By {review.author}
                </div>
              </div>
            </div>
          ) : (
            <div className="border bg-secondary rounded-lg shadow-sm">
              <div className="h-8">
                <div className="absolute top-4 left-4">
                  <RenderStars rating={review.rating} size={16} />
                </div>
              </div>
              <div className="flex flex-col p-4">
                <p className="text-primary text-md font-outfit">
                  {review.title}
                </p>
                <p className="text-gray-700 text-sm font-outfit">
                  {review.comment}
                </p>
              </div>
              <div className="flex flex-col items-left justify-left mb-4 px-4">
                <div className="text-xs text-primary opacity-50">
                  {review.date}
                </div>
                <div className="text-xs text-primary opacity-50">
                  By {review.author}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewDisplay;
