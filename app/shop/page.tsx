import { Filter, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProductsGrid from "@/components/products-grid";
import ProductFilters from "@/components/product-filters";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="container py-8 md:py-12">
        <div className="flex flex-col">
          <div>
            <h1 className="font-serif text-3xl font-light md:text-4xl">Shop</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Explore our latest collections of premium garments and accessories.
            </p>
          </div>
          
          <div className="my-8 flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
              <Button variant="outline" size="sm" className="sm:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <div className="flex items-center gap-4">
                <p className="text-sm text-muted-foreground">48 products</p>
                <Separator orientation="vertical" className="hidden h-4 sm:block" />
                <div className="hidden sm:block">
                  <ShopCategories />
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm">Sort by:</span>
              <Button variant="ghost" size="sm" className="gap-1 font-normal">
                Newest
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="block sm:hidden">
            <ShopCategories />
            <Separator className="my-4" />
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
            <div className="hidden md:block">
              <ProductFilters />
            </div>
            <div className="md:col-span-3">
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