"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import RenderStars from "@/components/product/RenderStars";
import { Product } from "@/types/products";
import ImageCustom from "../visual/ImageCustom";
import FavoriteButton from "../visual/FavoriteButton";

interface ProductCardHorizontalProps {
  product: Product;
}

const ProductCardHorizontal: React.FC<ProductCardHorizontalProps> = ({ product }) => {
  const router = useRouter();
  return (
    <div
      className="flex flex-row bg-secondary shadow-sm rounded-md w-full cursor-pointer relative"
      onClick={() => router.push("/product/" + product.product_id)}
      key={product.product_id}
    >
      <ImageCustom image_url={product.image_url} size="XL" className="w-1/3 p-2" />

      <div className="text-primary p-5 w-2/3 mr-4">
        <div className="absolute top-4 right-4 z-10">
          <FavoriteButton productId={product.product_id} />
        </div>
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

export default ProductCardHorizontal;