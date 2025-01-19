"use client";

import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface FavoriteButtonProps {
  productId: string;
  initialFavorited?: boolean;
  onToggle?: (isFavorited: boolean) => void;
  className?: string;
}

export default function FavoriteButton({
  productId,
  initialFavorited = false,
  onToggle,
  className = "",
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);

  // Check localStorage on mount
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorited(favorites.includes(productId));
  }, [productId]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click from bubbling to parent elements
    const newState = !isFavorited;
    setIsFavorited(newState);
    onToggle?.(newState);

    // Here we could add API calls to sync with backend
    // For now, we'll just use localStorage
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (newState) {
      if (!favorites.includes(productId)) {
        favorites.push(productId);
      }
    } else {
      const index = favorites.indexOf(productId);
      if (index > -1) {
        favorites.splice(index, 1);
      }
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <button
      onClick={handleClick}
      className={`hover:opacity-80 transition-opacity ${className}`}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorited ? (
        <FaHeart className="text-red-500" />
      ) : (
        <FaRegHeart className="text-gray-500" />
      )}
    </button>
  );
}
