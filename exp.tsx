{/* Journal Highlights */}
/*<section className={styles.journal}>
  <div className={styles.container}>
    <div className={styles.journalHeader}>
      <h2 className={styles.journalTitle}>Journal</h2>
      <Link href="/journal" className={styles.journalLink}>
        View All →
      </Link>
    </div>
    
    <div className={styles.journalGrid}>
      {[1, 2, 3].map((item) => (
        <div key={item} className={styles.journalCard}>
          <div className={styles.journalImage}>
            <Image
              src={`https://images.pexels.com/photos/833052${item}.jpeg`}
              alt={`Journal post ${item}`}
              width={600}
              height={400}
            />
          </div>
          <div className={styles.journalContent}>
            <h3 className={styles.journalArticleTitle}>
              {item === 1 && "The Art of Sustainable Fashion"}
              {item === 2 && "Behind the Scenes: Summer Collection"}
              {item === 3 && "Style Guide: Minimalist Wardrobe"}
            </h3>
            <p className={styles.journalDate}>
              {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
*/
/*
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import styles from "./page.module.css";


const featuredPost = {
  id: 1,
  title: "The Art of Sustainable Fashion",
  excerpt: "Exploring how Vanguard is redefining sustainable practices in the fashion industry without compromising on style or quality.",
  date: "April 15, 2025",
  image: "https://images.pexels.com/photos/6567735/pexels-photo-6567735.jpeg",
  category: "Sustainability",
};

const posts = [
  {
    id: 2,
    title: "Behind the Scenes: Summer Collection",
    excerpt: "Get an exclusive look at the inspiration and creation process of our newest summer collection, from concept to runway.",
    date: "April 8, 2025",
    image: "https://images.pexels.com/photos/5709656/pexels-photo-5709656.jpeg",
    category: "Collections",
  },
  {
    id: 3,
    title: "Style Guide: Minimalist Wardrobe",
    excerpt: "Curating a timeless wardrobe with versatile pieces that transition effortlessly between seasons and occasions.",
    date: "March 24, 2025",
    image: "https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg",
    category: "Style",
  },
  {
    id: 4,
    title: "The Future of Fashion Retail",
    excerpt: "How technology is transforming the retail experience and creating new ways for customers to engage with fashion brands.",
    date: "March 17, 2025",
    image: "https://images.pexels.com/photos/3735641/pexels-photo-3735641.jpeg",
    category: "Industry",
  },
  {
    id: 5,
    title: "Designer Interview: Alex Chen",
    excerpt: "A conversation with our co-founder and creative director on his design philosophy and vision for Vanguard Apparel.",
    date: "March 5, 2025",
    image: "https://images.pexels.com/photos/7172089/pexels-photo-7172089.jpeg",
    category: "Interviews",
  },
  {
    id: 6,
    title: "Material Spotlight: Organic Linen",
    excerpt: "Exploring the environmental benefits and luxurious feel of the organic linen featured in our latest collection.",
    date: "February 28, 2025",
    image: "https://images.pexels.com/photos/6069552/pexels-photo-6069552.jpeg",
    category: "Materials",
  },
  {
    id: 7,
    title: "Fashion Week Highlights",
    excerpt: "Recap of the most inspiring moments and trends from this season's international fashion weeks.",
    date: "February 15, 2025",
    image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg",
    category: "Events",
  },
];

const categories = [
  "All",
  "Collections",
  "Style",
  "Sustainability",
  "Industry",
  "Interviews",
  "Materials",
  "Events",
];

export default function JournalPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Journal</h1>
        <p className={styles.subtitle}>
          Insights, stories, and updates from the world of Vanguard Apparel.
        </p>

        {/* Categories *//*}
        <div className={styles.categories}>
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
              className={styles.categoryButton}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Post *//*}
        <div className={styles.featuredPost}>
          <Image
            src={featuredPost.image}
            alt={featuredPost.title}
            fill
            className={styles.featuredImage}
            priority
          />
          <div className={styles.featuredOverlay} />
          <div className={styles.featuredContent}>

            <span className={styles.categoryTag}>{featuredPost.category}</span>
            
            <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
            
            <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>
            
            <div className={styles.featuredFooter}>
              <p className={styles.featuredDate}>{featuredPost.date}</p>
              
              <Button asChild size="sm" className={styles.featuredButton}>
                
                <Link href={`/journal/${featuredPost.id}`}>
                  Read Article
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Journal Posts Grid *//*}
        <div className={styles.postsGrid}>
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/journal/${post.id}`}
              className={styles.postLink}
            >
              <div className={styles.postImageContainer}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className={styles.postImage}
                />
              </div>
              <span className={styles.categoryTag}>{post.category}</span>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <p className={styles.postExcerpt}>{post.excerpt}</p>
              <p className={styles.postDate}>{post.date}</p>
            </Link>
          ))}
        </div>

        {/* Pagination *//*}
        <div className={styles.pagination}>
          <nav className={styles.paginationNav}>
            <Button variant="outline" size="icon" disabled className={styles.paginationButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.paginationIcon}
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span className="sr-only">Previous page</span>
            </Button>
            {[1, 2, 3].map((page) => (
              <Button
                key={page}
                variant={page === 1 ? "default" : "outline"}
                size="icon"
                className={styles.pageButton}
              >
                {page}
              </Button>
            ))}
            <Button variant="outline" size="icon" className={styles.paginationButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.paginationIcon}
              >
                <path d="m9 6 6 6-6 6" />
              </svg>
              <span className="sr-only">Next page</span>
            </Button>
          </nav>
        </div>
      </div>
    </main>
  );
}*/
/*
import { Filter, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProductsGrid from "@/components/products-grid";
import ProductFilters from "@/components/product-filters";
import styles from "./page.module.css";

export default function ShopPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div>
            <h1 className={styles.title}>Shop</h1>
            <p className={styles.subtitle}>
              Explore our latest collections of premium garments and accessories.
            </p>
          </div>
          
          <div className={styles.headerActions}>
            <div className={styles.mobileHeader}>
              <Button variant="outline" size="sm" className={styles.filterButton}>
                <Filter className={styles.filterIcon} />
                Filters
              </Button>
              <div className={styles.mobileInfo}>
                <p className={styles.productCount}>48 products</p>
              </div>
            </div>
            
            <div className={styles.sortSection}>
              <span className={styles.sortLabel}>Sort by:</span>
              <Button variant="ghost" size="sm" className={styles.sortButton}>
                Newest
                <ChevronDown className={styles.sortIcon} />
              </Button>
            </div>
          </div>
          
          <div className={styles.mobileCategories}>
            <ShopCategories />
            <Separator className={styles.mobileSeparator} />
          </div>
          
          <div className={styles.mainContent}>
            <div className={styles.sidebar}>
              <ProductFilters />
            </div>
            <div className={styles.productsGrid}>
              <ProductsGrid />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ShopCategories() {
  return (
    <div className={styles.categories}>
      {["All", "New Arrivals", "Men", "Women", "Accessories", "Sale"].map((category) => (
        <Button key={category} variant="outline" size="sm" className={styles.categoryButton}>
          {category}
        </Button>
      ))}
    </div>
  );
}
*/

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
          <ChevronRight className={styles.breadcrumbIcon} />
          <a href={`/shop?category=${productData.category.toLowerCase()}`} className={styles.breadcrumbLink}>{productData.category}</a>
          <ChevronRight className={styles.breadcrumbIcon} />
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
                  className={`${styles.imageItem} ${index === 0 ? styles.mainImage : ''}`}
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
            
            <Separator className={styles.separator} />
            
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
                    {color === "Stone" && <span className={styles.colorHighlight} />}
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
                    className={`${styles.sizeButton} ${size === "M" ? styles.sizeActive : ''}`}
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
                  <Minus className={styles.quantityIcon} />
                </button>
                <div className={styles.quantityInput}>1</div>
                <button className={styles.quantityButton}>
                  <Plus className={styles.quantityIcon} />
                </button>
              </div>
            </div>
            
            {/* Add to Cart */}
            <div className={styles.cartSection}>
              <Button size="lg" className={styles.addButton}>
                <ShoppingBag className={styles.cartIcon} />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className={styles.wishlistButton}>
                <Heart className={styles.wishlistIcon} />
                <span className="sr-only">Add to Wishlist</span>
              </Button>
            </div>
            
            {/* Product Description */}
            <p className={styles.description}>{productData.description}</p>
            
            <Separator className={styles.separator} />
            
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





