"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, Search, User, Heart, Settings } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";

const mainNavItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { toggleCart, getTotalItems } = useCart();
  const { getTotalItems: getWishlistItems } = useWishlist();
  const totalItems = getTotalItems();
  const wishlistItems = getWishlistItems();

  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleAccountClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/profile");
    } else {
      router.push("/auth/login");
    }
  };

  const handleWishlistClick = () => {
    router.push("/wishlist");
  };

  const handleSearch = () => {
    if (query.trim() === "") return;
    router.push(`/shop?search=${encodeURIComponent(query)}`);
    setIsSearchOpen(false);
    setQuery("");
  };

  // for admin dashboard 
  // checks if current path is admin
  const isAdminPath = pathname.startsWith('/admin');

  return (
    <header
      className={cn(
        "fixed left-0 top-0 z-50 w-full",
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm"
          : "bg-transparent",
        pathname === "/" && !isScrolled ? "text-white" : "text-foreground"
      )}
    >
      <div className="container flex h-16 items-center justify-between md:h-20">
        {/* Mobile menu toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileMenu}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Logo */}
        <div className="flex-1 md:flex-none">
          <Link href="/" className="font-serif text-xl font-light tracking-wide">
            VANGUARD
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-center">
          <ul className="flex items-center gap-6">
            {mainNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary" : ""
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Search Icon */}
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Wishlist */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={handleWishlistClick}
          >
            <Heart className="h-5 w-5" />
            {wishlistItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-s w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                {wishlistItems > 9 ? "9+" : wishlistItems}
              </span>
            )}
            <span className="sr-only">Wishlist({wishlistItems})</span>
          </Button>

          {/* Account */}
          <Button variant="ghost" size="icon" onClick={handleAccountClick}>
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
          {!isAdminPath && (
            <Button variant="ghost" size="icon" className="relative" onClick={toggleCart}>
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                  {totalItems > 0 ? '9+' : totalItems}
                </span>
              )}
              <span className="sr-only">
                Cart ({totalItems})
              </span>
            </Button>
          )}
          {isAdminPath && (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/admin/settings">
                <Settings className="h-5 w-5" />
                <span className="sr-only">
                  Admin Settings
                </span>
              </Link>
            </Button>
          )}

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={toggleCart}
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
            <span className="sr-only">Cart ({totalItems})</span>
          </Button>

          <ThemeToggle />
        </div>
      </div>

      {/* Search input overlay */}
      {isSearchOpen && (
        <div className="absolute left-0 right-0 top-full bg-background border-t border-border p-4 shadow-md z-50 flex gap-2 items-center">
          <Input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <Button onClick={handleSearch}>
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" onClick={() => setIsSearchOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col bg-background p-6 transition-transform duration-300 md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-[-100%]"
        )}
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="font-serif text-xl font-light tracking-wide"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            VANGUARD
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="rounded-full"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>

        <nav className="mt-8 flex-1">
          <ul className="flex flex-col gap-4">
            {mainNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block py-2 text-lg font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary" : ""
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Mobile Wishlist Link */}
            <li>
              <Link 
                href="/wishlist"
                className={cn(
                  "flex items-center gap-2 py-2 test-lg font-medium transition-colors hover:text-primary",
                  pathname === "/wishlist" ? "text-primary" : ""
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart className="h-5 w-5" />
                Wishlist
                {wishlistItems > 0 && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                    {wishlistItems}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <div className="flex items-center justify-between border-t border-border pt-4">
            <span className="text-sm font-medium">Switch Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
