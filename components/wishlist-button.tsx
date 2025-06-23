"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useWishlist } from "@/lib/wishlist-context";
import { cn } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface WishlistButtonProps {
  product: Product;
  className?: string;
  size?: "sm" | "default" | "lg" | "icon";
  variant?: "default" | "outline" | "ghost";
  showIcon?: boolean;
}

export default function WishlistButton({
  product,
  className,
  size = "icon",
  variant = "ghost",
  showIcon = true,
}: WishlistButtonProps) {
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const [isAnimating, setIsAnimating] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleToggleWishlist = async () => {
    setIsAnimating(true);
    
    // Simulate animation delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    if (inWishlist) {
      removeItem(product.id);
    } else {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });
    }

    setIsAnimating(false);
  };

  return (
    <Button
      onClick={handleToggleWishlist}
      className={cn(className)}
      size={size}
      variant={variant}
      disabled={isAnimating}
    >
      {showIcon && (
        <Heart 
          className={cn(
            "h-4 w-4 transition-all duration-200",
            inWishlist ? "fill-current text-red-500" : "text-current",
            isAnimating && "scale-125"
          )} 
        />
      )}
      <span className="sr-only">
        {inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      </span>
    </Button>
  );
}