import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" className="mb-4 block font-serif text-xl font-light tracking-wide">
              VANGUARD
            </Link>
            <p className="mb-4 max-w-xs text-sm text-muted-foreground">
              Redefining contemporary fashion with timeless elegance and bold innovation since 2022.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-sm font-medium">Shop</h3>
              <ul className="space-y-2">
                {["New Arrivals", "Best Sellers", "Men", "Women", "Accessories", "Sale"].map((item) => (
                  <li key={item}>
                    <Link href={`/shop?category=${item.toLowerCase().replace(" ", "-")}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium">Company</h3>
              <ul className="space-y-2">
                {["About Us", "Our Story", "Careers", "Sustainability", "Press", "Stockists"].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase().replace(" ", "-")}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium">Help</h3>
              <ul className="space-y-2">
                {["Contact Us", "Shipping & Returns", "FAQs", "Size Guide", "Privacy Policy", "Terms of Service"].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase().replace(" ", "-")}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-1">
            <h3 className="mb-4 text-sm font-medium">Stay Updated</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Subscribe to receive updates on new collections and exclusive offers.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
              <Button type="submit" className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Vanguard Apparel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}