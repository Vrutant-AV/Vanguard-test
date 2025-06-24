import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import FeaturedProducts from "@/components/featured-products";
import CategoryShowcase from "@/components/category-showcase";
import NewsletterSignup from "@/components/newsletter-signup";
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image
            src="/logo-transparent.png"
            alt="Vanguard Apparel hero"
            fill
            priority
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
        </div>
        
        <div className={styles.heroContent} >
          <h1 className={styles.heroTitle}>
            VANGUARD APPAREL
          </h1>
          <p className={styles.heroSubtitle}>
            Redefining contemporary fashion with timeless elegance and bold innovation.
          </p>
          <div className={styles.heroButtons}>
            <Button asChild size="lg" className={styles.shopButton}>
              <Link href="/shop">
                Shop Collection
              </Link>
            </Button>
            <Button asChild size="lg" className={styles.viewButton}>
              <Link href="/lookbook">
                View Lookbook
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className={styles.newArrivals}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>New Arrivals</h2>
            <Button asChild variant="link" className={styles.viewAllButton}>
              <Link href="/shop" className={styles.link}>
                <span className={styles.linkLabel}>View All</span>
                <ArrowRight className={styles.arrow} />
              </Link>
            </Button>
          </div>
          <FeaturedProducts />
        </div>
      </section>

      {/* Categories Showcase */}
      <section className={styles.categories}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitleCenter}>Shop Categories</h2>
          <CategoryShowcase />
        </div>
      </section>

      {/* Brand Story */}
      <section className={styles.brandStory}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.brandImage}>
              <Image
                src="/logo.png"
                alt="Vanguard brand story"
                fill
                className={styles.brandImageFill}
              />
            </div>
            <div className={styles.brandContent}>
              <h2 className={styles.brandTitle}>Our Story</h2>
              <p className={styles.brandParagraph}>
                Founded in 2022, Vanguard Apparel emerged from a desire to create clothing that balances timeless elegance with contemporary edge. Our designs blend high-quality craftsmanship with innovative silhouettes, resulting in pieces that transcend seasons and trends.
              </p>
              <p className={styles.brandParagraph}>
                We believe in sustainable fashion that makes a statement, using responsibly sourced materials and ethical manufacturing processes. Every Vanguard piece tells a story of conscious luxury.
              </p>
              <Button asChild variant="outline" className={styles.learnButton}>
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.journal}>
        <div className={styles.container}>
          <div className={styles.journalHeader}>
          <h2 className={styles.journalTitle}>Journal</h2>
            <Link href="/journal" className={styles.viewAllButton}>
              View All →
            </Link>
          </div>
    
          <div className={styles.journalGrid}>
            {[1, 2, 3].map((item) => (
              <div key={item} className={styles.journalCard}>
                <div className={styles.journalImage}>
                  <Image
                    src={`https://images.pexels.com/photos/833052${item}/pexels-photo-833052${item}.jpeg`}
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

    {/*  {/* Newsletter *//*}
      <NewsletterSignup className={styles.newsletter} /> */}
    </main>
  );
}