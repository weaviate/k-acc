"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/products";
import ProductCard from "@/components/product/ProductCard";
import { getProduct } from "@/app/api";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setIsLoading(true);
        // Get favorite product IDs from localStorage
        const favoriteIds = JSON.parse(localStorage.getItem("favorites") || "[]");
        
        // Fetch full product details for each ID
        const products = await Promise.all(
          favoriteIds.map((id: string) => getProduct(id))
        );
        
        setFavorites(products);
      } catch (error) {
        console.error("Error loading favorites:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []); // Run once on mount

  return (
    <main className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl text-primary font-outfit mb-6">
          Your Favorites
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {favorites.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-8">
            <p>No favorites yet!</p>
            <p className="mt-2">
              Click the heart icon on any product to add it to your favorites.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
