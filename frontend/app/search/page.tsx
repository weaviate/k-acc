"use client";

import { searchProducts } from "@/app/api";
import { Product } from "@/types/products";
import { useState, useEffect } from "react";
import ProductCard from "@/components/product/ProductCard";
import { SearchRequest } from "@/types/search";
export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const results = await searchProducts({
        query: searchQuery,
      } as SearchRequest);
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl text-primary font-outfit mb-6">
          Search Products
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        )}

        {!isLoading && searchResults.length === 0 && searchQuery && (
          <div className="text-center text-gray-500 mt-8">
            No products found for "{searchQuery}"
          </div>
        )}
      </div>
    </main>
  );
}
