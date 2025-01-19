"use client";

import { searchProducts } from "@/app/api";
import { Product } from "@/types/products";
import { useState, useEffect } from "react";
import ProductCard from "@/components/product/ProductCard";
import { SearchRequest } from "@/types/search";
import FilterNav from "@/components/navigation/FilterNav";

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
        size: 12,
        page: 1,
        filters: [],
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
          <div className="flex">
            {/* <div className="w-1/4 pr-6">
              <FilterNav
                filters={filters}
                onFilterChange={(filters) => {
                  // Handle filter changes
                  console.log("Filter changed:", filters);
                }}
              />
            </div> */}
            <div className="w-3/4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {searchResults.map((product) => (
                  <ProductCard key={product.product_id} product={product} />
                ))}
              </div>
            </div>
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
