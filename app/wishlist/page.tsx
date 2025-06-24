"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, X, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AddToCartButton from "@/components/add-to-cart-button";
import { useWishlist } from "@/lib/wishlist-context";
import styles from "./page.module.css";

export default function WishlistPage() {
  const { state, removeItem, clearWishlist, getTotalItems } = useWishlist();
  const { items } = state;

  const totalValue = items.reduce((sum, item) => sum + item.price, 0);
  const totalItems = getTotalItems();

  const handleAddAllToCart = () => {
    console.log("Adding all items to cart...");
  ;}
  
  return (
    <main className="min-h-screen bg-background pt-24">
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Wishlist</h1>
          <p className={styles.subtitle}>
            {items.length > 0
              ? `${items.length} item${items.length !== 1 ? 's' : ''} saved for later`
              : "No items in your wishlist yet"
            }
          </p>
        </div>

        {items.length === 0 ? (
          <div className={styles.emptyState}>
            <Heart className={styles.emptyIcon} />
            <h2 className={styles.emptyTitle}>Your wishlist is empty</h2>
            <p className={styles.emptyDescription}>
              Start browsing our collections and save your favorite items to your wishlist.
              You can add items by clicking the heart icon on any product.
            </p>
            <Button asChild size ="lg">
              <Link href="/shop">
                Start Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className={styles.productsGrid}>
              {items.map((item) => (
                <div key={item.id} className={styles.productCard}>
                  <div className={styles.productImageContainer}>
                    <Image 
                      src={item.image}
                      alt={item.name}
                      fill
                      className={`object-cover object-center ${styles.productImage}`}
                    />

                    <button
                      onClick={() => removeItem(item.id)}
                      className={styles.removeButton}
                      aria-label="Remove from wishlist"
                    >
                      <X className="h-4 w-4"/>
                    </button>
                  </div>

                  <div className={styles.productContent}>
                    <div className={styles.productCategory}>{item.category}</div>
                    <h3 className={styles.productName}>{item.name}</h3>
                    <div className={styles.productActions}>
                      <AddToCartButton
                        product={{
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                          category: item.category,
                        }}
                        className={styles.addToCartButton}
                      />

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
              <h2 className={styles.summaryTitle}>Wishlist Summary</h2>

              <div className={styles.summaryStats}>
                <span className={styles.summaryLabel}>
                  Total Items:
                </span>

                <span className={styles.summaryValue}>
                  {items.length}
                </span>
              </div>

              <div className={styles.summaryStats}>
                <span className={styles.summaryLabel}>
                  Total Value:
                </span>

                <span className={styles.summaryValue}>
                  ${totalValue.toFixed(2)}
                </span>
              </div>

              <Separator className="my-4" />

              <div className={styles.summaryActions}>
                <Button
                  onClick={handleAddAllToCart}
                  size="lg"
                  className="flex-1"
                >
                  Add All to Cart
                  Add All to Cart
                </Button>
                <Button
                  variant ="outline"
                  onClick={clearWishlist}
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