/* eslint-disable react/no-unescaped-entities */
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
/*
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
        
        {/* Breadcrumbs *//*}
        <div className={styles.breadcrumbs}>
          <a href="/shop" className={styles.breadcrumbLink}>Shop</a>
          <ChevronRight className={styles.breadcrumbIcon} />
          <a href={`/shop?category=${productData.category.toLowerCase()}`} className={styles.breadcrumbLink}>{productData.category}</a>
          <ChevronRight className={styles.breadcrumbIcon} />
          <span className={styles.breadcrumbCurrent}>{productData.name}</span>
        </div>
        
        {/* Product Section *//*}
        <div className={styles.productSection}>
          {/* Product Images *//*}
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
          
          {/* Product Details *//*}
          <div className={styles.productDetails}>
            <h1 className={styles.productTitle}>{productData.name}</h1>
            <p className={styles.productPrice}>${productData.price.toFixed(2)}</p>
            
            <Separator className={styles.separator} />
            
            {/* Color Selection *//*}
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
            
            {/* Size Selection *//*}
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
            
            {/* Quantity *//*}
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
            
            {/* Add to Cart *//*}
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
            
            {/* Product Description *//*}
            <p className={styles.description}>{productData.description}</p>
            
            <Separator className={styles.separator} />
            
            {/* Product Information Tabs *//*}
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
        
        {/* Reviews Section *//*}
        <div className={styles.reviewsSection}>
          <h2 className={styles.reviewsTitle}>Customer Reviews</h2>
          <ProductReviews />
        </div>
        
        {/* Related Products *//*}
        <div className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>You May Also Like</h2>
          <RelatedProducts />
        </div>
      </div>
    </main>
  );
}
*/
/*
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Package, Heart, Settings, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import styles from "./page.module.css";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-4 lg:gap-12">
          {/* Sidebar *//*}
          <div className="md:col-span-1">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  <Image
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                    alt="Profile picture"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className={styles.profileName}>Sarah Johnson</h2>
                  <p className={styles.profileEmail}>sarah@example.com</p>
                </div>
              </div>
              
              <Separator className={styles.navDivider} />
              
              <nav className={styles.nav}>
                <Button
                  variant="ghost"
                  className={styles.navButton}
                  asChild
                >
                  <Link href="/profile/orders">
                    <Package className={styles.navIcon} />
                    Orders
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className={styles.navButton}
                  asChild
                >
                  <Link href="/profile/wishlist">
                    <Heart className={styles.navIcon} />
                    Wishlist
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className={styles.navButton}
                  asChild
                >
                  <Link href="/profile/settings">
                    <Settings className={styles.navIcon} />
                    Settings
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className={`${styles.navButton} ${styles.navButtonRed}`}
                >
                  <LogOut className={styles.navIcon} />
                  Sign Out
                </Button>
              </nav>
            </div>
          </div>

          {/* Main Content *//*}
          <div className="md:col-span-3">
            <Tabs defaultValue="profile" className={styles.tabs}>
              <TabsList className={styles.tabsList}>
                <TabsTrigger value="profile" className={styles.tabTrigger}>
                  Profile
                </TabsTrigger>
                <TabsTrigger value="addresses" className={styles.tabTrigger}>
                  Addresses
                </TabsTrigger>
                <TabsTrigger value="payment" className={styles.tabTrigger}>
                  Payment Methods
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className={styles.tabsContent}>
                <div className={styles.card}>
                  <div className={styles.formHeader}>
                    <h3 className={styles.formTitle}>Personal Information</h3>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(!isEditing)}
                      className={styles.editButton}
                    >
                      {isEditing ? "Cancel" : "Edit"}
                    </Button>
                  </div>

                  <form className={styles.form}>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <Label htmlFor="firstName" className={styles.formLabel}>
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          defaultValue="Sarah"
                          disabled={!isEditing}
                          className={styles.input}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <Label htmlFor="lastName" className={styles.formLabel}>
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          defaultValue="Johnson"
                          disabled={!isEditing}
                          className={styles.input}
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <Label htmlFor="email" className={styles.formLabel}>
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="sarah@example.com"
                        disabled={!isEditing}
                        className={styles.input}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <Label htmlFor="phone" className={styles.formLabel}>
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        disabled={!isEditing}
                        className={styles.input}
                      />
                    </div>

                    {isEditing && (
                      <div className={styles.formActions}>
                        <Button className={styles.saveButton}>Save Changes</Button>
                      </div>
                    )}
                  </form>
                </div>
              </TabsContent>

              <TabsContent value="addresses" className={styles.tabsContent}>
                <div className={styles.card}>
                  <div className={styles.formHeader}>
                    <h3 className={styles.formTitle}>Saved Addresses</h3>
                    <Button className={styles.addButton}>Add New Address</Button>
                  </div>

                  <div className={styles.addresses}>
                    <div className={styles.addressCard}>
                      <div className={styles.addressHeader}>
                        <div>
                          <p className={styles.addressTitle}>Home</p>
                          <p className={styles.addressDetails}>
                            123 Main Street, Apt 4B<br />
                            New York, NY 10001<br />
                            United States
                          </p>
                        </div>
                        <div className={styles.addressActions}>
                          <Button variant="outline" size="sm" className={styles.addressButton}>
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className={styles.addressButton}>
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className={styles.addressCard}>
                      <div className={styles.addressHeader}>
                        <div>
                          <p className={styles.addressTitle}>Office</p>
                          <p className={styles.addressDetails}>
                            456 Business Ave, Suite 200<br />
                            New York, NY 10002<br />
                            United States
                          </p>
                        </div>
                        <div className={styles.addressActions}>
                          <Button variant="outline" size="sm" className={styles.addressButton}>
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className={styles.addressButton}>
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="payment" className={styles.tabsContent}>
                <div className={styles.card}>
                  <div className={styles.formHeader}>
                    <h3 className={styles.formTitle}>Payment Methods</h3>
                    <Button className={styles.addButton}>Add New Card</Button>
                  </div>

                  <div className={styles.paymentMethods}>
                    <div className={styles.paymentCard}>
                      <div className={styles.paymentHeader}>
                        <div className={styles.paymentInfo}>
                          <div className={styles.paymentMethod} />
                          <div>
                            <p className={styles.cardNumber}>•••• •••• •••• 4242</p>
                            <p className={styles.expiryDate}>Expires 12/25</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className={styles.removeButton}>
                          Remove
                        </Button>
                      </div>
                    </div>

                    <div className={styles.paymentCard}>
                      <div className={styles.paymentHeader}>
                        <div className={styles.paymentInfo}>
                          <div className={styles.paymentMethod} />
                          <div>
                            <p className={styles.cardNumber}>•••• •••• •••• 8888</p>
                            <p className={styles.expiryDate}>Expires 08/24</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className={styles.removeButton}>
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
}
*/
/*
"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import styles from "./page.module.css";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <div className={styles.header}>
            <h1 className={styles.title}>Welcome Back</h1>
            <p className={styles.subtitle}>Sign in to your Vanguard account</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <Label htmlFor="email" className={styles.label}>Email</Label>
              <div className={styles.inputContainer}>
                <Mail className={styles.icon} />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className={styles.input}
                  required
                />
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <div className={styles.passwordHeader}>
                <Label htmlFor="password" className={styles.label}>Password</Label>
                <Link
                  href="/auth/forgot-password"
                  className={styles.forgotPassword}
                >
                  Forgot password?
                </Link>
              </div>
              <div className={styles.inputContainer}>
                <Lock className={styles.icon} />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className={styles.separatorContainer}>
            <Separator className={styles.separator} />
            <span className={styles.separatorText}>Or continue with</span>
          </div>

          <div className={styles.socialButtons}>
            <Button variant="outline" className={styles.socialButton}>Google</Button>
            <Button variant="outline" className={styles.socialButton}>Apple</Button>
          </div>

          <p className={styles.registerLink}>
            Don`t have an account?{" "}
            <Link href="/auth/register" className={styles.registerLinkText}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
} 
*/
/*
import Image from "next/image";
import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      {/* Hero Section *//*}
      <section className={styles.hero}>
        <Image
          src="https://images.pexels.com/photos/1036856/pexels-photo-1036856.jpeg"
          alt="Vanguard Apparel team"
          fill
          className="object-cover object-center"
          priority
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Our Story
          </h1>
        </div>
      </section>

      {/* Brand Story *//*}
      <section className={`container ${styles.section}`}>
        <div className={styles.storyHeader}>
          <h2 className={styles.storyTitle}>
            Redefining Contemporary Fashion
          </h2>
          <p className={styles.storySubtitle}>
            Founded in 2022, Vanguard Apparel emerged from a shared vision to create clothing that balances timeless elegance with contemporary edge.
          </p>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.contentImage}>
            <Image
              src="https://images.pexels.com/photos/5384430/pexels-photo-5384430.jpeg"
              alt="Vanguard founders"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className={styles.contentText}>
            <h3 className={styles.contentTitle}>Our Beginning</h3>
            <p className={styles.contentParagraph}>
              Vanguard was born from the creative partnership of designers Alex Chen and Maya Rodriguez, who met while studying at Central Saint Martins in London. Their complementary aesthetics—Alex's architectural precision and Maya's fluid draping—created a unique design language that quickly gained attention.
            </p>
            <p className={styles.contentParagraph}>
              The duo launched their first collection in spring 2022, featuring just twelve meticulously crafted pieces. The collection sold out within weeks, establishing Vanguard's reputation for refined minimalism with unexpected details.
            </p>
          </div>

          <div className={`${styles.contentText} md:order-3`}>
            <h3 className={styles.contentTitle}>Our Philosophy</h3>
            <p className={styles.contentParagraph}>
              At Vanguard, we believe clothing should empower its wearer through a perfect balance of comfort and confidence. Each garment is designed to be a foundation piece with distinctive character—versatile enough for everyday wear yet unique enough to stand out.
            </p>
            <p className={styles.contentParagraph}>
              We embrace slow fashion principles, creating pieces meant to transcend seasons and trends. Our collections build upon one another rather than replacing what came before, encouraging a more thoughtful approach to personal style.
            </p>
          </div>
          <div className={`${styles.contentImage} md:order-4`}>
            <Image
              src="https://images.pexels.com/photos/5384420/pexels-photo-5384420.jpeg"
              alt="Vanguard workshop"
              fill
              className="object-cover object-center"
            />
          </div>

          <div className={styles.contentImage}>
            <Image
              src="https://images.pexels.com/photos/5704720/pexels-photo-5704720.jpeg"
              alt="Vanguard materials"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className={styles.contentText}>
            <h3 className={styles.contentTitle}>Our Commitment</h3>
            <p className={styles.contentParagraph}>
              Sustainability is fundamental to our ethos. We work with mills and factories that prioritize environmental responsibility, using organic and recycled materials whenever possible. Each supplier is carefully selected based on their ethical practices and quality standards.
            </p>
            <p className={styles.contentParagraph}>
              We're committed to transparency throughout our production process, continuously improving our methods to reduce our environmental impact while creating clothing that's made to last.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section *//*}
      <section className={styles.sectionMuted}>
        <div className={`container ${styles.teamSection}`}>
          <h2 className={styles.teamTitle}>
            Our Team
          </h2>
          <div className={styles.teamGrid}>
            {[
              {
                name: "Alex Chen",
                role: "Co-Founder & Creative Director",
                image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
              },
              {
                name: "Maya Rodriguez",
                role: "Co-Founder & Design Director",
                image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
              },
              {
                name: "David Kim",
                role: "Head of Production",
                image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
              },
            ].map((person) => (
              <div key={person.name} className={styles.teamMember}>
                <div className={styles.memberImage}>
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <h3 className={styles.memberName}>{person.name}</h3>
                <p className={styles.memberRole}>{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} */
/*
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import FeaturedProducts from "@/components/featured-products";
import CategoryShowcase from "@/components/category-showcase";
import NewsletterSignup from "@/components/newsletter-signup";
import { posts } from "@/lib/posts";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section *//*}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image
            src="https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg"
            alt="Vanguard Apparel hero"
            fill
            priority
            className="object-cover object-center"
          />
          <div className={styles.heroOverlay} />
        </div>
        
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            VANGUARD APPAREL
          </h1>
          <p className={styles.heroSubtitle}>
            Redefining contemporary fashion with timeless elegance and bold innovation.
          </p>
          <div className={styles.heroActions}>
            <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
              <Link href="/shop">
                Shop Collection
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link href="/lookbook">
                View Lookbook
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* New Arrivals *//*}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>New Arrivals</h2>
            <Button variant="link" asChild>
              <Link href="/shop" className="flex items-center gap-2">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <FeaturedProducts />
        </div>
      </section>

      {/* Categories Showcase *//*}
      <section className={styles.sectionMuted}>
        <div className="container">
          <h2 className="mb-12 text-center font-serif text-3xl font-light md:text-4xl">Shop Categories</h2>
          <CategoryShowcase />
        </div>
      </section>

      {/* Brand Story *//*}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.brandStoryGrid}>
            <div className={styles.brandStoryImage}>
              <Image
                src="https://images.pexels.com/photos/6567737/pexels-photo-6567737.jpeg"
                alt="Vanguard brand story"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className={styles.brandStoryContent}>
              <h2 className={styles.brandStoryTitle}>Our Story</h2>
              <p className={styles.brandStoryText}>
                Founded in 2022, Vanguard Apparel emerged from a desire to create clothing that balances timeless elegance with contemporary edge. Our designs blend high-quality craftsmanship with innovative silhouettes, resulting in pieces that transcend seasons and trends.
              </p>
              <p className={styles.brandStoryText}>
                We believe in sustainable fashion that makes a statement, using responsibly sourced materials and ethical manufacturing processes. Every Vanguard piece tells a story of conscious luxury.
              </p>
              <Button asChild variant="outline">
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Journal Highlights *//*}
      <section className={styles.sectionMuted}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Journal</h2>
            <Button variant="link" asChild>
              <Link href="/journal" className="flex items-center gap-2">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className={styles.journalGrid}>
            {posts.slice(0, 3).map((post) => (
              <Link href={`/journal/${post.slug}`} key={post.id} className={`${styles.journalCard} group`}>
                <div className={styles.journalCardImage}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className={styles.journalCardTitle}>
                  {post.title}
                </h3>
                <p className={styles.journalCardDate}>
                  {post.date}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter *//*}
      <NewsletterSignup />
    </main>
  );
}
*/

/*
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Package, Heart, Settings, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import styles from "./page.module.css";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className={`container ${styles.container}`}>
        <div className={styles.mainGrid}>
          {/* Sidebar *//*}
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
                <p className={styles.profileEmail}>sarah@example.com</p>
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
                  <Link href="/profile/wishlist">
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
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </nav>
          </div>

          {/* Main Content *//*}
          <div className={styles.content}>
            <Tabs defaultValue="profile">
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="payment">Payment Methods</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6">
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Personal Information</h3>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "Cancel" : "Edit"}
                    </Button>
                  </div>

                  <form className={styles.form}>
                    <div className={styles.formRow}>
                      <div className={styles.fieldGroup}>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          defaultValue="Sarah"
                          disabled={!isEditing}
                        />
                      </div>
                      <div className={styles.fieldGroup}>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          defaultValue="Johnson"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className={styles.fieldGroup}>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="sarah@example.com"
                        disabled={!isEditing}
                      />
                    </div>

                    <div className={styles.fieldGroup}>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        disabled={!isEditing}
                      />
                    </div>

                    {isEditing && (
                      <div className={styles.submitSection}>
                        <Button>Save Changes</Button>
                      </div>
                    )}
                  </form>
                </div>
              </TabsContent>

              <TabsContent value="addresses" className="mt-6">
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Saved Addresses</h3>
                    <Button>Add New Address</Button>
                  </div>

                  <div className="space-y-4">
                    <div className={styles.addressCard}>
                      <div className={styles.addressHeader}>
                        <div>
                          <p className={styles.addressName}>Home</p>
                          <p className={styles.addressDetails}>
                            123 Main Street, Apt 4B<br />
                            New York, NY 10001<br />
                            United States
                          </p>
                        </div>
                        <div className={styles.addressActions}>
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Delete</Button>
                        </div>
                      </div>
                    </div>

                    <div className={styles.addressCard}>
                      <div className={styles.addressHeader}>
                        <div>
                          <p className={styles.addressName}>Office</p>
                          <p className={styles.addressDetails}>
                            456 Business Ave, Suite 200<br />
                            New York, NY 10002<br />
                            United States
                          </p>
                        </div>
                        <div className={styles.addressActions}>
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Delete</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="payment" className="mt-6">
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Payment Methods</h3>
                    <Button>Add New Card</Button>
                  </div>

                  <div className="space-y-4">
                    <div className={styles.paymentCard}>
                      <div className={styles.paymentHeader}>
                        <div className={styles.paymentInfo}>
                          <div className={styles.cardIcon} />
                          <div>
                            <p className={styles.cardNumber}>•••• •••• •••• 4242</p>
                            <p className={styles.cardExpiry}>
                              Expires 12/25
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Remove</Button>
                      </div>
                    </div>

                    <div className={styles.paymentCard}>
                      <div className={styles.paymentHeader}>
                        <div className={styles.paymentInfo}>
                          <div className={styles.cardIcon} />
                          <div>
                            <p className={styles.cardNumber}>•••• •••• •••• 8888</p>
                            <p className={styles.cardExpiry}>
                              Expires 08/24
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Remove</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
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
import { Heart, ShoppingCart, X, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import styles from "./page.module.css";

// Sample wishlist data (in a real app, this would come from a database/API)
const initialWishlistItems = [
  {
    id: 1,
    name: "Tailored Cotton Overshirt",
    price: 189.00,
    image: "https://images.pexels.com/photos/5384428/pexels-photo-5384428.jpeg",
    category: "Men",
    dateAdded: "2025-01-15",
  },
  {
    id: 2,
    name: "Structured Wool Blazer",
    price: 290.00,
    image: "https://images.pexels.com/photos/5384425/pexels-photo-5384425.jpeg",
    category: "Women",
    dateAdded: "2025-01-12",
  },
  {
    id: 3,
    name: "Relaxed Linen Shirt",
    price: 120.00,
    image: "https://images.pexels.com/photos/5384429/pexels-photo-5384429.jpeg",
    category: "Men",
    dateAdded: "2025-01-10",
  },
  {
    id: 4,
    name: "High-Waist Tapered Pants",
    price: 175.00,
    image: "https://images.pexels.com/photos/5384424/pexels-photo-5384424.jpeg",
    category: "Women",
    dateAdded: "2025-01-08",
  },
  {
    id: 5,
    name: "Oversized Merino Sweater",
    price: 210.00,
    image: "https://images.pexels.com/photos/5709656/pexels-photo-5709656.jpeg",
    category: "Women",
    dateAdded: "2025-01-05",
  },
  {
    id: 6,
    name: "Slim Fit Selvedge Jeans",
    price: 165.00,
    image: "https://images.pexels.com/photos/1346187/pexels-photo-1346187.jpeg",
    category: "Men",
    dateAdded: "2025-01-03",
  },
];

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);

  const removeFromWishlist = (productId: number) => {
    setWishlistItems(items => items.filter(item => item.id !== productId));
  };

  const addToCart = async (productId: number) => {
    setAddingToCart(productId);
    
    // Simulate API call
    setTimeout(() => {
      setAddingToCart(null);
      // In a real app, you might show a toast notification here
    }, 1000);
  };

  const clearAllWishlist = () => {
    setWishlistItems([]);
  };

  const addAllToCart = async () => {
    setAddingToCart(-1); // Use -1 to indicate adding all items
    
    // Simulate API call
    setTimeout(() => {
      setAddingToCart(null);
      // In a real app, you might show a toast notification here
    }, 1500);
  };

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Wishlist</h1>
          <p className={styles.subtitle}>
            {wishlistItems.length > 0 
              ? `${wishlistItems.length} item${wishlistItems.length !== 1 ? 's' : ''} saved for later`
              : "No items in your wishlist yet"
            }
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className={styles.emptyState}>
            <Heart className={styles.emptyIcon} />
            <h2 className={styles.emptyTitle}>Your wishlist is empty</h2>
            <p className={styles.emptyDescription}>
              Start browsing our collections and save your favorite items to your wishlist.
              You can add items by clicking the heart icon on any product.
            </p>
            <Button asChild size="lg">
              <Link href="/shop">
                Start Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className={styles.productsGrid}>
              {wishlistItems.map((item) => (
                <div key={item.id} className={styles.productCard}>
                  <div className={styles.productImageContainer}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className={`object-cover object-center ${styles.productImage}`}
                    />
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className={styles.removeButton}
                      aria-label="Remove from wishlist"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className={styles.productContent}>
                    <div className={styles.productCategory}>{item.category}</div>
                    <h3 className={styles.productName}>{item.name}</h3>
                    <div className={styles.productPrice}>${item.price.toFixed(2)}</div>
                    
                    <div className={styles.productActions}>
                      <Button
                        onClick={() => addToCart(item.id)}
                        disabled={addingToCart === item.id}
                        className={styles.addToCartButton}
                      >
                        {addingToCart === item.id ? (
                          "Adding..."
                        ) : (
                          <>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add to Cart
                          </>
                        )}
                      </Button>
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

            {/* Wishlist Summary *//*}
            <div className={styles.summary}>
              <h2 className={styles.summaryTitle}>Wishlist Summary</h2>
              
              <div className={styles.summaryStats}>
                <span className={styles.summaryLabel}>Total Items:</span>
                <span className={styles.summaryValue}>{wishlistItems.length}</span>
              </div>
              
              <div className={styles.summaryStats}>
                <span className={styles.summaryLabel}>Total Value:</span>
                <span className={styles.summaryValue}>${totalValue.toFixed(2)}</span>
              </div>
              
              <Separator className="my-4" />
              
              <div className={styles.summaryActions}>
                <Button
                  onClick={addAllToCart}
                  disabled={addingToCart === -1}
                  size="lg"
                  className="flex-1"
                >
                  {addingToCart === -1 ? (
                    "Adding All..."
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add All to Cart
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={clearAllWishlist}
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
*/
/*
import { Filter, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProductsGrid from "@/components/products-grid";
import ProductFilters from "@/components/product-filters";
import styles from "./page.module.css";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="container">
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Shop</h1>
            <p className={styles.subtitle}>
              Explore our latest collections of premium garments and accessories.
            </p>
          </div>
          
          <div className={styles.controls}>
            <div className={styles.filtersSection}>
              <Button variant="outline" size="sm" className="sm:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <div className={styles.filtersRow}>
                <p className={styles.productCount}>48 products</p>
                <Separator orientation="vertical" className="hidden h-4 sm:block" />
                <div className={styles.categoriesDesktop}>
                  <ShopCategories />
                </div>
              </div>
            </div>
            
            <div className={styles.sortSection}>
              <span className={styles.sortLabel}>Sort by:</span>
              <Button variant="ghost" size="sm" className="gap-1 font-normal">
                Newest
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className={styles.categoriesMobile}>
            <ShopCategories />
            <Separator className="my-4" />
          </div>
          
          <div className={styles.mainGrid}>
            <div className={styles.filtersColumn}>
              <ProductFilters />
            </div>
            <div className={styles.productsColumn}>
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
        <Button key={category} variant="outline" size="sm" className="rounded-full font-normal">
          {category}
        </Button>
      ))}
    </div>
  );
}
  */
/*
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////login- pageXOffset.tsx

"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import styles from "./login.module.css"; 
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
}
