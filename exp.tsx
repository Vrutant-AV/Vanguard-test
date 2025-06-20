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

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import styles from "./page.module.css";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LookbookPage() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <Image
          src="https://images.pexels.com/photos/2566025/pexels-photo-2566025.jpeg"
          alt="Vanguard Lookbook"
          fill
          className={styles.heroImage}
          priority
        />
        <div className={styles.overlay} />
        <div className={styles.heroTextContainer}>
          <h1 className={styles.heroTitle}>Lookbook</h1>
        </div>
      </section>

      {/* Collections Tabs */}
      <section className={styles.tabsSection}>
        <Tabs defaultValue="summer2025" className="w-full">
          <div className={styles.tabsHeader}>
            <TabsList className={styles.tabsList}>
              {["Summer 2025", "Spring 2025", "Winter 2024", "Fall 2024"].map((season) => (
                <TabsTrigger
                  key={season}
                  value={season.toLowerCase().replace(" ", "")}
                  className={styles.tabsTrigger}
                >
                  {season}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Summer 2025 Collection */}
          <TabsContent value="summer2025" className="mt-0">
            <div className={styles.collectionIntro}>
              <h2 className={styles.collectionTitle}>Coastal Modernism</h2>
              <p className="text-muted-foreground">
                Our Summer 2025 collection draws inspiration from the meeting point of architecture and coastline. Clean lines and structured silhouettes are softened by lightweight fabrics and a palette of sand, sea foam, and terracotta that evokes Mediterranean summers.
              </p>
              <div className="mt-6">
                <Button asChild variant="outline">
                  <Link href="/shop?collection=summer2025" className="flex items-center">
                    Shop the Collection
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className={styles.gridWrapper}>
              <div className={styles.gridColumn}>
                {[
                  "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg",
                  "https://images.pexels.com/photos/2853909/pexels-photo-2853909.jpeg",
                ].map((src, index) => (
                  <div key={index} className={styles.imageCard}>
                    <Image
                      src={src}
                      alt={`Summer 2025 lookbook image ${index + 1}`}
                      fill
                      className={styles.gridImage}
                    />
                  </div>
                ))}
              </div>
              <div className={styles.gridColumn}>
                {[
                  "https://images.pexels.com/photos/2778144/pexels-photo-2778144.jpeg",
                  "https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg",
                ].map((src, index) => (
                  <div key={index} className={styles.imageCard}>
                    <Image
                      src={src}
                      alt={`Summer 2025 lookbook image ${index + 3}`}
                      fill
                      className={styles.gridImage}
                    />
                  </div>
                ))}
              </div>
              <div className={`${styles.gridColumn} hidden lg:grid`}>
                {[
                  "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg",
                  "https://images.pexels.com/photos/1726496/pexels-photo-1726496.jpeg",
                ].map((src, index) => (
                  <div key={index} className={styles.imageCard}>
                    <Image
                      src={src}
                      alt={`Summer 2025 lookbook image ${index + 5}`}
                      fill
                      className={styles.gridImage}
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="spring2025">
            <div className={styles.emptyCollection}>
              <p className="text-muted-foreground">Spring 2025 collection coming soon.</p>
            </div>
          </TabsContent>
          <TabsContent value="winter2024">
            <div className={styles.emptyCollection}>
              <p className="text-muted-foreground">Winter 2024 collection coming soon.</p>
            </div>
          </TabsContent>
          <TabsContent value="fall2024">
            <div className={styles.emptyCollection}>
              <p className="text-muted-foreground">Fall 2024 collection coming soon.</p>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Behind the Scenes */}
      <section className={styles.btsSection}>
        <div className="container">
          <h2 className={styles.btsTitle}>Behind the Scenes</h2>
          <div className={styles.btsGrid}>
            <div className={styles.btsImageWrapper}>
              <Image
                src="https://images.pexels.com/photos/2451259/pexels-photo-2451259.jpeg"
                alt="Behind the scenes - photoshoot"
                fill
                className={styles.gridImage}
              />
            </div>
            <div className={styles.btsText}>
              <h3 className={styles.btsSubheading}>Summer 2025 Campaign</h3>
              <p className="mb-4 text-muted-foreground">
                Shot on location in Santorini, Greece, our Summer 2025 campaign captures the essence of Mediterranean architecture against the iconic blue and white landscape. We collaborated with renowned photographer Elena Mayer to bring our vision to life.
              </p>
              <p className="text-muted-foreground">
                The campaign features models from diverse backgrounds, each bringing their unique energy to showcase the versatility and inclusivity of our designs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
