
// // // // // // // //shipping
// // // // // // // "use client";
// // // // // // // import { useState } from "react";
// // // // // // // import { Search, Plus, Edit, Trash2, MoreHorizontal, Truck, Package } from "lucide-react";
// // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // // // // // // import { Badge } from "@/components/ui/badge";
// // // // // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // // // // // // import {
// // // // // // //   DropdownMenu,
// // // // // // //   DropdownMenuContent,
// // // // // // //   DropdownMenuItem,
// // // // // // //   DropdownMenuTrigger,
// // // // // // // } from "@/components/ui/dropdown-menu";
// // // // // // // // Sample shipping data
// // // // // // // const shippingMethods = [
// // // // // // //   {
// // // // // // //     id: 1,
// // // // // // //     name: "Standard Shipping",
// // // // // // //     description: "5-7 business days",
// // // // // // //     price: 15.00,
// // // // // // //     freeThreshold: 100.00,
// // // // // // //     status: "active",
// // // // // // //     zones: ["Domestic"]
// // // // // // //   },
// // // // // // //   {
// // // // // // //     id: 2,
// // // // // // //     name: "Express Shipping",
// // // // // // //     description: "2-3 business days",
// // // // // // //     price: 25.00,
// // // // // // //     freeThreshold: 200.00,
// // // // // // //     status: "active",
// // // // // // //     zones: ["Domestic"]
// // // // // // //   },
// // // // // // //   {
// // // // // // //     id: 3,
// // // // // // //     name: "Overnight Shipping",
// // // // // // //     description: "Next business day",
// // // // // // //     price: 45.00,
// // // // // // //     freeThreshold: null,
// // // // // // //     status: "active",
// // // // // // //     zones: ["Domestic"]
// // // // // // //   },
// // // // // // //   {
// // // // // // //     id: 4,
// // // // // // //     name: "International Standard",
// // // // // // //     description: "10-15 business days",
// // // // // // //     price: 35.00,
// // // // // // //     freeThreshold: 250.00,
// // // // // // //     status: "active",
// // // // // // //     zones: ["International"]
// // // // // // //   },
// // // // // // //   {
// // // // // // //     id: 5,
// // // // // // //     name: "International Express",
// // // // // // //     description: "5-7 business days",
// // // // // // //     price: 65.00,
// // // // // // //     freeThreshold: null,
// // // // // // //     status: "active",
// // // // // // //     zones: ["International"]
// // // // // // //   },
// // // // // // // ];
// // // // // // // const shippingZones = [
// // // // // // //   {
// // // // // // //     id: 1,
// // // // // // //     name: "Domestic",
// // // // // // //     description: "United States",
// // // // // // //     countries: ["United States"],
// // // // // // //     status: "active"
// // // // // // //   },
// // // // // // //   {
// // // // // // //     id: 2,
// // // // // // //     name: "International",
// // // // // // //     description: "All other countries",
// // // // // // //     countries: ["Canada", "United Kingdom", "Australia", "Germany", "France"],
// // // // // // //     status: "active"
// // // // // // //   },
// // // // // // // ];
// // // // // // // const recentShipments = [
// // // // // // //   {
// // // // // // //     id: "SHIP-001",
// // // // // // //     orderId: "ORD-001",
// // // // // // //     customer: "Sarah Johnson",
// // // // // // //     method: "Standard Shipping",
// // // // // // //     status: "delivered",
// // // // // // //     trackingNumber: "1Z999AA1234567890",
// // // // // // //     date: "2025-01-15"
// // // // // // //   },
// // // // // // //   {
// // // // // // //     id: "SHIP-002",
// // // // // // //     orderId: "ORD-002",
// // // // // // //     customer: "Michael Chen",
// // // // // // //     method: "Express Shipping",
// // // // // // //     status: "in_transit",
// // // // // // //     trackingNumber: "1Z999AA1234567891",
// // // // // // //     date: "2025-01-14"
// // // // // // //   },
// // // // // // //   {
// // // // // // //     id: "SHIP-003",
// // // // // // //     orderId: "ORD-003",
// // // // // // //     customer: "Emma Wilson",
// // // // // // //     method: "Standard Shipping",
// // // // // // //     status: "shipped",
// // // // // // //     trackingNumber: "1Z999AA1234567892",
// // // // // // //     date: "2025-01-13"
// // // // // // //   },
// // // // // // // ];
// // // // // // // const getStatusColor = (status: string) => {
// // // // // // //   switch (status) {
// // // // // // //     case "active":
// // // // // // //       return "bg-green-100 text-green-800";
// // // // // // //     case "inactive":
// // // // // // //       return "bg-gray-100 text-gray-800";
// // // // // // //     case "delivered":
// // // // // // //       return "bg-green-100 text-green-800";
// // // // // // //     case "in_transit":
// // // // // // //       return "bg-blue-100 text-blue-800";
// // // // // // //     case "shipped":
// // // // // // //       return "bg-purple-100 text-purple-800";
// // // // // // //     case "pending":
// // // // // // //       return "bg-yellow-100 text-yellow-800";
// // // // // // //     default:
// // // // // // //       return "bg-gray-100 text-gray-800";
// // // // // // //   }
// // // // // // // };
// // // // // // // export default function ShippingPage() {
// // // // // // //   const [searchTerm, setSearchTerm] = useState("");
// // // // // // //   const filteredMethods = shippingMethods.filter(method =>
// // // // // // //     method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // // // //     method.description.toLowerCase().includes(searchTerm.toLowerCase())
// // // // // // //   );
// // // // // // //   return (
// // // // // // //     <div className="p-6">
// // // // // // //       <div className="flex justify-between items-start mb-6">
// // // // // // //         <div>
// // // // // // //           <h1 className="font-serif text-3xl font-light mb-2">Shipping</h1>
// // // // // // //           <p className="text-muted-foreground">
// // // // // // //             Manage shipping methods, zones, and track shipments
// // // // // // //           </p>
// // // // // // //         </div>
// // // // // // //         <Button>
// // // // // // //           <Plus className="mr-2 h-4 w-4" />
// // // // // // //           Add Shipping Method
// // // // // // //         </Button>
// // // // // // //       </div>
// // // // // // //       {/* Stats Cards */}
// // // // // // //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
// // // // // // //         <Card>
// // // // // // //           <CardHeader className="pb-2">
// // // // // // //             <CardTitle className="text-sm font-medium">Shipping Methods</CardTitle>
// // // // // // //           </CardHeader>
// // // // // // //           <CardContent>
// // // // // // //             <div className="text-2xl font-bold">{shippingMethods.length}</div>
// // // // // // //           </CardContent>
// // // // // // //         </Card>
// // // // // // //         <Card>
// // // // // // //           <CardHeader className="pb-2">
// // // // // // //             <CardTitle className="text-sm font-medium">Shipping Zones</CardTitle>
// // // // // // //           </CardHeader>
// // // // // // //           <CardContent>
// // // // // // //             <div className="text-2xl font-bold">{shippingZones.length}</div>
// // // // // // //           </CardContent>
// // // // // // //         </Card>
// // // // // // //         <Card>
// // // // // // //           <CardHeader className="pb-2">
// // // // // // //             <CardTitle className="text-sm font-medium">Recent Shipments</CardTitle>
// // // // // // //           </CardHeader>
// // // // // // //           <CardContent>
// // // // // // //             <div className="text-2xl font-bold">{recentShipments.length}</div>
// // // // // // //           </CardContent>
// // // // // // //         </Card>
// // // // // // //         <Card>
// // // // // // //           <CardHeader className="pb-2">
// // // // // // //             <CardTitle className="text-sm font-medium">In Transit</CardTitle>
// // // // // // //           </CardHeader>
// // // // // // //           <CardContent>
// // // // // // //             <div className="text-2xl font-bold text-blue-600">
// // // // // // //               {recentShipments.filter(s => s.status === "in_transit").length}
// // // // // // //             </div>
// // // // // // //           </CardContent>
// // // // // // //         </Card>
// // // // // // //       </div>
// // // // // // //       {/* Shipping Tabs */}
// // // // // // //       <Tabs defaultValue="methods" className="space-y-4">
// // // // // // //         <TabsList>
// // // // // // //           <TabsTrigger value="methods">Shipping Methods</TabsTrigger>
// // // // // // //           <TabsTrigger value="zones">Shipping Zones</TabsTrigger>
// // // // // // //           <TabsTrigger value="shipments">Recent Shipments</TabsTrigger>
// // // // // // //         </TabsList>
// // // // // // //         <TabsContent value="methods">
// // // // // // //           {/* Search */}
// // // // // // //           <div className="flex gap-4 mb-6">
// // // // // // //             <div className="relative flex-1">
// // // // // // //               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
// // // // // // //               <Input
// // // // // // //                 placeholder="Search shipping methods..."
// // // // // // //                 value={searchTerm}
// // // // // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // // // // //                 className="pl-10"
// // // // // // //               />
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //           <Card>
// // // // // // //             <CardHeader>
// // // // // // //               <CardTitle>Shipping Methods ({filteredMethods.length})</CardTitle>
// // // // // // //               <CardDescription>
// // // // // // //                 Configure shipping options and pricing
// // // // // // //               </CardDescription>
// // // // // // //             </CardHeader>
// // // // // // //             <CardContent>
// // // // // // //               <div className="space-y-4">
// // // // // // //                 {filteredMethods.map((method) => (
// // // // // // //                   <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
// // // // // // //                     <div className="flex items-center space-x-4">
// // // // // // //                       <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-lg">
// // // // // // //                         <Truck className="h-6 w-6 text-muted-foreground" />
// // // // // // //                       </div>
                   
// // // // // // //                       <div>
// // // // // // //                         <div className="flex items-center space-x-2">
// // // // // // //                           <h3 className="font-medium">{method.name}</h3>
// // // // // // //                           <Badge className={getStatusColor(method.status)}>
// // // // // // //                             {method.status}
// // // // // // //                           </Badge>
// // // // // // //                         </div>
// // // // // // //                         <p className="text-sm text-muted-foreground">{method.description}</p>
// // // // // // //                         <p className="text-xs text-muted-foreground">
// // // // // // //                           Zones: {method.zones.join(", ")}
// // // // // // //                         </p>
// // // // // // //                       </div>
// // // // // // //                     </div>
                 
// // // // // // //                     <div className="flex items-center space-x-4">
// // // // // // //                       <div className="text-right">
// // // // // // //                         <div className="font-medium">${method.price.toFixed(2)}</div>
// // // // // // //                         <div className="text-sm text-muted-foreground">
// // // // // // //                           {method.freeThreshold ? `Free over $${method.freeThreshold}` : "No free shipping"}
// // // // // // //                         </div>
// // // // // // //                       </div>
                   
// // // // // // //                       <DropdownMenu>
// // // // // // //                         <DropdownMenuTrigger asChild>
// // // // // // //                           <Button variant="ghost" size="icon">
// // // // // // //                             <MoreHorizontal className="h-4 w-4" />
// // // // // // //                           </Button>
// // // // // // //                         </DropdownMenuTrigger>
// // // // // // //                         <DropdownMenuContent align="end">
// // // // // // //                           <DropdownMenuItem>
// // // // // // //                             <Edit className="mr-2 h-4 w-4" />
// // // // // // //                             Edit Method
// // // // // // //                           </DropdownMenuItem>
// // // // // // //                           <DropdownMenuItem>
// // // // // // //                             Configure Zones
// // // // // // //                           </DropdownMenuItem>
// // // // // // //                           <DropdownMenuItem className="text-red-600">
// // // // // // //                             <Trash2 className="mr-2 h-4 w-4" />
// // // // // // //                             Delete Method
// // // // // // //                           </DropdownMenuItem>
// // // // // // //                         </DropdownMenuContent>
// // // // // // //                       </DropdownMenu>
// // // // // // //                     </div>
// // // // // // //                   </div>
// // // // // // //                 ))}
// // // // // // //               </div>
// // // // // // //             </CardContent>
// // // // // // //           </Card>
// // // // // // //         </TabsContent>
// // // // // // //         <TabsContent value="zones">
// // // // // // //           <Card>
// // // // // // //             <CardHeader>
// // // // // // //               <CardTitle>Shipping Zones ({shippingZones.length})</CardTitle>
// // // // // // //               <CardDescription>
// // // // // // //                 Define geographical areas for shipping
// // // // // // //               </CardDescription>
// // // // // // //             </CardHeader>
// // // // // // //             <CardContent>
// // // // // // //               <div className="space-y-4">
// // // // // // //                 {shippingZones.map((zone) => (
// // // // // // //                   <div key={zone.id} className="flex items-center justify-between p-4 border rounded-lg">
// // // // // // //                     <div className="flex items-center space-x-4">
// // // // // // //                       <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-lg">
// // // // // // //                         <Package className="h-6 w-6 text-muted-foreground" />
// // // // // // //                       </div>
                   
// // // // // // //                       <div>
// // // // // // //                         <div className="flex items-center space-x-2">
// // // // // // //                           <h3 className="font-medium">{zone.name}</h3>
// // // // // // //                           <Badge className={getStatusColor(zone.status)}>
// // // // // // //                             {zone.status}
// // // // // // //                           </Badge>
// // // // // // //                         </div>
// // // // // // //                         <p className="text-sm text-muted-foreground">{zone.description}</p>
// // // // // // //                         <p className="text-xs text-muted-foreground">
// // // // // // //                           Countries: {zone.countries.slice(0, 3).join(", ")}
// // // // // // //                           {zone.countries.length > 3 && ` +${zone.countries.length - 3} more`}
// // // // // // //                         </p>
// // // // // // //                       </div>
// // // // // // //                     </div>
                 
// // // // // // //                     <DropdownMenu>
// // // // // // //                       <DropdownMenuTrigger asChild>
// // // // // // //                         <Button variant="ghost" size="icon">
// // // // // // //                           <MoreHorizontal className="h-4 w-4" />
// // // // // // //                         </Button>
// // // // // // //                       </DropdownMenuTrigger>
// // // // // // //                       <DropdownMenuContent align="end">
// // // // // // //                         <DropdownMenuItem>
// // // // // // //                           <Edit className="mr-2 h-4 w-4" />
// // // // // // //                           Edit Zone
// // // // // // //                         </DropdownMenuItem>
// // // // // // //                         <DropdownMenuItem>
// // // // // // //                           Manage Countries
// // // // // // //                         </DropdownMenuItem>
// // // // // // //                         <DropdownMenuItem className="text-red-600">
// // // // // // //                           <Trash2 className="mr-2 h-4 w-4" />
// // // // // // //                           Delete Zone
// // // // // // //                         </DropdownMenuItem>
// // // // // // //                       </DropdownMenuContent>
// // // // // // //                     </DropdownMenu>
// // // // // // //                   </div>
// // // // // // //                 ))}
// // // // // // //               </div>
// // // // // // //             </CardContent>
// // // // // // //           </Card>
// // // // // // //         </TabsContent>
// // // // // // //         <TabsContent value="shipments">
// // // // // // //           <Card>
// // // // // // //             <CardHeader>
// // // // // // //               <CardTitle>Recent Shipments ({recentShipments.length})</CardTitle>
// // // // // // //               <CardDescription>
// // // // // // //                 Track and manage recent shipments
// // // // // // //               </CardDescription>
// // // // // // //             </CardHeader>
// // // // // // //             <CardContent>
// // // // // // //               <div className="space-y-4">
// // // // // // //                 {recentShipments.map((shipment) => (
// // // // // // //                   <div key={shipment.id} className="flex items-center justify-between p-4 border rounded-lg">
// // // // // // //                     <div className="flex items-center space-x-4">
// // // // // // //                       <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-lg">
// // // // // // //                         <Package className="h-6 w-6 text-muted-foreground" />
// // // // // // //                       </div>
                   
// // // // // // //                       <div>
// // // // // // //                         <div className="flex items-center space-x-2">
// // // // // // //                           <h3 className="font-medium">{shipment.id}</h3>
// // // // // // //                           <Badge className={getStatusColor(shipment.status)}>
// // // // // // //                             {shipment.status.replace("_", " ")}
// // // // // // //                           </Badge>
// // // // // // //                         </div>
// // // // // // //                         <p className="text-sm text-muted-foreground">
// // // // // // //                           Order: {shipment.orderId} • Customer: {shipment.customer}
// // // // // // //                         </p>
// // // // // // //                         <p className="text-xs text-muted-foreground">
// // // // // // //                           Tracking: {shipment.trackingNumber}
// // // // // // //                         </p>
// // // // // // //                       </div>
// // // // // // //                     </div>
                 
// // // // // // //                     <div className="flex items-center space-x-4">
// // // // // // //                       <div className="text-right">
// // // // // // //                         <div className="font-medium">{shipment.method}</div>
// // // // // // //                         <div className="text-sm text-muted-foreground">{shipment.date}</div>
// // // // // // //                       </div>
                   
// // // // // // //                       <DropdownMenu>
// // // // // // //                         <DropdownMenuTrigger asChild>
// // // // // // //                           <Button variant="ghost" size="icon">
// // // // // // //                             <MoreHorizontal className="h-4 w-4" />
// // // // // // //                           </Button>
// // // // // // //                         </DropdownMenuTrigger>
// // // // // // //                         <DropdownMenuContent align="end">
// // // // // // //                           <DropdownMenuItem>
// // // // // // //                             Track Shipment
// // // // // // //                           </DropdownMenuItem>
// // // // // // //                           <DropdownMenuItem>
// // // // // // //                             Update Status
// // // // // // //                           </DropdownMenuItem>
// // // // // // //                           <DropdownMenuItem>
// // // // // // //                             Print Label
// // // // // // //                           </DropdownMenuItem>
// // // // // // //                         </DropdownMenuContent>
// // // // // // //                       </DropdownMenu>
// // // // // // //                     </div>
// // // // // // //                   </div>
// // // // // // //                 ))}
// // // // // // //               </div>
// // // // // // //             </CardContent>
// // // // // // //           </Card>
// // // // // // //         </TabsContent>
// // // // // // //       </Tabs>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }


// // // // // // "use client";

// // // // // // import { useState, useEffect } from "react";
// // // // // // import { useRouter } from "next/navigation";
// // // // // // import { ArrowLeft, CreditCard, Truck, Shield, Check } from "lucide-react";
// // // // // // import Link from "next/link";

// // // // // // import { Button } from "@/components/ui/button";
// // // // // // import { Input } from "@/components/ui/input";
// // // // // // import { Label } from "@/components/ui/label";
// // // // // // import { Separator } from "@/components/ui/separator";
// // // // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // // // // // import { useCart } from "@/lib/cart-context";

// // // // // // interface ShippingAddress {
// // // // // //   firstName: string;
// // // // // //   lastName: string;
// // // // // //   email: string;
// // // // // //   phone: string;
// // // // // //   street: string;
// // // // // //   city: string;
// // // // // //   state: string;
// // // // // //   postalCode: string;
// // // // // //   country: string;
// // // // // // }

// // // // // // interface PaymentInfo {
// // // // // //   cardNumber: string;
// // // // // //   expiryDate: string;
// // // // // //   cvv: string;
// // // // // //   cardholderName: string;
// // // // // // }

// // // // // // export default function CheckoutPage() {
// // // // // //   const router = useRouter();
// // // // // //   const { state, clearCart, getTotalItems, getTotalPrice } = useCart();
// // // // // //   const [currentStep, setCurrentStep] = useState(1);
// // // // // //   const [isProcessing, setIsProcessing] = useState(false);
// // // // // //   const [orderComplete, setOrderComplete] = useState(false);
// // // // // //   const [orderId, setOrderId] = useState<string | null>(null);

// // // // // //   const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
// // // // // //     firstName: "",
// // // // // //     lastName: "",
// // // // // //     email: "",
// // // // // //     phone: "",
// // // // // //     street: "",
// // // // // //     city: "",
// // // // // //     state: "",
// // // // // //     postalCode: "",
// // // // // //     country: "United States",
// // // // // //   });

// // // // // //   const [billingAddress, setBillingAddress] = useState<ShippingAddress>({
// // // // // //     firstName: "",
// // // // // //     lastName: "",
// // // // // //     email: "",
// // // // // //     phone: "",
// // // // // //     street: "",
// // // // // //     city: "",
// // // // // //     state: "",
// // // // // //     postalCode: "",
// // // // // //     country: "United States",
// // // // // //   });

// // // // // //   const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
// // // // // //     cardNumber: "",
// // // // // //     expiryDate: "",
// // // // // //     cvv: "",
// // // // // //     cardholderName: "",
// // // // // //   });

// // // // // //   const [sameAsShipping, setSameAsShipping] = useState(true);
// // // // // //   const [errors, setErrors] = useState<Record<string, string>>({});

// // // // // //   const subtotal = getTotalPrice();
// // // // // //   const shipping = subtotal > 100 ? 0 : 15;
// // // // // //   const tax = subtotal * 0.08;
// // // // // //   const total = subtotal + shipping + tax;

// // // // // //   // Redirect if cart is empty
// // // // // //   useEffect(() => {
// // // // // //     if (state.items.length === 0 && !orderComplete) {
// // // // // //       router.push("/cart");
// // // // // //     }
// // // // // //   }, [state.items.length, orderComplete, router]);

// // // // // //   const validateStep = (step: number): boolean => {
// // // // // //     const newErrors: Record<string, string> = {};

// // // // // //     if (step === 1) {
// // // // // //       // Validate shipping address
// // // // // //       if (!shippingAddress.firstName) newErrors.firstName = "First name is required";
// // // // // //       if (!shippingAddress.lastName) newErrors.lastName = "Last name is required";
// // // // // //       if (!shippingAddress.email) newErrors.email = "Email is required";
// // // // // //       if (!shippingAddress.phone) newErrors.phone = "Phone is required";
// // // // // //       if (!shippingAddress.street) newErrors.street = "Street address is required";
// // // // // //       if (!shippingAddress.city) newErrors.city = "City is required";
// // // // // //       if (!shippingAddress.state) newErrors.state = "State is required";
// // // // // //       if (!shippingAddress.postalCode) newErrors.postalCode = "Postal code is required";
// // // // // //     }

// // // // // //     if (step === 2) {
// // // // // //       // Validate billing address if different from shipping
// // // // // //       if (!sameAsShipping) {
// // // // // //         if (!billingAddress.firstName) newErrors.billingFirstName = "First name is required";
// // // // // //         if (!billingAddress.lastName) newErrors.billingLastName = "Last name is required";
// // // // // //         if (!billingAddress.street) newErrors.billingStreet = "Street address is required";
// // // // // //         if (!billingAddress.city) newErrors.billingCity = "City is required";
// // // // // //         if (!billingAddress.state) newErrors.billingState = "State is required";
// // // // // //         if (!billingAddress.postalCode) newErrors.billingPostalCode = "Postal code is required";
// // // // // //       }

// // // // // //       // Validate payment info
// // // // // //       if (!paymentInfo.cardNumber) newErrors.cardNumber = "Card number is required";
// // // // // //       if (!paymentInfo.expiryDate) newErrors.expiryDate = "Expiry date is required";
// // // // // //       if (!paymentInfo.cvv) newErrors.cvv = "CVV is required";
// // // // // //       if (!paymentInfo.cardholderName) newErrors.cardholderName = "Cardholder name is required";
// // // // // //     }

// // // // // //     setErrors(newErrors);
// // // // // //     return Object.keys(newErrors).length === 0;
// // // // // //   };

// // // // // //   const handleNext = () => {
// // // // // //     if (validateStep(currentStep)) {
// // // // // //       setCurrentStep(currentStep + 1);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleBack = () => {
// // // // // //     setCurrentStep(currentStep - 1);
// // // // // //   };

// // // // // //   const handlePlaceOrder = async () => {
// // // // // //     if (!validateStep(2)) return;

// // // // // //     setIsProcessing(true);

// // // // // //     try {
// // // // // //       const token = localStorage.getItem("token");
// // // // // //       if (!token) {
// // // // // //         router.push("/auth/login?redirect=/checkout");
// // // // // //         return;
// // // // // //       }

// // // // // //       const orderData = {
// // // // // //         items: state.items.map(item => ({
// // // // // //           product_id: item.id,
// // // // // //           quantity: item.quantity,
// // // // // //           price: item.price,
// // // // // //           size: item.size,
// // // // // //           color: item.color,
// // // // // //         })),
// // // // // //         shipping_address: {
// // // // // //           name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
// // // // // //           email: shippingAddress.email,
// // // // // //           phone: shippingAddress.phone,
// // // // // //           street: shippingAddress.street,
// // // // // //           city: shippingAddress.city,
// // // // // //           state: shippingAddress.state,
// // // // // //           postal_code: shippingAddress.postalCode,
// // // // // //           country: shippingAddress.country,
// // // // // //         },
// // // // // //         billing_address: sameAsShipping ? {
// // // // // //           name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
// // // // // //           email: shippingAddress.email,
// // // // // //           phone: shippingAddress.phone,
// // // // // //           street: shippingAddress.street,
// // // // // //           city: shippingAddress.city,
// // // // // //           state: shippingAddress.state,
// // // // // //           postal_code: shippingAddress.postalCode,
// // // // // //           country: shippingAddress.country,
// // // // // //         } : {
// // // // // //           name: `${billingAddress.firstName} ${billingAddress.lastName}`,
// // // // // //           email: billingAddress.email,
// // // // // //           phone: billingAddress.phone,
// // // // // //           street: billingAddress.street,
// // // // // //           city: billingAddress.city,
// // // // // //           state: billingAddress.state,
// // // // // //           postal_code: billingAddress.postalCode,
// // // // // //           country: billingAddress.country,
// // // // // //         },
// // // // // //         payment_info: paymentInfo,
// // // // // //         total_amount: total,
// // // // // //       };

// // // // // //       const response = await fetch("http://localhost:5000/api/orders", {
// // // // // //         method: "POST",
// // // // // //         headers: {
// // // // // //           "Content-Type": "application/json",
// // // // // //           Authorization: `Bearer ${token}`,
// // // // // //         },
// // // // // //         body: JSON.stringify(orderData),
// // // // // //       });

// // // // // //       if (!response.ok) {
// // // // // //         throw new Error("Failed to create order");
// // // // // //       }

// // // // // //       const result = await response.json();
// // // // // //       setOrderId(result.order.id);
// // // // // //       setOrderComplete(true);
// // // // // //       clearCart();
// // // // // //     } catch (error) {
// // // // // //       console.error("Order creation failed:", error);
// // // // // //       setErrors({ general: "Failed to process order. Please try again." });
// // // // // //     } finally {
// // // // // //       setIsProcessing(false);
// // // // // //     }
// // // // // //   };

// // // // // //   if (orderComplete) {
// // // // // //     return (
// // // // // //       <main className="min-h-screen bg-background pt-24">
// // // // // //         <div className="container py-8">
// // // // // //           <div className="max-w-2xl mx-auto text-center">
// // // // // //             <div className="mb-8">
// // // // // //               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // // // // //                 <Check className="w-8 h-8 text-green-600" />
// // // // // //               </div>
// // // // // //               <h1 className="font-serif text-3xl font-light mb-2">Order Confirmed!</h1>
// // // // // //               <p className="text-muted-foreground">
// // // // // //                 Thank you for your purchase. Your order has been successfully placed.
// // // // // //               </p>
// // // // // //             </div>

// // // // // //             <Card>
// // // // // //               <CardContent className="p-6">
// // // // // //                 <div className="space-y-4">
// // // // // //                   <div className="flex justify-between">
// // // // // //                     <span>Order Number:</span>
// // // // // //                     <span className="font-medium">#{orderId}</span>
// // // // // //                   </div>
// // // // // //                   <div className="flex justify-between">
// // // // // //                     <span>Total Amount:</span>
// // // // // //                     <span className="font-medium">${total.toFixed(2)}</span>
// // // // // //                   </div>
// // // // // //                   <div className="flex justify-between">
// // // // // //                     <span>Estimated Delivery:</span>
// // // // // //                     <span className="font-medium">3-5 business days</span>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               </CardContent>
// // // // // //             </Card>

// // // // // //             <div className="mt-8 space-y-4">
// // // // // //               <Button asChild className="w-full">
// // // // // //                 <Link href="/profile">View Order Details</Link>
// // // // // //               </Button>
// // // // // //               <Button variant="outline" asChild className="w-full">
// // // // // //                 <Link href="/shop">Continue Shopping</Link>
// // // // // //               </Button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </main>
// // // // // //     );
// // // // // //   }

// // // // // //   if (state.items.length === 0) {
// // // // // //     return null; // Will redirect in useEffect
// // // // // //   }

// // // // // //   return (
// // // // // //     <main className="min-h-screen bg-background pt-24">
// // // // // //       <div className="container py-8">
// // // // // //         <div className="mb-8">
// // // // // //           <Link
// // // // // //             href="/cart"
// // // // // //             className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
// // // // // //           >
// // // // // //             <ArrowLeft className="w-4 h-4 mr-2" />
// // // // // //             Back to Cart
// // // // // //           </Link>
// // // // // //           <h1 className="font-serif text-3xl font-light">Checkout</h1>
// // // // // //         </div>

// // // // // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // // // // //           {/* Checkout Form */}
// // // // // //           <div className="lg:col-span-2">
// // // // // //             {/* Progress Steps */}
// // // // // //             <div className="mb-8">
// // // // // //               <div className="flex items-center space-x-4">
// // // // // //                 {[1, 2, 3].map((step) => (
// // // // // //                   <div key={step} className="flex items-center">
// // // // // //                     <div
// // // // // //                       className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
// // // // // //                         step <= currentStep
// // // // // //                           ? "bg-primary text-primary-foreground"
// // // // // //                           : "bg-muted text-muted-foreground"
// // // // // //                       }`}
// // // // // //                     >
// // // // // //                       {step}
// // // // // //                     </div>
// // // // // //                     <span className="ml-2 text-sm">
// // // // // //                       {step === 1 && "Shipping"}
// // // // // //                       {step === 2 && "Payment"}
// // // // // //                       {step === 3 && "Review"}
// // // // // //                     </span>
// // // // // //                     {step < 3 && <div className="w-8 h-px bg-border ml-4" />}
// // // // // //                   </div>
// // // // // //                 ))}
// // // // // //               </div>
// // // // // //             </div>

// // // // // //             {/* Step 1: Shipping Information */}
// // // // // //             {currentStep === 1 && (
// // // // // //               <Card>
// // // // // //                 <CardHeader>
// // // // // //                   <CardTitle className="flex items-center">
// // // // // //                     <Truck className="w-5 h-5 mr-2" />
// // // // // //                     Shipping Information
// // // // // //                   </CardTitle>
// // // // // //                 </CardHeader>
// // // // // //                 <CardContent className="space-y-4">
// // // // // //                   <div className="grid grid-cols-2 gap-4">
// // // // // //                     <div>
// // // // // //                       <Label htmlFor="firstName">First Name</Label>
// // // // // //                       <Input
// // // // // //                         id="firstName"
// // // // // //                         value={shippingAddress.firstName}
// // // // // //                         onChange={(e) =>
// // // // // //                           setShippingAddress({ ...shippingAddress, firstName: e.target.value })
// // // // // //                         }
// // // // // //                         className={errors.firstName ? "border-red-500" : ""}
// // // // // //                       />
// // // // // //                       {errors.firstName && (
// // // // // //                         <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
// // // // // //                       )}
// // // // // //                     </div>
// // // // // //                     <div>
// // // // // //                       <Label htmlFor="lastName">Last Name</Label>
// // // // // //                       <Input
// // // // // //                         id="lastName"
// // // // // //                         value={shippingAddress.lastName}
// // // // // //                         onChange={(e) =>
// // // // // //                           setShippingAddress({ ...shippingAddress, lastName: e.target.value })
// // // // // //                         }
// // // // // //                         className={errors.lastName ? "border-red-500" : ""}
// // // // // //                       />
// // // // // //                       {errors.lastName && (
// // // // // //                         <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
// // // // // //                       )}
// // // // // //                     </div>
// // // // // //                   </div>

// // // // // //                   <div className="grid grid-cols-2 gap-4">
// // // // // //                     <div>
// // // // // //                       <Label htmlFor="email">Email</Label>
// // // // // //                       <Input
// // // // // //                         id="email"
// // // // // //                         type="email"
// // // // // //                         value={shippingAddress.email}
// // // // // //                         onChange={(e) =>
// // // // // //                           setShippingAddress({ ...shippingAddress, email: e.target.value })
// // // // // //                         }
// // // // // //                         className={errors.email ? "border-red-500" : ""}
// // // // // //                       />
// // // // // //                       {errors.email && (
// // // // // //                         <p className="text-sm text-red-500 mt-1">{errors.email}</p>
// // // // // //                       )}
// // // // // //                     </div>
// // // // // //                     <div>
// // // // // //                       <Label htmlFor="phone">Phone</Label>
// // // // // //                       <Input
// // // // // //                         id="phone"
// // // // // //                         value={shippingAddress.phone}
// // // // // //                         onChange={(e) =>
// // // // // //                           setShippingAddress({ ...shippingAddress, phone: e.target.value })
// // // // // //                         }
// // // // // //                         className={errors.phone ? "border-red-500" : ""}
// // // // // //                       />
// // // // // //                       {errors.phone && (
// // // // // //                         <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
// // // // // //                       )}
// // // // // //                     </div>
// // // // // //                   </div>

// // // // // //                   <div>
// // // // // //                     <Label htmlFor="street">Street Address</Label>
// // // // // //                     <Input
// // // // // //                       id="street"
// // // // // //                       value={shippingAddress.street}
// // // // // //                       onChange={(e) =>
// // // // // //                         setShippingAddress({ ...shippingAddress, street: e.target.value })
// // // // // //                       }
// // // // // //                       className={errors.street ? "border-red-500" : ""}
// // // // // //                     />
// // // // // //                     {errors.street && (
// // // // // //                       <p className="text-sm text-red-500 mt-1">{errors.street}</p>
// // // // // //                     )}
// // // // // //                   </div>

// // // // // //                   <div className="grid grid-cols-3 gap-4">
// // // // // //                     <div>
// // // // // //                       <Label htmlFor="city">City</Label>
// // // // // //                       <Input
// // // // // //                         id="city"
// // // // // //                         value={shippingAddress.city}
// // // // // //                         onChange={(e) =>
// // // // // //                           setShippingAddress({ ...shippingAddress, city: e.target.value })
// // // // // //                         }
// // // // // //                         className={errors.city ? "border-red-500" : ""}
// // // // // //                       />
// // // // // //                       {errors.city && (
// // // // // //                         <p className="text-sm text-red-500 mt-1">{errors.city}</p>
// // // // // //                       )}
// // // // // //                     </div>
// // // // // //                     <div>
// // // // // //                       <Label htmlFor="state">State</Label>
// // // // // //                       <Input
// // // // // //                         id="state"
// // // // // //                         value={shippingAddress.state}
// // // // // //                         onChange={(e) =>
// // // // // //                           setShippingAddress({ ...shippingAddress, state: e.target.value })
// // // // // //                         }
// // // // // //                         className={errors.state ? "border-red-500" : ""}
// // // // // //                       />
// // // // // //                       {errors.state && (
// // // // // //                         <p className="text-sm text-red-500 mt-1">{errors.state}</p>
// // // // // //                       )}
// // // // // //                     </div>
// // // // // //                     <div>
// // // // // //                       <Label htmlFor="postalCode">Postal Code</Label>
// // // // // //                       <Input
// // // // // //                         id="postalCode"
// // // // // //                         value={shippingAddress.postalCode}
// // // // // //                         onChange={(e) =>
// // // // // //                           setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
// // // // // //                         }
// // // // // //                         className={errors.postalCode ? "border-red-500" : ""}
// // // // // //                       />
// // // // // //                       {errors.postalCode && (
// // // // // //                         <p className="text-sm text-red-500 mt-1">{errors.postalCode}</p>
// // // // // //                       )}
// // // // // //                     </div>
// // // // // //                   </div>

// // // // // //                   <div className="flex justify-end">
// // // // // //                     <Button onClick={handleNext}>Continue to Payment</Button>
// // // // // //                   </div>
// // // // // //                 </CardContent>
// // // // // //               </Card>
// // // // // //             )}

// // // // // //             {/* Step 2: Payment Information */}
// // // // // //             {currentStep === 2 && (
// // // // // //               <div className="space-y-6">
// // // // // //                 <Card>
// // // // // //                   <CardHeader>
// // // // // //                     <CardTitle className="flex items-center">
// // // // // //                       <CreditCard className="w-5 h-5 mr-2" />
// // // // // //                       Payment Information
// // // // // //                     </CardTitle>
// // // // // //                   </CardHeader>
// // // // // //                   <CardContent className="space-y-4">
// // // // // //                     <div>
// // // // // //                       <Label htmlFor="cardNumber">Card Number</Label>
// // // // // //                       <Input
// // // // // //                         id="cardNumber"
// // // // // //                         placeholder="1234 5678 9012 3456"
// // // // // //                         value={paymentInfo.cardNumber}
// // // // // //                         onChange={(e) =>
// // // // // //                           setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
// // // // // //                         }
// // // // // //                         className={errors.cardNumber ? "border-red-500" : ""}
// // // // // //                       />
// // // // // //                       {errors.cardNumber && (
// // // // // //                         <p className="text-sm text-red-500 mt-1">{errors.cardNumber}</p>
// // // // // //                       )}
// // // // // //                     </div>

// // // // // //                     <div>
// // // // // //                       <Label htmlFor="cardholderName">Cardholder Name</Label>
// // // // // //                       <Input
// // // // // //                         id="cardholderName"
// // // // // //                         value={paymentInfo.cardholderName}
// // // // // //                         onChange={(e) =>
// // // // // //                           setPaymentInfo({ ...paymentInfo, cardholderName: e.target.value })
// // // // // //                         }
// // // // // //                         className={errors.cardholderName ? "border-red-500" : ""}
// // // // // //                       />
// // // // // //                       {errors.cardholderName && (
// // // // // //                         <p className="text-sm text-red-500 mt-1">{errors.cardholderName}</p>
// // // // // //                       )}
// // // // // //                     </div>

// // // // // //                     <div className="grid grid-cols-2 gap-4">
// // // // // //                       <div>
// // // // // //                         <Label htmlFor="expiryDate">Expiry Date</Label>
// // // // // //                         <Input
// // // // // //                           id="expiryDate"
// // // // // //                           placeholder="MM/YY"
// // // // // //                           value={paymentInfo.expiryDate}
// // // // // //                           onChange={(e) =>
// // // // // //                             setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })
// // // // // //                           }
// // // // // //                           className={errors.expiryDate ? "border-red-500" : ""}
// // // // // //                         />
// // // // // //                         {errors.expiryDate && (
// // // // // //                           <p className="text-sm text-red-500 mt-1">{errors.expiryDate}</p>
// // // // // //                         )}
// // // // // //                       </div>
// // // // // //                       <div>
// // // // // //                         <Label htmlFor="cvv">CVV</Label>
// // // // // //                         <Input
// // // // // //                           id="cvv"
// // // // // //                           placeholder="123"
// // // // // //                           value={paymentInfo.cvv}
// // // // // //                           onChange={(e) =>
// // // // // //                             setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
// // // // // //                           }
// // // // // //                           className={errors.cvv ? "border-red-500" : ""}
// // // // // //                         />
// // // // // //                         {errors.cvv && (
// // // // // //                           <p className="text-sm text-red-500 mt-1">{errors.cvv}</p>
// // // // // //                         )}
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   </CardContent>
// // // // // //                 </Card>

// // // // // //                 <Card>
// // // // // //                   <CardHeader>
// // // // // //                     <CardTitle>Billing Address</CardTitle>
// // // // // //                   </CardHeader>
// // // // // //                   <CardContent>
// // // // // //                     <div className="space-y-4">
// // // // // //                       <div className="flex items-center space-x-2">
// // // // // //                         <input
// // // // // //                           type="checkbox"
// // // // // //                           id="sameAsShipping"
// // // // // //                           checked={sameAsShipping}
// // // // // //                           onChange={(e) => setSameAsShipping(e.target.checked)}
// // // // // //                           className="rounded"
// // // // // //                         />
// // // // // //                         <Label htmlFor="sameAsShipping">Same as shipping address</Label>
// // // // // //                       </div>

// // // // // //                       {!sameAsShipping && (
// // // // // //                         <div className="space-y-4">
// // // // // //                           <div className="grid grid-cols-2 gap-4">
// // // // // //                             <div>
// // // // // //                               <Label htmlFor="billingFirstName">First Name</Label>
// // // // // //                               <Input
// // // // // //                                 id="billingFirstName"
// // // // // //                                 value={billingAddress.firstName}
// // // // // //                                 onChange={(e) =>
// // // // // //                                   setBillingAddress({ ...billingAddress, firstName: e.target.value })
// // // // // //                                 }
// // // // // //                                 className={errors.billingFirstName ? "border-red-500" : ""}
// // // // // //                               />
// // // // // //                             </div>
// // // // // //                             <div>
// // // // // //                               <Label htmlFor="billingLastName">Last Name</Label>
// // // // // //                               <Input
// // // // // //                                 id="billingLastName"
// // // // // //                                 value={billingAddress.lastName}
// // // // // //                                 onChange={(e) =>
// // // // // //                                   setBillingAddress({ ...billingAddress, lastName: e.target.value })
// // // // // //                                 }
// // // // // //                                 className={errors.billingLastName ? "border-red-500" : ""}
// // // // // //                               />
// // // // // //                             </div>
// // // // // //                           </div>
// // // // // //                           {/* Add more billing address fields as needed */}
// // // // // //                         </div>
// // // // // //                       )}
// // // // // //                     </div>
// // // // // //                   </CardContent>
// // // // // //                 </Card>

// // // // // //                 <div className="flex justify-between">
// // // // // //                   <Button variant="outline" onClick={handleBack}>
// // // // // //                     Back
// // // // // //                   </Button>
// // // // // //                   <Button onClick={handleNext}>Review Order</Button>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             )}

// // // // // //             {/* Step 3: Review Order */}
// // // // // //             {currentStep === 3 && (
// // // // // //               <Card>
// // // // // //                 <CardHeader>
// // // // // //                   <CardTitle className="flex items-center">
// // // // // //                     <Shield className="w-5 h-5 mr-2" />
// // // // // //                     Review Your Order
// // // // // //                   </CardTitle>
// // // // // //                 </CardHeader>
// // // // // //                 <CardContent className="space-y-6">
// // // // // //                   {/* Order Items */}
// // // // // //                   <div>
// // // // // //                     <h3 className="font-medium mb-4">Order Items</h3>
// // // // // //                     <div className="space-y-4">
// // // // // //                       {state.items.map((item) => (
// // // // // //                         <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between">
// // // // // //                           <div>
// // // // // //                             <p className="font-medium">{item.name}</p>
// // // // // //                             <p className="text-sm text-muted-foreground">
// // // // // //                               Qty: {item.quantity}
// // // // // //                               {item.size && ` • Size: ${item.size}`}
// // // // // //                               {item.color && ` • Color: ${item.color}`}
// // // // // //                             </p>
// // // // // //                           </div>
// // // // // //                           <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
// // // // // //                         </div>
// // // // // //                       ))}
// // // // // //                     </div>
// // // // // //                   </div>

// // // // // //                   <Separator />

// // // // // //                   {/* Shipping Address */}
// // // // // //                   <div>
// // // // // //                     <h3 className="font-medium mb-2">Shipping Address</h3>
// // // // // //                     <div className="text-sm text-muted-foreground">
// // // // // //                       <p>{shippingAddress.firstName} {shippingAddress.lastName}</p>
// // // // // //                       <p>{shippingAddress.street}</p>
// // // // // //                       <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}</p>
// // // // // //                       <p>{shippingAddress.country}</p>
// // // // // //                     </div>
// // // // // //                   </div>

// // // // // //                   <Separator />

// // // // // //                   {/* Payment Method */}
// // // // // //                   <div>
// // // // // //                     <h3 className="font-medium mb-2">Payment Method</h3>
// // // // // //                     <p className="text-sm text-muted-foreground">
// // // // // //                       **** **** **** {paymentInfo.cardNumber.slice(-4)}
// // // // // //                     </p>
// // // // // //                   </div>

// // // // // //                   {errors.general && (
// // // // // //                     <div className="text-sm text-red-500">{errors.general}</div>
// // // // // //                   )}

// // // // // //                   <div className="flex justify-between">
// // // // // //                     <Button variant="outline" onClick={handleBack}>
// // // // // //                       Back
// // // // // //                     </Button>
// // // // // //                     <Button onClick={handlePlaceOrder} disabled={isProcessing}>
// // // // // //                       {isProcessing ? "Processing..." : `Place Order - $${total.toFixed(2)}`}
// // // // // //                     </Button>
// // // // // //                   </div>
// // // // // //                 </CardContent>
// // // // // //               </Card>
// // // // // //             )}
// // // // // //           </div>

// // // // // //           {/* Order Summary */}
// // // // // //           <div className="lg:col-span-1">
// // // // // //             <Card className="sticky top-24">
// // // // // //               <CardHeader>
// // // // // //                 <CardTitle>Order Summary</CardTitle>
// // // // // //               </CardHeader>
// // // // // //               <CardContent className="space-y-4">
// // // // // //                 <div className="space-y-2">
// // // // // //                   <div className="flex justify-between">
// // // // // //                     <span>Subtotal ({getTotalItems()} items)</span>
// // // // // //                     <span>${subtotal.toFixed(2)}</span>
// // // // // //                   </div>
// // // // // //                   <div className="flex justify-between">
// // // // // //                     <span>Shipping</span>
// // // // // //                     <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
// // // // // //                   </div>
// // // // // //                   <div className="flex justify-between">
// // // // // //                     <span>Tax</span>
// // // // // //                     <span>${tax.toFixed(2)}</span>
// // // // // //                   </div>
// // // // // //                 </div>

// // // // // //                 <Separator />

// // // // // //                 <div className="flex justify-between font-medium text-lg">
// // // // // //                   <span>Total</span>
// // // // // //                   <span>${total.toFixed(2)}</span>
// // // // // //                 </div>

// // // // // //                 {shipping === 0 && (
// // // // // //                   <div className="text-sm text-green-600 flex items-center">
// // // // // //                     <Truck className="w-4 h-4 mr-2" />
// // // // // //                     Free shipping on orders over $100
// // // // // //                   </div>
// // // // // //                 )}

// // // // // //                 <div className="text-xs text-muted-foreground">
// // // // // //                   <p className="flex items-center mb-1">
// // // // // //                     <Shield className="w-3 h-3 mr-1" />
// // // // // //                     Secure checkout with SSL encryption
// // // // // //                   </p>
// // // // // //                   <p>30-day return policy</p>
// // // // // //                 </div>
// // // // // //               </CardContent>
// // // // // //             </Card>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </main>
// // // // // //   );
// // // // // // }

// // // // // "use client";

// // // // // import { X, Plus, Minus, ShoppingBag } from "lucide-react";
// // // // // import Image from "next/image";
// // // // // import Link from "next/link";

// // // // // import { Button } from "@/components/ui/button";
// // // // // import { Separator } from "@/components/ui/separator";
// // // // // import { useCart } from "@/lib/cart-context";

// // // // // export default function CartDrawer() {
// // // // //   const { state, removeItem, updateQuantity, closeCart, getTotalItems, getTotalPrice } = useCart();

// // // // //   if (!state.isOpen) return null;

// // // // //   const totalItems = getTotalItems();
// // // // //   const totalPrice = getTotalPrice();

// // // // //   return (
// // // // //     <>
// // // // //       {/* Backdrop */}
// // // // //       <div 
// // // // //         className="fixed inset-0 z-50 bg-black/50" 
// // // // //         onClick={closeCart}
// // // // //       />
      
// // // // //       {/* Drawer */}
// // // // //       <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-background shadow-xl">
// // // // //         <div className="flex h-full flex-col">
// // // // //           {/* Header */}
// // // // //           <div className="flex items-center justify-between border-b p-4">
// // // // //             <h2 className="text-lg font-semibold">
// // // // //               Shopping Cart ({totalItems})
// // // // //             </h2>
// // // // //             <Button variant="ghost" size="icon" onClick={closeCart}>
// // // // //               <X className="h-5 w-5" />
// // // // //             </Button>
// // // // //           </div>

// // // // //           {/* Cart Items */}
// // // // //           <div className="flex-1 overflow-y-auto p-4">
// // // // //             {state.items.length === 0 ? (
// // // // //               <div className="flex h-full flex-col items-center justify-center text-center">
// // // // //                 <ShoppingBag className="mb-4 h-12 w-12 text-muted-foreground" />
// // // // //                 <h3 className="mb-2 text-lg font-medium">Your cart is empty</h3>
// // // // //                 <p className="mb-4 text-sm text-muted-foreground">
// // // // //                   Add some items to get started
// // // // //                 </p>
// // // // //                 <Button asChild onClick={closeCart}>
// // // // //                   <Link href="/shop">Start Shopping</Link>
// // // // //                 </Button>
// // // // //               </div>
// // // // //             ) : (
// // // // //               <div className="space-y-4">
// // // // //                 {state.items.map((item) => (
// // // // //                   <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3">
// // // // //                     <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
// // // // //                       <Image
// // // // //                         src={item.image}
// // // // //                         alt={item.name}
// // // // //                         fill
// // // // //                         className="object-cover object-center"
// // // // //                       />
// // // // //                     </div>
                    
// // // // //                     <div className="flex flex-1 flex-col">
// // // // //                       <div className="flex justify-between">
// // // // //                         <div className="flex-1">
// // // // //                           <h4 className="text-sm font-medium line-clamp-2">
// // // // //                             {item.name}
// // // // //                           </h4>
// // // // //                           <div className="mt-1 text-xs text-muted-foreground">
// // // // //                             {item.size && <span>Size: {item.size}</span>}
// // // // //                             {item.size && item.color && <span> • </span>}
// // // // //                             {item.color && <span>Color: {item.color}</span>}
// // // // //                           </div>
// // // // //                         </div>
// // // // //                         <Button
// // // // //                           variant="ghost"
// // // // //                           size="icon"
// // // // //                           className="h-6 w-6"
// // // // //                           onClick={() => removeItem(item.id, item.size, item.color)}
// // // // //                         >
// // // // //                           <X className="h-3 w-3" />
// // // // //                         </Button>
// // // // //                       </div>
                      
// // // // //                       <div className="mt-2 flex items-center justify-between">
// // // // //                         <div className="flex items-center border rounded">
// // // // //                           <Button
// // // // //                             variant="ghost"
// // // // //                             size="icon"
// // // // //                             className="h-6 w-6"
// // // // //                             onClick={() => updateQuantity(item.id, item.quantity - 1, item.size, item.color)}
// // // // //                             disabled={item.quantity <= 1}
// // // // //                           >
// // // // //                             <Minus className="h-3 w-3" />
// // // // //                           </Button>
// // // // //                           <span className="w-8 text-center text-sm">{item.quantity}</span>
// // // // //                           <Button
// // // // //                             variant="ghost"
// // // // //                             size="icon"
// // // // //                             className="h-6 w-6"
// // // // //                             onClick={() => updateQuantity(item.id, item.quantity + 1, item.size, item.color)}
// // // // //                           >
// // // // //                             <Plus className="h-3 w-3" />
// // // // //                           </Button>
// // // // //                         </div>
// // // // //                         <span className="text-sm font-medium">
// // // // //                           ${(item.price * item.quantity).toFixed(2)}
// // // // //                         </span>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 ))}
// // // // //               </div>
// // // // //             )}
// // // // //           </div>

// // // // //           {/* Footer */}
// // // // //           {state.items.length > 0 && (
// // // // //             <div className="border-t p-4">
// // // // //               <div className="mb-4 flex justify-between text-lg font-semibold">
// // // // //                 <span>Total</span>
// // // // //                 <span>${totalPrice.toFixed(2)}</span>
// // // // //               </div>
// // // // //               <div className="space-y-2">
// // // // //                 <Button asChild className="w-full" onClick={closeCart}>
// // // // //                   <Link href="/checkout">Checkout</Link>
// // // // //                 </Button>
// // // // //                 <Button variant="outline" asChild className="w-full" onClick={closeCart}>
// // // // //                   <Link href="/cart">View Cart</Link>
// // // // //                 </Button>
// // // // //               </div>
// // // // //             </div>
// // // // //           )}
// // // // //         </div>
// // // // //       </div>
// // // // //     </>
// // // // //   );
// // // // // }

// // // // /* eslint-disable react/no-unescaped-entities */

// // // // "use client";

// // // // import { useState, useEffect } from "react";
// // // // import Link from "next/link";
// // // // import Image from "next/image";
// // // // import { Package, Eye, ArrowLeft, Truck, CheckCircle, Clock, XCircle } from "lucide-react";

// // // // import { Button } from "@/components/ui/button";
// // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // // // import { Badge } from "@/components/ui/badge";
// // // // import { Separator } from "@/components/ui/separator";

// // // // interface OrderItem {
// // // //   id: number;
// // // //   product_id: number;
// // // //   product_name: string;
// // // //   product_image: string;
// // // //   quantity: number;
// // // //   price: number;
// // // //   size?: string;
// // // //   color?: string;
// // // // }

// // // // interface Order {
// // // //   id: number;
// // // //   total_amount: number;
// // // //   status: string;
// // // //   created_at: string;
// // // //   shipping_address: {
// // // //     name: string;
// // // //     street: string;
// // // //     city: string;
// // // //     state: string;
// // // //     postal_code: string;
// // // //     country: string;
// // // //   };
// // // //   items: OrderItem[];
// // // // }

// // // // const getStatusIcon = (status: string) => {
// // // //   switch (status) {
// // // //     case "completed":
// // // //     case "delivered":
// // // //       return <CheckCircle className="h-4 w-4" />;
// // // //     case "processing":
// // // //       return <Package className="h-4 w-4" />;
// // // //     case "shipped":
// // // //       return <Truck className="h-4 w-4" />;
// // // //     case "cancelled":
// // // //       return <XCircle className="h-4 w-4" />;
// // // //     default:
// // // //       return <Clock className="h-4 w-4" />;
// // // //   }
// // // // };

// // // // const getStatusColor = (status: string) => {
// // // //   switch (status) {
// // // //     case "completed":
// // // //     case "delivered":
// // // //       return "bg-green-100 text-green-800";
// // // //     case "processing":
// // // //       return "bg-blue-100 text-blue-800";
// // // //     case "shipped":
// // // //       return "bg-purple-100 text-purple-800";
// // // //     case "cancelled":
// // // //       return "bg-red-100 text-red-800";
// // // //     default:
// // // //       return "bg-yellow-100 text-yellow-800";
// // // //   }
// // // // };

// // // // export default function OrdersPage() {
// // // //   const [orders, setOrders] = useState<Order[]>([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState("");

// // // //   useEffect(() => {
// // // //     fetchOrders();
// // // //   }, []);

// // // //   const fetchOrders = async () => {
// // // //     try {
// // // //       const token = localStorage.getItem("token");
// // // //       if (!token) {
// // // //         setError("Please log in to view your orders");
// // // //         setLoading(false);
// // // //         return;
// // // //       }

// // // //       const response = await fetch("http://localhost:5000/api/orders", {
// // // //         headers: {
// // // //           Authorization: `Bearer ${token}`,
// // // //         },
// // // //       });

// // // //       if (!response.ok) {
// // // //         throw new Error("Failed to fetch orders");
// // // //       }

// // // //       const data = await response.json();
// // // //       setOrders(data);
// // // //     } catch (err) {
// // // //       console.error("Error fetching orders:", err);
// // // //       setError("Failed to load orders");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <main className="min-h-screen bg-background pt-24">
// // // //         <div className="container py-8">
// // // //           <div className="flex items-center justify-center h-64">
// // // //             <div className="text-center">
// // // //               <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
// // // //               <p className="text-muted-foreground">Loading your orders...</p>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </main>
// // // //     );
// // // //   }

// // // //   if (error) {
// // // //     return (
// // // //       <main className="min-h-screen bg-background pt-24">
// // // //         <div className="container py-8">
// // // //           <div className="flex items-center justify-center h-64">
// // // //             <div className="text-center">
// // // //               <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
// // // //               <p className="text-red-500 mb-4">{error}</p>
// // // //               <Button onClick={fetchOrders}>Try Again</Button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </main>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <main className="min-h-screen bg-background pt-24">
// // // //       <div className="container py-8">
// // // //         <div className="mb-8">
// // // //           <Link
// // // //             href="/profile"
// // // //             className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
// // // //           >
// // // //             <ArrowLeft className="w-4 h-4 mr-2" />
// // // //             Back to Profile
// // // //           </Link>
// // // //           <h1 className="font-serif text-3xl font-light">Your Orders</h1>
// // // //           <p className="text-muted-foreground">
// // // //             Track and manage your order history
// // // //           </p>
// // // //         </div>

// // // //         {orders.length === 0 ? (
// // // //           <Card>
// // // //             <CardContent className="flex flex-col items-center justify-center py-16">
// // // //               <Package className="h-16 w-16 text-muted-foreground mb-4" />
// // // //               <h2 className="text-xl font-medium mb-2">No orders yet</h2>
// // // //               <p className="text-muted-foreground mb-6 text-center max-w-md">
// // // //                 You haven't placed any orders yet. Start shopping to see your orders here.
// // // //               </p>
// // // //               <Button asChild>
// // // //                 <Link href="/shop">Start Shopping</Link>
// // // //               </Button>
// // // //             </CardContent>
// // // //           </Card>
// // // //         ) : (
// // // //           <div className="space-y-6">
// // // //             {orders.map((order) => (
// // // //               <Card key={order.id}>
// // // //                 <CardHeader>
// // // //                   <div className="flex items-center justify-between">
// // // //                     <div>
// // // //                       <CardTitle className="flex items-center gap-2">
// // // //                         Order #{order.id}
// // // //                         <Badge className={getStatusColor(order.status)}>
// // // //                           {getStatusIcon(order.status)}
// // // //                           <span className="ml-1 capitalize">{order.status}</span>
// // // //                         </Badge>
// // // //                       </CardTitle>
// // // //                       <CardDescription>
// // // //                         Placed on {new Date(order.created_at).toLocaleDateString("en-US", {
// // // //                           year: "numeric",
// // // //                           month: "long",
// // // //                           day: "numeric",
// // // //                         })}
// // // //                       </CardDescription>
// // // //                     </div>
// // // //                     <div className="text-right">
// // // //                       <p className="text-lg font-medium">${order.total_amount.toFixed(2)}</p>
// // // //                       <p className="text-sm text-muted-foreground">
// // // //                         {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
// // // //                       </p>
// // // //                     </div>
// // // //                   </div>
// // // //                 </CardHeader>
// // // //                 <CardContent>
// // // //                   <div className="space-y-4">
// // // //                     {/* Order Items */}
// // // //                     <div className="space-y-3">
// // // //                       {order.items.map((item) => (
// // // //                         <div key={item.id} className="flex items-center gap-4">
// // // //                           <div className="relative h-16 w-16 overflow-hidden rounded-md bg-muted">
// // // //                             <Image
// // // //                               src={item.product_image}
// // // //                               alt={item.product_name}
// // // //                               fill
// // // //                               className="object-cover object-center"
// // // //                             />
// // // //                           </div>
// // // //                           <div className="flex-1">
// // // //                             <h4 className="font-medium">{item.product_name}</h4>
// // // //                             <div className="text-sm text-muted-foreground">
// // // //                               Qty: {item.quantity}
// // // //                               {item.size && ` • Size: ${item.size}`}
// // // //                               {item.color && ` • Color: ${item.color}`}
// // // //                             </div>
// // // //                           </div>
// // // //                           <div className="text-right">
// // // //                             <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
// // // //                             <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
// // // //                           </div>
// // // //                         </div>
// // // //                       ))}
// // // //                     </div>

// // // //                     <Separator />

// // // //                     {/* Shipping Address */}
// // // //                     <div className="flex justify-between items-start">
// // // //                       <div>
// // // //                         <h4 className="font-medium mb-1">Shipping Address</h4>
// // // //                         <div className="text-sm text-muted-foreground">
// // // //                           <p>{order.shipping_address.name}</p>
// // // //                           <p>{order.shipping_address.street}</p>
// // // //                           <p>
// // // //                             {order.shipping_address.city}, {order.shipping_address.state}{" "}
// // // //                             {order.shipping_address.postal_code}
// // // //                           </p>
// // // //                           <p>{order.shipping_address.country}</p>
// // // //                         </div>
// // // //                       </div>
// // // //                       <div className="flex gap-2">
// // // //                         <Button variant="outline" size="sm" asChild>
// // // //                           <Link href={`/profile/orders/${order.id}`}>
// // // //                             <Eye className="w-4 h-4 mr-2" />
// // // //                             View Details
// // // //                           </Link>
// // // //                         </Button>
// // // //                         {order.status === "delivered" && (
// // // //                           <Button variant="outline" size="sm">
// // // //                             Reorder
// // // //                           </Button>
// // // //                         )}
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                 </CardContent>
// // // //               </Card>
// // // //             ))}
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </main>
// // // //   );
// // // // }
// // // "use client";

// // // import { useState } from "react";
// // // import { Button } from "@/components/ui/button";

// // // interface GoogleAuthButtonProps {
// // //   mode: "login" | "register";
// // //   onSuccess: (token: string, user: any) => void;
// // //   onError: (error: string) => void;
// // //   disabled?: boolean;
// // // }

// // // export default function GoogleAuthButton({ 
// // //   mode, 
// // //   onSuccess, 
// // //   onError, 
// // //   disabled = false 
// // // }: GoogleAuthButtonProps) {
// // //   const [isLoading, setIsLoading] = useState(false);

// // //   const handleGoogleAuth = () => {
// // //     setIsLoading(true);
    
// // //     // Redirect to Google OAuth
// // //     const authUrl = `http://localhost:5000/api/auth/google`;
// // //     window.location.href = authUrl;
// // //   };

// // //   return (
// // //     <Button
// // //       type="button"
// // //       variant="outline"
// // //       className="w-full"
// // //       onClick={handleGoogleAuth}
// // //       disabled={disabled || isLoading}
// // //     >
// // //       <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
// // //         <path
// // //           fill="currentColor"
// // //           d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
// // //         />
// // //         <path
// // //           fill="currentColor"
// // //           d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
// // //         />
// // //         <path
// // //           fill="currentColor"
// // //           d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
// // //         />
// // //         <path
// // //           fill="currentColor"
// // //           d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
// // //         />
// // //       </svg>
// // //       {isLoading ? "Connecting..." : `Continue with Google`}
// // //     </Button>
// // //   );
// // // }

// // /* eslint-disable react/no-unescaped-entities */
// // "use client";

// // import Link from "next/link";
// // import { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { Mail, Lock } from "lucide-react";

// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Separator } from "@/components/ui/separator";
// // import GoogleAuthButton from "@/components/google-auth-button";
// // import styles from "./page.module.css";

// // export default function LoginPage() {
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [formData, setFormData] = useState({ email: '', password: '' });
// //   const router = useRouter();

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError('');

// //     try {
// //       const res = await fetch('http://localhost:5000/api/auth/login', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(formData),
// //       });

// //       const data = await res.json();

// //       if (!res.ok) {
// //         console.log('Login failed:', data.message || 'Login failed');
// //         throw new Error(data.message || 'Login failed');
// //       }

// //       localStorage.setItem('token', data.token);
// //       console.log('Login successful:', data);
// //       router.push('/');
// //     } catch (err: any) {
// //       console.log('Error during login:', 'Email or password is wrong');
// //       setError('Email or password is wrong');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleGoogleSuccess = (token: string, user: any) => {
// //     localStorage.setItem('token', token);
// //     router.push('/');
// //   };

// //   const handleGoogleError = (error: string) => {
// //     setError(error);
// //   };

// //   return (
// //     <main className="min-h-screen bg-background pt-24">
// //       <div className={`container ${styles.container}`}>
// //         <div className={styles.formWrapper}>
// //           <div className={styles.header}>
// //             <h1 className={styles.title}>Welcome Back</h1>
// //             <p className={styles.subtitle}>
// //               Sign in to your Vanguard account
// //             </p>
// //           </div>

// //           <form onSubmit={handleSubmit} className={styles.form}>
// //             <div className={styles.formFields}>
// //               <div className={styles.fieldGroup}>
// //                 <Label htmlFor="email">Email</Label>
// //                 <div className={styles.inputWrapper}>
// //                   <Mail className={styles.inputIcon} />
// //                   <Input
// //                     id="email"
// //                     type="email"
// //                     name="email"
// //                     placeholder="Enter your email"
// //                     value={formData.email}
// //                     onChange={handleChange}
// //                     className="pl-9"
// //                     required
// //                   />
// //                 </div>
// //               </div>
              
// //               <div className={styles.fieldGroup}>
// //                 <div className={styles.fieldHeader}>
// //                   <Label htmlFor="password">Password</Label>
// //                   <Link
// //                     href="/auth/forgot-password"
// //                     className={styles.forgotLink}
// //                   >
// //                     Forgot password?
// //                   </Link>
// //                 </div>
// //                 <div className={styles.inputWrapper}>
// //                   <Lock className={styles.inputIcon} />
// //                   <Input
// //                     id="password"
// //                     name="password"
// //                     type="password"
// //                     placeholder="Enter your password"
// //                     value={formData.password}
// //                     onChange={handleChange}
// //                     className="pl-9"
// //                     required
// //                   />
// //                 </div>
// //               </div>
// //             </div>

// //             <Button type="submit" className="w-full" disabled={loading}>
// //               {loading ? "Signing in..." : "Sign In"}
// //             </Button>
// //             {error && (
// //               <div className="text-red-500 text-sm text-center">{error}</div>
// //             )}
// //           </form>

// //           <div className={styles.socialSection}>
// //             <div className={styles.divider}>
// //               <div className={styles.dividerLine}>
// //                 <Separator />
// //               </div>
// //               <div className={styles.dividerText}>
// //                 <span className={styles.dividerTextSpan}>
// //                   Or continue with
// //                 </span>
// //               </div>
// //             </div>

// //             <GoogleAuthButton
// //               mode="login"
// //               onSuccess={handleGoogleSuccess}
// //               onError={handleGoogleError}
// //               disabled={loading}
// //             />
// //           </div>

// //           <p className={styles.footer}>
// //             Don&apos;t have an account?{" "}
// //             <Link href="/auth/register" className={styles.footerLink}>
// //               Sign up
// //             </Link>
// //           </p>
// //         </div>
// //       </div>
// //     </main>
// //   );
// // }

// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Mail, Lock, User } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import GoogleAuthButton from "@/components/google-auth-button";
// import styles from "./page.module.css";

// export default function RegisterPage() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setErrorMsg("");
//     setIsLoading(true);

//     try {
//       const res = await fetch('http://localhost:5000/api/auth/register', {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const rawText = await res.text();
//       let data;
//       try {
//         data = JSON.parse(rawText);
//       } catch {
//         throw new Error("Unexpected server response. Please try again.");
//       }

//       if (!res.ok) {
//         throw new Error(data?.message || "Registration failed");
//       }

//       console.log('Register successful:', data);
      
//       // Store token and redirect to home
//       localStorage.setItem('token', data.token);
//       router.push("/");
//     } catch (err: any) {
//       console.log('Error during register:', 'something went wrong');
//       setErrorMsg(err.message || "Something went wrong.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleSuccess = (token: string, user: any) => {
//     localStorage.setItem('token', token);
//     router.push('/');
//   };

//   const handleGoogleError = (error: string) => {
//     setErrorMsg(error);
//   };

//   return (
//     <main className="min-h-screen bg-background pt-24">
//       <div className={`container ${styles.container}`}>
//         <div className={styles.formWrapper}>
//           <div className={styles.header}>
//             <h1 className={styles.title}>Create Account</h1>
//             <p className={styles.subtitle}>
//               Join Vanguard to start shopping
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className={styles.form}>
//             <div className={styles.formFields}>
//               <div className={styles.fieldGroup}>
//                 <Label htmlFor="name">Full Name</Label>
//                 <div className={styles.inputWrapper}>
//                   <User className={styles.inputIcon} />
//                   <Input
//                     id="name"
//                     name="name"
//                     placeholder="Enter your name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="pl-9"
//                     required
//                     autoComplete="name"
//                   />
//                 </div>
//               </div>

//               <div className={styles.fieldGroup}>
//                 <Label htmlFor="email">Email</Label>
//                 <div className={styles.inputWrapper}>
//                   <Mail className={styles.inputIcon} />
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     placeholder="Enter your email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="pl-9"
//                     required
//                     autoComplete="email"
//                   />
//                 </div>
//               </div>
              
//               <div className={styles.fieldGroup}>
//                 <Label htmlFor="password">Password</Label>
//                 <div className={styles.inputWrapper}>
//                   <Lock className={styles.inputIcon} />
//                   <Input
//                     id="password"
//                     name="password"
//                     type="password"
//                     placeholder="Create a password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="pl-9"
//                     required
//                     minLength={6}
//                     autoComplete="new-password"
//                   />
//                 </div>
//               </div>
//             </div>

//             {errorMsg && (
//               <div className="text-red-500 text-sm text-center">{errorMsg}</div>
//             )}

//             <Button type="submit" className="w-full" disabled={isLoading}>
//               {isLoading ? "Creating account..." : "Create Account"}
//             </Button>
//           </form>

//           <div className={styles.socialSection}>
//             <div className={styles.divider}>
//               <div className={styles.dividerLine}>
//                 <Separator />
//               </div>
//               <div className={styles.dividerText}>
//                 <span className={styles.dividerTextSpan}>
//                   Or continue with
//                 </span>
//               </div>
//             </div>

//             <GoogleAuthButton
//               mode="register"
//               onSuccess={handleGoogleSuccess}
//               onError={handleGoogleError}
//               disabled={isLoading}
//             />
//           </div>

//           <p className={styles.footer}>
//             Already have an account?{" "}
//             <Link href="/auth/login" className={styles.footerLink}>
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      setStatus("error");
      setMessage("Authentication failed. Please try again.");
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
      return;
    }

    if (token) {
      // Store the token
      localStorage.setItem("token", token);
      setStatus("success");
      setMessage("Successfully authenticated! Redirecting...");
      
      // Redirect to home page
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      setStatus("error");
      setMessage("No authentication token received.");
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    }
  }, [searchParams, router]);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        {status === "loading" && (
          <>
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <h1 className="text-xl font-medium">Processing authentication...</h1>
            <p className="text-muted-foreground">Please wait while we complete your sign-in.</p>
          </>
        )}
        
        {status === "success" && (
          <>
            <CheckCircle className="h-12 w-12 mx-auto text-green-600" />
            <h1 className="text-xl font-medium text-green-600">Authentication Successful!</h1>
            <p className="text-muted-foreground">{message}</p>
          </>
        )}
        
        {status === "error" && (
          <>
            <XCircle className="h-12 w-12 mx-auto text-red-600" />
            <h1 className="text-xl font-medium text-red-600">Authentication Failed</h1>
            <p className="text-muted-foreground">{message}</p>
          </>
        )}
      </div>
    </main>
  );
}