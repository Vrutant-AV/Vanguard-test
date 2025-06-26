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
  ArrowDownRight,
  Car
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
        email: "sarah@gmail.com",
        amount: 189.00,
        status: "completed",
        date: "2025-01-15",
        items: 2,
    },
    {
        id: "ORD-002",
        customer: "Michael Chen",
        email: "michael@gmail.com",
        amount: 345.50,
        status: "processing",
        date: "2025-01-15",
        items: 3,
    },
    {
        id: "ORD-003",
        customer: "Emma Wilson",
        email: "emma@gmail.com",
        amount: 120.00,
        status: "shipped",
        date: "2025-01-14",
        items: 1,
    },
    {
        id: "ORD-004",
        customer: "David Rodriguez",
        email: "david@gmail.com",
        amount: 275.25,
        status: "pending",
        date: "2025-01-14",
        items: 2,
    },
    {
        id: "ORD-005",
        customer: "Lisa Thompson",
        email: "lisa@gmail.com",
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
        email: "sarah@gmail.com",
        orders: 5,
        totalSpent: 1245.50,
        lastOrder: "2025-01-15",
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
    {
        id: 2,
        name: "Michael Chen",
        email: "michael@gmail.com",
        orders: 3,
        totalSpent: 890.25,
        lastOrder: "2025-01-14",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    },
    {
        id: 3,
        name: "Emma Wilson",
        email: "emma@gmail.com",
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
        <main className="min-h-screen bg-background">
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
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Customers
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>

                        <CardContent>
                            <div className="text-2xl font-hold">
                                {dashboardStats.totalCustomers.toLocaleString()}</div>
                            <div className="flex items-center text-xs text-muted-foreground">
                                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                                +{dashboardStats.customersChange}% from last month
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Products
                            </CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>

                        <CardContent>
                            <div className="text-2xl font-bold">
                                {dashboardStats.totalProducts}
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                                +{dashboardStats.productsChange}% from last month
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content **/}                
                <div className={styles.mainGrid}>
                    {/* Recent Orders */}
                    <Card className={styles.ordersCard}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>
                                        Recent Orders
                                    </CardTitle>
                                    <CardDescription>
                                        Latest customer orders and their status
                                    </CardDescription>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href="/admin/orders">
                                        View All
                                        <ArrowUpRight className="ml-2 h-4 w-4"/>
                                    </Link>
                                </Button>
                            </div>
                        </CardHeader>

                        <CardContent>
                            <div className={styles.ordersTable}>
                                <div className={styles.tableHeader}>
                                    <div>Order Id</div>
                                    <div>Customer</div>
                                    <div>Amount</div>
                                    <div>Status</div>
                                    <div>Date</div>
                                </div>
                                {recentOrders.map((order) => (
                                    <div key={order.id} className={styles.tableRow}>
                                        <div className="font-medium">{order.id}</div>
                                        
                                        <div>
                                            <div className="font-medium">
                                                {order.customer}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {order.email}
                                            </div>
                                        </div>
                                        
                                        <div className="font-medium">${order.amount.toFixed(2)}</div>
                                        
                                        <div>
                                            <Badge className="text-sm text-muted-foreground">
                                                {order.status}
                                            </Badge>
                                        </div>

                                        <div className="text-sm text-muted-foreground">
                                            {order.date}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Analytics Chart Placeholder */}
                    <Card className={styles.chartCard}>
                        <CardHeader>
                            <CardTitle>Revenue Analytics</CardTitle>
                            <CardDescription>Revenue trends over the selected period</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className={styles.chartPlaceholder}>
                                <BarChart3 className="h-12 w-12 text-muted-foreground" />
                                <p className="text-muted-foreground">
                                    Chart visualization would go here
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Integration with charting library like Recharts
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Secondary Grid */}
                <div className={styles.secondaryGrid}>
                    {/* Top Products */}
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Top Products  
                            </CardTitle>
                            <CardDescription>
                                Best perfoming products this month
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="space-y-4">
                                {topProducts.map((product) => (
                                    <div key={product.id} className="flex items-center gap-4">
                                        <div className="relative h-12 w-12 overflow-hidden rounded-md bg-muted">
                                            <img 
                                                src={product.image}
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate">
                                                {product.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {product.sales} sales • ${product.revenue.toLocaleString()} revenue
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-sm font-medium">
                                                {product.stock} in stock
                                            </p>
                                            <p className={`text-xs ${product.stock < 15 ? 'text-red-500' : 'text-green-500'}`}>
                                                {product.stock < 15 ? 'Low stock' : 'In stock'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent customers */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Cusomers</CardTitle>
                            <CardDescription>Latest customer registrations and activity</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="space-y-4">
                                {recentCustomers.map((customer) => (
                                    <div key={customer.id} className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarImage src={customer.avatar} alt={customer.name} />
                                            <AvatarFallback>
                                                {customer.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium">{customer.name}</p>
                                            <p className="text-sm text-muted-foreground">{customer.email}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium">
                                                ${customer.totalSpent.toFixed(2)}
                                            </p>
                                            <p>
                                                {customer.orders} orders
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* quick actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Common administrative tasks</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" className="h-auto flex-col gap-2 p-4" asChild>
                                    <Link href="/admin/products/new">
                                        <Plus className="h-5 w-5" />
                                        Add Product
                                    </Link>
                                </Button>

                                <Button variant="outline" className="h-auto flex-col gap-2 p-4" asChild>
                                    <Link href="/admin/orders">
                                        <ShoppingBag className="h-5 w-5" />
                                        View Orders
                                    </Link>
                                </Button>

                                <Button variant="outline" className="h-auto flex-col gap-2 p-4" asChild>
                                    <Link href="/admin/customers">
                                        <Users className="h-5 w-5" />
                                        Manage Users
                                    </Link>
                                </Button>

                                <Button variant="outline" className="h-auto flex-col gap-2 p-4" asChild>
                                    <Link href="/admin/analytics">
                                        <BarChart3 className="h-5 w-5" />
                                        Analytics
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* activity feed */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>
                                Recent Activity
                            </CardTitle>
                            <CardDescription>
                                Latest actions and system events
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    { 
                                        action: "New order received", 
                                        details: "Order #ORD-001 from Sarah Johnson", 
                                        time: "2 minutes ago", 
                                        type: "order" 
                                    },
                                    
                                    { 
                                        action: "Product updated", 
                                        details: "Tailored Cotton Overshirt stock updated", 
                                        time: "15 minutes ago", 
                                        type: "product" 
                                    },
                                    
                                    { 
                                        action: "Customer registered", 
                                        details: "New customer: Michael Chen", 
                                        time: "1 hour ago", 
                                        type: "customer" 
                                    },
                                    
                                    { 
                                        action: "Payment processed", 
                                        details: "Payment of $345.50 confirmed", 
                                        time: "2 hours ago",type: "payment" 
                                    },
                                    
                                    { 
                                        action: "Inventory alert", 
                                        details: "Low stock warning for High-Waist Tapered Pants", 
                                        time: "3 hours ago", 
                                        type: "alert" 
                                    },
                                ].map((activity, index) => (
                                    <div key={index} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                                        <div className={`mt-1 h-2 w-2 rounded-full ${
                                            activity.type === 'order' ? 'bg-green-500' :
                                            activity.type === 'product' ? 'bg-blue-500' :
                                            activity.type === 'customer' ? 'bg-purple-500' :
                                            activity.type === 'payment' ? 'bg-yellow-500' :
                                            'bg-red-500'
                                        }`} />
                                        
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium">
                                                {activity.action}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {activity.details}
                                            </p>
                                        </div>
                                        
                                        <p className="text-xs text-muted-foreground">
                                            {activity.time}
                                        </p> 
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    )
}