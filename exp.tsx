/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
/*  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
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
      // In a real app, you'd show an error message
      setPromoCode("");
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      // In a real app, redirect to checkout page
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
            <h2 className={styles.emptyTitle}>Your cart is empty</h2>
            <p className={styles.emptyDescription}>
              Looks like you haven't added any items to your cart yet. 
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
            {/* Cart Items *//*}
            <div className={styles.cartItems}>
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  
                  <div className={styles.itemDetails}>
                    <div className={styles.itemHeader}>
                      <div className={styles.itemInfo}>
                        <h3 className={styles.itemName}>{item.name}</h3>
                        <div className={styles.itemCategory}>{item.category}</div>
                        <div className={styles.itemVariants}>
                          <span>Size: {item.size}</span>
                          <span>Color: {item.color}</span>
                        </div>
                      </div>
                      <div className={styles.itemPrice}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                    
                    <div className={styles.itemActions}>
                      <div className={styles.quantityControls}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className={styles.quantityButton}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <div className={styles.quantityDisplay}>
                          {item.quantity}
                        </div>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className={styles.quantityButton}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeItem(item.id)}
                        className={styles.removeButton}
                        aria-label="Remove item"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              <Link href="/shop" className={styles.continueShoppingLink}>
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Link>
            </div>

            {/* Cart Summary *//*}
            <div className={styles.cartSummary}>
              <div className={styles.summaryCard}>
                <h2 className={styles.summaryTitle}>Order Summary</h2>
                
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Subtotal ({totalItems} items)</span>
                  <span className={styles.summaryValue}>${subtotal.toFixed(2)}</span>
                </div>
                
                {appliedPromo && (
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Discount ({appliedPromo})</span>
                    <span className={styles.summaryValue}>-${discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Shipping</span>
                  <span className={styles.summaryValue}>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Tax</span>
                  <span className={styles.summaryValue}>${tax.toFixed(2)}</span>
                </div>
                
                <Separator className="my-4" />
                
                <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                  <span className={styles.summaryTotalLabel}>Total</span>
                  <span className={styles.summaryTotalValue}>${total.toFixed(2)}</span>
                </div>
                
                <div className={styles.checkoutActions}>
                  <Button 
                    size="lg" 
                    className="w-full"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                  </Button>
                  <Button variant="outline" size="lg" className="w-full" asChild>
                    <Link href="/shop">Continue Shopping</Link>
                  </Button>
                </div>
                
                {shipping === 0 && (
                  <div className={styles.shippingInfo}>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      <span>Free shipping on orders over $100</span>
                    </div>
                  </div>
                )}
                
                {/* Promo Code Section *//*}
                <div className={styles.promoSection}>
                  <h3 className={styles.promoTitle}>Promo Code</h3>
                  <div className={styles.promoForm}>
                    <input
                      type="text"
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className={styles.promoInput}
                    />
                    <Button 
                      variant="outline" 
                      onClick={applyPromoCode}
                      className={styles.promoButton}
                      disabled={!promoCode.trim()}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}*/
/*
"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  size?: string;
  color?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> & { quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: number; size?: string; color?: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; size?: string; color?: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { quantity = 1, ...item } = action.payload;
      const existingItemIndex = state.items.findIndex(
        cartItem => 
          cartItem.id === item.id && 
          cartItem.size === item.size && 
          cartItem.color === item.color
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += quantity;
        return { ...state, items: updatedItems };
      }

      return {
        ...state,
        items: [...state.items, { ...item, quantity }],
      };
    }

    case 'REMOVE_ITEM': {
      const filteredItems = state.items.filter(
        item => !(
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
        )
      );
      return { ...state, items: filteredItems };
    }

    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item => {
        if (
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
        ) {
          return { ...item, quantity: Math.max(0, action.payload.quantity) };
        }
        return item;
      }).filter(item => item.quantity > 0);

      return { ...state, items: updatedItems };
    }

    case 'CLEAR_CART':
      return { ...state, items: [] };

    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };

    case 'OPEN_CART':
      return { ...state, isOpen: true };

    case 'CLOSE_CART':
      return { ...state, isOpen: false };

    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: number, size?: string, color?: string) => void;
  updateQuantity: (id: number, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('vanguard-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        parsedCart.forEach((item: CartItem) => {
          dispatch({ type: 'ADD_ITEM', payload: item });
        });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('vanguard-cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: number, size?: string, color?: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, size, color } });
  };

  const updateQuantity = (id: number, quantity: number, size?: string, color?: string) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity, size, color } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    getTotalItems,
    getTotalPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};  */
/*
"use client";

import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart-context";

export default function CartDrawer() {
  const { state, removeItem, updateQuantity, closeCart, getTotalItems, getTotalPrice } = useCart();

  if (!state.isOpen) return null;

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <>
      {/* Backdrop *//*}
      <div 
        className="fixed inset-0 z-50 bg-black/50" 
        onClick={closeCart}
      />
      
      {/* Drawer *//*}
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-background shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header *//*}
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">
              Shopping Cart ({totalItems})
            </h2>
            <Button variant="ghost" size="icon" onClick={closeCart}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Items *//*}
          <div className="flex-1 overflow-y-auto p-4">
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
                    <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                    
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium line-clamp-2">
                            {item.name}
                          </h4>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {item.size && <span>Size: {item.size}</span>}
                            {item.size && item.color && <span> • </span>}
                            {item.color && <span>Color: {item.color}</span>}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeItem(item.id, item.size, item.color)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center border rounded">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.size, item.color)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.size, item.color)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="text-sm font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer *//*}
          {state.items.length > 0 && (
            <div className="border-t p-4">
              <div className="mb-4 flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="space-y-2">
                <Button asChild className="w-full" onClick={closeCart}>
                  <Link href="/cart">View Cart</Link>
                </Button>
                <Button variant="outline" className="w-full" onClick={closeCart}>
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
*/
/*
import Image from "next/image";
import { ChevronRight, Minus, Plus, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductReviews from "@/components/product-reviews";
import RelatedProducts from "@/components/related-products";
import AddToCartButton from "@/components/add-to-cart-button";

// This would come from a database/API in a real application
const products = [
  {
    id: "1",
    name: "Tailored Cotton Overshirt",
    price: 189.00,
    description: "Crafted from premium cotton with a brushed finish for exceptional comfort and durability. This versatile overshirt features a relaxed fit with clean lines and minimal detailing for a contemporary silhouette.",
    details: [
      "100% organic cotton",
      "Relaxed fit",
      "Button closure",
      "Two chest patch pockets",
      "Split hem",
      "Machine washable"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Stone", "Navy", "Black"],
    images: [
      "https://images.pexels.com/photos/5384428/pexels-photo-5384428.jpeg",
      "https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg",
      "https://images.pexels.com/photos/5384427/pexels-photo-5384427.jpeg",
      "https://images.pexels.com/photos/5384426/pexels-photo-5384426.jpeg"
    ],
    category: "Men",
  },
  {
    id: "2",
    name: "Classic Denim Jacket",
    price: 159.00,
    description: "A timeless denim jacket crafted from premium cotton denim. Features a classic fit with traditional detailing.",
    details: [
      "100% cotton denim",
      "Classic fit",
      "Button closure",
      "Four pockets",
      "Adjustable waist tabs",
      "Machine washable"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Light Blue", "Dark Blue", "Black"],
    images: [
      "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg",
      "https://images.pexels.com/photos/7679721/pexels-photo-7679721.jpeg",
      "https://images.pexels.com/photos/7679722/pexels-photo-7679722.jpeg",
      "https://images.pexels.com/photos/7679723/pexels-photo-7679723.jpeg"
    ],
    category: "Men",
  },
  {
    id: "5",
    name: "Wool Blend Peacoat",
    price: 299.00,
    description: "A sophisticated peacoat crafted from a premium wool blend. Features a classic double-breasted design with modern tailoring for a refined silhouette.",
    details: [
      "80% wool, 20% polyester blend",
      "Double-breasted design",
      "Side pockets",
      "Interior pocket",
      "Fully lined",
      "Dry clean only"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Navy", "Charcoal", "Black"],
    images: [
      "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg",
      "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg",
      "https://images.pexels.com/photos/1183267/pexels-photo-1183267.jpeg",
      "https://images.pexels.com/photos/1183268/pexels-photo-1183268.jpeg"
    ],
    category: "Men",
  }
];

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const productData = products.find(product => product.id === params.id) || products[0];

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="container py-8 md:py-12">
        {/* Breadcrumbs *//*}
        <div className="mb-6 flex items-center text-sm text-muted-foreground">
          <a href="/shop" className="hover:text-foreground">Shop</a>
          <ChevronRight className="mx-1 h-4 w-4" />
          <a href={`/shop?category=${productData.category.toLowerCase()}`} className="hover:text-foreground">{productData.category}</a>
          <ChevronRight className="mx-1 h-4 w-4" />
          <span className="text-foreground">{productData.name}</span>
        </div>
        
        {/* Product Section *//*}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12 xl:grid-cols-5">
          {/* Product Images *//*}
          <div className="xl:col-span-3">
            <div className="grid gap-4 md:grid-cols-2">
              {productData.images.slice(0, 4).map((image, index) => (
                <div 
                  key={index}
                  className={`relative aspect-[3/4] w-full overflow-hidden bg-muted ${
                    index === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${productData.name} - Image ${index + 1}`}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Details *//*}
          <div className="sticky top-24 xl:col-span-2">
            <h1 className="font-serif text-3xl font-light md:text-4xl">{productData.name}</h1>
            <p className="mt-2 text-xl font-medium">${productData.price.toFixed(2)}</p>
            
            <Separator className="my-6" />
            
            {/* Color Selection *//*}
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Color</span>
                <span className="text-sm text-muted-foreground">Stone</span>
              </div>
              <div className="flex gap-3">
                {productData.colors.map((color) => (
                  <button
                    key={color}
                    className={`relative h-8 w-8 rounded-full border ${
                      color === "Stone" 
                        ? "border-primary bg-stone-200" 
                        : color === "Navy" 
                          ? "border-border bg-navy-600" 
                          : "border-border bg-black"
                    }`}
                    aria-label={color}
                  >
                    {color === "Stone" && (
                      <span className="absolute -inset-1 rounded-full border border-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Size Selection *//*}
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Size</span>
                <button className="text-sm text-primary">Size Guide</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {productData.sizes.map((size) => (
                  <button
                    key={size}
                    className={`flex h-10 items-center justify-center rounded-md border ${
                      size === "M" 
                        ? "border-primary bg-primary text-primary-foreground" 
                        : "border-border bg-background hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Add to Cart *//*}
            <div className="mb-6 flex gap-2">
              <AddToCartButton
                product={{
                  id: parseInt(productData.id),
                  name: productData.name,
                  price: productData.price,
                  image: productData.images[0],
                  category: productData.category,
                }}
                size="M"
                color="Stone"
                className="flex-1"
                size="lg"
              />
              <Button size="lg" variant="outline" className="flex w-12 items-center justify-center">
                <Heart className="h-4 w-4" />
                <span className="sr-only">Add to Wishlist</span>
              </Button>
            </div>
            
            {/* Product Description *//*}
            <p className="text-muted-foreground">{productData.description}</p>
            
            <Separator className="my-6" />
            
            {/* Product Information Tabs *//*}
            <Tabs defaultValue="details" className="mt-6">
              <TabsList className="w-full border-b bg-transparent p-0">
                <TabsTrigger
                  value="details"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="shipping"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Shipping
                </TabsTrigger>
                <TabsTrigger
                  value="care"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Care
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="pt-4">
                <ul className="space-y-1 text-sm">
                  {productData.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="shipping" className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Free standard shipping on all orders over $100. Delivery usually takes 3-5 business days.
                  Express shipping available at checkout. International shipping available to select countries.
                </p>
              </TabsContent>
              <TabsContent value="care" className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Machine wash cold with similar colors. Tumble dry low. Do not bleach.
                  Cool iron if necessary. Do not dry clean.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Reviews Section *//*}
        <div className="mt-16">
          <h2 className="mb-8 font-serif text-2xl font-light md:text-3xl">Customer Reviews</h2>
          <ProductReviews />
        </div>
        
        {/* Related Products *//*}
        <div className="mt-16">
          <h2 className="mb-8 font-serif text-2xl font-light md:text-3xl">You May Also Like</h2>
          <RelatedProducts />
        </div>
      </div>
    </main>
  );
}
  */
 /*  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('token', data.token);
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
*/
/*
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('token', data.token);
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="container flex flex-col items-center py-8 md:py-12">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="mb-2 font-serif text-3xl font-light">Welcome Back</h1>
            <p className="text-muted-foreground">
              Sign in to your Vanguard account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-9"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-9"
                    required
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
          </form>

          <Separator />

          <div className="relative flex justify-center text-xs uppercase mt-6">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full">Google</Button>
            <Button variant="outline" className="w-full">Apple</Button>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}*/
/*
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const rawText = await res.text();
      let data;
      try {
        data = JSON.parse(rawText);
      } catch {
        throw new Error("Unexpected server response. Please try again.");
      }

      if (!res.ok) {
        throw new Error(data?.message || "Registration failed");
      }

      router.push("/auth/login");
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Helper for social login (placeholder)
  const handleSocialLogin = (provider: string) => {
    setErrorMsg("");
    setLoading(true);
    // Implement actual social login here
    setTimeout(() => {
      setLoading(false);
      setErrorMsg("Social login is not implemented yet.");
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="container flex flex-col items-center py-8 md:py-12">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="mb-2 font-serif text-3xl font-light">Create Account</h1>
            <p className="text-muted-foreground">
              Join Vanguard to start shopping
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-9"
                    required
                    autoComplete="name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-9"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-9"
                    required
                    minLength={6}
                    autoComplete="new-password"
                  />
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="text-red-500 text-sm text-center">{errorMsg}</div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="w-full"
                type="button"
                onClick={() => handleSocialLogin("google")}
                disabled={loading}
              >
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full"
                type="button"
                onClick={() => handleSocialLogin("apple")}
                disabled={loading}
              >
                Apple
              </Button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}*/
/*
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Minus, Plus, X, ArrowLeft, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart-context";
import styles from "./page.module.css";

export default function CartPage() {
  const { state, removeItem, updateQuantity, getTotalItems, getTotalPrice } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setAppliedPromo("WELCOME10");
      setPromoCode("");
    } else {
      // Error depending on real app
      setPromoCode("");
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // need to check checkout process and than simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      //redirect to checkout page after completing
    }, 2000);
  };

  const subtotal = getTotalPrice();
  const discount = appliedPromo === "WELCOME10" ? subtotal * 0.1 : 0;
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  const totalItems = getTotalItems();

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h1 className={styles.title}>Shopping Cart</h1>
          <p className={styles.subtitle}>
            {state.items.length > 0 
              ? `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`
              : "Your cart is empty"
            }
          </p>
        </div>

        {state.items.length === 0 ? (
          <div className={styles.emptyState}>
            <ShoppingBag className={styles.emptyIcon} />
            <h2 className={styles.emptyTitle}>Your cart is empty</h2>
            <p className={styles.emptyDescription}>
              Looks like you haven't added any items to your cart yet. 
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
            {/* Cart Items *//*}
            <div className={styles.cartItems}>
              {state.items.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  
                  <div className={styles.itemDetails}>
                    <div className={styles.itemHeader}>
                      <div className={styles.itemInfo}>
                        <h3 className={styles.itemName}>{item.name}</h3>
                        <div className={styles.itemCategory}>{item.category}</div>
                        <div className={styles.itemVariants}>
                          {item.size && <span>Size: {item.size}</span>}
                          {item.size && item.color && <span> • </span>}
                          {item.color && <span>Color: {item.color}</span>}
                        </div>
                      </div>
                      <div className={styles.itemPrice}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                    
                    <div className={styles.itemActions}>
                      <div className={styles.quantityControls}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.size, item.color)}
                          className={styles.quantityButton}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <div className={styles.quantityDisplay}>
                          {item.quantity}
                        </div>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.size, item.color)}
                          className={styles.quantityButton}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeItem(item.id, item.size, item.color)}
                        className={styles.removeButton}
                        aria-label="Remove item"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              <Link href="/shop" className={styles.continueShoppingLink}>
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Link>
            </div>

            {/* Cart Summary *//*}
            <div className={styles.cartSummary}>
              <div className={styles.summaryCard}>
                <h2 className={styles.summaryTitle}>Order Summary</h2>
                
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Subtotal ({totalItems} items)</span>
                  <span className={styles.summaryValue}>${subtotal.toFixed(2)}</span>
                </div>
                
                {appliedPromo && (
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Discount ({appliedPromo})</span>
                    <span className={styles.summaryValue}>-${discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Shipping</span>
                  <span className={styles.summaryValue}>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Tax</span>
                  <span className={styles.summaryValue}>${tax.toFixed(2)}</span>
                </div>
                
                <Separator className="my-4" />
                
                <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                  <span className={styles.summaryTotalLabel}>Total</span>
                  <span className={styles.summaryTotalValue}>${total.toFixed(2)}</span>
                </div>
                
                <div className={styles.checkoutActions}>
                  <Button 
                    size="lg" 
                    className="w-full"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                  </Button>
                  <Button variant="outline" size="lg" className="w-full" asChild>
                    <Link href="/shop">Continue Shopping</Link>
                  </Button>
                </div>
                
                {shipping === 0 && (
                  <div className={styles.shippingInfo}>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      <span>Free shipping on orders over $100</span>
                    </div>
                  </div>
                )}
                
                {/* Promo Code Section *//*}
                <div className={styles.promoSection}>
                  <h3 className={styles.promoTitle}>Promo Code</h3>
                  <div className={styles.promoForm}>
                    <input
                      type="text"
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className={styles.promoInput}
                    />
                    <Button 
                      variant="outline" 
                      onClick={applyPromoCode}
                      className={styles.promoButton}
                      disabled={!promoCode.trim()}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
*/
/*
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, Search, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCart } from "@/lib/cart-context";

const mainNavItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, getTotalItems } = useCart();
  const totalItems = getTotalItems();

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleAccountClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      console.log("User is logged in, redirecting to profile...");
      router.push("/auth/profile");
    } else {
      console.log("User not logged in, redirecting to login...");
      router.push("/auth/login");
    }
  };

  return (
    <header
      className={cn(
        "fixed left-0 top-0 z-50 w-full",
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm"
          : "bg-transparent",
        pathname === "/" && !isScrolled ? "text-white" : "text-foreground"
      )}
    >
      <div className="container flex h-16 items-center justify-between md:h-20">
        {/* Mobile menu toggle *//*}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileMenu}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Logo *//*}
        <div className="flex-1 md:flex-none">
          <Link href="/" className="font-serif text-xl font-light tracking-wide">
            VANGUARD
          </Link>
        </div>

        {/* Desktop navigation *//*}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-center">
          <ul className="flex items-center gap-6">
            {mainNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary" : ""
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions *//*}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Updated Account button *//*}
          <Button variant="ghost" size="icon" onClick={handleAccountClick}>
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={toggleCart}
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
            <span className="sr-only">Cart ({totalItems})</span>
          </Button>

          <ThemeToggle />
        </div>
      </div>

      {/* Mobile menu *//*}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col bg-background p-6 transition-transform duration-300 md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-[-100%]"
        )}
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="font-serif text-xl font-light tracking-wide"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            VANGUARD
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="rounded-full"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>

        <nav className="mt-8 flex-1">
          <ul className="flex flex-col gap-4">
            {mainNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block py-2 text-lg font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary" : ""
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <div className="flex items-center justify-between border-t border-border pt-4">
            <span className="text-sm font-medium">Switch Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
*/
/*
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ Added

import { Package, Heart, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import styles from "./page.module.css";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter(); // ✅

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Logout failed:", errorData.message || "Unknown error");
        return;
      }

      console.log("Logout successful");
      localStorage.removeItem("token");
      router.push("/login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className={`container ${styles.container}`}>
        <div className={styles.mainGrid}>
          {/* Sidebar*//*}
          <div className={styles.sidebar}>
            <div className={styles.profileHeader}>
              <div className={styles.profileImage}>
                <Image
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                  alt="Profile picture"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className={styles.profileName}>Sarah Johnson</h2>
                <p className={styles.profileEmail}>sarah@gmail.com</p>
              </div>
            </div>

            <Separator />

            <nav className={styles.navigation}>
              <div className={styles.navList}>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/profile/orders">
                    <Package className="mr-2 h-4 w-4" />
                    Orders
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/wishlist">
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/profile/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:text-red-600"
                  onClick={handleLogout} // ✅ Hooked logout
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
}
*/

// "use client";

// import { useState } from "react";
// import { ShoppingCart, Check } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { useCart } from "@/lib/cart-context";
// import { cn } from "@/lib/utils";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   category: string;
// }

// interface AddToCartButtonProps {
//   product: Product;
//   color?: string;
//   quantity?: number;
//   className?: string;
//   size?: "sm" | "default" | "lg";
//   variant?: "default" | "outline" | "ghost";
//   showIcon?: boolean;
//   children?: React.ReactNode;
// }

// export default function AddToCartButton({
//   product,
//   size: selectedSize,
//   color: selectedColor = "Default",
//   quantity = 1,
//   className,
//   size = "default",
//   variant = "default",
//   showIcon = true,
//   children,
// }: AddToCartButtonProps) {
//   const { addItem } = useCart();
//   const [isAdding, setIsAdding] = useState(false);
//   const [isAdded, setIsAdded] = useState(false);

//   const handleAddToCart = async () => {
//     setIsAdding(true);
    
//     // Simulate API call delay
//     await new Promise(resolve => setTimeout(resolve, 500));
    
//     addItem({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       image: product.image,
//       category: product.category,
//       size: selectedSize,
//       color: selectedColor,
//       quantity,
//     });

//     setIsAdding(false);
//     setIsAdded(true);

//     // Reset added state after animation
//     setTimeout(() => {
//       setIsAdded(false);
//     }, 2000);
//   };

//   return (
//     <Button
//       onClick={handleAddToCart}
//       disabled={isAdding || isAdded}
//       className={cn(className)}
//       size={size}
//       variant={variant}
//     >
//       {isAdding ? (
//         <>
//           {showIcon && <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
//           Adding...
//         </>
//       ) : isAdded ? (
//         <>
//           {showIcon && <Check className="mr-2 h-4 w-4" />}
//           Added!
//         </>
//       ) : (
//         <>
//           {showIcon && <ShoppingCart className="mr-2 h-4 w-4" />}
//           {children || "Add to Cart"}
//         </>
//       )}
//     </Button>
//   );
// }

// import Image from "next/image";
// import Link from "next/link";
// import { ArrowRight } from "lucide-react";

// import styles from "./page.module.css";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// export default function LookbookPage() {
//   return (
//     <main className={styles.main}>
//       {/* Hero Section */}
//       <section className={styles.heroSection}>
//         <Image
//           src="https://images.pexels.com/photos/2566025/pexels-photo-2566025.jpeg"
//           alt="Vanguard Lookbook"
//           fill
//           className={styles.heroImage}
//           priority
//         />
//         <div className={styles.overlay} />
//         <div className={styles.heroTextContainer}>
//           <h1 className={styles.heroTitle}>Lookbook</h1>
//         </div>
//       </section>

//       {/* Collections Tabs */}
//       <section className={styles.tabsSection}>
//         <Tabs defaultValue="summer2025" className="w-full">
//           <div className={styles.tabsHeader}>
//             <TabsList className={styles.tabsList}>
//               {["Summer 2025", "Spring 2025", "Winter 2024", "Fall 2024"].map((season) => (
//                 <TabsTrigger
//                   key={season}
//                   value={season.toLowerCase().replace(" ", "")}
//                   className={styles.tabsTrigger}
//                 >
//                   {season}
//                 </TabsTrigger>
//               ))}
//             </TabsList>
//           </div>

//           {/* Summer 2025 Collection */}
//           <TabsContent value="summer2025" className="mt-0">
//             <div className={styles.collectionIntro}>
//               <h2 className={styles.collectionTitle}>Coastal Modernism</h2>
//               <p className="text-muted-foreground">
//                 Our Summer 2025 collection draws inspiration from the meeting point of architecture and coastline. Clean lines and structured silhouettes are softened by lightweight fabrics and a palette of sand, sea foam, and terracotta that evokes Mediterranean summers.
//               </p>
//               <div className="mt-6">
//                 <Button asChild variant="outline">
//                   <Link href="/shop?collection=summer2025" className="flex items-center">
//                     Shop the Collection
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </Link>
//                 </Button>
//               </div>
//             </div>

//             <div className={styles.gridWrapper}>
//               <div className={styles.gridColumn}>
//                 {[
//                   "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg",
//                   "https://images.pexels.com/photos/2853909/pexels-photo-2853909.jpeg",
//                 ].map((src, index) => (
//                   <div key={index} className={styles.imageCard}>
//                     <Image
//                       src={src}
//                       alt={`Summer 2025 lookbook image ${index + 1}`}
//                       fill
//                       className={styles.gridImage}
//                     />
//                   </div>
//                 ))}
//               </div>
//               <div className={styles.gridColumn}>
//                 {[
//                   "https://images.pexels.com/photos/2778144/pexels-photo-2778144.jpeg",
//                   "https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg",
//                 ].map((src, index) => (
//                   <div key={index} className={styles.imageCard}>
//                     <Image
//                       src={src}
//                       alt={`Summer 2025 lookbook image ${index + 3}`}
//                       fill
//                       className={styles.gridImage}
//                     />
//                   </div>
//                 ))}
//               </div>
//               <div className={`${styles.gridColumn} hidden lg:grid`}>
//                 {[
//                   "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg",
//                   "https://images.pexels.com/photos/1726496/pexels-photo-1726496.jpeg",
//                 ].map((src, index) => (
//                   <div key={index} className={styles.imageCard}>
//                     <Image
//                       src={src}
//                       alt={`Summer 2025 lookbook image ${index + 5}`}
//                       fill
//                       className={styles.gridImage}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </TabsContent>

//           <TabsContent value="spring2025">
//             <div className={styles.emptyCollection}>
//               <p className="text-muted-foreground">Spring 2025 collection coming soon.</p>
//             </div>
//           </TabsContent>
//           <TabsContent value="winter2024">
//             <div className={styles.emptyCollection}>
//               <p className="text-muted-foreground">Winter 2024 collection coming soon.</p>
//             </div>
//           </TabsContent>
//           <TabsContent value="fall2024">
//             <div className={styles.emptyCollection}>
//               <p className="text-muted-foreground">Fall 2024 collection coming soon.</p>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </section>

//       {/* Behind the Scenes */}
//       <section className={styles.btsSection}>
//         <div className="container">
//           <h2 className={styles.btsTitle}>Behind the Scenes</h2>
//           <div className={styles.btsGrid}>
//             <div className={styles.btsImageWrapper}>
//               <Image
//                 src="https://images.pexels.com/photos/2451259/pexels-photo-2451259.jpeg"
//                 alt="Behind the scenes - photoshoot"
//                 fill
//                 className={styles.gridImage}
//               />
//             </div>
//             <div className={styles.btsText}>
//               <h3 className={styles.btsSubheading}>Summer 2025 Campaign</h3>
//               <p className="mb-4 text-muted-foreground">
//                 Shot on location in Santorini, Greece, our Summer 2025 campaign captures the essence of Mediterranean architecture against the iconic blue and white landscape. We collaborated with renowned photographer Elena Mayer to bring our vision to life.
//               </p>
//               <p className="text-muted-foreground">
//                 The campaign features models from diverse backgrounds, each bringing their unique energy to showcase the versatility and inclusivity of our designs.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
//lib/wishlist-context.tsx
"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";

export interface WishlistItem {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    dateAdded: string;
}

interface WishlistState {
    items: WishlistItem[];
}

type WishlistAction = 
    | { type: 'ADD_ITEM'; payload: Omit<WishlistItem, 'dateAdded'> }
    | { type: 'REMOVE_ITEM'; payload: { id: number } }
    | { type: 'CLEAR_WISHLIST' };

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItemIndex = state.items.findIndex(
                item => item.id === action.payload.id
            );

            if (existingItemIndex > -1) {
                // Item already exists, don't add duplicate
                return state;
            }

            const newItem: WishlistItem = {
                ...action.payload,
                dateAdded: new Date().toISOString().split('T')[0]
            };

            return {
                ...state,
                items: [...state.items, newItem],
            };
        }

        case 'REMOVE_ITEM': {
            const filteredItems = state.items.filter(
                item => item.id !== action.payload.id
            );
            return { ...state, items: filteredItems };
        }

        case 'CLEAR_WISHLIST':
            return { ...state, items: [] };

        default:
            return state;
    }
};

interface WishlistContextType {
    state: WishlistState;
    addItem: (item: Omit<WishlistItem, 'dateAdded'>) => void;
    removeItem: (id: number) => void;
    clearWishlist: () => void;
    isInWishlist: (id: number) => boolean;
    getTotalItems: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(wishlistReducer, {
        items: [],
    });

    // Load wishlist from localStorage on mount
    useEffect(() => {
        const savedWishlist = localStorage.getItem('vanguard-wishlist');
        if (savedWishlist) {
            try {
                const parsedWishlist = JSON.parse(savedWishlist);
                parsedWishlist.forEach((item: WishlistItem) => {
                    dispatch({ type: 'ADD_ITEM', payload: item });
                });
            } catch (error) {
                console.error('Error loading wishlist from localStorage:', error);
            }
        }
    }, []);

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('vanguard-wishlist', JSON.stringify(state.items));
    }, [state.items]);

    const addItem = (item: Omit<WishlistItem, 'dateAdded'>) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
    };

    const removeItem = (id: number) => {
        dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    };

    const clearWishlist = () => {
        dispatch({ type: 'CLEAR_WISHLIST' });
    };

    const isInWishlist = (id: number) => {
        return state.items.some(item => item.id === id);
    };

    const getTotalItems = () => {
        return state.items.length;
    };

    const value: WishlistContextType = {
        state,
        addItem,
        removeItem,
        clearWishlist,
        isInWishlist,
        getTotalItems,
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
//app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import CartDrawer from "@/components/cart-drawer";

// Fonts with increased timeout
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap', // Fallback handling
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif",
  display: 'swap', // Fallback handling
});

export const metadata: Metadata = {
  title: "Vanguard Apparel | Premium Contemporary Fashion",
  description: "Redefining contemporary fashion with timeless elegance and bold innovation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <WishlistProvider>
            <CartProvider>
              <SiteHeader />
              {children}
              <SiteFooter />
              <CartDrawer />
            </CartProvider>
          </WishlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*

//components/wishlist-button.tsx

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
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
//components/products-grid.tsx

import Link from "next/link";
import Image from "next/image";

import AddToCartButton from "@/components/add-to-cart-button";
import WishlistButton from "@/components/wishlist-button";

// Sample product data (in a real app, this would come from a database/API)
const products = [
  {
    id: 1,
    name: "Tailored Cotton Overshirt",
    price: 189.00,
    image: "https://images.pexels.com/photos/5384428/pexels-photo-5384428.jpeg",
    category: "Men",
    isNew: true,
  },
  {
    id: 2,
    name: "Structured Wool Blazer",
    price: 290.00,
    image: "https://images.pexels.com/photos/5384425/pexels-photo-5384425.jpeg",
    category: "Women",
    isNew: true,
  },
  {
    id: 3,
    name: "Relaxed Linen Shirt",
    price: 120.00,
    image: "https://images.pexels.com/photos/5384429/pexels-photo-5384429.jpeg",
    category: "Men",
    isNew: true,
  },
  {
    id: 4,
    name: "High-Waist Tapered Pants",
    price: 175.00,
    image: "https://images.pexels.com/photos/5384424/pexels-photo-5384424.jpeg",
    category: "Women",
    isNew: true,
  },
  {
    id: 5,
    name: "Oversized Merino Sweater",
    price: 210.00,
    image: "https://images.pexels.com/photos/5709656/pexels-photo-5709656.jpeg",
    category: "Women",
  },
  {
    id: 6,
    name: "Slim Fit Selvedge Jeans",
    price: 165.00,
    image: "https://images.pexels.com/photos/1346187/pexels-photo-1346187.jpeg",
    category: "Men",
  },
  {
    id: 7,
    name: "Cropped Cotton Jacket",
    price: 245.00,
    image: "https://images.pexels.com/photos/7691168/pexels-photo-7691168.jpeg",
    category: "Women",
  },
  {
    id: 8,
    name: "Textured Knit Cardigan",
    price: 195.00,
    image: "https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg",
    category: "Men",
  },
  {
    id: 9,
    name: "Wide-Leg Wool Trousers",
    price: 195.00,
    image: "https://images.pexels.com/photos/9558598/pexels-photo-9558598.jpeg",
    category: "Women",
  },
];

export default function ProductsGrid() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: typeof products[0] }) {
  return (
    <div className="group relative flex flex-col">
      <div className="relative mb-4 aspect-[3/4] w-full overflow-hidden rounded-md bg-muted">
        <Link href={`/shop/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="absolute inset-0 bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/5 group-hover:opacity-100" />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <AddToCartButton
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              category: product.category,
            }}
            className="rounded-full"
            size="sm"
          />
        </div>
        <WishlistButton
          product={{
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
          }}
          className="absolute right-3 top-3 h-8 w-8 rounded-full bg-background opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100"
        />
        {product.isNew && (
          <div className="absolute left-4 top-4 rounded-full bg-background px-3 py-1 text-xs font-medium shadow-sm">
            New
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col">
        <div className="mb-1 text-xs text-muted-foreground">{product.category}</div>
        <h3 className="mb-2 font-medium">
          <Link
            href={`/shop/${product.id}`}
            className="line-clamp-2 transition-colors hover:text-primary"
          >
            {product.name}
          </Link>
        </h3>
        <div className="mt-auto text-sm font-medium">${product.price.toFixed(2)}</div>
      </div>
    </div>
  );
}
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
//components/featured-products.tsx

import Link from "next/link";
import Image from "next/image";

import AddToCartButton from "@/components/add-to-cart-button";
import WishlistButton from "@/components/wishlist-button";

// Sample product data (in a real app, this would come from a database/API)
const products = [
  {
    id: 1,
    name: "Tailored Cotton Overshirt",
    price: 189.00,
    image: "https://images.pexels.com/photos/5384428/pexels-photo-5384428.jpeg",
    category: "Men",
    isNew: true,
  },
  {
    id: 2,
    name: "Structured Wool Blazer",
    price: 290.00,
    image: "https://images.pexels.com/photos/5384425/pexels-photo-5384425.jpeg",
    category: "Women",
    isNew: true,
  },
  {
    id: 3,
    name: "Relaxed Linen Shirt",
    price: 120.00,
    image: "https://images.pexels.com/photos/5384429/pexels-photo-5384429.jpeg",
    category: "Men",
    isNew: true,
  },
  {
    id: 4,
    name: "High-Waist Tapered Pants",
    price: 175.00,
    image: "https://images.pexels.com/photos/5384424/pexels-photo-5384424.jpeg",
    category: "Women",
    isNew: true,
  },
];

export default function FeaturedProducts() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: typeof products[0] }) {
  return (
    <div className="group relative flex flex-col">
      <div className="relative mb-4 aspect-[3/4] w-full overflow-hidden bg-muted">
        <Link href={`/shop/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="absolute inset-0 bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/5 group-hover:opacity-100" />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <AddToCartButton
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              category: product.category,
            }}
            className="rounded-full"
            size="sm"
          />
        </div>
        <WishlistButton
          product={{
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
          }}
          className="absolute right-3 top-3 h-8 w-8 rounded-full bg-background opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100"
        />
        {product.isNew && (
          <div className="absolute left-4 top-4 rounded-full bg-background px-3 py-1 text-xs font-medium">
            New
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col">
        <div className="mb-1 text-xs text-muted-foreground">{product.category}</div>
        <h3 className="mb-2 font-medium">
          <Link
            href={`/shop/${product.id}`}
            className="line-clamp-2 transition-colors hover:text-primary"
          >
            {product.name}
          </Link>
        </h3>
        <div className="mt-auto text-sm font-medium">${product.price.toFixed(2)}</div>
      </div>
    </div>
  );
}
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // app/shop/[id]/page.tsx

// import Image from "next/image";
// import { ChevronRight, Minus, Plus } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import ProductReviews from "@/components/product-reviews";
// import RelatedProducts from "@/components/related-products";
// import AddToCartButton from "@/components/add-to-cart-button";
// import WishlistButton from "@/components/wishlist-button";

// // This would come from a database/API in a real application
// const products = [
//   {
//     id: "1",
//     name: "Tailored Cotton Overshirt",
//     price: 189.00,
//     description: "Crafted from premium cotton with a brushed finish for exceptional comfort and durability. This versatile overshirt features a relaxed fit with clean lines and minimal detailing for a contemporary silhouette.",
//     details: [
//       "100% organic cotton",
//       "Relaxed fit",
//       "Button closure",
//       "Two chest patch pockets",
//       "Split hem",
//       "Machine washable"
//     ],
//     sizes: ["XS", "S", "M", "L", "XL"],
//     colors: ["Stone", "Navy", "Black"],
//     images: [
//       "https://images.pexels.com/photos/6311394/pexels-photo-6311394.jpeg",
//       "https://images.pexels.com/photos/6311403/pexels-photo-6311403.jpeg",
//       "https://images.pexels.com/photos/6311401/pexels-photo-6311401.jpeg",
//       "https://images.pexels.com/photos/6311400/pexels-photo-6311400.jpeg"
//     ],
//     category: "Men",
//   },
//   {
//     id: "2",
//     name: "Structured Wool Blazer",
//     price: 159.00,
//     description: "A timeless denim jacket crafted from premium cotton denim. Features a classic fit with traditional detailing.",
//     details: [
//       "100% cotton denim",
//       "Classic fit",
//       "Button closure",
//       "Four pockets",
//       "Adjustable waist tabs",
//       "Machine washable"
//     ],
//     sizes: ["XS", "S", "M", "L", "XL"],
//     colors: ["Light Blue", "Dark Blue", "Black"],
//     images: [
//       "https://images.pexels.com/photos/937520/pexels-photo-937520.jpeg",
//       "https://images.pexels.com/photos/975657/pexels-photo-975657.jpeg",
//       "https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg",
//       "https://images.pexels.com/photos/1176896/pexels-photo-1176896.jpeg"
//     ],
//     category: "Men",
//   },
//   {
//     id: "3",
//     name: "Relaxed Linen Shirt",
//     price: 219.00,
//     description: "A lightweight yet warm puffer jacket with a quilted shell and down-alternative fill. Ideal for cold-weather layering.",
//     details: [
//       "Nylon shell with polyester fill",
//       "Quilted design",
//       "Zip-up front",
//       "Side zip pockets",
//       "Packable into included pouch",
//       "Machine washable"
//     ],
//     sizes: ["S", "M", "L", "XL", "XXL"],
//     colors: ["Olive", "Black", "Grey"],
//     images: [
//       "https://images.pexels.com/photos/1125133/pexels-photo-1125133.jpeg",
//       "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg",
//       "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg",
//       "https://images.pexels.com/photos/1846548/pexels-photo-1846548.jpeg"
//     ],
//     category: "Men",
//   },
//   {
//     id: "4",
//     name: "High-Waist Tapered Pants",
//     price: 175.00,
//     description: "A breathable, lightweight shirt made from a linen-cotton blend, perfect for warmer climates and casual styling.",
//     details: [
//       "55% linen, 45% cotton",
//       "Button-down collar",
//       "Regular fit",
//       "Breathable fabric",
//       "Chest pocket",
//       "Machine washable"
//     ],
//     sizes: ["XS", "S", "M", "L", "XL"],
//     colors: ["White", "Sky Blue", "Beige"],
//     images: [
//       "https://images.pexels.com/photos/1812972/pexels-photo-1812972.jpeg",
//       "https://images.pexels.com/photos/7940629/pexels-photo-7940629.jpeg",
//       "https://images.pexels.com/photos/1812965/pexels-photo-1812965.jpeg",
//       "https://images.pexels.com/photos/7940623/pexels-photo-7940623.jpeg"
//     ],
//     category: "Men",
//   },
//   {
//     id: "5",
//     name: "Oversized Merino Sweater",
//     price: 210.00,
//     description: "A sophisticated peacoat crafted from a premium wool blend. Features a classic double-breasted design with modern tailoring for a refined silhouette.",
//     details: [
//       "80% wool, 20% polyester blend",
//       "Double-breasted design",
//       "Side pockets",
//       "Interior pocket",
//       "Fully lined",
//       "Dry clean only"
//     ],
//     sizes: ["XS", "S", "M", "L", "XL"],
//     colors: ["Navy", "Charcoal", "Black"],
//     images: [
//       "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg",
//       "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg",
//       "https://images.pexels.com/photos/1183267/pexels-photo-1183267.jpeg",
//       "https://images.pexels.com/photos/1183268/pexels-photo-1183268.jpeg"
//     ],
//     category: "Men",
//   }
// ];

// export async function generateStaticParams() {
//   return products.map((product) => ({
//     id: product.id,
//   }));
// }

// export default async function ProductPage({ params }: { params: { id: string } }) {
//   const resolvedParams = await params;
//   const productData = products.find(product => product.id === String(resolvedParams.id)) || products[0];

//   return (
//     <main className="min-h-screen bg-background pt-24">
//       <div className="container py-8 md:py-12">
//         {/* Breadcrumbs */}
//         <div className="mb-6 flex items-center text-sm text-muted-foreground">
//           <a href="/shop" className="hover:text-foreground">Shop</a>
//           <ChevronRight className="mx-1 h-4 w-4" />
//           <a href={`/shop?category=${productData.category.toLowerCase()}`} className="hover:text-foreground">{productData.category}</a>
//           <ChevronRight className="mx-1 h-4 w-4" />
//           <span className="text-foreground">{productData.name}</span>
//         </div>
        
//         {/* Product Section */}
//         <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12 xl:grid-cols-5">
//           {/* Product Images */}
//           <div className="xl:col-span-3">
//             <div className="grid gap-4 md:grid-cols-2">
//               {productData.images.slice(0, 4).map((image, index) => (
//                 <div 
//                   key={index}
//                   className={`relative aspect-[3/4] w-full overflow-hidden bg-muted ${
//                     index === 0 ? "md:col-span-2 md:row-span-2" : ""
//                   }`}
//                 >
//                   <Image
//                     src={image}
//                     alt={`${productData.name} - Image ${index + 1}`}
//                     fill
//                     className="object-cover object-center"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           {/* Product Details */}
//           <div className="sticky top-24 xl:col-span-2">
//             <h1 className="font-serif text-3xl font-light md:text-4xl">{productData.name}</h1>
//             <p className="mt-2 text-xl font-medium">${productData.price.toFixed(2)}</p>
            
//             <Separator className="my-6" />
            
//             {/* Color Selection */}
//             <div className="mb-6">
//               <div className="mb-2 flex items-center justify-between">
//                 <span className="text-sm font-medium">Color</span>
//                 <span className="text-sm text-muted-foreground">Stone</span>
//               </div>
//               <div className="flex gap-3">
//                 {productData.colors.map((color) => (
//                   <button
//                     key={color}
//                     className={`relative h-8 w-8 rounded-full border ${
//                       color === "Stone" 
//                         ? "border-primary bg-stone-200" 
//                         : color === "Navy" 
//                           ? "border-border bg-navy-600" 
//                           : "border-border bg-black"
//                     }`}
//                     aria-label={color}
//                   >
//                     {color === "Stone" && (
//                       <span className="absolute -inset-1 rounded-full border border-primary" />
//                     )}
//                   </button>
//                 ))}
//               </div>
//             </div>
            
//             {/* Size Selection */}
//             <div className="mb-6">
//               <div className="mb-2 flex items-center justify-between">
//                 <span className="text-sm font-medium">Size</span>
//                 <button className="text-sm text-primary">Size Guide</button>
//               </div>
//               <div className="grid grid-cols-5 gap-2">
//                 {productData.sizes.map((size) => (
//                   <button
//                     key={size}
//                     className={`flex h-10 items-center justify-center rounded-md border ${
//                       size === "M" 
//                         ? "border-primary bg-primary text-primary-foreground" 
//                         : "border-border bg-background hover:border-foreground"
//                     }`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>
            
//             {/* Add to Cart */}
//             <div className="mb-6 flex gap-2">
//               <AddToCartButton
//                 product={{
//                   id: parseInt(productData.id),
//                   name: productData.name,
//                   price: productData.price,
//                   image: productData.images[0],
//                   category: productData.category,
//                 }}
//                 color="Stone"
//                 className="flex-1"
//                 size="lg"
//               />
//               <WishlistButton
//                 product={{
//                   id: parseInt(productData.id),
//                   name: productData.name,
//                   price: productData.price,
//                   image: productData.images[0],
//                   category: productData.category,
//                 }}
//                 size="lg"
//                 variant="outline"
//                 className="flex w-12 items-center justify-center"
//               />
//             </div>
            
//             {/* Product Description */}
//             <p className="text-muted-foreground">{productData.description}</p>
            
//             <Separator className="my-6" />
            
//             {/* Product Information Tabs */}
//             <Tabs defaultValue="details" className="mt-6">
//               <TabsList className="w-full border-b bg-transparent p-0">
//                 <TabsTrigger
//                   value="details"
//                   className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
//                 >
//                   Details
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="shipping"
//                   className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
//                 >
//                   Shipping
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="care"
//                   className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
//                 >
//                   Care
//                 </TabsTrigger>
//               </TabsList>
//               <TabsContent value="details" className="pt-4">
//                 <ul className="space-y-1 text-sm">
//                   {productData.details.map((detail, index) => (
//                     <li key={index} className="flex items-start">
//                       <span className="mr-2">•</span>
//                       {detail}
//                     </li>
//                   ))}
//                 </ul>
//               </TabsContent>
//               <TabsContent value="shipping" className="pt-4">
//                 <p className="text-sm text-muted-foreground">
//                   Free standard shipping on all orders over $100. Delivery usually takes 3-5 business days.
//                   Express shipping available at checkout. International shipping available to select countries.
//                 </p>
//               </TabsContent>
//               <TabsContent value="care" className="pt-4">
//                 <p className="text-sm text-muted-foreground">
//                   Machine wash cold with similar colors. Tumble dry low. Do not bleach.
//                   Cool iron if necessary. Do not dry clean.
//                 </p>
//               </TabsContent>
//             </Tabs>
//           </div>
//         </div>
        
//         {/* Reviews Section */}
//         <div className="mt-16">
//           <h2 className="mb-8 font-serif text-2xl font-light md:text-3xl">Customer Reviews</h2>
//           <ProductReviews />
//         </div>
        
//         {/* Related Products */}
//         <div className="mt-16">
//           <h2 className="mb-8 font-serif text-2xl font-light md:text-3xl">You May Also Like</h2>
//           <RelatedProducts />
//         </div>
//       </div>
//     </main>
//   );
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // app/wishlist/page.tsx

// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { Heart, X, Eye } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import AddToCartButton from "@/components/add-to-cart-button";
// import { useWishlist } from "@/lib/wishlist-context";
// import styles from "./page.module.css";

// export default function WishlistPage() {
//   const { state, removeItem, clearWishlist, getTotalItems } = useWishlist();
//   const { items } = state;

//   const totalValue = items.reduce((sum, item) => sum + item.price, 0);
//   const totalItems = getTotalItems();

//   const handleAddAllToCart = () => {
//     // This would typically add all items to cart
//     console.log("Adding all items to cart...");
//   };

//   return (
//     <main className="min-h-screen bg-background pt-24">
//       <div className={`container ${styles.container}`}>
//         <div className={styles.header}>
//           <h1 className={styles.title}>My Wishlist</h1>
//           <p className={styles.subtitle}>
//             {items.length > 0 
//               ? `${items.length} item${items.length !== 1 ? 's' : ''} saved for later`
//               : "No items in your wishlist yet"
//             }
//           </p>
//         </div>

//         {items.length === 0 ? (
//           <div className={styles.emptyState}>
//             <Heart className={styles.emptyIcon} />
//             <h2 className={styles.emptyTitle}>Your wishlist is empty</h2>
//             <p className={styles.emptyDescription}>
//               Start browsing our collections and save your favorite items to your wishlist.
//               You can add items by clicking the heart icon on any product.
//             </p>
//             <Button asChild size="lg">
//               <Link href="/shop">
//                 Start Shopping
//               </Link>
//             </Button>
//           </div>
//         ) : (
//           <>
//             <div className={styles.productsGrid}>
//               {items.map((item) => (
//                 <div key={item.id} className={styles.productCard}>
//                   <div className={styles.productImageContainer}>
//                     <Image
//                       src={item.image}
//                       alt={item.name}
//                       fill
//                       className={`object-cover object-center ${styles.productImage}`}
//                     />
//                     <button
//                       onClick={() => removeItem(item.id)}
//                       className={styles.removeButton}
//                       aria-label="Remove from wishlist"
//                     >
//                       <X className="h-4 w-4" />
//                     </button>
//                   </div>
                  
//                   <div className={styles.productContent}>
//                     <div className={styles.productCategory}>{item.category}</div>
//                     <h3 className={styles.productName}>{item.name}</h3>
//                     <div className={styles.productPrice}>${item.price.toFixed(2)}</div>
                    
//                     <div className={styles.productActions}>
//                       <AddToCartButton
//                         product={{
//                           id: item.id,
//                           name: item.name,
//                           price: item.price,
//                           image: item.image,
//                           category: item.category,
//                         }}
//                         className={styles.addToCartButton}
//                       />
//                       <Button
//                         variant="outline"
//                         size="icon"
//                         asChild
//                         className={styles.viewButton}
//                       >
//                         <Link href={`/shop/${item.id}`}>
//                           <Eye className="h-4 w-4" />
//                           <span className="sr-only">View product</span>
//                         </Link>
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Wishlist Summary */}
//             <div className={styles.summary}>
//               <h2 className={styles.summaryTitle}>Wishlist Summary</h2>
              
//               <div className={styles.summaryStats}>
//                 <span className={styles.summaryLabel}>Total Items:</span>
//                 <span className={styles.summaryValue}>{items.length}</span>
//               </div>
              
//               <div className={styles.summaryStats}>
//                 <span className={styles.summaryLabel}>Total Value:</span>
//                 <span className={styles.summaryValue}>${totalValue.toFixed(2)}</span>
//               </div>
              
//               <Separator className="my-4" />
              
//               <div className={styles.summaryActions}>
//                 <Button
//                   onClick={handleAddAllToCart}
//                   size="lg"
//                   className="flex-1"
//                 >
//                   Add All to Cart
//                 </Button>
//                 <Button
//                   variant="outline"
//                   onClick={clearWishlist}
//                   className={styles.clearAllButton}
//                 >
//                   Clear All
//                 </Button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </main>
//   );
// }
// */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
// components/related-products.tsx

import Link from "next/link";
import Image from "next/image";

import AddToCartButton from "@/components/add-to-cart-button";
import WishlistButton from "@/components/wishlist-button";

// Sample related products
const relatedProducts = [
  {
    id: 3,
    name: "Relaxed Linen Shirt",
    price: 120.00,
    image: "https://images.pexels.com/photos/5384429/pexels-photo-5384429.jpeg",
    category: "Men",
  },
  {
    id: 5,
    name: "Oversized Merino Sweater",
    price: 210.00,
    image: "https://images.pexels.com/photos/5709656/pexels-photo-5709656.jpeg",
    category: "Women",
  },
  {
    id: 8,
    name: "Textured Knit Cardigan",
    price: 195.00,
    image: "https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg",
    category: "Men",
  },
  {
    id: 9,
    name: "Wide-Leg Wool Trousers",
    price: 195.00,
    image: "https://images.pexels.com/photos/9558598/pexels-photo-9558598.jpeg",
    category: "Women",
  },
];

export default function RelatedProducts() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
      {relatedProducts.map((product) => (
        <div key={product.id} className="group relative flex flex-col">
          <div className="relative mb-4 aspect-[3/4] w-full overflow-hidden rounded-md bg-muted">
            <Link href={`/shop/${product.id}`}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
            <div className="absolute inset-0 bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/5 group-hover:opacity-100" />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <AddToCartButton
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  category: product.category,
                }}
                className="rounded-full"
                size="sm"
              />
            </div>
            <WishlistButton
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
              }}
              className="absolute right-3 top-3 h-8 w-8 rounded-full bg-background opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100"
            />
          </div>
          <div className="flex flex-1 flex-col">
            <div className="mb-1 text-xs text-muted-foreground">{product.category}</div>
            <h3 className="mb-2 font-medium">
              <Link
                href={`/shop/${product.id}`}
                className="line-clamp-2 transition-colors hover:text-primary"
              >
                {product.name}
              </Link>
            </h3>
            <div className="mt-auto text-sm font-medium">${product.price.toFixed(2)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// "use client";

// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { ShoppingBag, Menu, X, Search, User, Heart } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ThemeToggle } from "@/components/theme-toggle";
// import { useCart } from "@/lib/cart-context";
// import { useWishlist } from "@/lib/wishlist-context";

// const mainNavItems = [
//   { label: "Home", href: "/" },
//   { label: "Shop", href: "/shop" },
//   { label: "Lookbook", href: "/lookbook" },
//   { label: "Journal", href: "/journal" },
//   { label: "About", href: "/about" },
//   { label: "Contact", href: "/contact" },
// ];

// export default function SiteHeader() {
//   const pathname = usePathname();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const { toggleCart, getTotalItems } = useCart();
//   const { getTotalItems: getWishlistItems } = useWishlist();
//   const totalItems = getTotalItems();
//   const wishlistItems = getWishlistItems();

//   const router = useRouter();
//   const [query, setQuery] = useState("");

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const handleAccountClick = () => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       router.push("/profile");
//     } else {
//       router.push("/auth/login");
//     }
//   };

//   const handleWishlistClick = () => {
//     router.push("/wishlist");
//   };

//   const handleSearch = () => {
//     if (query.trim() === "") return;
//     router.push(`/shop?search=${encodeURIComponent(query)}`);
//     setIsSearchOpen(false);
//     setQuery("");
//   };

//   return (
//     <header
//       className={cn(
//         "fixed left-0 top-0 z-50 w-full",
//         isScrolled
//           ? "bg-background/90 backdrop-blur-md shadow-sm"
//           : "bg-transparent",
//         pathname === "/" && !isScrolled ? "text-white" : "text-foreground"
//       )}
//     >
//       <div className="container flex h-16 items-center justify-between md:h-20">
//         {/* Mobile menu toggle */
//         <Button
//           variant="ghost"
//           size="icon"
//           className="md:hidden"
//           onClick={toggleMobileMenu}
//         >
//           <Menu className="h-6 w-6" />
//           <span className="sr-only">Toggle menu</span>
//         </Button>

//         {/* Logo */}
//         <div className="flex-1 md:flex-none">
//           <Link href="/" className="font-serif text-xl font-light tracking-wide">
//             VANGUARD
//           </Link>
//         </div>

//         {/* Desktop navigation */}
//         <nav className="hidden md:flex md:flex-1 md:items-center md:justify-center">
//           <ul className="flex items-center gap-6">
//             {mainNavItems.map((item) => (
//               <li key={item.href}>
//                 <Link
//                   href={item.href}
//                   className={cn(
//                     "text-sm font-medium transition-colors hover:text-primary",
//                     pathname === item.href ? "text-primary" : ""
//                   )}
//                 >
//                   {item.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         {/* Actions */}
//         <div className="flex items-center gap-2">
//           {/* Search Icon */}
//           <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
//             <Search className="h-5 w-5" />
//             <span className="sr-only">Search</span>
//           </Button>

//           {/* Wishlist */}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="relative"
//             onClick={handleWishlistClick}
//           >
//             <Heart className="h-5 w-5" />
//             {wishlistItems > 0 && (
//               <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
//                 {wishlistItems > 9 ? "9+" : wishlistItems}
//               </span>
//             )}
//             <span className="sr-only">Wishlist ({wishlistItems})</span>
//           </Button>

//           {/* Account */}
//           <Button variant="ghost" size="icon" onClick={handleAccountClick}>
//             <User className="h-5 w-5" />
//             <span className="sr-only">Account</span>
//           </Button>

//           {/* Cart */}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="relative"
//             onClick={toggleCart}
//           >
//             <ShoppingBag className="h-5 w-5" />
//             {totalItems > 0 && (
//               <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
//                 {totalItems > 9 ? "9+" : totalItems}
//               </span>
//             )}
//             <span className="sr-only">Cart ({totalItems})</span>
//           </Button>

//           <ThemeToggle />
//         </div>
//       </div>

//       {/* Search input overlay */}
//       {isSearchOpen && (
//         <div className="absolute left-0 right-0 top-full bg-background border-t border-border p-4 shadow-md z-50 flex gap-2 items-center">
//           <Input
//             type="text"
//             placeholder="Search products..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="flex-1"
//             onKeyDown={(e) => {
//               if (e.key === "Enter") handleSearch();
//             }}
//           />
//           <Button onClick={handleSearch}>
//             <Search className="h-5 w-5" />
//           </Button>
//           <Button variant="ghost" onClick={() => setIsSearchOpen(false)}>
//             <X className="h-5 w-5" />
//           </Button>
//         </div>
//       )}

//       {/* Mobile menu */}
//       <div
//         className={cn(
//           "fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col bg-background p-6 transition-transform duration-300 md:hidden",
//           isMobileMenuOpen ? "translate-x-0" : "translate-x-[-100%]"
//         )}
//       >
//         <div className="flex items-center justify-between">
//           <Link
//             href="/"
//             className="font-serif text-xl font-light tracking-wide"
//             onClick={() => setIsMobileMenuOpen(false)}
//           >
//             VANGUARD
//           </Link>
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={toggleMobileMenu}
//             className="rounded-full"
//           >
//             <X className="h-6 w-6" />
//             <span className="sr-only">Close menu</span>
//           </Button>
//         </div>

//         <nav className="mt-8 flex-1">
//           <ul className="flex flex-col gap-4">
//             {mainNavItems.map((item) => (
//               <li key={item.href}>
//                 <Link
//                   href={item.href}
//                   className={cn(
//                     "block py-2 text-lg font-medium transition-colors hover:text-primary",
//                     pathname === item.href ? "text-primary" : ""
//                   )}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   {item.label}
//                 </Link>
//               </li>
//             ))}
            
//             {/* Mobile Wishlist Link */}
//             <li>
//               <Link
//                 href="/wishlist"
//                 className={cn(
//                   "flex items-center gap-2 py-2 text-lg font-medium transition-colors hover:text-primary",
//                   pathname === "/wishlist" ? "text-primary" : ""
//                 )}
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <Heart className="h-5 w-5" />
//                 Wishlist
//                 {wishlistItems > 0 && (
//                   <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
//                     {wishlistItems}
//                   </span>
//                 )}
//               </Link>
//             </li>
//           </ul>
//         </nav>

//         <div className="mt-auto flex flex-col gap-4">
//           <div className="flex items-center justify-between border-t border-border pt-4">
//             <span className="text-sm font-medium">Switch Theme</span>
//             <ThemeToggle />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

//app/admin/page.tsx
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
/*"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  Package, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Eye,
  Plus,
  Search,
  Filter,
  Download,
  Bell,
  Settings,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import styles from "./page.module.css";

// Sample data (in a real app, this would come from APIs)
const dashboardStats = {
  totalRevenue: 124500,
  revenueChange: 12.5,
  totalOrders: 1247,
  ordersChange: 8.2,
  totalCustomers: 3456,
  customersChange: 15.3,
  totalProducts: 89,
  productsChange: 5.1,
};

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    amount: 189.00,
    status: "completed",
    date: "2025-01-15",
    items: 2,
  },
  {
    id: "ORD-002",
    customer: "Michael Chen",
    email: "michael@example.com",
    amount: 345.50,
    status: "processing",
    date: "2025-01-15",
    items: 3,
  },
  {
    id: "ORD-003",
    customer: "Emma Wilson",
    email: "emma@example.com",
    amount: 120.00,
    status: "shipped",
    date: "2025-01-14",
    items: 1,
  },
  {
    id: "ORD-004",
    customer: "David Rodriguez",
    email: "david@example.com",
    amount: 275.25,
    status: "pending",
    date: "2025-01-14",
    items: 2,
  },
  {
    id: "ORD-005",
    customer: "Lisa Thompson",
    email: "lisa@example.com",
    amount: 450.00,
    status: "completed",
    date: "2025-01-13",
    items: 4,
  },
];

const topProducts = [
  {
    id: 1,
    name: "Tailored Cotton Overshirt",
    sales: 156,
    revenue: 29484,
    stock: 23,
    image: "https://images.pexels.com/photos/5384428/pexels-photo-5384428.jpeg",
  },
  {
    id: 2,
    name: "Structured Wool Blazer",
    sales: 89,
    revenue: 25810,
    stock: 12,
    image: "https://images.pexels.com/photos/5384425/pexels-photo-5384425.jpeg",
  },
  {
    id: 3,
    name: "Relaxed Linen Shirt",
    sales: 134,
    revenue: 16080,
    stock: 45,
    image: "https://images.pexels.com/photos/5384429/pexels-photo-5384429.jpeg",
  },
  {
    id: 4,
    name: "High-Waist Tapered Pants",
    sales: 78,
    revenue: 13650,
    stock: 8,
    image: "https://images.pexels.com/photos/5384424/pexels-photo-5384424.jpeg",
  },
];

const recentCustomers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    orders: 5,
    totalSpent: 1245.50,
    lastOrder: "2025-01-15",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael@example.com",
    orders: 3,
    totalSpent: 890.25,
    lastOrder: "2025-01-14",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma@example.com",
    orders: 7,
    totalSpent: 2156.75,
    lastOrder: "2025-01-13",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
];

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className={`container ${styles.container}`}>
        {/* Header *//*}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Admin Dashboard</h1>
            <p className={styles.subtitle}>
              Welcome back! Here's what's happening with your store today.
            </p>
          </div>
          <div className={styles.headerActions}>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Stats Cards *//*}
        <div className={styles.statsGrid}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${dashboardStats.totalRevenue.toLocaleString()}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                +{dashboardStats.revenueChange}% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalOrders.toLocaleString()}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                +{dashboardStats.ordersChange}% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalCustomers.toLocaleString()}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                +{dashboardStats.customersChange}% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalProducts}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                +{dashboardStats.productsChange}% from last month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content *//*}
        <div className={styles.mainGrid}>
          {/* Recent Orders *//*}
          <Card className={styles.ordersCard}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest customer orders and their status</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/orders">
                    View All
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className={styles.ordersTable}>
                <div className={styles.tableHeader}>
                  <div>Order ID</div>
                  <div>Customer</div>
                  <div>Amount</div>
                  <div>Status</div>
                  <div>Date</div>
                </div>
                {recentOrders.map((order) => (
                  <div key={order.id} className={styles.tableRow}>
                    <div className="font-medium">{order.id}</div>
                    <div>
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-sm text-muted-foreground">{order.email}</div>
                    </div>
                    <div className="font-medium">${order.amount.toFixed(2)}</div>
                    <div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{order.date}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Analytics Chart Placeholder *//*}
          <Card className={styles.chartCard}>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>Revenue trends over the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className={styles.chartPlaceholder}>
                <BarChart3 className="h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">Chart visualization would go here</p>
                <p className="text-sm text-muted-foreground">
                  Integration with charting library like Recharts
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Grid *//*}
        <div className={styles.secondaryGrid}>
          {/* Top Products *//*}
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Best performing products this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-md bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {product.sales} sales • ${product.revenue.toLocaleString()} revenue
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{product.stock} in stock</p>
                      <p className={`text-xs ${product.stock < 15 ? 'text-red-500' : 'text-green-500'}`}>
                        {product.stock < 15 ? 'Low stock' : 'In stock'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Customers *//*}
          <Card>
            <CardHeader>
              <CardTitle>Recent Customers</CardTitle>
              <CardDescription>Latest customer registrations and activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCustomers.map((customer) => (
                  <div key={customer.id} className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={customer.avatar} alt={customer.name} />
                      <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">{customer.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">${customer.totalSpent.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">{customer.orders} orders</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions *//*}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto flex-col gap-2 p-4" asChild>
                  <Link href="/admin/products/new">
                    <Plus className="h-5 w-5" />
                    Add Product
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto flex-col gap-2 p-4" asChild>
                  <Link href="/admin/orders">
                    <ShoppingBag className="h-5 w-5" />
                    View Orders
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto flex-col gap-2 p-4" asChild>
                  <Link href="/admin/customers">
                    <Users className="h-5 w-5" />
                    Manage Users
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto flex-col gap-2 p-4" asChild>
                  <Link href="/admin/analytics">
                    <BarChart3 className="h-5 w-5" />
                    Analytics
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed *//*}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions and system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New order received", details: "Order #ORD-001 from Sarah Johnson", time: "2 minutes ago", type: "order" },
                { action: "Product updated", details: "Tailored Cotton Overshirt stock updated", time: "15 minutes ago", type: "product" },
                { action: "Customer registered", details: "New customer: Michael Chen", time: "1 hour ago", type: "customer" },
                { action: "Payment processed", details: "Payment of $345.50 confirmed", time: "2 hours ago", type: "payment" },
                { action: "Inventory alert", details: "Low stock warning for High-Waist Tapered Pants", time: "3 hours ago", type: "alert" },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                  <div className={`mt-1 h-2 w-2 rounded-full ${
                    activity.type === 'order' ? 'bg-green-500' :
                    activity.type === 'product' ? 'bg-blue-500' :
                    activity.type === 'customer' ? 'bg-purple-500' :
                    activity.type === 'payment' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.details}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
*/
//components/site-header.tsx
/*
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, Search, User, Settings } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCart } from "@/lib/cart-context";

const mainNavItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, getTotalItems } = useCart();

  const totalItems = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Check if current path is admin
  const isAdminPath = pathname.startsWith('/admin');

  return (
    <header
      className={cn(
        "fixed left-0 top-0 z-50 w-full",
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm"
          : "bg-transparent",
        pathname === "/" && !isScrolled ? "text-white" : "text-foreground"
      )}
    >
      <div className="container flex h-16 items-center justify-between md:h-20">
        {/* Mobile menu toggle *//*}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileMenu}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Logo *//*}
        <div className="flex-1 md:flex-none">
          <Link href="/" className="font-serif text-xl font-light tracking-wide">
            VANGUARD
          </Link>
        </div>

        {/* Desktop navigation *//*}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-center">
          <ul className="flex items-center gap-6">
            {mainNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary" : ""
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions *//*}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/auth/login">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
          </Button>
          {!isAdminPath && (
            <Button variant="ghost" size="icon" className="relative" onClick={toggleCart}>
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
              <span className="sr-only">Cart ({totalItems})</span>
            </Button>
          )}
          {isAdminPath && (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/admin/settings">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Admin Settings</span>
              </Link>
            </Button>
          )}
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile menu *//*}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col bg-background p-6 transition-transform duration-300 md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-[-100%]"
        )}
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="font-serif text-xl font-light tracking-wide"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            VANGUARD
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="rounded-full"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>

        <nav className="mt-8 flex-1">
          <ul className="flex flex-col gap-4">
            {mainNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block py-2 text-lg font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary" : ""
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {isAdminPath && (
              <li>
                <Link
                  href="/admin"
                  className={cn(
                    "block py-2 text-lg font-medium transition-colors hover:text-primary",
                    pathname === "/admin" ? "text-primary" : ""
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <div className="flex items-center justify-between border-t border-border pt-4">
            <span className="text-sm font-medium">Switch Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
*//*
//app/admin/layout.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  BarChart3, 
  Settings, 
  FileText,
  Tag,
  Truck,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: Tag,
  },
  {
    title: "Shipping",
    href: "/admin/shipping",
    icon: Truck,
  },
  {
    title: "Reviews",
    href: "/admin/reviews",
    icon: MessageSquare,
  },
  {
    title: "Content",
    href: "/admin/content",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile menu overlay *//*}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar *//*}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-card border-r border-border transition-all duration-300 lg:relative lg:translate-x-0",
          sidebarCollapsed ? "w-16" : "w-64",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          {!sidebarCollapsed && (
            <Link href="/admin" className="font-serif text-lg font-light tracking-wide">
              ADMIN
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                    sidebarCollapsed && "justify-center px-2"
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {!sidebarCollapsed && <span>{item.title}</span>}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Back to Store *//*}
        <div className="border-t border-border p-4">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
              sidebarCollapsed && "justify-center px-2"
            )}
          >
            <ChevronLeft className="h-4 w-4 flex-shrink-0" />
            {!sidebarCollapsed && <span>Back to Store</span>}
          </Link>
        </div>
      </aside>

      {/* Main content *//*}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header *//*}
        <div className="flex h-16 items-center justify-between border-b border-border px-4 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <Link href="/admin" className="font-serif text-lg font-light tracking-wide">
            ADMIN
          </Link>
          <div className="w-10" /> {/* Spacer *//*}
        </div>

        {/* Page content *//*}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}*/

// // components/LayoutClientWrapper.tsx
// "use client";

// import { usePathname } from "next/navigation";
// import SiteHeader from "@/components/site-header";
// import SiteFooter from "@/components/site-footer";
// import CartDrawer from "@/components/cart-drawer";

// export default function LayoutClientWrapper({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
//   const isAdmin = pathname.startsWith("/admin");

//   return (
//     <>
//       {!isAdmin && <SiteHeader />}
//       {children}
//       {!isAdmin && <SiteFooter />}
//       {!isAdmin && <CartDrawer />}
//     </>
//   );
// }

// import "./globals.css";
// import type { Metadata } from "next";
// import { Inter, Playfair_Display } from "next/font/google";
// import { ThemeProvider } from "@/components/theme-provider";
// import { CartProvider } from "@/lib/cart-context";
// import { WishlistProvider } from "@/lib/wishlist-context";
// import LayoutClientWrapper from "@/components/LayoutClientWrapper";

// const inter = Inter({ 
//   subsets: ["latin"],
//   variable: "--font-sans",
//   display: 'swap',
// });

// const playfair = Playfair_Display({ 
//   subsets: ["latin"],
//   variable: "--font-serif",
//   display: 'swap',
// });

// export const metadata: Metadata = {
//   title: "Vanguard Apparel | Premium Contemporary Fashion",
//   description: "Redefining contemporary fashion with timeless elegance and bold innovation.",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${inter.variable} ${playfair.variable} font-sans`}>
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="light"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <WishlistProvider>
//             <CartProvider>
//               <LayoutClientWrapper>
//                 {children}
//               </LayoutClientWrapper>
//             </CartProvider>
//           </WishlistProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }


///////////////////////////////////////////////////////////
//analytics
//  "use client";
//  import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Package } from "lucide-react";
//  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
//  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
//  // Sample analytics data
//  const analyticsData = {
//    revenue: {
//      current: 124500,
//      previous: 98200,
//      change: 26.8
//    },
//    orders: {
//      current: 1247,
//      previous: 1089,
//      change: 14.5
//    },
//    customers: {
//      current: 3456,
//      previous: 2987,
//      change: 15.7
//    },
//    products: {
//      current: 89,
//      previous: 85,
//      change: 4.7
//    }
//  };
//  const topProducts = [
//    { name: "Tailored Cotton Overshirt", sales: 156, revenue: 29484 },
//    { name: "Structured Wool Blazer", sales: 89, revenue: 25810 },
//    { name: "Relaxed Linen Shirt", sales: 134, revenue: 16080 },
//    { name: "High-Waist Tapered Pants", sales: 78, revenue: 13650 },
//    { name: "Oversized Merino Sweater", sales: 65, revenue: 13650 },
//  ];
//  const recentActivity = [
//    { action: "New order received", details: "Order #ORD-001 from Sarah Johnson", time: "2 minutes ago" },
//    { action: "Product updated", details: "Tailored Cotton Overshirt stock updated", time: "15 minutes ago" },
//    { action: "Customer registered", details: "New customer: Michael Chen", time: "1 hour ago" },
//    { action: "Payment processed", details: "Payment of $345.50 confirmed", time: "2 hours ago" },
//    { action: "Inventory alert", details: "Low stock warning for High-Waist Tapered Pants", time: "3 hours ago" },
//  ];
//  export default function AnalyticsPage() {
//    return (
//      <div className="p-6">
//        <div className="mb-6">
//          <h1 className="font-serif text-3xl font-light mb-2">Analytics</h1>
//          <p className="text-muted-foreground">
//            Track your business performance and key metrics
//          </p>
//        </div>
//        {/* Key Metrics */}
//        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//          <Card>
//            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
//              <DollarSign className="h-4 w-4 text-muted-foreground" />
//            </CardHeader>
//            <CardContent>
//              <div className="text-2xl font-bold">${analyticsData.revenue.current.toLocaleString()}</div>
//              <div className="flex items-center text-xs text-muted-foreground">
//                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
//                +{analyticsData.revenue.change}% from last month
//              </div>
//            </CardContent>
//          </Card>

//          <Card>
//            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
//              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
//            </CardHeader>
//            <CardContent>
//              <div className="text-2xl font-bold">{analyticsData.orders.current.toLocaleString()}</div>
//              <div className="flex items-center text-xs text-muted-foreground">
//                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
//                +{analyticsData.orders.change}% from last month
//              </div>
//            </CardContent>
//          </Card>
         
//          <Card>
//            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
//              <Users className="h-4 w-4 text-muted-foreground" />
//            </CardHeader>
//            <CardContent>
//              <div className="text-2xl font-bold">{analyticsData.customers.current.toLocaleString()}</div>
//              <div className="flex items-center text-xs text-muted-foreground">
//                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
//                +{analyticsData.customers.change}% from last month
//              </div>
//            </CardContent>
//          </Card>
         
//          <Card>
//            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
//              <Package className="h-4 w-4 text-muted-foreground" />
//            </CardHeader>
//            <CardContent>
//              <div className="text-2xl font-bold">{analyticsData.products.current}</div>
//              <div className="flex items-center text-xs text-muted-foreground">
//                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
//                +{analyticsData.products.change}% from last month
//              </div>
//            </CardContent>
//          </Card>
         
//        </div>
//        {/* Analytics Tabs */}
//        <Tabs defaultValue="overview" className="space-y-4">
//          <TabsList>
//            <TabsTrigger value="overview">Overview</TabsTrigger>
//            <TabsTrigger value="sales">Sales</TabsTrigger>
//            <TabsTrigger value="customers">Customers</TabsTrigger>
//            <TabsTrigger value="products">Products</TabsTrigger>
//          </TabsList>
//          <TabsContent value="overview" className="space-y-4">
//            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//              {/* Revenue Chart Placeholder */}
//              <Card>
//                <CardHeader>
//                  <CardTitle>Revenue Trends</CardTitle>
//                  <CardDescription>Monthly revenue over the past year</CardDescription>
//                </CardHeader>
//                <CardContent>
//                  <div className="flex items-center justify-center h-64 border-2 border-dashed border-muted rounded-lg">
//                    <div className="text-center">
//                      <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//                      <p className="text-muted-foreground">Revenue chart would go here</p>
//                      <p className="text-sm text-muted-foreground">Integration with charting library</p>
//                    </div>
//                  </div>
//                </CardContent>
//              </Card>
//              {/* Top Products */}
//              <Card>
//                <CardHeader>
//                  <CardTitle>Top Products</CardTitle>
//                  <CardDescription>Best performing products this month</CardDescription>
//                </CardHeader>
//                <CardContent>
//                  <div className="space-y-4">
//                    {topProducts.map((product, index) => (
//                      <div key={index} className="flex items-center justify-between">
//                        <div>
//                          <p className="font-medium">{product.name}</p>
//                          <p className="text-sm text-muted-foreground">{product.sales} sales</p>
//                        </div>
//                        <div className="text-right">
//                          <p className="font-medium">${product.revenue.toLocaleString()}</p>
//                        </div>
//                      </div>
//                    ))}
//                  </div>
//                </CardContent>
//              </Card>
//            </div>
//            {/* Recent Activity */}
//            <Card>
//              <CardHeader>
//                <CardTitle>Recent Activity</CardTitle>
//                <CardDescription>Latest actions and system events</CardDescription>
//              </CardHeader>
//              <CardContent>
//                <div className="space-y-4">
//                  {recentActivity.map((activity, index) => (
//                    <div key={index} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
//                      <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
//                      <div className="flex-1 min-w-0">
//                        <p className="font-medium">{activity.action}</p>
//                        <p className="text-sm text-muted-foreground">{activity.details}</p>
//                      </div>
//                      <p className="text-xs text-muted-foreground">{activity.time}</p>
//                    </div>
//                  ))}
//                </div>
//              </CardContent>
//            </Card>
//          </TabsContent>
//          <TabsContent value="sales">
//            <Card>
//              <CardHeader>
//                <CardTitle>Sales Analytics</CardTitle>
//                <CardDescription>Detailed sales performance metrics</CardDescription>
//              </CardHeader>
//              <CardContent>
//                <div className="flex items-center justify-center h-64 border-2 border-dashed border-muted rounded-lg">
//                  <div className="text-center">
//                    <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//                    <p className="text-muted-foreground">Sales analytics would go here</p>
//                  </div>
//                </div>
//              </CardContent>
//            </Card>
//          </TabsContent>
//          <TabsContent value="customers">
//            <Card>
//              <CardHeader>
//                <CardTitle>Customer Analytics</CardTitle>
//                <CardDescription>Customer behavior and demographics</CardDescription>
//              </CardHeader>
//              <CardContent>
//                <div className="flex items-center justify-center h-64 border-2 border-dashed border-muted rounded-lg">
//                  <div className="text-center">
//                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//                    <p className="text-muted-foreground">Customer analytics would go here</p>
//                  </div>
//                </div>
//              </CardContent>
//            </Card>
//          </TabsContent>
//          <TabsContent value="products">
//            <Card>
//              <CardHeader>
//                <CardTitle>Product Analytics</CardTitle>
//                <CardDescription>Product performance and inventory insights</CardDescription>
//              </CardHeader>
//              <CardContent>
//                <div className="flex items-center justify-center h-64 border-2 border-dashed border-muted rounded-lg">
//                  <div className="text-center">
//                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//                    <p className="text-muted-foreground">Product analytics would go here</p>
//                  </div>
//                </div>
//              </CardContent>
//            </Card>
//          </TabsContent>
//        </Tabs>
//      </div>
//    );
//  }


///////////////////////////////////////////////////////////
// //categories
// "use client";
// import { useState } from "react";
// import { Search, Plus, Edit, Trash2, MoreHorizontal, Tag } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// // Sample categories data
// const categories = [
//   {
//     id: 1,
//     name: "Men",
//     description: "Men's clothing and accessories",
//     productCount: 25,
//     status: "active",
//     createdDate: "2024-01-15"
//   },
//   {
//     id: 2,
//     name: "Women",
//     description: "Women's clothing and accessories",
//     productCount: 32,
//     status: "active",
//     createdDate: "2024-01-15"
//   },
//   {
//     id: 3,
//     name: "Accessories",
//     description: "Fashion accessories for all",
//     productCount: 18,
//     status: "active",
//     createdDate: "2024-01-20"
//   },
//   {
//     id: 4,
//     name: "Outerwear",
//     description: "Jackets, coats, and outerwear",
//     productCount: 12,
//     status: "active",
//     createdDate: "2024-02-01"
//   },
//   {
//     id: 5,
//     name: "Footwear",
//     description: "Shoes and footwear collection",
//     productCount: 0,
//     status: "draft",
//     createdDate: "2024-02-10"
//   },
// ];
// const getStatusColor = (status: string) => {
//   switch (status) {
//     case "active":
//       return "bg-green-100 text-green-800";
//     case "draft":
//       return "bg-gray-100 text-gray-800";
//     case "inactive":
//       return "bg-red-100 text-red-800";
//     default:
//       return "bg-gray-100 text-gray-800";
//   }
// };
// export default function CategoriesPage() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const filteredCategories = categories.filter(category =>
//     category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     category.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   const categoryStats = {
//     total: categories.length,
//     active: categories.filter(c => c.status === "active").length,
//     draft: categories.filter(c => c.status === "draft").length,
//     totalProducts: categories.reduce((sum, c) => sum + c.productCount, 0),
//   };
//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-start mb-6">
//         <div>
//           <h1 className="font-serif text-3xl font-light mb-2">Categories</h1>
//           <p className="text-muted-foreground">
//             Organize your products into categories
//           </p>
//         </div>
//         <Button>
//           <Plus className="mr-2 h-4 w-4" />
//           Add Category
//         </Button>
//       </div>
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{categoryStats.total}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Active</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-green-600">{categoryStats.active}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Draft</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-gray-600">{categoryStats.draft}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Total Products</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{categoryStats.totalProducts}</div>
//           </CardContent>
//         </Card>
//       </div>
//       {/* Search */}
//       <div className="flex gap-4 mb-6">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search categories..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10"
//           />
//         </div>
//       </div>
//       {/* Categories List */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Categories ({filteredCategories.length})</CardTitle>
//           <CardDescription>
//             Manage product categories and their organization
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {filteredCategories.map((category) => (
//               <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg">
//                 <div className="flex items-center space-x-4">
//                   <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-lg">
//                     <Tag className="h-6 w-6 text-muted-foreground" />
//                   </div>
               
//                   <div>
//                     <div className="flex items-center space-x-2">
//                       <h3 className="font-medium">{category.name}</h3>
//                       <Badge className={getStatusColor(category.status)}>
//                         {category.status}
//                       </Badge>
//                     </div>
//                     <p className="text-sm text-muted-foreground">{category.description}</p>
//                     <p className="text-xs text-muted-foreground">Created: {category.createdDate}</p>
//                   </div>
//                 </div>
             
//                 <div className="flex items-center space-x-4">
//                   <div className="text-right">
//                     <div className="font-medium">{category.productCount}</div>
//                     <div className="text-sm text-muted-foreground">products</div>
//                   </div>
               
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="icon">
//                         <MoreHorizontal className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuItem>
//                         <Edit className="mr-2 h-4 w-4" />
//                         Edit Category
//                       </DropdownMenuItem>
//                       <DropdownMenuItem>
//                         View Products
//                       </DropdownMenuItem>
//                       <DropdownMenuItem className="text-red-600">
//                         <Trash2 className="mr-2 h-4 w-4" />
//                         Delete Category
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


///////////////////////////////////////////////////////////
//content
//  "use client";
//  import { useState } from "react";
//  import { Search, Plus, Edit, Trash2, MoreHorizontal, FileText, Image, Video } from "lucide-react";
//  import { Button } from "@/components/ui/button";
//  import { Input } from "@/components/ui/input";
//  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
//  import { Badge } from "@/components/ui/badge";
//  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
//  import {
//    DropdownMenu,
//    DropdownMenuContent,
//    DropdownMenuItem,
//    DropdownMenuTrigger,
//  } from "@/components/ui/dropdown-menu";
//  import {
//    Select,
//    SelectContent,
//    SelectItem,
//    SelectTrigger,
//    SelectValue,
//  } from "@/components/ui/select";
//  // Sample content data
//  const pages = [
//    {
//      id: 1,
//      title: "About Us",
//      slug: "about",
//      type: "page",
//      status: "published",
//      lastModified: "2025-01-15",
//      author: "Admin"
//    },
//    {
//      id: 2,
//      title: "Privacy Policy",
//      slug: "privacy-policy",
//      type: "page",
//      status: "published",
//      lastModified: "2025-01-10",
//      author: "Admin"
//    },
//    {
//      id: 3,
//      title: "Terms of Service",
//      slug: "terms-of-service",
//      type: "page",
//      status: "published",
//      lastModified: "2025-01-08",
//      author: "Admin"
//    },
//    {
//      id: 4,
//      title: "Shipping & Returns",
//      slug: "shipping-returns",
//      type: "page",
//      status: "draft",
//      lastModified: "2025-01-05",
//      author: "Admin"
//    },
//  ];
//  const blogPosts = [
//    {
//      id: 1,
//      title: "The Art of Sustainable Fashion",
//      slug: "art-of-sustainable-fashion",
//      type: "blog",
//      status: "published",
//      lastModified: "2025-01-15",
//      author: "Sarah Editor",
//      category: "Sustainability"
//    },
//    {
//      id: 2,
//      title: "Behind the Scenes: Summer Collection",
//      slug: "behind-scenes-summer-collection",
//      type: "blog",
//      status: "published",
//      lastModified: "2025-01-12",
//      author: "Michael Writer",
//      category: "Collections"
//    },
//    {
//      id: 3,
//      title: "Style Guide: Minimalist Wardrobe",
//      slug: "style-guide-minimalist-wardrobe",
//      type: "blog",
//      status: "draft",
//      lastModified: "2025-01-10",
//      author: "Emma Stylist",
//      category: "Style"
//    },
//  ];
//  const media = [
//    {
//      id: 1,
//      name: "hero-image.jpg",
//      type: "image",
//      size: "2.4 MB",
//      dimensions: "1920x1080",
//      uploadDate: "2025-01-15",
//      url: "https://images.pexels.com/photos/1036856/pexels-photo-1036856.jpeg"
//    },
//    {
//      id: 2,
//      name: "product-showcase.mp4",
//      type: "video",
//      size: "15.2 MB",
//      dimensions: "1920x1080",
//      uploadDate: "2025-01-14",
//      url: "#"
//    },
//    {
//      id: 3,
//      name: "brand-logo.svg",
//      type: "image",
//      size: "45 KB",
//      dimensions: "500x200",
//      uploadDate: "2025-01-13",
//      url: "#"
//    },
//  ];
//  const getStatusColor = (status: string) => {
//    switch (status) {
//      case "published":
//        return "bg-green-100 text-green-800";
//      case "draft":
//        return "bg-yellow-100 text-yellow-800";
//      case "archived":
//        return "bg-gray-100 text-gray-800";
//      default:
//        return "bg-gray-100 text-gray-800";
//    }
//  };
//  const getTypeIcon = (type: string) => {
//    switch (type) {
//      case "image":
//        return <Image className="h-5 w-5" />;
//      case "video":
//        return <Video className="h-5 w-5" />;
//      default:
//        return <FileText className="h-5 w-5" />;
//    }
//  };
//  export default function ContentPage() {
//    const [searchTerm, setSearchTerm] = useState("");
//    const [statusFilter, setStatusFilter] = useState("all");
//    const filteredPages = pages.filter(page => {
//      const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) || page.slug.toLowerCase().includes(searchTerm.toLowerCase());
//      const matchesStatus = statusFilter === "all" || page.status === statusFilter;
//      return matchesSearch && matchesStatus;
//    });
//    const filteredPosts = blogPosts.filter(post => {
//      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           post.slug.toLowerCase().includes(searchTerm.toLowerCase());
//      const matchesStatus = statusFilter === "all" || post.status === statusFilter;
//      return matchesSearch && matchesStatus;
//    });
//    const filteredMedia = media.filter(item =>
//      item.name.toLowerCase().includes(searchTerm.toLowerCase())
//    );
//    const contentStats = {
//      totalPages: pages.length,
//      totalPosts: blogPosts.length,
//      totalMedia: media.length,
//      published: [...pages, ...blogPosts].filter(item => item.status === "published").length,
//    };
//    return (
//      <div className="p-6">
//        <div className="flex justify-between items-start mb-6">
//          <div>
//            <h1 className="font-serif text-3xl font-light mb-2">Content</h1>
//            <p className="text-muted-foreground">
//              Manage pages, blog posts, and media content
//            </p>
//          </div>
//          <Button>
//            <Plus className="mr-2 h-4 w-4" />
//            Create Content
//          </Button>
//        </div>
//        {/* Stats Cards */}
//        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//          <Card>
//            <CardHeader className="pb-2">
//              <CardTitle className="text-sm font-medium">Pages</CardTitle>
//            </CardHeader>
//            <CardContent>
//              <div className="text-2xl font-bold">{contentStats.totalPages}</div>
//            </CardContent>
//          </Card>
//          <Card>
//            <CardHeader className="pb-2">
//              <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
//            </CardHeader>
//            <CardContent>
//              <div className="text-2xl font-bold">{contentStats.totalPosts}</div>
//            </CardContent>
//          </Card>
//          <Card>
//            <CardHeader className="pb-2">
//              <CardTitle className="text-sm font-medium">Media Files</CardTitle>
//            </CardHeader>
//            <CardContent>
//              <div className="text-2xl font-bold">{contentStats.totalMedia}</div>
//            </CardContent>
//          </Card>
//          <Card>
//            <CardHeader className="pb-2">
//              <CardTitle className="text-sm font-medium">Published</CardTitle>
//            </CardHeader>
//            <CardContent>
//              <div className="text-2xl font-bold text-green-600">{contentStats.published}</div>
//            </CardContent>
//          </Card>
//        </div>
//        {/* Filters and Search */}
//        <div className="flex flex-col sm:flex-row gap-4 mb-6">
//          <div className="relative flex-1">
//            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//            <Input
//              placeholder="Search content..."
//              value={searchTerm}
//              onChange={(e) => setSearchTerm(e.target.value)}
//              className="pl-10"
//            />
//          </div>
//          <Select value={statusFilter} onValueChange={setStatusFilter}>
//            <SelectTrigger className="w-full sm:w-48">
//              <SelectValue placeholder="Filter by status" />
//            </SelectTrigger>
//            <SelectContent>
//              <SelectItem value="all">All Status</SelectItem>
//              <SelectItem value="published">Published</SelectItem>
//              <SelectItem value="draft">Draft</SelectItem>
//              <SelectItem value="archived">Archived</SelectItem>
//            </SelectContent>
//          </Select>
//        </div>
//        {/* Content Tabs */}
//        <Tabs defaultValue="pages" className="space-y-4">
//          <TabsList>
//            <TabsTrigger value="pages">Pages</TabsTrigger>
//            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
//            <TabsTrigger value="media">Media</TabsTrigger>
//          </TabsList>
//          <TabsContent value="pages">
//            <Card>
//              <CardHeader>
//                <CardTitle>Pages ({filteredPages.length})</CardTitle>
//                <CardDescription>
//                  Manage static pages and content
//                </CardDescription>
//              </CardHeader>
//              <CardContent>
//                <div className="space-y-4">
//                  {filteredPages.map((page) => (
//                    <div key={page.id} className="flex items-center justify-between p-4 border rounded-lg">
//                      <div className="flex items-center space-x-4">
//                        <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-lg">
//                          <FileText className="h-6 w-6 text-muted-foreground" />
//                        </div>
                    
//                        <div>
//                          <div className="flex items-center space-x-2">
//                            <h3 className="font-medium">{page.title}</h3>
//                            <Badge className={getStatusColor(page.status)}>
//                              {page.status}
//                            </Badge>
//                          </div>
//                          <p className="text-sm text-muted-foreground">/{page.slug}</p>
//                          <p className="text-xs text-muted-foreground">
//                            Last modified: {page.lastModified} by {page.author}
//                          </p>
//                        </div>
//                      </div>
                  
//                      <DropdownMenu>
//                        <DropdownMenuTrigger asChild>
//                          <Button variant="ghost" size="icon">
//                            <MoreHorizontal className="h-4 w-4" />
//                          </Button>
//                        </DropdownMenuTrigger>
//                        <DropdownMenuContent align="end">
//                          <DropdownMenuItem>
//                            <Edit className="mr-2 h-4 w-4" />
//                            Edit Page
//                          </DropdownMenuItem>
//                          <DropdownMenuItem>
//                            View Page
//                          </DropdownMenuItem>
//                          <DropdownMenuItem>
//                            Duplicate
//                          </DropdownMenuItem>
//                          <DropdownMenuItem className="text-red-600">
//                            <Trash2 className="mr-2 h-4 w-4" />
//                            Delete Page
//                          </DropdownMenuItem>
//                        </DropdownMenuContent>
//                      </DropdownMenu>
//                    </div>
//                  ))}
//                </div>
//              </CardContent>
//            </Card>
//          </TabsContent>
//          <TabsContent value="blog">
//            <Card>
//              <CardHeader>
//                <CardTitle>Blog Posts ({filteredPosts.length})</CardTitle>
//                <CardDescription>
//                  Manage blog content and articles
//                </CardDescription>
//              </CardHeader>
//              <CardContent>
//                <div className="space-y-4">
//                  {filteredPosts.map((post) => (
//                    <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
//                      <div className="flex items-center space-x-4">
//                        <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-lg">
//                          <FileText className="h-6 w-6 text-muted-foreground" />
//                        </div>
                    
//                        <div>
//                          <div className="flex items-center space-x-2">
//                            <h3 className="font-medium">{post.title}</h3>
//                            <Badge className={getStatusColor(post.status)}>
//                              {post.status}
//                            </Badge>
//                          </div>
//                          <p className="text-sm text-muted-foreground">
//                            Category: {post.category} • /{post.slug}
//                          </p>
//                          <p className="text-xs text-muted-foreground">
//                            Last modified: {post.lastModified} by {post.author}
//                          </p>
//                        </div>
//                      </div>
                  
//                      <DropdownMenu>
//                        <DropdownMenuTrigger asChild>
//                          <Button variant="ghost" size="icon">
//                            <MoreHorizontal className="h-4 w-4" />
//                          </Button>
//                        </DropdownMenuTrigger>
//                        <DropdownMenuContent align="end">
//                          <DropdownMenuItem>
//                            <Edit className="mr-2 h-4 w-4" />
//                            Edit Post
//                          </DropdownMenuItem>
//                          <DropdownMenuItem>
//                            View Post
//                          </DropdownMenuItem>
//                          <DropdownMenuItem>
//                            Duplicate
//                          </DropdownMenuItem>
//                          <DropdownMenuItem className="text-red-600">
//                            <Trash2 className="mr-2 h-4 w-4" />
//                            Delete Post
//                          </DropdownMenuItem>
//                        </DropdownMenuContent>
//                      </DropdownMenu>
//                    </div>
//                  ))}
//                </div>
//              </CardContent>
//            </Card>
//          </TabsContent>
//          <TabsContent value="media">
//            <Card>
//              <CardHeader>
//                <CardTitle>Media Library ({filteredMedia.length})</CardTitle>
//                <CardDescription>
//                  Manage images, videos, and other media files
//                </CardDescription>
//              </CardHeader>
//              <CardContent>
//                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                  {filteredMedia.map((item) => (
//                    <div key={item.id} className="border rounded-lg p-4">
//                      <div className="flex items-center space-x-3 mb-3">
//                        {getTypeIcon(item.type)}
//                        <div className="flex-1 min-w-0">
//                          <h3 className="font-medium truncate">{item.name}</h3>
//                          <p className="text-sm text-muted-foreground">
//                            {item.size} • {item.dimensions}
//                          </p>
//                        </div>
//                        <DropdownMenu>
//                          <DropdownMenuTrigger asChild>
//                            <Button variant="ghost" size="icon">
//                              <MoreHorizontal className="h-4 w-4" />
//                            </Button>
//                          </DropdownMenuTrigger>
//                          <DropdownMenuContent align="end">
//                            <DropdownMenuItem>
//                              View
//                            </DropdownMenuItem>
//                            <DropdownMenuItem>
//                              Download
//                            </DropdownMenuItem>
//                            <DropdownMenuItem>
//                              Copy URL
//                            </DropdownMenuItem>
//                            <DropdownMenuItem className="text-red-600">
//                              <Trash2 className="mr-2 h-4 w-4" />
//                              Delete
//                            </DropdownMenuItem>
//                          </DropdownMenuContent>
//                        </DropdownMenu>
//                      </div>
                  
//                      {item.type === "image" && (
//                        <div className="aspect-video bg-muted rounded-md mb-3 overflow-hidden">
//                          <img
//                            src={item.url}
//                            alt={item.name}
//                            className="w-full h-full object-cover"
//                          />
//                        </div>
//                      )}
                  
//                      <p className="text-xs text-muted-foreground">
//                        Uploaded: {item.uploadDate}
//                      </p>
//                    </div>
//                  ))}
//                </div>
//              </CardContent>
//            </Card>
//          </TabsContent>
//        </Tabs>
//      </div>
//    );
//  }
/////////////////////////////////////////////////////////
// customers
//   "use client";
//   import { useState } from "react";
//   import Image from "next/image";
//   import { Search, Filter, Download, Eye, MoreHorizontal, Mail, Phone, MapPin } from "lucide-react";
//  import { Button } from "@/components/ui/button";
//  import { Input } from "@/components/ui/input";
//  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
//  import { Badge } from "@/components/ui/badge";
//  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
//  import {
//    DropdownMenu,
//    DropdownMenuContent,
//    DropdownMenuItem,
//    DropdownMenuTrigger,
//  } from "@/components/ui/dropdown-menu";
//  import {
//    Select,
//    SelectContent,
//    SelectItem,
//    SelectTrigger,
//    SelectValue,
//  } from "@/components/ui/select";
//  // Sample customers data
//  const customers = [
//    {
//      id: 1,
//      name: "Sarah Johnson",
//      email: "sarah@gmail.com",
//      phone: "+1 (555) 123-4567",
//      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
//      orders: 5,
//      totalSpent: 1245.50,
//      lastOrder: "2025-01-15",
//      status: "active",
//      location: "New York, NY",
//      joinDate: "2024-03-15"
//    },
//    {
//      id: 2,
//      name: "Michael Chen",
//      email: "michael@gmail.com",
//      phone: "+1 (555) 234-5678",
//      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
//      orders: 3,
//      totalSpent: 890.25,
//      lastOrder: "2025-01-14",
//      status: "active",
//      location: "Los Angeles, CA",
//      joinDate: "2024-05-22"
//    },
//    {
//      id: 3,
//      name: "Emma Wilson",
//      email: "emma@gmail.com",
//      phone: "+1 (555) 345-6789",
//      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
//      orders: 7,
//      totalSpent: 2156.75,
//      lastOrder: "2025-01-13",
//      status: "vip",
//      location: "Chicago, IL",
//      joinDate: "2024-01-10"
//    },
//    {
//      id: 4,
//      name: "David Rodriguez",
//      email: "david@gmail.com",
//      phone: "+1 (555) 456-7890",
//      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
//      orders: 2,
//      totalSpent: 345.00,
//      lastOrder: "2025-01-10",
//      status: "active",
//      location: "Miami, FL",
//      joinDate: "2024-08-05"
//    },
//    {
//      id: 5,
//      name: "Lisa Thompson",
//      email: "lisa@gmail.com",
//      phone: "+1 (555) 567-8901",
//      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
//      orders: 1,
//      totalSpent: 189.00,
//      lastOrder: "2024-12-20",
//      status: "inactive",
//      location: "Seattle, WA",
//      joinDate: "2024-11-12"
//    },
//  ];
//  const getStatusColor = (status: string) => {
//    switch (status) {
//      case "vip":
//        return "bg-purple-100 text-purple-800";
//      case "active":
//        return "bg-green-100 text-green-800";
//      case "inactive":
//        return "bg-gray-100 text-gray-800";
//      default:
//        return "bg-gray-100 text-gray-800";
//    }
//  };
//  export default function CustomersPage() {
//    const [searchTerm, setSearchTerm] = useState("");
//    const [statusFilter, setStatusFilter] = useState("all");
//    const filteredCustomers = customers.filter(customer => {
//      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           customer.phone.includes(searchTerm);
  
//      const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
  
//      return matchesSearch && matchesStatus;
//    });
//    const customerStats = {
//      total: customers.length,
//      active: customers.filter(c => c.status === "active").length,
//      vip: customers.filter(c => c.status === "vip").length,
//      inactive: customers.filter(c => c.status === "inactive").length,
//      totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
//    };
//    return (
//      <div className="p-6">
//        <div className="mb-6">
//          <h1 className="font-serif text-3xl font-light mb-2">Customers</h1>
//          <p className="text-muted-foreground">
//            Manage customer relationships and track their activity
//          </p>
//        </div>
//        {/* Stats Cards */}
//        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
//          <Card>
//            <CardHeader className="pb-2">
//              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
//            </CardHeader>
//            <CardContent>
//              <div className="text-2xl font-bold">{customerStats.total}</div>
//            </CardContent>
//          </Card>
//          <Card>
//            <CardHeader className="pb-2">
//              <CardTitle className="text-sm font-medium">Active</CardTitle>
//            </CardHeader>
//            <CardContent>
//              <div className="text-2xl font-bold text-green-600">{customerStats.active}</div>
//            </CardContent>
//          </Card>
//          <Card>
//            <CardHeader className="pb-2">
//              <CardTitle className="text-sm font-medium">VIP</CardTitle>
//            </CardHeader>
//            <CardContent>
//              <div className="text-2xl font-bold text-purple-600">{customerStats.vip}</div>
//            </CardContent>
//          </Card>
//          <Card>
//            <CardHeader className="pb-2">
//              <CardTitle className="text-sm font-medium">Inactive</CardTitle>
//            </CardHeader>
//            <CardContent>
//              <div className="text-2xl font-bold text-gray-600">{customerStats.inactive}</div>
//            </CardContent>
//          </Card>
//          <Card>
//            <CardHeader className="pb-2">
//              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
//            </CardHeader>
//            <CardContent>
//              <div className="text-2xl font-bold">${customerStats.totalRevenue.toFixed(0)}</div>
//            </CardContent>
//          </Card>
//        </div>
//        {/* Filters and Search */}
//        <div className="flex flex-col sm:flex-row gap-4 mb-6">
//          <div className="relative flex-1">
//            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//            <Input
//              placeholder="Search customers..."
//              value={searchTerm}
//              onChange={(e) => setSearchTerm(e.target.value)}
//              className="pl-10"
//            />
//          </div>
//          <Select value={statusFilter} onValueChange={setStatusFilter}>
//            <SelectTrigger className="w-full sm:w-48">
//              <SelectValue placeholder="Filter by status" />
//            </SelectTrigger>
//            <SelectContent>
//              <SelectItem value="all">All Status</SelectItem>
//              <SelectItem value="active">Active</SelectItem>
//              <SelectItem value="vip">VIP</SelectItem>
//              <SelectItem value="inactive">Inactive</SelectItem>
//            </SelectContent>
//          </Select>
//          <Button variant="outline">
//            <Filter className="mr-2 h-4 w-4" />
//            More Filters
//          </Button>
//          <Button variant="outline">
//            <Download className="mr-2 h-4 w-4" />
//            Export
//          </Button>
//        </div>
//        {/* Customers List */}
//        <Card>
//          <CardHeader>
//            <CardTitle>Customers ({filteredCustomers.length})</CardTitle>
//            <CardDescription>
//              Manage customer information and track their activity
//            </CardDescription>
//          </CardHeader>
//          <CardContent>
//            <div className="space-y-4">
//              {filteredCustomers.map((customer) => (
//                <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg">
//                  <div className="flex items-center space-x-4">
//                    <Avatar className="h-12 w-12">
//                      <AvatarImage src={customer.avatar} alt={customer.name} />
//                      <AvatarFallback>
//                        {customer.name.split(' ').map(n => n[0]).join('')}
//                      </AvatarFallback>
//                    </Avatar>
                
//                    <div>
//                      <div className="flex items-center space-x-2">
//                        <h3 className="font-medium">{customer.name}</h3>
//                        <Badge className={getStatusColor(customer.status)}>
//                          {customer.status.toUpperCase()}
//                        </Badge>
//                      </div>
//                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
//                        <div className="flex items-center">
//                          <Mail className="mr-1 h-3 w-3" />
//                          {customer.email}
//                        </div>
//                        <div className="flex items-center">
//                          <Phone className="mr-1 h-3 w-3" />
//                          {customer.phone}
//                        </div>
//                        <div className="flex items-center">
//                          <MapPin className="mr-1 h-3 w-3" />
//                          {customer.location}
//                        </div>
//                      </div>
//                    </div>
//                  </div>
              
//                  <div className="flex items-center space-x-6">
//                    <div className="text-right">
//                      <div className="font-medium">${customer.totalSpent.toFixed(2)}</div>
//                      <div className="text-sm text-muted-foreground">{customer.orders} orders</div>
//                    </div>
//                    <div className="text-right">
//                      <div className="text-sm font-medium">Last Order</div>
//                      <div className="text-sm text-muted-foreground">{customer.lastOrder}</div>
//                    </div>
//                    <DropdownMenu>
//                      <DropdownMenuTrigger asChild>
//                        <Button variant="ghost" size="icon">
//                          <MoreHorizontal className="h-4 w-4" />
//                        </Button>
//                      </DropdownMenuTrigger>
//                      <DropdownMenuContent align="end">
//                        <DropdownMenuItem>
//                          <Eye className="mr-2 h-4 w-4" />
//                          View Profile
//                        </DropdownMenuItem>
//                        <DropdownMenuItem>
//                          <Mail className="mr-2 h-4 w-4" />
//                          Send Email
//                        </DropdownMenuItem>
//                        <DropdownMenuItem>
//                          View Orders
//                        </DropdownMenuItem>
//                      </DropdownMenuContent>
//                    </DropdownMenu>
//                  </div>
//                </div>
//              ))}
//            </div>
//          </CardContent>
//        </Card>
//      </div>
//    );
//  }
/////////////////////////////////////////////////////////
// orders
// "use client";
//  import { useState } from "react";
//  import { Search, Filter, Download, Eye, MoreHorizontal, Package, Truck, CheckCircle, Clock } from "lucide-react";
//  import { Button } from "@/components/ui/button";
//  import { Input } from "@/components/ui/input";
//  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
//  import { Badge } from "@/components/ui/badge";
//  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
//  import {
//    DropdownMenu,
//    DropdownMenuContent,
//    DropdownMenuItem,
//    DropdownMenuTrigger,
//  } from "@/components/ui/dropdown-menu";
//  import {
//    Select,
//    SelectContent,
//    SelectItem,
//    SelectTrigger,
//    SelectValue,
//  } from "@/components/ui/select";
// Sample orders data
// const orders = [
//   {
//     id: "ORD-001",
//     customer: "Sarah Johnson",
//     email: "sarah@gmail.com",
//     amount: 189.00,
//     status: "completed",
//     date: "2025-01-15",
//     items: 2,
//     shippingAddress: "123 Main St, New York, NY 10001",
//     products: ["Tailored Cotton Overshirt", "Relaxed Linen Shirt"]
//   },
//   {
//     id: "ORD-002",
//     customer: "Michael Chen",
//     email: "michael@gmail.com",
//     amount: 345.50,
//     status: "processing",
//     date: "2025-01-15",
//     items: 3,
//     shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
//     products: ["Structured Wool Blazer", "High-Waist Tapered Pants", "Oversized Merino Sweater"]
//   },
//   {
//     id: "ORD-003",
//     customer: "Emma Wilson",
//     email: "emma@gmail.com",
//     amount: 120.00,
//     status: "shipped",
//     date: "2025-01-14",
//     items: 1,
//     shippingAddress: "789 Pine St, Chicago, IL 60601",
//     products: ["Relaxed Linen Shirt"]
//   },
//   {
//     id: "ORD-004",
//     customer: "David Rodriguez",
//     email: "david@gmail.com",
//     amount: 275.25,
//     status: "pending",
//     date: "2025-01-14",
//     items: 2,
//     shippingAddress: "321 Elm St, Miami, FL 33101",
//     products: ["Textured Knit Cardigan", "Slim Fit Selvedge Jeans"]
//   },
//   {
//     id: "ORD-005",
//     customer: "Lisa Thompson",
//     email: "lisa@gmail.com",
//     amount: 450.00,
//     status: "completed",
//     date: "2025-01-13",
//     items: 4,
//     shippingAddress: "654 Maple Dr, Seattle, WA 98101",
//     products: ["Structured Wool Blazer", "High-Waist Tapered Pants", "Oversized Merino Sweater", "Cropped Cotton Jacket"]
//   },
// ];
// const getStatusColor = (status: string) => {
//   switch (status) {
//     case "completed":
//       return "bg-green-100 text-green-800";
//     case "processing":
//       return "bg-blue-100 text-blue-800";
//     case "shipped":
//       return "bg-purple-100 text-purple-800";
//     case "pending":
//       return "bg-yellow-100 text-yellow-800";
//     default:
//       return "bg-gray-100 text-gray-800";
//   }
// };
// const getStatusIcon = (status: string) => {
//   switch (status) {
//     case "completed":
//       return <CheckCircle className="h-4 w-4" />;
//     case "processing":
//       return <Package className="h-4 w-4" />;
//     case "shipped":
//       return <Truck className="h-4 w-4" />;
//     case "pending":
//       return <Clock className="h-4 w-4" />;
//     default:
//       return <Clock className="h-4 w-4" />;
//   }
// };
// export default function OrdersPage() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [selectedTab, setSelectedTab] = useState("all");
//   const filteredOrders = orders.filter(order => {
//     const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          order.email.toLowerCase().includes(searchTerm.toLowerCase());
 
//     const matchesStatus = statusFilter === "all" || order.status === statusFilter;
//     const matchesTab = selectedTab === "all" || order.status === selectedTab;
 
//     return matchesSearch && matchesStatus && matchesTab;
//   });
//   const orderStats = {
//     total: orders.length,
//     pending: orders.filter(o => o.status === "pending").length,
//     processing: orders.filter(o => o.status === "processing").length,
//     shipped: orders.filter(o => o.status === "shipped").length,
//     completed: orders.filter(o => o.status === "completed").length,
//   };
//   return (
//     <div className="p-6">
//       <div className="mb-6">
//         <h1 className="font-serif text-3xl font-light mb-2">Orders</h1>
//         <p className="text-muted-foreground">
//           Manage and track customer orders
//         </p>
//       </div>
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{orderStats.total}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Pending</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-yellow-600">{orderStats.pending}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Processing</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-blue-600">{orderStats.processing}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Shipped</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-purple-600">{orderStats.shipped}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Completed</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-green-600">{orderStats.completed}</div>
//           </CardContent>
//         </Card>
//       </div>
//       {/* Filters and Search */}
//       <div className="flex flex-col sm:flex-row gap-4 mb-6">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search orders..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10"
//           />
//         </div>
//         <Select value={statusFilter} onValueChange={setStatusFilter}>
//           <SelectTrigger className="w-full sm:w-48">
//             <SelectValue placeholder="Filter by status" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Status</SelectItem>
//             <SelectItem value="pending">Pending</SelectItem>
//             <SelectItem value="processing">Processing</SelectItem>
//             <SelectItem value="shipped">Shipped</SelectItem>
//             <SelectItem value="completed">Completed</SelectItem>
//           </SelectContent>
//         </Select>
//         <Button variant="outline">
//           <Filter className="mr-2 h-4 w-4" />
//           More Filters
//         </Button>
//         <Button variant="outline">
//           <Download className="mr-2 h-4 w-4" />
//           Export
//         </Button>
//       </div>
//       {/* Orders Tabs */}
//       <Tabs value={selectedTab} onValueChange={setSelectedTab}>
//         <TabsList>
//           <TabsTrigger value="all">All Orders</TabsTrigger>
//           <TabsTrigger value="pending">Pending</TabsTrigger>
//           <TabsTrigger value="processing">Processing</TabsTrigger>
//           <TabsTrigger value="shipped">Shipped</TabsTrigger>
//           <TabsTrigger value="completed">Completed</TabsTrigger>
//         </TabsList>
//         <TabsContent value={selectedTab} className="mt-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Orders ({filteredOrders.length})</CardTitle>
//               <CardDescription>
//                 Recent customer orders and their current status
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {filteredOrders.map((order) => (
//                   <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
//                     <div className="flex items-center space-x-4">
//                       <div className="flex items-center space-x-2">
//                         {getStatusIcon(order.status)}
//                         <div>
//                           <div className="font-medium">{order.id}</div>
//                           <div className="text-sm text-muted-foreground">{order.date}</div>
//                         </div>
//                       </div>
//                       <div>
//                         <div className="font-medium">{order.customer}</div>
//                         <div className="text-sm text-muted-foreground">{order.email}</div>
//                       </div>
//                     </div>
                 
//                     <div className="flex items-center space-x-4">
//                       <div className="text-right">
//                         <div className="font-medium">${order.amount.toFixed(2)}</div>
//                         <div className="text-sm text-muted-foreground">{order.items} items</div>
//                       </div>
//                       <Badge className={getStatusColor(order.status)}>
//                         {order.status}
//                       </Badge>
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" size="icon">
//                             <MoreHorizontal className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuItem>
//                             <Eye className="mr-2 h-4 w-4" />
//                             View Details
//                           </DropdownMenuItem>
//                           <DropdownMenuItem>
//                             <Package className="mr-2 h-4 w-4" />
//                             Update Status
//                           </DropdownMenuItem>
//                           <DropdownMenuItem>
//                             <Download className="mr-2 h-4 w-4" />
//                             Download Invoice
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }
////////////////////////////////////////////////////////
//products
//  "use client";
// import { useState } from "react";
// import Image from "next/image";
// import { Search, Filter, Download, Plus, Eye, Edit, Trash2, MoreHorizontal } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
//  // Sample products data
//  const products = [
//    {
//      id: 1,
//      name: "Tailored Cotton Overshirt",
//      price: 189.00,
//      image: "https://images.pexels.com/photos/5384428/pexels-photo-5384428.jpeg",
//      category: "Men",
//      stock: 23,
//      status: "active",
//      sales: 156,
//      sku: "TCO-001",
//      dateAdded: "2025-01-10"
//   },
//   {
//     id: 2,
//     name: "Structured Wool Blazer",
//     price: 290.00,
//     image: "https://images.pexels.com/photos/5384425/pexels-photo-5384425.jpeg",
//     category: "Women",
//     stock: 12,
//     status: "active",
//     sales: 89,
//     sku: "SWB-002",
//     dateAdded: "2025-01-08"
//   },
//   {
//     id: 3,
//     name: "Relaxed Linen Shirt",
//     price: 120.00,
//     image: "https://images.pexels.com/photos/5384429/pexels-photo-5384429.jpeg",
//     category: "Men",
//     stock: 45,
//     status: "active",
//     sales: 134,
//     sku: "RLS-003",
//     dateAdded: "2025-01-05"
//   },
//   {
//     id: 4,
//     name: "High-Waist Tapered Pants",
//     price: 175.00,
//     image: "https://images.pexels.com/photos/5384424/pexels-photo-5384424.jpeg",
//     category: "Women",
//     stock: 8,
//     status: "low_stock",
//     sales: 78,
//     sku: "HTP-004",
//     dateAdded: "2025-01-03"
//   },
//   {
//     id: 5,
//     name: "Oversized Merino Sweater",
//     price: 210.00,
//     image: "https://images.pexels.com/photos/5709656/pexels-photo-5709656.jpeg",
//     category: "Women",
//     stock: 0,
//     status: "out_of_stock",
//     sales: 45,
//     sku: "OMS-005",
//     dateAdded: "2025-01-01"
//   },
// ];
// const getStatusColor = (status: string) => {
//   switch (status) {
//     case "active":
//       return "bg-green-100 text-green-800";
//     case "low_stock":
//       return "bg-yellow-100 text-yellow-800";
//     case "out_of_stock":
//       return "bg-red-100 text-red-800";
//     case "draft":
//       return "bg-gray-100 text-gray-800";
//     default:
//       return "bg-gray-100 text-gray-800";
//   }
// };
// const getStockStatus = (stock: number) => {
//   if (stock === 0) return "out_of_stock";
//   if (stock < 15) return "low_stock";
//   return "active";
// };
// export default function ProductsPage() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const filteredProducts = products.filter(product => {
//     const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          product.sku.toLowerCase().includes(searchTerm.toLowerCase());
 
//     const matchesCategory = categoryFilter === "all" || product.category.toLowerCase() === categoryFilter;
//     const matchesStatus = statusFilter === "all" || getStockStatus(product.stock) === statusFilter;
 
//     return matchesSearch && matchesCategory && matchesStatus;
//   });
//   const productStats = {
//     total: products.length,
//     active: products.filter(p => getStockStatus(p.stock) === "active").length,
//     lowStock: products.filter(p => getStockStatus(p.stock) === "low_stock").length,
//     outOfStock: products.filter(p => getStockStatus(p.stock) === "out_of_stock").length,
//   };
//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-start mb-6">
//         <div>
//           <h1 className="font-serif text-3xl font-light mb-2">Products</h1>
//           <p className="text-muted-foreground">
//             Manage your product catalog and inventory
//           </p>
//         </div>
//         <Button>
//           <Plus className="mr-2 h-4 w-4" />
//           Add Product
//         </Button>
//       </div>
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Total Products</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{productStats.total}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Active</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-green-600">{productStats.active}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-yellow-600">{productStats.lowStock}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-red-600">{productStats.outOfStock}</div>
//           </CardContent>
//         </Card>
//       </div>
//       {/* Filters and Search */}
//       <div className="flex flex-col sm:flex-row gap-4 mb-6">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search products..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10"
//           />
//         </div>
//         <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//           <SelectTrigger className="w-full sm:w-48">
//             <SelectValue placeholder="Filter by category" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Categories</SelectItem>
//             <SelectItem value="men">Men</SelectItem>
//             <SelectItem value="women">Women</SelectItem>
//             <SelectItem value="accessories">Accessories</SelectItem>
//           </SelectContent>
//         </Select>
//         <Select value={statusFilter} onValueChange={setStatusFilter}>
//           <SelectTrigger className="w-full sm:w-48">
//             <SelectValue placeholder="Filter by status" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Status</SelectItem>
//             <SelectItem value="active">Active</SelectItem>
//             <SelectItem value="low_stock">Low Stock</SelectItem>
//             <SelectItem value="out_of_stock">Out of Stock</SelectItem>
//           </SelectContent>
//         </Select>
//         <Button variant="outline">
//           <Download className="mr-2 h-4 w-4" />
//           Export
//         </Button>
//       </div>
//       {/* Products Grid */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Products ({filteredProducts.length})</CardTitle>
//           <CardDescription>
//             Manage your product inventory and details
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredProducts.map((product) => (
//               <div key={product.id} className="border rounded-lg p-4 space-y-4">
//                 <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md bg-muted">
//                   <Image
//                     src={product.image}
//                     alt={product.name}
//                     fill
//                     className="object-cover object-center"
//                   />
//                 </div>
             
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="font-medium line-clamp-2">{product.name}</h3>
//                       <p className="text-sm text-muted-foreground">{product.sku}</p>
//                     </div>
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="icon">
//                           <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuItem>
//                           <Eye className="mr-2 h-4 w-4" />
//                           View
//                         </DropdownMenuItem>
//                         <DropdownMenuItem>
//                           <Edit className="mr-2 h-4 w-4" />
//                           Edit
//                         </DropdownMenuItem>
//                         <DropdownMenuItem className="text-red-600">
//                           <Trash2 className="mr-2 h-4 w-4" />
//                           Delete
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </div>
               
//                   <div className="flex justify-between items-center">
//                     <span className="font-medium">${product.price.toFixed(2)}</span>
//                     <Badge className={getStatusColor(getStockStatus(product.stock))}>
//                       {product.stock === 0 ? "Out of Stock" : 
//                        product.stock < 15 ? "Low Stock" : "In Stock"}
//                     </Badge>
//                   </div>
               
//                   <div className="flex justify-between text-sm text-muted-foreground">
//                     <span>Stock: {product.stock}</span>
//                     <span>Sales: {product.sales}</span>
//                   </div>
               
//                   <div className="flex gap-2">
//                     <Button variant="outline" size="sm" className="flex-1">
//                       <Edit className="mr-2 h-4 w-4" />
//                       Edit
//                     </Button>
//                     <Button variant="outline" size="sm" className="flex-1">
//                       <Eye className="mr-2 h-4 w-4" />
//                       View
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


///////////////////////////////////////////////////////////
//reviews
// "use client";
// import { useState } from "react";
// import { Search, Filter, Star, MoreHorizontal, Eye, Trash2, CheckCircle, XCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// // Sample reviews data
// const reviews = [
//   {
//     id: 1,
//     customer: "Sarah Johnson",
//     email: "sarah@gmail.com",
//     avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
//     product: "Tailored Cotton Overshirt",
//     rating: 5,
//     title: "Perfect fit and quality!",
//     comment: "This overshirt is exactly what I was looking for. The quality is excellent and the fit is perfect. I'm usually between sizes and went with the larger one, which gives me the relaxed look I wanted. Highly recommended!",
//     date: "2025-01-15",
//     status: "approved",
//     helpful: 12
//   },
//   {
//     id: 2,
//     customer: "Michael Chen",
//     email: "michael@gmail.com",
//     avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
//     product: "Structured Wool Blazer",
//     rating: 4,
//     title: "Great quality, color slightly different",
//     comment: "Great blazer with excellent quality fabric. The only reason I'm giving it 4 stars instead of 5 is that the color is slightly different than shown in the photos. Still very happy with my purchase.",
//     date: "2025-01-14",
//     status: "pending",
//     helpful: 8
//   },
//   {
//     id: 3,
//     customer: "Emma Wilson",
//     email: "emma@gmail.com",
//     avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
//     product: "Relaxed Linen Shirt",
//     rating: 5,
//     title: "Incredible quality and attention to detail",
//     comment: "Incredible quality and attention to detail. This is my third purchase from Vanguard and they never disappoint. The linen is so soft and the stitching is impeccable. Worth every penny.",
//     date: "2025-01-13",
//     status: "approved",
//     helpful: 15
//   },
//   {
//     id: 4,
//     customer: "David Rodriguez",
//     email: "david@gmail.com",
//     avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
//     product: "High-Waist Tapered Pants",
//     rating: 2,
//     title: "Sizing runs small",
//     comment: "The pants look great but the sizing runs very small. I ordered my usual size but they were too tight. The return process was smooth though.",
//     date: "2025-01-12",
//     status: "flagged",
//     helpful: 3
//   },
//   {
//     id: 5,
//     customer: "Lisa Thompson",
//     email: "lisa@gmail.com",
//     avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
//     product: "Oversized Merino Sweater",
//     rating: 5,
//     title: "Cozy and stylish",
//     comment: "Love this sweater! It's so cozy and the oversized fit is perfect for layering. The merino wool is incredibly soft and doesn't itch at all.",
//     date: "2025-01-11",
//     status: "approved",
//     helpful: 9
//   },
// ];
// const getStatusColor = (status: string) => {
//   switch (status) {
//     case "approved":
//       return "bg-green-100 text-green-800";
//     case "pending":
//       return "bg-yellow-100 text-yellow-800";
//     case "flagged":
//       return "bg-red-100 text-red-800";
//     case "rejected":
//       return "bg-gray-100 text-gray-800";
//     default:
//       return "bg-gray-100 text-gray-800";
//   }
// };
// const renderStars = (rating: number) => {
//   return Array.from({ length: 5 }, (_, i) => (
//     <Star
//       key={i}
//       className={`h-4 w-4 ${
//         i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
//       }`}
//     />
//   ));
// };
// export default function ReviewsPage() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [ratingFilter, setRatingFilter] = useState("all");
//   const filteredReviews = reviews.filter(review => {
//     const matchesSearch = review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          review.comment.toLowerCase().includes(searchTerm.toLowerCase());
 
//     const matchesStatus = statusFilter === "all" || review.status === statusFilter;
//     const matchesRating = ratingFilter === "all" || review.rating.toString() === ratingFilter;
 
//     return matchesSearch && matchesStatus && matchesRating;
//   });
//   const reviewStats = {
//     total: reviews.length,
//     approved: reviews.filter(r => r.status === "approved").length,
//     pending: reviews.filter(r => r.status === "pending").length,
//     flagged: reviews.filter(r => r.status === "flagged").length,
//     averageRating: reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length,
//   };
//   return (
//     <div className="p-6">
//       <div className="mb-6">
//         <h1 className="font-serif text-3xl font-light mb-2">Reviews</h1>
//         <p className="text-muted-foreground">
//           Manage customer reviews and feedback
//         </p>
//       </div>
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{reviewStats.total}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Approved</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-green-600">{reviewStats.approved}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Pending</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-yellow-600">{reviewStats.pending}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Flagged</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-red-600">{reviewStats.flagged}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{reviewStats.averageRating.toFixed(1)}</div>
//           </CardContent>
//         </Card>
//       </div>
//       {/* Filters and Search */}
//       <div className="flex flex-col sm:flex-row gap-4 mb-6">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search reviews..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10"
//           />
//         </div>
//         <Select value={statusFilter} onValueChange={setStatusFilter}>
//           <SelectTrigger className="w-full sm:w-48">
//             <SelectValue placeholder="Filter by status" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Status</SelectItem>
//             <SelectItem value="approved">Approved</SelectItem>
//             <SelectItem value="pending">Pending</SelectItem>
//             <SelectItem value="flagged">Flagged</SelectItem>
//             <SelectItem value="rejected">Rejected</SelectItem>
//           </SelectContent>
//         </Select>
//         <Select value={ratingFilter} onValueChange={setRatingFilter}>
//           <SelectTrigger className="w-full sm:w-48">
//             <SelectValue placeholder="Filter by rating" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Ratings</SelectItem>
//             <SelectItem value="5">5 Stars</SelectItem>
//             <SelectItem value="4">4 Stars</SelectItem>
//             <SelectItem value="3">3 Stars</SelectItem>
//             <SelectItem value="2">2 Stars</SelectItem>
//             <SelectItem value="1">1 Star</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//       {/* Reviews List */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Reviews ({filteredReviews.length})</CardTitle>
//           <CardDescription>
//             Manage customer reviews and moderate content
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-6">
//             {filteredReviews.map((review) => (
//               <div key={review.id} className="border rounded-lg p-6">
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-start space-x-4">
//                     <Avatar className="h-12 w-12">
//                       <AvatarImage src={review.avatar} alt={review.customer} />
//                       <AvatarFallback>
//                         {review.customer.split(' ').map(n => n[0]).join('')}
//                       </AvatarFallback>
//                     </Avatar>
                 
//                     <div>
//                       <div className="flex items-center space-x-2 mb-1">
//                         <h3 className="font-medium">{review.customer}</h3>
//                         <Badge className={getStatusColor(review.status)}>
//                           {review.status}
//                         </Badge>
//                       </div>
//                       <div className="flex items-center space-x-2 mb-2">
//                         <div className="flex">{renderStars(review.rating)}</div>
//                         <span className="text-sm text-muted-foreground">•</span>
//                         <span className="text-sm text-muted-foreground">{review.date}</span>
//                       </div>
//                       <p className="text-sm text-muted-foreground">
//                         Product: {review.product}
//                       </p>
//                     </div>
//                   </div>
               
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="icon">
//                         <MoreHorizontal className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuItem>
//                         <CheckCircle className="mr-2 h-4 w-4" />
//                         Approve
//                       </DropdownMenuItem>
//                       <DropdownMenuItem>
//                         <XCircle className="mr-2 h-4 w-4" />
//                         Reject
//                       </DropdownMenuItem>
//                       <DropdownMenuItem>
//                         <Eye className="mr-2 h-4 w-4" />
//                         View Details
//                       </DropdownMenuItem>
//                       <DropdownMenuItem className="text-red-600">
//                         <Trash2 className="mr-2 h-4 w-4" />
//                         Delete
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </div>
             
//                 <div className="mb-4">
//                   <h4 className="font-medium mb-2">{review.title}</h4>
//                   <p className="text-muted-foreground">{review.comment}</p>
//                 </div>
             
//                 <div className="flex items-center justify-between text-sm text-muted-foreground">
//                   <span>{review.helpful} people found this helpful</span>
//                   <div className="flex space-x-2">
//                     <Button variant="outline" size="sm">
//                       <CheckCircle className="mr-2 h-4 w-4" />
//                       Approve
//                     </Button>
//                     <Button variant="outline" size="sm">
//                       <XCircle className="mr-2 h-4 w-4" />
//                       Reject
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
////////////////////////////////////////////////////////////
//settings
"use client";
import { useState } from "react";
import { Save, Upload, Globe, Mail, Shield, CreditCard, Truck, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const handleSave = async () => {
    setIsLoading(true);
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };
  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="font-serif text-3xl font-light mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Configure your store settings and preferences
          </p>
        </div>
        <Button onClick={handleSave} disabled={isLoading}>
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>
                  Basic configuration for your store
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input id="storeName" defaultValue="Vanguard Apparel" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeUrl">Store URL</Label>
                    <Input id="storeUrl" defaultValue="vanguardapparel.com" />
                  </div>
                </div>
             
                <div className="space-y-2">
                  <Label htmlFor="storeDescription">Store Description</Label>
                  <Textarea
                    id="storeDescription"
                    defaultValue="Redefining contemporary fashion with timeless elegance and bold innovation."
                    rows={3}
                  />
                </div>
             
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="america/new_york">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="america/new_york">Eastern Time (ET)</SelectItem>
                        <SelectItem value="america/chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="america/denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="america/los_angeles">Pacific Time (PT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD - US Dollar</SelectItem>
                        <SelectItem value="eur">EUR - Euro</SelectItem>
                        <SelectItem value="gbp">GBP - British Pound</SelectItem>
                        <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Logo & Branding</CardTitle>
                <CardDescription>
                  Upload your store logo and customize branding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Store Logo</Label>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Logo</span>
                    </div>
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Logo
                    </Button>
                  </div>
                </div>
             
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <Input id="primaryColor" type="color" defaultValue="#000000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <Input id="secondaryColor" type="color" defaultValue="#6b7280" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="store">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>
                Contact information and business details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input id="contactEmail" type="email" defaultValue="info@vanguardapparel.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input id="supportEmail" type="email" defaultValue="support@vanguardapparel.com" />
                </div>
              </div>
           
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (212) 555-0123" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fax">Fax Number</Label>
                  <Input id="fax" defaultValue="+1 (212) 555-0124" />
                </div>
              </div>
           
              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Textarea
                  id="address"
                  defaultValue="123 Fashion Avenue, SoHo, New York, NY 10012, United States"
                  rows={3}
                />
              </div>
           
              <Separator />
           
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Store Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Monday - Friday</Label>
                    <Input defaultValue="10:00 AM - 7:00 PM" />
                  </div>
                  <div className="space-y-2">
                    <Label>Saturday</Label>
                    <Input defaultValue="11:00 AM - 8:00 PM" />
                  </div>
                  <div className="space-y-2">
                    <Label>Sunday</Label>
                    <Input defaultValue="12:00 PM - 6:00 PM" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Payment Settings
              </CardTitle>
              <CardDescription>
                Configure payment methods and processing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Credit Cards</h4>
                    <p className="text-sm text-muted-foreground">Accept Visa, Mastercard, American Express</p>
                  </div>
                  <Switch defaultChecked />
                </div>
             
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">PayPal</h4>
                    <p className="text-sm text-muted-foreground">Accept PayPal payments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
             
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Apple Pay</h4>
                    <p className="text-sm text-muted-foreground">Accept Apple Pay payments</p>
                  </div>
                  <Switch />
                </div>
             
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Google Pay</h4>
                    <p className="text-sm text-muted-foreground">Accept Google Pay payments</p>
                  </div>
                  <Switch />
                </div>
              </div>
           
              <Separator />
           
              <div className="space-y-4">
                <h4 className="font-medium">Payment Processing</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input id="taxRate" type="number" defaultValue="8.25" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="processingFee">Processing Fee (%)</Label>
                    <Input id="processingFee" type="number" defaultValue="2.9" step="0.1" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="mr-2 h-5 w-5" />
                Shipping Settings
              </CardTitle>
              <CardDescription>
                Configure shipping options and rates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Free Shipping</h4>
                    <p className="text-sm text-muted-foreground">Offer free shipping on orders over threshold</p>
                  </div>
                  <Switch defaultChecked />
                </div>
             
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="freeShippingThreshold">Free Shipping Threshold</Label>
                    <Input id="freeShippingThreshold" type="number" defaultValue="100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="standardShippingRate">Standard Shipping Rate</Label>
                    <Input id="standardShippingRate" type="number" defaultValue="15" />
                  </div>
                </div>
              </div>
           
              <Separator />
           
              <div className="space-y-4">
                <h4 className="font-medium">Shipping Zones</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <span className="font-medium">Domestic (United States)</span>
                      <p className="text-sm text-muted-foreground">Standard: $15, Express: $25</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <span className="font-medium">International</span>
                      <p className="text-sm text-muted-foreground">Standard: $35, Express: $65</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure email notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Order Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">New Order</span>
                      <p className="text-sm text-muted-foreground">Notify when new orders are placed</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
               
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Order Shipped</span>
                      <p className="text-sm text-muted-foreground">Notify when orders are shipped</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
               
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Order Delivered</span>
                      <p className="text-sm text-muted-foreground">Notify when orders are delivered</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
           
              <Separator />
           
              <div className="space-y-4">
                <h4 className="font-medium">Inventory Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Low Stock Alert</span>
                      <p className="text-sm text-muted-foreground">Notify when products are low in stock</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
               
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Out of Stock Alert</span>
                      <p className="text-sm text-muted-foreground">Notify when products are out of stock</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
             
                <div className="space-y-2">
                  <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                  <Input id="lowStockThreshold" type="number" defaultValue="10" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage security and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Authentication</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Two-Factor Authentication</span>
                      <p className="text-sm text-muted-foreground">Require 2FA for admin access</p>
                    </div>
                    <Switch />
                  </div>
               
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Session Timeout</span>
                      <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
             
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input id="sessionTimeout" type="number" defaultValue="30" />
                </div>
              </div>
           
              <Separator />
           
              <div className="space-y-4">
                <h4 className="font-medium">Data Protection</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Data Encryption</span>
                      <p className="text-sm text-muted-foreground">Encrypt sensitive customer data</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
               
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Audit Logging</span>
                      <p className="text-sm text-muted-foreground">Log all admin actions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
//////////////////////////////////////////////////////////
//shipping
// "use client";

// import { useState } from "react";
// import { Search, Plus, Edit, Trash2, MoreHorizontal, Truck, Package } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// // Sample shipping data
// const shippingMethods = [
//   {
//     id: 1,
//     name: "Standard Shipping",
//     description: "5-7 business days",
//     price: 15.00,
//     freeThreshold: 100.00,
//     status: "active",
//     zones: ["Domestic"]
//   },
//   {
//     id: 2,
//     name: "Express Shipping",
//     description: "2-3 business days",
//     price: 25.00,
//     freeThreshold: 200.00,
//     status: "active",
//     zones: ["Domestic"]
//   },
//   {
//     id: 3,
//     name: "Overnight Shipping",
//     description: "Next business day",
//     price: 45.00,
//     freeThreshold: null,
//     status: "active",
//     zones: ["Domestic"]
//   },
//   {
//     id: 4,
//     name: "International Standard",
//     description: "10-15 business days",
//     price: 35.00,
//     freeThreshold: 250.00,
//     status: "active",
//     zones: ["International"]
//   },
//   {
//     id: 5,
//     name: "International Express",
//     description: "5-7 business days",
//     price: 65.00,
//     freeThreshold: null,
//     status: "active",
//     zones: ["International"]
//   },
// ];

// const shippingZones = [
//   {
//     id: 1,
//     name: "Domestic",
//     description: "United States",
//     countries: ["United States"],
//     status: "active"
//   },
//   {
//     id: 2,
//     name: "International",
//     description: "All other countries",
//     countries: ["Canada", "United Kingdom", "Australia", "Germany", "France"],
//     status: "active"
//   },
// ];

// const recentShipments = [
//   {
//     id: "SHIP-001",
//     orderId: "ORD-001",
//     customer: "Sarah Johnson",
//     method: "Standard Shipping",
//     status: "delivered",
//     trackingNumber: "1Z999AA1234567890",
//     date: "2025-01-15"
//   },
//   {
//     id: "SHIP-002",
//     orderId: "ORD-002",
//     customer: "Michael Chen",
//     method: "Express Shipping",
//     status: "in_transit",
//     trackingNumber: "1Z999AA1234567891",
//     date: "2025-01-14"
//   },
//   {
//     id: "SHIP-003",
//     orderId: "ORD-003",
//     customer: "Emma Wilson",
//     method: "Standard Shipping",
//     status: "shipped",
//     trackingNumber: "1Z999AA1234567892",
//     date: "2025-01-13"
//   },
// ];

// const getStatusColor = (status: string) => {
//   switch (status) {
//     case "active":
//       return "bg-green-100 text-green-800";
//     case "inactive":
//       return "bg-gray-100 text-gray-800";
//     case "delivered":
//       return "bg-green-100 text-green-800";
//     case "in_transit":
//       return "bg-blue-100 text-blue-800";
//     case "shipped":
//       return "bg-purple-100 text-purple-800";
//     case "pending":
//       return "bg-yellow-100 text-yellow-800";
//     default:
//       return "bg-gray-100 text-gray-800";
//   }
// };

// export default function ShippingPage() {
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredMethods = shippingMethods.filter(method =>
//     method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     method.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-start mb-6">
//         <div>
//           <h1 className="font-serif text-3xl font-light mb-2">Shipping</h1>
//           <p className="text-muted-foreground">
//             Manage shipping methods, zones, and track shipments
//           </p>
//         </div>
//         <Button>
//           <Plus className="mr-2 h-4 w-4" />
//           Add Shipping Method
//         </Button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Shipping Methods</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{shippingMethods.length}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Shipping Zones</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{shippingZones.length}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Recent Shipments</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{recentShipments.length}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">In Transit</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-blue-600">
//               {recentShipments.filter(s => s.status === "in_transit").length}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Shipping Tabs */}
//       <Tabs defaultValue="methods" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="methods">Shipping Methods</TabsTrigger>
//           <TabsTrigger value="zones">Shipping Zones</TabsTrigger>
//           <TabsTrigger value="shipments">Recent Shipments</TabsTrigger>
//         </TabsList>

//         <TabsContent value="methods">
//           {/* Search */}
//           <div className="flex gap-4 mb-6">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search shipping methods..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//           </div>

//           <Card>
//             <CardHeader>
//               <CardTitle>Shipping Methods ({filteredMethods.length})</CardTitle>
//               <CardDescription>
//                 Configure shipping options and pricing
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {filteredMethods.map((method) => (
//                   <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
//                     <div className="flex items-center space-x-4">
//                       <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-lg">
//                         <Truck className="h-6 w-6 text-muted-foreground" />
//                       </div>
                      
//                       <div>
//                         <div className="flex items-center space-x-2">
//                           <h3 className="font-medium">{method.name}</h3>
//                           <Badge className={getStatusColor(method.status)}>
//                             {method.status}
//                           </Badge>
//                         </div>
//                         <p className="text-sm text-muted-foreground">{method.description}</p>
//                         <p className="text-xs text-muted-foreground">
//                           Zones: {method.zones.join(", ")}
//                         </p>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center space-x-4">
//                       <div className="text-right">
//                         <div className="font-medium">${method.price.toFixed(2)}</div>
//                         <div className="text-sm text-muted-foreground">
//                           {method.freeThreshold ? `Free over $${method.freeThreshold}` : "No free shipping"}
//                         </div>
//                       </div>
                      
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" size="icon">
//                             <MoreHorizontal className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuItem>
//                             <Edit className="mr-2 h-4 w-4" />
//                             Edit Method
//                           </DropdownMenuItem>
//                           <DropdownMenuItem>
//                             Configure Zones
//                           </DropdownMenuItem>
//                           <DropdownMenuItem className="text-red-600">
//                             <Trash2 className="mr-2 h-4 w-4" />
//                             Delete Method
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="zones">
//           <Card>
//             <CardHeader>
//               <CardTitle>Shipping Zones ({shippingZones.length})</CardTitle>
//               <CardDescription>
//                 Define geographical areas for shipping
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {shippingZones.map((zone) => (
//                   <div key={zone.id} className="flex items-center justify-between p-4 border rounded-lg">
//                     <div className="flex items-center space-x-4">
//                       <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-lg">
//                         <Package className="h-6 w-6 text-muted-foreground" />
//                       </div>
                      
//                       <div>
//                         <div className="flex items-center space-x-2">
//                           <h3 className="font-medium">{zone.name}</h3>
//                           <Badge className={getStatusColor(zone.status)}>
//                             {zone.status}
//                           </Badge>
//                         </div>
//                         <p className="text-sm text-muted-foreground">{zone.description}</p>
//                         <p className="text-xs text-muted-foreground">
//                           Countries: {zone.countries.slice(0, 3).join(", ")}
//                           {zone.countries.length > 3 && ` +${zone.countries.length - 3} more`}
//                         </p>
//                       </div>
//                     </div>
                    
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="icon">
//                           <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuItem>
//                           <Edit className="mr-2 h-4 w-4" />
//                           Edit Zone
//                         </DropdownMenuItem>
//                         <DropdownMenuItem>
//                           Manage Countries
//                         </DropdownMenuItem>
//                         <DropdownMenuItem className="text-red-600">
//                           <Trash2 className="mr-2 h-4 w-4" />
//                           Delete Zone
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="shipments">
//           <Card>
//             <CardHeader>
//               <CardTitle>Recent Shipments ({recentShipments.length})</CardTitle>
//               <CardDescription>
//                 Track and manage recent shipments
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {recentShipments.map((shipment) => (
//                   <div key={shipment.id} className="flex items-center justify-between p-4 border rounded-lg">
//                     <div className="flex items-center space-x-4">
//                       <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-lg">
//                         <Package className="h-6 w-6 text-muted-foreground" />
//                       </div>
                      
//                       <div>
//                         <div className="flex items-center space-x-2">
//                           <h3 className="font-medium">{shipment.id}</h3>
//                           <Badge className={getStatusColor(shipment.status)}>
//                             {shipment.status.replace("_", " ")}
//                           </Badge>
//                         </div>
//                         <p className="text-sm text-muted-foreground">
//                           Order: {shipment.orderId} • Customer: {shipment.customer}
//                         </p>
//                         <p className="text-xs text-muted-foreground">
//                           Tracking: {shipment.trackingNumber}
//                         </p>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center space-x-4">
//                       <div className="text-right">
//                         <div className="font-medium">{shipment.method}</div>
//                         <div className="text-sm text-muted-foreground">{shipment.date}</div>
//                       </div>
                      
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" size="icon">
//                             <MoreHorizontal className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuItem>
//                             Track Shipment
//                           </DropdownMenuItem>
//                           <DropdownMenuItem>
//                             Update Status
//                           </DropdownMenuItem>
//                           <DropdownMenuItem>
//                             Print Label
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }


