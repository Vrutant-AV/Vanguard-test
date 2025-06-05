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

export default function ProductPage({ params }: { params: { id: string } }) {
  const productData = products.find(product => product.id === params.id) || products[0];

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
            <div className={styles.colorSection}>
              <div className={styles.colorHeader}>
                <span className={styles.colorLabel}>Color</span>
                <span className={styles.colorSelected}>Stone</span>
              </div>
              <div className={styles.colorOptions}>
                {productData.colors.map((color) => (
                  <button
                    key={color}
                    className={`${styles.colorButton} ${color === "Stone" ? styles.colorActive : ''}`}
                    aria-label={color}
                  >
                    {color === "Stone" && <span className={styles.colorHighlight}/>}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Size Selection */}
            <div className={styles.sizeSection}>
              <div className={styles.sizeHeader}>
                <span className={styles.sizeLabel}>Size</span>
                <button className={styles.sizeGuide}>Size Guide</button>
              </div>
              <div className={styles.sizeOptions}>
                {productData.sizes.map((size) => (
                  <button
                    key={size}
                    className={`${styles.sizeButton} ${size === "M" ? styles.sizeActive: ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div className={styles.quantitySection}>
              <span className={styles.quantityLabel}>Quantity</span>
              <div className={styles.quantitySelector}>
                <button className={styles.quantityButton}>
                  <Minus className={styles.quantityIcon}/>
                </button>
                <div className={styles.quantityInput}>
                  1
                </div>
                <button className={styles.quantityButton}>
                  <Plus className={styles.quantityIcon}/>
                </button>
              </div>
            </div>
            
            {/* Add to Cart */}
            <div className={styles.cartSection}>
              <Button size="lg" className={styles.addButton}>
                <ShoppingBag className={styles.cartIcon}/>
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className={styles.wishlistButton}>
                <Heart className={styles.wishlistIcon}/>
                <span className="sr-only">Add to Wishlist</span>
              </Button>
            </div>
            
            {/* Product Description */}
            <p className={styles.description}>{productData.description}</p>
            
            <Separator className={styles.separator}/>
            
            {/* Product Information Tabs */}
            <Tabs defaultValue="details" className={styles.tabs}>
              <TabsList className={styles.tabsList}>
                <TabsTrigger
                  value="details"
                  className={styles.tabTrigger}
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="shipping"
                  className={styles.tabTrigger}
                >
                  Shipping
                </TabsTrigger>
                <TabsTrigger
                  value="care"
                  className={styles.tabTrigger}
                >
                  Care
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details" className={styles.tabsContent}>
                <ul className={styles.detailsList}>
                  {productData.details.map((detail, index) => (
                    <li key={index} className={styles.detailItem}>
                      <span className={styles.detailBullet}>•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="shipping" className={styles.tabsContent}>
                <p className={styles.shippingInfo}>
                  Free standard shipping on all orders over $100. Delivery usually takes 3-5 business days.
                  Express shipping available at checkout. International shipping available to select countries.
                </p>
              </TabsContent>
              <TabsContent value="care" className={styles.tabsContent}>
                <p className={styles.careInfo}>
                  Machine wash cold with similar colors. Tumble dry low. Do not bleach.
                  Cool iron if necessary. Do not dry clean.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Reviews Section */}
        <div className={styles.reviewsSection}>
          <h2 className={styles.reviewsTitle}>Customer Reviews</h2>
          <ProductReviews />
        </div>
        
        {/* Related Products */}
        <div className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>You May Also Like</h2>
          <RelatedProducts />
        </div>
      </div>
    </main>
  );
}