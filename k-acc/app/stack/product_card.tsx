import { useEffect, useState } from "react";
import { Effect, Product } from "./types";

interface ProductCardProps {
  product: Product | null;
  label: string;
  bgColor: string;
}

export default function ProductCard({
  product,
  label,
  bgColor,
}: ProductCardProps) {
  if (!product) {
    return null;
  }

  const [positiveEffect, setPositiveEffect] = useState<Effect[]>([]);

  useEffect(() => {
    const positiveEffects = [...product.positive_effects].sort(
      (a, b) => b.percentage - a.percentage
    );
    setPositiveEffect(positiveEffects);
  }, [product]);

  return (
    <div className={`flex flex-col items-center justify-start h-full fade-in`}>
      <div className="rounded-t-xl bg-white fade-down h-[300px] w-full">
        <img
          src={product.image_xl}
          alt={product.name}
          className="w-full h-full object-contain rounded-xl"
        />
      </div>

      <div
        className={`flex flex-col items-center justify-between gap-3 w-full bg-${bgColor}-100 h-full rounded-b-xl p-4`}
      >
        <div className="flex flex-col items-start justify-start">
          <div className="flex items-center justify-start gap-1">
            <p className="text-sm text-primary/80">{label}</p>
          </div>

          <p className="font-bold ">{product.name}</p>
        </div>
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex items-start justify-start gap-2 w-full">
            {positiveEffect.slice(0, 3).map((effect) => (
              <div
                className={`flex items-center truncate flex-wrap justify-center gap-2 bg-${bgColor}-200 rounded-xl p-2`}
              >
                <p className="text-sm font-bold text-primary/80">
                  {effect.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
