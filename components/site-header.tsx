"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, Search, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

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
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
          <ThemeToggle />
        </div>
      </div>

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