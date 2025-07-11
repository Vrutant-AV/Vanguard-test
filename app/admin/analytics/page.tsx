"use client";
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Package } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample analytics data
const analyticsData = {
  revenue: {
    current: 124500,
    previous: 98200,
    change: 26.8
  },
  orders: {
    current: 1247,
    previous: 1089,
    change: 14.5
  },
  customers: {
    current: 3456,
    previous: 2987,
    change: 15.7
  },
  products: {
    current: 89,
    previous: 85,
    change: 4.7
  }
};

const topProducts = [
  { name: "Tailored Cotton Overshirt", sales: 156, revenue: 29484 },
  { name: "Structured Wool Blazer", sales: 89, revenue: 25810 },
  { name: "Relaxed Linen Shirt", sales: 134, revenue: 16080 },
  { name: "High-Waist Tapered Pants", sales: 78, revenue: 13650 },
  { name: "Oversized Merino Sweater", sales: 65, revenue: 13650 },
];

const recentActivity = [
  { action: "New order received", details: "Order #ORD-001 from Sarah Johnson", time: "2 minutes ago" },
  { action: "Product updated", details: "Tailored Cotton Overshirt stock updated", time: "15 minutes ago" },
  { action: "Customer registered", details: "New customer: Michael Chen", time: "1 hour ago" },
  { action: "Payment processed", details: "Payment of $345.50 confirmed", time: "2 hours ago" },
  { action: "Inventory alert", details: "Low stock warning for High-Waist Tapered Pants", time: "3 hours ago" },
];

export default function AnalyticsPage() {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="font-serif text-3xl font-light mb-2">
                    Analytics
                </h1>
                <p className="text-muted-foreground">
                    Track your business performance and key metrics
                </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Revenue
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${analyticsData.revenue.current.toLocaleString()}</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                            +{analyticsData.revenue.change}% from last month
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
                            {analyticsData.orders.current.toLocaleString()}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                            +{analyticsData.orders.change}% from last month
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
                        <div className="text-2xl font-bold">
                            {analyticsData.customers.current.toLocaleString()}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                            +{analyticsData.customers.change}% from last month
                        </div>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Products
                        </CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {analyticsData.products.current}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                            +{analyticsData.products.change}% from last month
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Analystics Tabs */}
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">
                        Overview
                    </TabsTrigger>
                    <TabsTrigger value="sales">
                        Sales
                    </TabsTrigger>
                    <TabsTrigger value="customer">
                        Customers
                    </TabsTrigger>
                    <TabsTrigger value="products">
                        Products
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* Revenue Chart Placeholder */}
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Revenue Trends
                                </CardTitle>
                                <CardDescription>
                                    Monthly revenue over the past year
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-center h-64 border-2 border-dashed border-muted rounded-lg">
                                    <div className="text-center">
                                        <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                        <p className="text-muted-foreground">
                                            Revenue chart would go here
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            Integration with charting library
                                        </p>
                                    </div>    
                                </div>
                            </CardContent>
                        </Card>

                        {/* Top Products */}
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Top Products
                                </CardTitle>
                                <CardDescription>Best  performing products this month</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {topProducts.map((product, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">
                                                    {product.name}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {product.sales} sales
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">
                                                    ${product.revenue.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div></div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Activity */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>
                                Latest actions and system events
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentActivity.map((activity, index) => (
                                    <div key={index} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                                        <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium">
                                                {activity.action}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
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
                </TabsContent>
                <TabsContent value="sales">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sales Analytics</CardTitle>
                            <CardDescription>Detailed sales performance metrics</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-center h-64 border-2 border-dashed border-muted rounded-lg">
                                <div className="text-center">
                                    <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">Sales analytics would go here</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="customers">
                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Analytics</CardTitle>
                      <CardDescription>Customer behavior and demographics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center h-64 border-2 border-dashed border-muted rounded-lg">
                        <div className="text-center">
                          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">Customer analytics would go here</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="products">
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Analytics</CardTitle>
                      <CardDescription>Product performance and inventory insights</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center h-64 border-2 border-dashed border-muted rounded-lg">
                        <div className="text-center">
                          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">Product analytics would go here</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

            </Tabs>
        </div>
    );
}