"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, X, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import styles from "./page.module.css";

//sample wishlist data (in a real app, this would come from a database/{already have table for wishlist})

const initialWishlistItems = [
  {
    id: 1,
    name: "Tailored Cotton Overshirt",
    price: 189.00,
    image: "https://images.pexels.com/photos/5384428/pexels-photo-5384428.jpeg",
    category: "Men",
    dateAdded: "2025-01-15",
  },
  {
    id: 2,
    name: "Structured Wool Blazer",
    price: 290.00,
    image: "https://images.pexels.com/photos/5384425/pexels-photo-5384425.jpeg",
    category: "Women",
    dateAdded: "2025-01-12",
  },
  {
    id: 3,
    name: "Relaxed Linen Shirt",
    price: 120.00,
    image: "https://images.pexels.com/photos/5384429/pexels-photo-5384429.jpeg",
    category: "Men",
    dateAdded: "2025-01-10",
  },
  {
    id: 4,
    name: "High-Waist Tapered Pants",
    price: 175.00,
    image: "https://images.pexels.com/photos/5384424/pexels-photo-5384424.jpeg",
    category: "Women",
    dateAdded: "2025-01-08",
  },
  {
    id: 5,
    name: "Oversized Merino Sweater",
    price: 210.00,
    image: "https://images.pexels.com/photos/5709656/pexels-photo-5709656.jpeg",
    category: "Women",
    dateAdded: "2025-01-05",
  },
  {
    id: 6,
    name: "Slim Fit Selvedge Jeans",
    price: 165.00,
    image: "https://images.pexels.com/photos/1346187/pexels-photo-1346187.jpeg",
    category: "Men",
    dateAdded: "2025-01-03",
  },
];

export default function WishlistPage() {
    const [wishlistItems, setWishlistItems] = useState (initialWishlistItems);
    const [addingToCart, setAddingToCart] = useState<number | null>(null);

    const removeFromWishlist = (productId: number) => {
        setWishlistItems(items => items.filter(item => item.id !== productId));
    };

    const addToCart = async (productId: number) => {
        setAddingToCart(productId);

        // simluate api call
        setTimeout(() => {
            setAddingToCart(null);
            //In a real app, you might show a toast notification here
        }, 1000);
    };

    const clearAllWishlist = () => {
        setWishlistItems([]);
    };

    const addAllToCart = async () => {
        setAddingToCart(-1); // use -1 to indicate adding all items

        //simulate api call
        setTimeout(() => {
            setAddingToCart(null);
            //in a real app, you might show a toast notification here
        }, 1500);
    };

    const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <main className="min-h-screen bg-background pt-24">
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <h1 className={styles.title}>My Wishlist</h1>
                    <p className={styles.subtitle}>
                        {wishlistItems.length > 0 
                            ? `${wishlistItems.length} item${wishlistItems.length !== 1 ? 's' : ''} saved for later` : "No items in your wishlist yet" 
                        }
                    </p>
                </div>

                {wishlistItems.length === 0? (
                    <div className={styles.emptyState}>
                        <Heart className={styles.emptyIcon} />
                        <h2 className={styles.emptyTitle}>Your Wishlist is empty</h2>
                        <p className={styles.emptyDescription}>Start browsing our collection and save your favorite items to your wishlist. 
                        You can add items by clicking the heart icon on any product.
                        </p>
                        <Button asChild size="lg">
                            <Link href="/shop">
                                Start Shopping
                            </Link>
                        </Button>
                    </div>
                ) : (
                  <>
                    <div className={styles.productsGrid}>
                        {wishlistItems.map(item => (
                            <div key={item.id} className={styles.productCard}>
                                <div className={styles.productImageContainer}>
                                    <Image 
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className={`object-cover object-center ${styles.productImage}`}
                                    />
                                    <button onClick={() => removeFromWishlist (item.id)}>
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className={styles.productContent}>
                                    <div className={styles.productCategory}>{item.category}</div>    
                                    <h3 className={styles.productName}>{item.name}</h3>
                                    
                                    <div className={styles.productPrice}>${item.price.toFixed(2)}</div>

                                    <div className={styles.productActions}>
                                        <Button 
                                            onClick={() => addToCart(item.id)}
                                            disabled={addingToCart === item.id}
                                            className={styles.addToCartButton}
                                        >
                                            {addingToCart === item.id ? (
                                                "Adding..."
                                            ) : (
                                              <>
                                                <ShoppingCart className="mr-2 h-4 w-4" />
                                                Add to Cart
                                              </>  
                                            )}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            asChild
                                            className={styles.viewButton}
                                        >
                                            <Link href={`/shop/${item.id}`}>
                                                <Eye className="h-4 w-4" />
                                                <span className="sr-only">View product</span>
                                                </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Wishlist Summary */}
                    <div className={styles.summary}>
                        <h2 className={styles.summaryTitle}> Wishlist Summary </h2>
                        <div className={styles.summaryStats}>
                            <span className={styles.summaryLabel}>Total Items:</span>
                            <span className={styles.summaryStats}>{wishlistItems.length}</span>
                        </div>

                        <div className={styles.summaryStats}>
                            <span className={styles.summaryLabel}>Total Value:</span>
                            <span className={styles.summaryValue}>${totalValue.toFixed(2)}</span>
                        </div>

                        <Separator className="my-4" />

                        <div className={styles.summaryActions}>
                            <Button
                                onClick={addAllToCart}
                                disabled={addingToCart === -1}
                                size="lg"
                                className="flex-1"
                            >
                                {addingToCart === -1 ? (
                                    "Adding All..."
                                ) : (
                                  <>
                                    <ShoppingCart className="mr-2 hr-4 w-4" />
                                    Add all to Cart
                                  </>  
                                )}
                            </Button>
                            <Button 
                                variant="outline"
                                onClick={clearAllWishlist}
                                className={styles.clearAllButton}
                            >
                                Clear All
                            </Button>
                        </div>
                    </div>
                </>
                )}
            </div>
        </main>
    );
}