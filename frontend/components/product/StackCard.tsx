"use client";

import Image from "next/image";

interface SimpleProduct {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface StackCardProps {
  products: SimpleProduct[];
  name: string;
}

const StackCard: React.FC<StackCardProps> = ({ products, name }) => {
  return (
    <div className="flex flex-col gap-2 justify-left items-left w-[400px] h-[400px] bg-secondary rounded-md p-3">
      <h1 className="text-sm text-bold text-primary">Best stack for: {name}</h1>
      {products.map((product: SimpleProduct, index: number) => (
        <div className="relative py-2 overflow-hidden" key={product.id}>
          <div className="flex flex-row justify-left items-left">
            <Image
              src="https://d3o574pyao1sq3.cloudfront.net/fashion/136e178d-7519-49eb-bf97-4f53296a25f2.png"
              alt="Product Image"
              className="w-24 h-24 rounded-xl shadow-md mx-2"
              width={200}
              height={200}
              loading="lazy"
            />
            <div className="flex flex-col justify-left items-left ml-5 mt-2">
              <h1 className="text-sm font-bold font-outfit text-primary mb-1">
                {product.name}
              </h1>
              <h1 className="text-xs font-outfit text-primary mb-2">
                ${product.price}
              </h1>
              <p className="text-xs text-primary line-clamp-2">
                {product.description}
              </p>
            </div>
          </div>
          {index < 2 && (
            <hr className="absolute -bottom-4 right-12 py-2 w-1/2 border-accent border-1" />
          )}
        </div>
      ))}
    </div>
  );
};

export default StackCard;
