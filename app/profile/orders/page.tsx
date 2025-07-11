/* eslint-disable react/no-unescaped-entities */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Package, Eye, ArrowLeft, Truck, CheckCircle, Clock, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface OrderItem {
    id: number;
    product_id: number;
    product_name: string;
    product_image: string;
    quantity: number;
    price: number;
    size?: string;
    color?: string;
}

interface Order {
    id: number;
    total_amount: number;
    status: string;
    created_at: string;
    shipping_address: {
        name: string;
        street: string;
        city: string;
        state: string;
        postal_code: string;
        country: string;
    };
    items: OrderItem[];
}

const getStatusIcon = (status: string) => {
    switch (status) {
        case "completed":
        case "delivered":
            return <CheckCircle className="h-4 w-4" />;
        case "processing":
            return <Package className="h-4 w-4" />;
        case "shipped":
            return <Truck className="h-4 w-4" />;
        case "cancelled":
            return <XCircle className="h-4 w-4" />;
        default:
            return <Clock className="h-4 w-4" />;
    }
};

const getStatusColor = (status: string) => {
    switch (status) {
        case "completed":
        case "delivered":
            return "bg-green-100 text-green-800";
        case "processing":
            return "bg-blue-100 text-blue-800";
        case "shipped":
            return "bg-purple-100 text-purple-800";
        case "canclled":
            return "bg-red-100 text-red-800";
        default:
            return "bg-yellow-100 text-yellow-800";
    }
};

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Please log in to view your orders");
                setLoading(false);
                return;
            }

            const response = await fetch("http://localhost:5000/api/orders", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("failed to fetch orders");
            }

            const data = await response.json();
            setOrders(data);
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-background pt-24">
                <div className="container py-8">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">
                                Loading your orders...
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-background pt-24">
                <div className="container py-8">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                            <p className="text-red-500 mb-4">
                                {error}
                            </p>
                            <Button onClick={fetchOrders}>
                                Try Again
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background pt-24">
            <div className="container py-8">
                <div className="mb-8">
                    <Link
                        href="/profile"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Profile
                    </Link>

                    <h1 className="font-serif text-3xl font-light">
                        Your Orders
                    </h1>

                    <p className="text-muted-foreground">
                        Track and manage your order history
                    </p>
                </div>

                {orders.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-16">
                            <Package className="h-16 w-16 text-muted-foreground mb-4" />
                            <h2 className="text-xl font-medium mb-2">No orders yet</h2>
                            <p className="text-muted-foreground mb-6 text-center max-w-md">
                                You haven't placed any orders yet. Start shopping to see your orers here.
                            </p>
                            <Button asChild>
                                <Link href="/shop">
                                    Start Shopping
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <Card key={order.id}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="flex items-center gap-2">
                                                Order id={order.id}
                                                <Badge className={getStatusColor(order.status)}>
                                                    {getStatusColor(order.status)}
                                                    <span className="ml-1 capitalize">
                                                        {order.status}
                                                    </span>
                                                </Badge>
                                            </CardTitle>
                                            <CardDescription>
                                                Placed on {new Date(order.created_at).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </CardDescription>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-medium">
                                                ${order.total_amount.toFixed(2)}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                                            </p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {/* Order Items */}
                                        <div className="space-y-3">
                                            {order.items.map((item) => (
                                                <div key={item.id} className="flex items-center gap-4">
                                                    <div className="relative h-16 w-16 overflow-hidden rounded-md bg-muted">
                                                        <Image
                                                            src={item.product_image}
                                                            alt={item.product_name}
                                                            fill
                                                            className="object-cover object-center"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-medium">
                                                            {item.product_name}
                                                        </h4>
                                                        <div className="text-sm text-muted-foreground">
                                                            Qty: {item.quantity}
                                                            {item.size && ` • Size: ${item.size}`}
                                                            {item.color && ` • Color: ${item.color}`}
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-medium">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            ${item.price.toFixed(2)} each
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <Separator />
                                        {/* Shipping Address */}
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-medium mb-1">
                                                    Shipping Address
                                                </h4>
                                                <div className="text-sm text-muted-foreground">
                                                    <p>
                                                        {order.shipping_address.name}
                                                    </p>
                                                    <p>
                                                        {order.shipping_address.street}
                                                    </p>
                                                    <p>
                                                        {order.shipping_address.city}, {order.shipping_address.state}{" "}
                                                        {order.shipping_address.postal_code}
                                                    </p>
                                                    <p>
                                                        {order.shipping_address.country}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/profile/orders/${order.id}`}>
                                                        <Eye className="w-4 h-4 mr-2" />
                                                        View Details
                                                    </Link>
                                                </Button>
                                                {order.status === "delivered" && (
                                                    <Button variant="outline" size="sm">
                                                        Reorder
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}