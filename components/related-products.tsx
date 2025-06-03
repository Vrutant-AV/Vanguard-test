import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";

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
              <Button className="rounded-full" size="sm">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
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