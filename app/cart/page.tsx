"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Minus, Plus, X, ArrowLeft, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import styles from "./page.module.css";

// Sample cart data (in a real app, this would come from a global state/context)
const initialCartItems = [
  {
    id: 1,
    name: "Tailored Cotton Overshirt",
    price: 189.00,
    image: "https://images.pexels.com/photos/5384428/pexels-photo-5384428.jpeg",
    category: "Men",
    size: "M",
    color: "Stone",
    quantity: 1,
  },
  {
    id: 2,
    name: "Structured Wool Blazer",
    price: 290.00,
    image: "https://images.pexels.com/photos/5384425/pexels-photo-5384425.jpeg",
    category: "Women",
    size: "S",
    color: "Navy",
    quantity: 2,
  },
  {
    id: 5,
    name: "Oversized Merino Sweater",
    price: 210.00,
    image: "https://images.pexels.com/photos/5709656/pexels-photo-5709656.jpeg",
    category: "Women",
    size: "L",
    color: "Black",
    quantity: 1,
  },
];

export default function CartPage() {
    const [cartItems, setCartItems] = useState (initialCartItems);
    const [promoCode, setPromoCode] = useState("");
    const [appliedPromo, setAppliedPromo] = useState<string |null>(null);
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const updateQuantity = (itemId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        setCartItems(items => 
            items.map(item => 
                item.id === itemId ? {...item, quantity: newQuantity} : item
            )
        );
    };

    const removeItem = (itemId: number) => {
        setCartItems(items => items.filter(item => item.id !== itemId));
    };

    const applyPromoCode = () => {
        if (promoCode.toLowerCase() === "welcome10") {
            setAppliedPromo("WELCOME10");
            setPromoCode("");
        } else {
            //In a real app, error message will be shown here
            setPromoCode("");
        }
    };


    const handleCheckout = () => {
        setIsCheckingOut(true);
        //simulate checkout process
        setTimeout (() => {
            setIsCheckingOut(false);
            //redirect to checkout page
        }, 2000);
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = appliedPromo === "WELCOME10" ? subtotal * 0.1 : 0;
    const shipping = subtotal > 100 ? 0 : 15;
    const tax = (subtotal - discount) * 0.08;
    const total = subtotal - discount + shipping + tax;

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <main className="min-h-screen bg-background pt-24">
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Shopping Cart</h1>
                    <p className={styles.subtitle}>
                        {cartItems.length > 0
                            ? `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart` 
                            : "Your cart is empty" 
                        }
                    </p>
                </div>

                {cartItems.length === 0 ? (
                    <div className={styles.emptyState}>
                        <ShoppingBag className={styles.emptyIcon} />
                        <h2 className={styles.emptyTitle}>
                            Your cart is empty
                        </h2>
                        <p className={styles.emptyDescription}>
                            Looks like you haven`t added any items to your cart yet.
                            Start browsing our collections to find something you love.
                        </p>
                        <Button asChild size="lg">
                            <Link href="/shop">
                                Start Shopping
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className={styles.cartContent}>
                        {/* Cart Items */}
                        <div className={styles.cartItems}>
                    </div>
                )}
            </div>
        </main>
    )
}