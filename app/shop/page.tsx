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
                <Filter className={styles.filterIcon}/>
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
                <ChevronDown className={styles.sortIcon}/>
              </Button>
            </div>
          </div>
          
          <div className={styles.mobileCategories}>
            <ShopCategories />
            <Separator className={styles.sidebar}/>
          </div>
          
          <div className={styles.mainContent}>
            <div className={styles.sidebar}>
              <ProductFilters />
            </div>
            <div className={styles.ProductsGrid}>
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
    <div className="flex gap-2 overflow-x-auto pb-2">
      {["All", "New Arrivals", "Men", "Women", "Accessories", "Sale"].map((category) => (
        <Button key={category} variant="outline" size="sm" className="rounded-full font-normal">
          {category}
        </Button>
      ))}
    </div>
  );
}




/*
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
*/