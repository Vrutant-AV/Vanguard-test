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

        {/* Categories */}
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

        {/* Featured Post */}
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

        {/* Journal Posts Grid */}
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

        {/* Pagination */}
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
}