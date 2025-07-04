
//shipping
"use client";
import { useState } from "react";
import { Search, Plus, Edit, Trash2, MoreHorizontal, Truck, Package } from "lucide-react";
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
// Sample shipping data
const shippingMethods = [
  {
    id: 1,
    name: "Standard Shipping",
    description: "5-7 business days",
    price: 15.00,
    freeThreshold: 100.00,
    status: "active",
    zones: ["Domestic"]
  },
  {
    id: 2,
    name: "Express Shipping",
    description: "2-3 business days",
    price: 25.00,
    freeThreshold: 200.00,
    status: "active",
    zones: ["Domestic"]
  },
  {
    id: 3,
    name: "Overnight Shipping",
    description: "Next business day",
    price: 45.00,
    freeThreshold: null,
    status: "active",
    zones: ["Domestic"]
  },
  {
    id: 4,
    name: "International Standard",
    description: "10-15 business days",
    price: 35.00,
    freeThreshold: 250.00,
    status: "active",
    zones: ["International"]
  },
  {
    id: 5,
    name: "International Express",
    description: "5-7 business days",
    price: 65.00,
    freeThreshold: null,
    status: "active",
    zones: ["International"]
  },
];
const shippingZones = [
  {
    id: 1,
    name: "Domestic",
    description: "United States",
    countries: ["United States"],
    status: "active"
  },
  {
    id: 2,
    name: "International",
    description: "All other countries",
    countries: ["Canada", "United Kingdom", "Australia", "Germany", "France"],
    status: "active"
  },
];
const recentShipments = [
  {
    id: "SHIP-001",
    orderId: "ORD-001",
    customer: "Sarah Johnson",
    method: "Standard Shipping",
    status: "delivered",
    trackingNumber: "1Z999AA1234567890",
    date: "2025-01-15"
  },
  {
    id: "SHIP-002",
    orderId: "ORD-002",
    customer: "Michael Chen",
    method: "Express Shipping",
    status: "in_transit",
    trackingNumber: "1Z999AA1234567891",
    date: "2025-01-14"
  },
  {
    id: "SHIP-003",
    orderId: "ORD-003",
    customer: "Emma Wilson",
    method: "Standard Shipping",
    status: "shipped",
    trackingNumber: "1Z999AA1234567892",
    date: "2025-01-13"
  },
];
const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "inactive":
      return "bg-gray-100 text-gray-800";
    case "delivered":
      return "bg-green-100 text-green-800";
    case "in_transit":
      return "bg-blue-100 text-blue-800";
    case "shipped":
      return "bg-purple-100 text-purple-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
export default function ShippingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredMethods = shippingMethods.filter(method =>
    method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    method.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="font-serif text-3xl font-light mb-2">Shipping</h1>
          <p className="text-muted-foreground">
            Manage shipping methods, zones, and track shipments
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Shipping Method
        </Button>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Shipping Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shippingMethods.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Shipping Zones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shippingZones.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recent Shipments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentShipments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {recentShipments.filter(s => s.status === "in_transit").length}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Shipping Tabs */}
      <Tabs defaultValue="methods" className="space-y-4">
        <TabsList>
          <TabsTrigger value="methods">Shipping Methods</TabsTrigger>
          <TabsTrigger value="zones">Shipping Zones</TabsTrigger>
          <TabsTrigger value="shipments">Recent Shipments</TabsTrigger>
        </TabsList>
        <TabsContent value="methods">
          {/* Search */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search shipping methods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Shipping Methods ({filteredMethods.length})</CardTitle>
              <CardDescription>
                Configure shipping options and pricing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-lg">
                        <Truck className="h-6 w-6 text-muted-foreground" />
                      </div>
                   
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{method.name}</h3>
                          <Badge className={getStatusColor(method.status)}>
                            {method.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                        <p className="text-xs text-muted-foreground">
                          Zones: {method.zones.join(", ")}
                        </p>
                      </div>
                    </div>
                 
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-medium">${method.price.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">
                          {method.freeThreshold ? `Free over $${method.freeThreshold}` : "No free shipping"}
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
                            Edit Method
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Configure Zones
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Method
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="zones">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Zones ({shippingZones.length})</CardTitle>
              <CardDescription>
                Define geographical areas for shipping
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shippingZones.map((zone) => (
                  <div key={zone.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-lg">
                        <Package className="h-6 w-6 text-muted-foreground" />
                      </div>
                   
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{zone.name}</h3>
                          <Badge className={getStatusColor(zone.status)}>
                            {zone.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{zone.description}</p>
                        <p className="text-xs text-muted-foreground">
                          Countries: {zone.countries.slice(0, 3).join(", ")}
                          {zone.countries.length > 3 && ` +${zone.countries.length - 3} more`}
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
                          Edit Zone
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Manage Countries
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Zone
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="shipments">
          <Card>
            <CardHeader>
              <CardTitle>Recent Shipments ({recentShipments.length})</CardTitle>
              <CardDescription>
                Track and manage recent shipments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentShipments.map((shipment) => (
                  <div key={shipment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-lg">
                        <Package className="h-6 w-6 text-muted-foreground" />
                      </div>
                   
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{shipment.id}</h3>
                          <Badge className={getStatusColor(shipment.status)}>
                            {shipment.status.replace("_", " ")}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Order: {shipment.orderId} • Customer: {shipment.customer}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Tracking: {shipment.trackingNumber}
                        </p>
                      </div>
                    </div>
                 
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-medium">{shipment.method}</div>
                        <div className="text-sm text-muted-foreground">{shipment.date}</div>
                      </div>
                   
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            Track Shipment
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Update Status
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Print Label
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
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
