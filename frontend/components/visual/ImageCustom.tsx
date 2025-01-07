import React from "react";
import { Review } from "@/types/products";
import Image from "next/image";
import RenderStars from "@/components/product/RenderStars";

interface ImageCustomProps {
  image_url: string;
  size: string;
  className: string;
}

const ImageCustom: React.FC<ImageCustomProps> = ({
  image_url,
  size,
  className,
}) => {
  const newImageUrl = image_url.replace(/[A-Z](?=_)/, size);

  return (
    <Image
      src={newImageUrl}
      alt="Product Image"
      width={500}
      height={500}
      className={className}
    />
  );
};

export default ImageCustom;
