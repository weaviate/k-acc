"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import RenderStars from "@/components/product/RenderStars";
import { Product } from "@/types/products";
import ImageCustom from "../visual/ImageCustom";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  return (
    <div
      className="bg-secondary shadow-sm rounded-md w-full m-2 lg:m-5 cursor-pointer"
      onClick={() => router.push("/product/" + product.product_id)}
      key={product.product_id}
    >
      <ImageCustom image_url={product.image_url} size="XL" className="" />

      <div className="text-primary p-5">
        <p className="text-md font-outfit pb-3">{product.name}</p>
        <p className="text-sm font-outfit pb-2">${product.list_price}</p>
        <div className="flex justify-start">
          <RenderStars
            rating={product.average_score_percentage}
            reviewsCount={product.review_count}
            size={16}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
