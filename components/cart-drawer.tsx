"use client";

import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart-context";

export default function CartDrawer() {
    const { state, removeItem, updateQuantity, closeCart, getTotalItems, getTotalPrice } = useCart();

    if (! state.isOpen) return null;

    const totalItems = getTotalItems();
    const totalPrice = getTotalPrice();

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 z-50 bg-black/50"
                onClick={closeCart}
            />

            {/* Drawer */}
            <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-background shadow-xl">
                <div className="flex h-full flex-col">

                    {/* Header */}
                    <div className="flex items-center justify-between border-b p-4">
                        <h2 className="text-lg font-semibold">
                            Shopping Cart ({totalItems})
                        </h2>
                        <Button variant="ghost" size="icon" onClick={closeCart}>
                            <X className="h-5 w-5"/>
                        </Button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-q overFlow-y-auto p-4">
                        {state.items.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center text-center">
                                <ShoppingBag className="mb-4 h-12 w-12 text-muted-foreground" />
                                <h3 className="mb-2 text-lg font-medium">Your cart is empty</h3>
                                <p className="mb-4 text-sm text-muted-foreground">
                                    Add some items to get started
                                </p>
                                <Button asChild onClick={closeCart}>
                                    <Link href="/shop">Start Shopping</Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {state.items.map((item) => (
                                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3">
                                        <div className="relative h-20 w-16 flex-srink-0 overflow-hidden rounded-md bg-muted">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover object-center"
                                            />
                                        </div>

                                        <div className="flex flex-1 flex-col">
                                            <div className="flex justify-between">
                                                <div className=""></div>
                                            </div> 
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </>
    )
}