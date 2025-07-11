"use client";
import { useState } from "react";
import Image from "next/image";
import { Search, Filter, Download, Plus, Eye, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample products data
const products = [
  {
    id: 1,
    name: "Tailored Cotton Overshirt",
    price: 189.00,
    image: "https://images.pexels.com/photos/5384428/pexels-photo-5384428.jpeg",
    category: "Men",
    stock: 23,
    status: "active",
    sales: 156,
    sku: "TCO-001",
    dateAdded: "2025-01-10"
  },
  {
    id: 2,
    name: "Structured Wool Blazer",
    price: 290.00,
    image: "https://images.pexels.com/photos/5384425/pexels-photo-5384425.jpeg",
    category: "Women",
    stock: 12,
    status: "active",
    sales: 89,
    sku: "SWB-002",
    dateAdded: "2025-01-08"
  },
  {
    id: 3,
    name: "Relaxed Linen Shirt",
    price: 120.00,
    image: "https://images.pexels.com/photos/5384429/pexels-photo-5384429.jpeg",
    category: "Men",
    stock: 45,
    status: "active",
    sales: 134,
    sku: "RLS-003",
    dateAdded: "2025-01-05"
  },
  {
    id: 4,
    name: "High-Waist Tapered Pants",
    price: 175.00,
    image: "https://images.pexels.com/photos/5384424/pexels-photo-5384424.jpeg",
    category: "Women",
    stock: 8,
    status: "low_stock",
    sales: 78,
    sku: "HTP-004",
    dateAdded: "2025-01-03"
  },
  {
    id: 5,
    name: "Oversized Merino Sweater",
    price: 210.00,
    image: "https://images.pexels.com/photos/5709656/pexels-photo-5709656.jpeg",
    category: "Women",
    stock: 0,
    status: "out_of_stock",
    sales: 45,
    sku: "OMS-005",
    dateAdded: "2025-01-01"
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "low_stock":
      return "bg-yellow-100 text-yellow-800";
    case "out_of_stock":
      return "bg-red-100 text-red-800";
    case "draft":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStockStatus = (stock: number) => {
  if (stock === 0) return "out_of_stock";
  if (stock < 15) return "low_stock";
  return "active";
};

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
 
    const matchesCategory = categoryFilter === "all" || product.category.toLowerCase() === categoryFilter;
    const matchesStatus = statusFilter === "all" || getStockStatus(product.stock) === statusFilter;
 
    return matchesSearch && matchesCategory && matchesStatus;
  });
  const productStats = {
    total: products.length,
    active: products.filter(p => getStockStatus(p.stock) === "active").length,
    lowStock: products.filter(p => getStockStatus(p.stock) === "low_stock").length,
    outOfStock: products.filter(p => getStockStatus(p.stock) === "out_of_stock").length,
  };
  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="font-serif text-3xl font-light mb-2">Products</h1>
          <p className="text-muted-foreground">
            Manage your product catalog and inventory
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productStats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{productStats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{productStats.lowStock}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{productStats.outOfStock}</div>
          </CardContent>
        </Card>
      </div>
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="men">Men</SelectItem>
            <SelectItem value="women">Women</SelectItem>
            <SelectItem value="accessories">Accessories</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="low_stock">Low Stock</SelectItem>
            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
      {/* Products Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Products ({filteredProducts.length})</CardTitle>
          <CardDescription>
            Manage your product inventory and details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 space-y-4">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>
             
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.sku}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
               
                  <div className="flex justify-between items-center">
                    <span className="font-medium">${product.price.toFixed(2)}</span>
                    <Badge className={getStatusColor(getStockStatus(product.stock))}>
                      {product.stock === 0 ? "Out of Stock" : 
                       product.stock < 15 ? "Low Stock" : "In Stock"}
                    </Badge>
                  </div>
               
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Stock: {product.stock}</span>
                    <span>Sales: {product.sales}</span>
                  </div>
               
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}