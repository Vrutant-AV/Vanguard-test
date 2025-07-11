"use client";
<<<<<<< HEAD
import { useState } from "react";
import Image from "next/image";
import { Search, Filter, Download, Eye, MoreHorizontal, Mail, Phone, MapPin } from "lucide-react";
=======

import { useState } from "react";
import Image from "next/image";
import { Search, Filter, Download, Eye, MoreHorizontal, Mail, Phone, MapPin } from "lucide-react";

>>>>>>> 1c420b6c49c974881a23ac0add3a1419be2bcbf9
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
<<<<<<< HEAD
=======

>>>>>>> 1c420b6c49c974881a23ac0add3a1419be2bcbf9
// Sample customers data
const customers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@gmail.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    orders: 5,
    totalSpent: 1245.50,
    lastOrder: "2025-01-15",
    status: "active",
    location: "New York, NY",
    joinDate: "2024-03-15"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael@gmail.com",
    phone: "+1 (555) 234-5678",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    orders: 3,
    totalSpent: 890.25,
    lastOrder: "2025-01-14",
    status: "active",
    location: "Los Angeles, CA",
    joinDate: "2024-05-22"
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma@gmail.com",
    phone: "+1 (555) 345-6789",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    orders: 7,
    totalSpent: 2156.75,
    lastOrder: "2025-01-13",
    status: "vip",
    location: "Chicago, IL",
    joinDate: "2024-01-10"
  },
  {
    id: 4,
    name: "David Rodriguez",
    email: "david@gmail.com",
    phone: "+1 (555) 456-7890",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    orders: 2,
    totalSpent: 345.00,
    lastOrder: "2025-01-10",
    status: "active",
    location: "Miami, FL",
    joinDate: "2024-08-05"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    email: "lisa@gmail.com",
    phone: "+1 (555) 567-8901",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    orders: 1,
    totalSpent: 189.00,
    lastOrder: "2024-12-20",
    status: "inactive",
    location: "Seattle, WA",
    joinDate: "2024-11-12"
  },
];
<<<<<<< HEAD
=======

>>>>>>> 1c420b6c49c974881a23ac0add3a1419be2bcbf9
const getStatusColor = (status: string) => {
  switch (status) {
    case "vip":
      return "bg-purple-100 text-purple-800";
    case "active":
      return "bg-green-100 text-green-800";
    case "inactive":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function CustomersPage() {
<<<<<<< HEAD
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const filteredCustomers = customers.filter(customer => {
        const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              customer.phone.includes(searchTerm);
      
        const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
      
        return matchesSearch && matchesStatus;
    });
    
    const customerStats = {
        total: customers.length,
        active: customers.filter(c => c.status === "active").length,
        vip: customers.filter(c => c.status === "vip").length,
        inactive: customers.filter(c => c.status === "inactive").length,
        totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    };
    return(
        <div className="p-6">
            <div className="mb-6">
                <h1 className="font-serif text-3xl font-light mb-2">Customers</h1>
                <p className="text-muted-foreground">
                    Manage customer relationships and track their activity
                </p>
            </div>

            {/* stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm">
                            Total Customers
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">
                            {customerStats.total}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {customerStats.active}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            VIP
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">
                            {customerStats.vip}
                        </div>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            Inactive
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold text-gray-600">
                            {customerStats.inactive}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Revenue
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${customerStats.totalRevenue.toFixed(0)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search customers..."
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
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="vip">VIP</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                </Button>
            </div>

            {/* Customers List */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        Customer ({filteredCustomers.length})
                    </CardTitle>
                    <CardDescription>
                        Manage customer informatin and track their activity
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {filteredCustomers.map((customer) => (
                            <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={customer.avatar} alt={customer.name} />
                                        <AvatarFallback>
                                            {customer.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <h3 className="font-medium">{customer.name}</h3>
                                            <Badge className={getStatusColor(customer.status)}>
                                                {customer.status.toUpperCase()}
                                            </Badge>
                                        </div>

                                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                            <div className="flex items-center">
                                                <Mail className="mr-1 h-3 w-3" />
                                                {customer.email}
                                            </div>

                                            <div className="flex items-center">
                                                <Phone className="mr-1 h-3 w-3" />
                                                {customer.phone}
                                            </div>

                                            <div className="flex items-center">
                                                <MapPin className="mr-1 h-3 w-3" />
                                                {customer.location}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-6">
                                    <div className="text-right">
                                        <div className="font-medium">
                                            ${customer.totalSpent.toFixed(2)}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {customer.orders} orders
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="text-sm font-medium">
                                            Last Order
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {customer.lastOrder}
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
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Profile
                                            </DropdownMenuItem>
                                            
                                            <DropdownMenuItem>
                                                <Mail className="mr-2 h-4 w-4" />
                                                Send Email
                                            </DropdownMenuItem>
                                            
                                            <DropdownMenuItem>
                                                View Orders
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
=======
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const customerStats = {
    total: customers.length,
    active: customers.filter(c => c.status === "active").length,
    vip: customers.filter(c => c.status === "vip").length,
    inactive: customers.filter(c => c.status === "inactive").length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-light mb-2">Customers</h1>
        <p className="text-muted-foreground">
          Manage customer relationships and track their activity
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerStats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{customerStats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">VIP</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{customerStats.vip}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inactive</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{customerStats.inactive}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${customerStats.totalRevenue.toFixed(0)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="vip">VIP</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          More Filters
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Customers List */}
      <Card>
        <CardHeader>
          <CardTitle>Customers ({filteredCustomers.length})</CardTitle>
          <CardDescription>
            Manage customer information and track their activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={customer.avatar} alt={customer.name} />
                    <AvatarFallback>
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{customer.name}</h3>
                      <Badge className={getStatusColor(customer.status)}>
                        {customer.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Mail className="mr-1 h-3 w-3" />
                        {customer.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="mr-1 h-3 w-3" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3" />
                        {customer.location}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="font-medium">${customer.totalSpent.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">{customer.orders} orders</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">Last Order</div>
                    <div className="text-sm text-muted-foreground">{customer.lastOrder}</div>
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
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        View Orders
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
>>>>>>> 1c420b6c49c974881a23ac0add3a1419be2bcbf9
}