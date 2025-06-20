"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface AddToCartButtonProps {
  product: Product;
  color?: string;
  quantity?: number;
  className?: string;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline" | "ghost";
  showIcon?: boolean;
  children?: React.ReactNode;
}

export default function AddToCartButton({
  product,
  size: selectedSize,
  color: selectedColor = "Default",
  quantity = 1,
  className,
  size = "default",
  variant = "default",
  showIcon = true,
  children,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });

    setIsAdding(false);
    setIsAdded(true);

    // Reset added state after animation
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdding || isAdded}
      className={cn(className)}
      size={size}
      variant={variant}
    >
      {isAdding ? (
        <>
          {showIcon && <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
          Adding...
        </>
      ) : isAdded ? (
        <>
          {showIcon && <Check className="mr-2 h-4 w-4" />}
          Added!
        </>
      ) : (
        <>
          {showIcon && <ShoppingCart className="mr-2 h-4 w-4" />}
          {children || "Add to Cart"}
        </>
      )}
    </Button>
  );
}