import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/lib/cart-context";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import CartDrawer from "@/components/cart-drawer";

// Fonts with increased timeout
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap', // Fallback handling
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif",
  display: 'swap', // Fallback handling
});

export const metadata: Metadata = {
  title: "Vanguard Apparel | Premium Contemporary Fashion",
  description: "Redefining contemporary fashion with timeless elegance and bold innovation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <SiteHeader />
            {children}
            <SiteFooter />
            <CartDrawer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}