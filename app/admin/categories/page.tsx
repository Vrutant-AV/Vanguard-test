"use client";
<<<<<<< HEAD
import { useState } from "react";
import { Search, Plus, Edit, Trash2, MoreHorizontal, Tag } from "lucide-react";
=======

import { useState } from "react";
import { Search, Plus, Edit, Trash2, MoreHorizontal, Tag } from "lucide-react";

>>>>>>> 1c420b6c49c974881a23ac0add3a1419be2bcbf9
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
<<<<<<< HEAD
=======

>>>>>>> 1c420b6c49c974881a23ac0add3a1419be2bcbf9
// Sample categories data
const categories = [
  {
    id: 1,
    name: "Men",
    description: "Men's clothing and accessories",
    productCount: 25,
    status: "active",
    createdDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Women",
    description: "Women's clothing and accessories",
    productCount: 32,
    status: "active",
    createdDate: "2024-01-15"
  },
  {
    id: 3,
    name: "Accessories",
    description: "Fashion accessories for all",
    productCount: 18,
    status: "active",
    createdDate: "2024-01-20"
  },
  {
    id: 4,
    name: "Outerwear",
    description: "Jackets, coats, and outerwear",
    productCount: 12,
    status: "active",
    createdDate: "2024-02-01"
  },
  {
    id: 5,
    name: "Footwear",
    description: "Shoes and footwear collection",
    productCount: 0,
    status: "draft",
    createdDate: "2024-02-10"
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "draft":
      return "bg-gray-100 text-gray-800";
    case "inactive":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
<<<<<<< HEAD
=======

>>>>>>> 1c420b6c49c974881a23ac0add3a1419be2bcbf9
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
<<<<<<< HEAD
  
=======

>>>>>>> 1c420b6c49c974881a23ac0add3a1419be2bcbf9
  const categoryStats = {
    total: categories.length,
    active: categories.filter(c => c.status === "active").length,
    draft: categories.filter(c => c.status === "draft").length,
    totalProducts: categories.reduce((sum, c) => sum + c.productCount, 0),
  };
<<<<<<< HEAD
  
=======

>>>>>>> 1c420b6c49c974881a23ac0add3a1419be2bcbf9
  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="font-serif text-3xl font-light mb-2">Categories</h1>
          <p className="text-muted-foreground">
            Organize your products into categories
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

<<<<<<< HEAD
      {/* statss cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Categories
            </CardTitle>
=======
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
>>>>>>> 1c420b6c49c974881a23ac0add3a1419be2bcbf9
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoryStats.total}</div>
          </CardContent>
        </Card>
<<<<<<< HEAD

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {categoryStats.active}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Draft
              </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {categoryStats.draft}
              </div>
          </CardContent>
        </Card>

=======
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{categoryStats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Draft</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{categoryStats.draft}</div>
          </CardContent>
        </Card>
>>>>>>> 1c420b6c49c974881a23ac0add3a1419be2bcbf9
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoryStats.totalProducts}</div>
          </CardContent>
        </Card>
      </div>

<<<<<<< HEAD
      {/* search */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform-translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
=======
      {/* Search */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
>>>>>>> 1c420b6c49c974881a23ac0add3a1419be2bcbf9
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
<<<<<<< HEAD
      {/* categories list */}
      <Card>
        <CardHeader>
          <CardTitle>
            Categories ({filteredCategories.length})
          </CardTitle>
          <CardDescription>
            Manage product sacegories and their organization
=======

      {/* Categories List */}
      <Card>
        <CardHeader>
          <CardTitle>Categories ({filteredCategories.length})</CardTitle>
          <CardDescription>
            Manage product categories and their organization
>>>>>>> 1c420b6c49c974881a23ac0add3a1419be2bcbf9
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCategories.map((category) => (
              <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-lg">
                    <Tag className="h-6 w-6 text-muted-foreground" />
                  </div>
<<<<<<< HEAD

                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">
                        {category.name}
                      </h3>
=======
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{category.name}</h3>
>>>>>>> 1c420b6c49c974881a23ac0add3a1419be2bcbf9
                      <Badge className={getStatusColor(category.status)}>
                        {category.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                    <p className="text-xs text-muted-foreground">Created: {category.createdDate}</p>
                  </div>
                </div>
<<<<<<< HEAD

=======
                
>>>>>>> 1c420b6c49c974881a23ac0add3a1419be2bcbf9
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-medium">{category.productCount}</div>
                    <div className="text-sm text-muted-foreground">products</div>
                  </div>
<<<<<<< HEAD

=======
                  
>>>>>>> 1c420b6c49c974881a23ac0add3a1419be2bcbf9
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Category
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        View Products
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Category
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}