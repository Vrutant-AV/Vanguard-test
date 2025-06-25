/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  Package, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Eye,
  Plus,
  Search,
  Filter,
  Download,
  Bell,
  Settings,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import styles from "./page.module.css";

// Sample data
const dashboardStats = {
    totalRevenue: 124500,
    revenueChange: 12.5,
    totalOrders: 1247,
    ordersChange: 8.2,
    totalCustomers: 3456,
    customersChange: 15.3,
    totalProducts: 89,
    productsChange: 5.1,
};

const recentOrders = [
    {
        id: "ORD-001",
        customer: "Sarah Johnson",
        email: "sarah@example.com",
        amount: 189.00,
        status: "completed",
        date: "2025-01-15",
        items: 2,
    },
    {
        id: "ORD-002",
        customer: "Michael Chen",
        email: "michael@example.com",
        amount: 345.50,
        status: "processing",
        date: "2025-01-15",
        items: 3,
    },
    {
        id: "ORD-003",
        customer: "Emma Wilson",
        email: "emma@example.com",
        amount: 120.00,
        status: "shipped",
        date: "2025-01-14",
        items: 1,
    },
    {
        id: "ORD-004",
        customer: "David Rodriguez",
        email: "david@example.com",
        amount: 275.25,
        status: "pending",
        date: "2025-01-14",
        items: 2,
    },
    {
        id: "ORD-005",
        customer: "Lisa Thompson",
        email: "lisa@example.com",
        amount: 450.00,
        status: "completed",
        date: "2025-01-13",
        items: 4,
    },
];

const topProducts = [
    {
        id: 1,
        name: "Tailored Cotton Overshirt",
        sales: 156,
        revenue: 29484,
        stock: 23,
        image: "https://images.pexels.com/photos/5384428/   pexels-photo-5384428.jpeg",
    },
    {
        id: 2,
        name: "Structured Wool Blazer",
        sales: 89,
        revenue: 25810,
        stock: 12,
        image: "https://images.pexels.com/photos/5384425/   pexels-photo-5384425.jpeg",
    },
    {
        id: 3,
        name: "Relaxed Linen Shirt",
        sales: 134,
        revenue: 16080,
        stock: 45,
        image: "https://images.pexels.com/photos/5384429/   pexels-photo-5384429.jpeg",
    },
    {
        id: 4,
        name: "High-Waist Tapered Pants",
        sales: 78,
        revenue: 13650,
        stock: 8,
        image: "https://images.pexels.com/photos/5384424/   pexels-photo-5384424.jpeg",
    },
];

const recentCustomers = [
    {
        id: 1,
        name: "Sarah Johnson",
        email: "sarah@example.com",
        orders: 5,
        totalSpent: 1245.50,
        lastOrder: "2025-01-15",
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
    {
        id: 2,
        name: "Michael Chen",
        email: "michael@example.com",
        orders: 3,
        totalSpent: 890.25,
        lastOrder: "2025-01-14",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    },
    {
        id: 3,
        name: "Emma Wilson",
        email: "emma@example.com",
        orders: 7,
        totalSpent: 2156.75,
        lastOrder: "2025-01-13",
        avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    },
];

export default function AdminDashboard() {
    const [selectedPeriod, setSelectedPeriod] = useState("7d");

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-800";
            case "processing":
                return "bg-blue-100 text-purple-800";
            case "shipped":
                return "bg-purple-100 text-purple-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <main className="min-h-screen bg-background pt-24">
            <div className={`container ${styles.container}`}>
                {/* Header */}
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Admin Dashboard</h1>
                        <p className={styles.subtitle}>
                            Welcome back! Here's what's happening with your store today.
                        </p>
                    </div>

                    <div className={styles.headerActions}>
                        <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>

                        <Button size="sm">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Product
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className={styles.statsGrid}>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Revenue
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        
                        <CardContent>
                            <div className="text-2xl font-bold">
                                ${dashboardStats.totalRevenue.toLocaleString()}
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                                +{dashboardStats.revenueChange}% from last month
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex fex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Orders
                            </CardTitle>
                            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>

                        <CardContent>
                            <div className="text-2xl font-bold">
                                {dashboardStats.totalOrders.toLocaleString()}
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                                +{dashboardStats.ordersChange}% from last month
                            </div>
                        </CardContent>
                    </Card>
                    
                </div>
            </div>
        </main>
    )
}