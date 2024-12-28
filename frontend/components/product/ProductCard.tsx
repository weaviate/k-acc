import { useRouter } from "next/navigation";
import Image from "next/image";
import RenderStars from "@/components/product/RenderStars";
import { Product } from "@/types/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  return (
    <div
      className="bg-secondary shadow-sm rounded-md w-full m-2 lg:m-5 cursor-pointer"
      onClick={() => router.push(`/product/${product.id}`)}
      key={product.id}
    >
      <figure>
        <Image
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={350}
          height={350}
        />
      </figure>
      <div className="text-primary p-5">
        <p className="text-md font-outfit pb-3">
          {product.name}
        </p>
        <p className="text-sm font-outfit pb-2">${product.price}</p>
        <div className="flex justify-start">
          <RenderStars rating={product.rating} reviewsCount={product.reviewsCount} size={16} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;