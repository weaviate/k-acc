import { useEffect, useState } from "react";
import { Effect, Product } from "./types";

interface ProductCardProps {
  product: Product | null;
  label: string;
  onClick: (product: Product) => void;
}

export default function ProductCard({
  product,
  label,
  onClick,
}: ProductCardProps) {
  if (!product) {
    return null;
  }

  return (
    <div
      className={` flex p-1 gap-2 items-center cursor-pointer justify-start hover:scale-105 transition-all duration-300 ease-in-out border border-white hover:border-primary fade-in bg-white rounded-xl`}
      onClick={() => onClick(product)}
    >
      <div className="rounded-xl fade-down w-[100px]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-fill rounded-xl"
        />
      </div>
      <div className={`flex flex-col items-start justify-between gap-3 w-2/3 `}>
        <div className="flex flex-col items-start justify-start">
          <p className="text-sm text-primary/80">{label}</p>
          <p className="font-bold text-sm">{product.name}</p>
        </div>
      </div>
    </div>
  );
}
