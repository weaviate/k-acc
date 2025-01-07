import { useState, useEffect } from "react";
import { getRecommendations } from "@/app/api";
import { Product } from "@/types/products";

export function useRecommendedProducts(productId: string) {
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      const products = await getRecommendations(productId);
      setRecommendedProducts(products);
      setLoading(false);
    };
    fetchRecommendedProducts();
  }, [productId]);

  return { recommendedProducts, loading };
}
