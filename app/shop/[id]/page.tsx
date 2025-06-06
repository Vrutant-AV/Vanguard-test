import Image from "next/image";
import { ChevronRight, Minus, Plus, ShoppingBag, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductReviews from "@/components/product-reviews";
import RelatedProducts from "@/components/related-products";
import styles from './page.module.css';

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

export default async function ProductPage({ params }: { params: { id: string } }) {
  const awaitedParams = await params;
  const productData = products.find(product => product.id === awaitedParams.id) || products[0];

  return (
    <main className={styles.main}>
      <div className={styles.container}>

        {/* Breadcrumbs */}
        <div className={styles.breadcrumbs}>
          <a href="/shop" className={styles.breadcrumbLink}>Shop</a>
          <ChevronRight className={styles.breadcrumbIcon}/>
          <a href={`/shop?category=${productData.category.toLowerCase()}`} className={styles.breadcrumbLink}>{productData.category}</a>
          <ChevronRight className={styles.breadcrumbIcon}/>
          <span className={styles.breadcrumbCurrent}>{productData.name}</span>
        </div>
        
        {/* Product Section */}
        <div className={styles.productSection}>
          {/* Product Images */}
          <div className={styles.productImages}>
            <div className={styles.imageGrid}>
              {productData.images.slice(0, 4).map((image, index) => (
                <div 
                  key={index}
                  className={`${styles.imageItem} ${ index === 0 ? styles.mainImage : ''}`}
                >
                  <Image
                    src={image}
                    alt={`${productData.name} - Image ${index + 1}`}
                    fill
                    className={styles.image}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div className={styles.productDetails}>
            <h1 className={styles.productTitle}>{productData.name}</h1>
            <p className={styles.productPrice}>${productData.price.toFixed(2)}</p>
            
            <Separator className={styles.separator}/>
            
            {/* Color Selection */}
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
            
            {/* Size Selection */}
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
            
            {/* Quantity */}
            <div className="mb-6">
              <span className="mb-2 block text-sm font-medium">Quantity</span>
              <div className="flex h-10 w-32">
                <button className="flex w-10 items-center justify-center rounded-l-md border border-r-0 border-border hover:bg-muted">
                  <Minus className="h-4 w-4" />
                </button>
                <div className="flex w-12 items-center justify-center border border-border">
                  1
                </div>
                <button className="flex w-10 items-center justify-center rounded-r-md border border-l-0 border-border hover:bg-muted">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Add to Cart */}
            <div className="mb-6 flex gap-2">
              <Button size="lg" className="flex-1">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="flex w-12 items-center justify-center">
                <Heart className="h-4 w-4" />
                <span className="sr-only">Add to Wishlist</span>
              </Button>
            </div>
            
            {/* Product Description */}
            <p className="text-muted-foreground">{productData.description}</p>
            
            <Separator className="my-6" />
            
            {/* Product Information Tabs */}
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
        
        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="mb-8 font-serif text-2xl font-light md:text-3xl">Customer Reviews</h2>
          <ProductReviews />
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <h2 className="mb-8 font-serif text-2xl font-light md:text-3xl">You May Also Like</h2>
          <RelatedProducts />
        </div>
      </div>
    </main>
  );
}