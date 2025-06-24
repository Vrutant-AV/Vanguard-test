import Link from "next/link";
import Image from "next/image";
//import { ShoppingCart } from "lucide-react";

//import { cn } from "@/lib/utils";
//import { Button } from "@/components/ui/button";
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