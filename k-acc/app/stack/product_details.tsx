import { useEffect, useState } from "react";
import { Effect, Product } from "./types";
import { IoStar } from "react-icons/io5";
import { IoStarOutline } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";

interface ProductDetailsProps {
  product: Product | null;
  label: string;
}

export default function ProductDetails({
  product,
  label,
}: ProductDetailsProps) {
  if (!product) {
    return null;
  }

  const [positiveEffects, setPositiveEffects] = useState<Effect[]>([]);
  const [showAllEffects, setShowAllEffects] = useState(false);
  const [showAllIngredients, setShowAllIngredients] = useState(false);

  const [description, setDescription] = useState("");
  const [showDescription, setShowDescription] = useState(false);

  const triggerShowEffects = () => {
    setShowAllEffects((prev) => !prev);
  };

  const triggerShowIngredients = () => {
    setShowAllIngredients((prev) => !prev);
  };

  const triggerShowDescription = () => {
    setShowDescription((prev) => !prev);
  };

  const percentageToStars = (percentage: number) => {
    const starCount = Math.round(percentage * 5);
    return Array(starCount)
      .fill(<IoStar size={14} className="inline" />)
      .concat(
        Array(5 - starCount).fill(
          <IoStarOutline size={14} className="inline" />
        )
      );
  };

  const cleanDescription = (description: string) => {
    return description.replace(/<[^>]*>?/gm, "");
  };

  useEffect(() => {
    const sortedEffects = [...product.positive_effects].sort(
      (a, b) => b.percentage - a.percentage
    );
    setPositiveEffects(sortedEffects);
    setDescription(cleanDescription(product.description));
  }, [product]);

  return (
    <div
      className={`flex flex-col gap-2 items-start justify-start fade-in overflow-y-scroll p-2`}
    >
      <div className="flex flex-col items-start justify-start w-full">
        <div className="flex w-full gap-1">
          <p className="text-primary/80 text-sm">{product.brand}</p>
        </div>
        <p className="font-bold ">{product.name}</p>
      </div>
      <div className="rounded-xl fade-down w-full">
        <img
          src={product.image_xxl}
          alt={product.name}
          className="w-full h-full object-contain rounded-xl"
        />
      </div>
      <div className="flex w-full items-center justify-center gap-1">
        {percentageToStars(product.score_percentage)} |{" "}
        <p className="text-primary">{product.review_count} reviews</p>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-1">
        <div className="flex flex-wrap items-center justify-center w-full gap-1">
          {positiveEffects
            ?.map((effect: Effect, index: number) => (
              <div
                key={index + effect.name}
                onClick={triggerShowEffects}
                className="p-2 cursor-pointer gap-1 flex flex-grow fade-down items-center font-bold text-white justify-center rounded-full text-xs bg-green-500"
              >
                <p className="text-xs">
                  {showAllEffects ? `${Math.round(effect.percentage)}%` : ""}
                </p>
                <p className="text-xs">{effect.name}</p>
              </div>
            ))
            .slice(0, showAllEffects ? undefined : 3)}
          {!showAllEffects && positiveEffects.length > 3 && (
            <p className="text-primary/80 text-xs">
              ... {positiveEffects.length - 3} more positive effects
            </p>
          )}
        </div>
      </div>
      <Separator />
      <p className="text-primary/80 text-xs font-bold">
        Why we picked this product?
      </p>
      <p className="text-primary e fade-down">{product.explanation}</p>
      <Separator />
      <p className="text-primary text-lg font-bold">Ingredients</p>
      <p
        className="text-primary cursor-pointer fade-down"
        onClick={() => triggerShowIngredients()}
      >
        {product.ingredients
          .slice(0, showAllIngredients ? undefined : 10)
          .map((ingredient, index: number) => (
            <span key={index + ingredient}>
              {ingredient.trim().toLowerCase()}
              {index <
              (showAllIngredients
                ? product.ingredients.length - 1
                : Math.min(product.ingredients.length - 1, 9))
                ? ", "
                : ""}
            </span>
          ))}
        {!showAllIngredients && product.ingredients.length > 10 && (
          <span> ... and {product.ingredients.length - 10} more</span>
        )}
      </p>
      <p className="text-primary text-lg font-bold">Description</p>
      <p
        className="text-primary cursor-pointer"
        onClick={() => setShowDescription(!showDescription)}
      >
        {showDescription ? description : `${description.slice(0, 200)}...`}
      </p>
    </div>
  );
}
