"use client";

import { useState } from "react";
import { Search, Plus, Edit, Trash2, MoreHorizontal, FileText, Image, Video } from "lucide-react";

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

// Sample content data
const pages = [
  {
    id: 1,
    title: "About Us",
    slug: "about",
    type: "page",
    status: "published",
    lastModified: "2025-01-15",
    author: "Admin"
  },
  {
    id: 2,
    title: "Privacy Policy",
    slug: "privacy-policy",
    type: "page",
    status: "published",
    lastModified: "2025-01-10",
    author: "Admin"
  },
  {
    id: 3,
    title: "Terms of Service",
    slug: "terms-of-service",
    type: "page",
    status: "published",
    lastModified: "2025-01-08",
    author: "Admin"
  },
  {
    id: 4,
    title: "Shipping & Returns",
    slug: "shipping-returns",
    type: "page",
    status: "draft",
    lastModified: "2025-01-05",
    author: "Admin"
  },
];

const blogPosts = [
  {
    id: 1,
    title: "The Art of Sustainable Fashion",
    slug: "art-of-sustainable-fashion",
    type: "blog",
    status: "published",
    lastModified: "2025-01-15",
    author: "Sarah Editor",
    category: "Sustainability"
  },
  {
    id: 2,
    title: "Behind the Scenes: Summer Collection",
    slug: "behind-scenes-summer-collection",
    type: "blog",
    status: "published",
    lastModified: "2025-01-12",
    author: "Michael Writer",
    category: "Collections"
  },
  {
    id: 3,
    title: "Style Guide: Minimalist Wardrobe",
    slug: "style-guide-minimalist-wardrobe",
    type: "blog",
    status: "draft",
    lastModified: "2025-01-10",
    author: "Emma Stylist",
    category: "Style"
  },
];

const media = [
  {
    id: 1,
    name: "hero-image.jpg",
    type: "image",
    size: "2.4 MB",
    dimensions: "1920x1080",
    uploadDate: "2025-01-15",
    url: "https://images.pexels.com/photos/1036856/pexels-photo-1036856.jpeg"
  },
  {
    id: 2,
    name: "product-showcase.mp4",
    type: "video",
    size: "15.2 MB",
    dimensions: "1920x1080",
    uploadDate: "2025-01-14",
    url: "#"
  },
  {
    id: 3,
    name: "brand-logo.svg",
    type: "image",
    size: "45 KB",
    dimensions: "500x200",
    uploadDate: "2025-01-13",
    url: "#"
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "published":
      return "bg-green-100 text-green-800";
    case "draft":
      return "bg-yellow-100 text-yellow-800";
    case "archived":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "image":
      return <Image className="h-5 w-5" />;
    case "video":
      return <Video className="h-5 w-5" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

export default function ContentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || page.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredMedia = media.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const contentStats = {
    totalPages: pages.length,
    totalPosts: blogPosts.length,
    totalMedia: media.length,
    published: [...pages, ...blogPosts].filter(item => item.status === "published").length,
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="font-serif text-3xl font-light mb-2">Content</h1>
          <p className="text-muted-foreground">
            Manage pages, blog posts, and media content
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Content
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentStats.totalPages}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentStats.totalPosts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Media Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentStats.totalMedia}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{contentStats.published}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="pages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>

        <TabsContent value="pages">
          <Card>
            <CardHeader>
              <CardTitle>Pages ({filteredPages.length})</CardTitle>
              <CardDescription>
                Manage static pages and content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPages.map((page) => (
                  <div key={page.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-lg">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{page.title}</h3>
                          <Badge className={getStatusColor(page.status)}>
                            {page.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">/{page.slug}</p>
                        <p className="text-xs text-muted-foreground">
                          Last modified: {page.lastModified} by {page.author}
                        </p>
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Page
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          View Page
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Page
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blog">
          <Card>
            <CardHeader>
              <CardTitle>Blog Posts ({filteredPosts.length})</CardTitle>
              <CardDescription>
                Manage blog content and articles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-lg">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{post.title}</h3>
                          <Badge className={getStatusColor(post.status)}>
                            {post.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Category: {post.category} • /{post.slug}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last modified: {post.lastModified} by {post.author}
                        </p>
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Post
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          View Post
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Post
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media">
          <Card>
            <CardHeader>
              <CardTitle>Media Library ({filteredMedia.length})</CardTitle>
              <CardDescription>
                Manage images, videos, and other media files
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMedia.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      {getTypeIcon(item.type)}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.size} • {item.dimensions}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Copy URL
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    {item.type === "image" && (
                      <div className="aspect-video bg-muted rounded-md mb-3 overflow-hidden">
                        <img
                          src={item.url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground">
                      Uploaded: {item.uploadDate}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}