"use client";
import { useState } from "react";
import { Search, Filter, Star, MoreHorizontal, Eye, Trash2, CheckCircle, XCircle, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

// Sample reviews data
const reviews = [
  {
    id: 1,
    customer: "Sarah Johnson",
    email: "sarah@gmail.com",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    product: "Tailored Cotton Overshirt",
    rating: 5,
    title: "Perfect fit and quality!",
    comment: "This overshirt is exactly what I was looking for. The quality is excellent and the fit is perfect. I'm usually between sizes and went with the larger one, which gives me the relaxed look I wanted. Highly recommended!",
    date: "2025-01-15",
    status: "approved",
    helpful: 12
  },
  {
    id: 2,
    customer: "Michael Chen",
    email: "michael@gmail.com",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    product: "Structured Wool Blazer",
    rating: 4,
    title: "Great quality, color slightly different",
    comment: "Great blazer with excellent quality fabric. The only reason I'm giving it 4 stars instead of 5 is that the color is slightly different than shown in the photos. Still very happy with my purchase.",
    date: "2025-01-14",
    status: "pending",
    helpful: 8
  },
  {
    id: 3,
    customer: "Emma Wilson",
    email: "emma@gmail.com",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    product: "Relaxed Linen Shirt",
    rating: 5,
    title: "Incredible quality and attention to detail",
    comment: "Incredible quality and attention to detail. This is my third purchase from Vanguard and they never disappoint. The linen is so soft and the stitching is impeccable. Worth every penny.",
    date: "2025-01-13",
    status: "approved",
    helpful: 15
  },
  {
    id: 4,
    customer: "David Rodriguez",
    email: "david@gmail.com",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    product: "High-Waist Tapered Pants",
    rating: 2,
    title: "Sizing runs small",
    comment: "The pants look great but the sizing runs very small. I ordered my usual size but they were too tight. The return process was smooth though.",
    date: "2025-01-12",
    status: "flagged",
    helpful: 3
  },
  {
    id: 5,
    customer: "Lisa Thompson",
    email: "lisa@gmail.com",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    product: "Oversized Merino Sweater",
    rating: 5,
    title: "Cozy and stylish",
    comment: "Love this sweater! It's so cozy and the oversized fit is perfect for layering. The merino wool is incredibly soft and doesn't itch at all.",
    date: "2025-01-11",
    status: "approved",
    helpful: 9
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "flagged":
      return "bg-red-100 text-red-800";
    case "rejected":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`h-4 w-4 ${
        i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
      }`}
    />
  ));
};

export default function ReviewPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [ratingFilter, setRatingFilter] = useState("all");
    const filteredReviews = reviews.filter(review => {
        const matchesSearch = review.customer.toLowerCase().includes(searchTerm.toLowerCase()) || review.product.toLowerCase().includes(searchTerm.toLowerCase()) || review.comment.toLowerCase().includes(searchTerm.toLowerCase());
 
        const matchesStatus = statusFilter === "all" || review.status === statusFilter;
        const matchesRating = ratingFilter === "all" || review.rating.toString() === ratingFilter;
 
        return matchesSearch && matchesStatus && matchesRating;
    });

    const reviewStats = {
        total: reviews.length,
        approved: reviews.filter(r => r.status === "approved").length,
        pending: reviews.filter(r => r.status === "pending").length,
        flagged: reviews.filter(r => r.status === "flagged").length,
        averageRating: reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length,
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="font-serif text-3xl font-light mb-2">Reviews</h1>
                <p className="text-muted-foreground">
                    Manage customer reviews and feedback
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Reviews
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">
                            {reviewStats.total}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            Approved
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {reviewStats.approved}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            Pending
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">
                            {reviewStats.pending}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            Flagged
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">
                            {reviewStats.flagged}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            Avg Rating
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">
                            {reviewStats.averageRating.toFixed(1)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters and search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search reviews..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="all">
                            All Status
                        </SelectItem>
                        <SelectItem value="approved">
                            Approved
                        </SelectItem>
                        <SelectItem value="pending">
                            Pending
                        </SelectItem>
                        <SelectItem value="flagged">
                            Flagged
                        </SelectItem>                      <SelectItem value="rejected">
                            Rejected
                        </SelectItem>
                    </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setRatingFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Filter by rating" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="all">
                            All Rating
                        </SelectItem>
                        <SelectItem value="5">
                            5 Stars
                        </SelectItem>
                        <SelectItem value="4">
                            4 Stars
                        </SelectItem>
                        <SelectItem value="3">
                            3 Stars
                        </SelectItem>                      <SelectItem value="2">
                            2 Stars
                        </SelectItem>
                        <SelectItem value="1">
                            1 Star
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Reviews list */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        Reviews ({filteredReviews.length})
                    </CardTitle>
                    <CardDescription>
                        Manage customer reviews and moderate content
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="space-y-6">
                        {filteredReviews.map((review) => (
                            <div key={review.id} className="border rounded-lg p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-start space-x-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={review.avatar} alt={review.customer} />
                                            <AvatarFallback>
                                                {review.customer.split('').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div>
                                            <div className="flex item-center space-x-2 mb-1">
                                                <h3 className="font-medium">
                                                    {review.customer}
                                                </h3>
                                                <Badge className={getStatusColor(review.status)}>
                                                    {review.status}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center space-x-2 mb-2">
                                                <div className="flex">
                                                    {renderStars(review.rating)}
                                                </div>
                                                <span className="text-sm text-muted-foreground">•</span>
                                                <span className="text-sm text-muted-foreground">
                                                    {review.date}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Product:{review.product}
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
                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                Approve
                                            </DropdownMenuItem>

                                            <DropdownMenuItem>
                                                <XCircle className="mr-2 h-4 w-4" />
                                                Reject
                                            </DropdownMenuItem>

                                            <DropdownMenuItem>
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Details
                                            </DropdownMenuItem>

                                            <DropdownMenuItem className="text-red-600">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                <div className="mb-4">
                                    <h4 className="font-medium mb-2">
                                        {review.title}
                                    </h4>
                                    <p className="text-muted-foreground">
                                        {review.comment}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <span>
                                        {review.helpful} people found this helpful
                                    </span>
                                    <div className="flex space-x-2">
                                        <Button variant="outline" size="sm">
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                            Approve
                                        </Button>

                                        <Button variant="outline" size="sm">
                                            <XCircle className="mr-2 h-4 w-4" />
                                            Reject
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