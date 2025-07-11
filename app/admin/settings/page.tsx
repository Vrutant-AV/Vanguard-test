"use client";
<<<<<<< HEAD
import { useState } from "react";
import { Save, Upload, Globe, Mail, Shield, CreditCard, Truck, Bell } from "lucide-react";
=======

import { useState } from "react";
import { Save, Upload, Globe, Mail, Shield, CreditCard, Truck, Bell } from "lucide-react";

>>>>>>> 1c420b6c49c974881a23ac0add3a1419be2bcbf9
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
<<<<<<< HEAD
export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const handleSave = async () => {
        setIsLoading(true);
        // Simulate save operation
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="font-serif text-3xl font-light mb-2">Settings</h1>
                    <p className="text-muted-foreground">
                        Configure your store settings and preferences
                    </p>
                </div>

                <Button onClick={handleSave} disabled={isLoading}>
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? "Saving..." : "Save Changes"}
                </Button>
            </div>
            <Tabs defaultValue="general" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="store">Store</TabsTrigger>
                    <TabsTrigger value="payments">Payments</TabsTrigger>
                    <TabsTrigger value="shipping">Shipping</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Globe className="mr-2 h-5 w-5" />
                                    General Settings
                                </CardTitle>
                                <CardDescription>
                                    Basic configuration for your store
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="storeName">Store Name</Label>
                                        <Input id="storeName" defaultValue="Vanguard Apparel" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="storeUrl">Store Url</Label>
                                        <Input id="storeUrl" defaultValue="vanguardapparel.com" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="storeDescription">
                                        Store Description
                                    </Label>
                                    <Textarea
                                        id="storeDescription"
                                        defaultValue="Redefining contemporary fashion with timeless elegance and bold innovation."
                                        rows={3}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="timezone">Timezone</Label>
                                        <Select defaultValue="america/new_york">
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="america/new_york">
                                                    Eastern Time(ET)
                                                </SelectItem>

                                                <SelectItem value="america/chicago">
                                                    Central Time(CT)
                                                </SelectItem>

                                                <SelectItem value="america/denver">
                                                    Mountain Time(MT)
                                                </SelectItem>

                                                <SelectItem value="america/los_angeles">
                                                    Pacific Time(PT)
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="currency">Currency</Label>
                                        <Select defaultValue="usd">
                                            <SelectTrigger>
                                                <SelectValue/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="usd">
                                                    US Dollar (USD)
                                                </SelectItem>
                                                
                                                <SelectItem value="eur">
                                                    Euro (EUR)
                                                </SelectItem>
                                                
                                                <SelectItem value="gbp">
                                                    British Pound (GBP)
                                                </SelectItem>
                                                
                                                <SelectItem value="jpy">
                                                    Japanese Yen (JPY)
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Logo & Branding</CardTitle>
                                <CardDescription>
                                    Upload your store logo and customize branding
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Store Logo</Label>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                                            <span className="text-xs text-muted-foreground">
                                                Logo
                                            </span>
                                        </div>
                                        <Button variant="outline">
                                            <Upload className="mr-2 h-4 w-4" />
                                            Upload Logo
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="primaryColor">Primary Color</Label>
                                        <Input id="primaryColor" type="color"defaultValue="#000000" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="secondaryColor">Secondary Color</Label>
                                        <Input id="secondaryColor" type="color" defaultValue="#6b7280"/>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="store">
                    <Card>
                        <CardHeader>
                            <CardTitle>Store Information</CardTitle>
                            <CardDescription>
                                Contact information and business details
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="contactEmail">Contact Email</Label>
                                    <Input id="contactEmail" type="email" defaultValue="info@vanguardapparel.com" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="supportEmail">Support Email</Label>
                                    <Input id="supportEmail" type="email" defaultValue="support@vanguardapparel.com" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" defaultValue="+1 (212) 555-0123" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Business Address</Label>
                                <Textarea
                                    id="address"
                                    defaultValue="123 Fashion Avenue, SoHo, New York, NY 10012, United States"
                                    rows={3}
                                /> 
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">
                                    Store Hours
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Monday - Friday</Label>
                                        <Input defaultValue="10:00 AM - 7:00 PM" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Saturday</Label>
                                        <Input defaultValue="11:00 AM - 8:00 PM" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Sunday</Label>
                                        <Input defaultValue="12:00 PM - 6:00 PM" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="payments">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <CreditCard className="mr-2 h-5 w-5" />
                                Payment Settings
                            </CardTitle>
                            <CardDescription>
                                Configure payment methods and processing
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Credit Cards</h4>
                                        <p className="text-sm text-muted-foreground">Accept Visa, Mastercard, American Express</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">PayPal</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Accept Paypal
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Apple Pay</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Accept Apple Pay payments
                                        </p>
                                    </div>
                                    <Switch />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Google Pay</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Accept Google Pay payments
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h4 className="font-medium">Payment Processing</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="taxRate">Tax Rate(%)</Label>
                                        <Input id="taxRate" type="number" defaultValue="8.25" step="0.01" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="processingFee">Processing Fee (%)</Label>
                                        <Input id="processingFee" type="number" defaultValue="2.9" step="0.1"/>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="shipping">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Truck className="mr-2 h-5 w-5" />
                                Shipping Settings
                            </CardTitle>
                            <CardDescription>
                                Configure shipping options and rates
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">
                                            Free Shipping
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            Offer free shipping on orders over threshold
                                        </p>
                                        <Switch defaultChecked />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="freeShippingThreshold">
                                                Free Shipping Threshold
                                            </Label>
                                            <Input id="freeShippingThreshold" type="number" defaultValue="100" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="standardShippingRate">
                                                Standard Shipping Rate
                                            </Label>
                                            <Input id="standardShippingRate" type="number" defaultValue="15" />
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h4 className="font-medium">Shipping Zones</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                                <span className="font-medium">
                                                    Domestic(United States)
                                                </span>
                                                <p className="text-sm text-muted-foreground">
                                                    Standard: $15, Express: $25
                                                </p>
                                            </div>
                                            <Button variant="outline" size="sm">Edit</Button>
                                        </div>
                                        <div className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                                <span className="font-medium">
                                                    International
                                                </span>

                                                <p className="text-sm text-muted-foreground">
                                                    Standard: $35, Express: $65
                                                </p>
                                            </div>
                                            <Button variant="outline" size="sm">Edit</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Bell className="mr-2 h-5 w-5" />
                                Notification Settings
                            </CardTitle>
                            <CardDescription>
                                Configure email notifications and alerts
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h4 className="font-medium">
                                    Order Notifications
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="font-medium">
                                                New Order
                                            </span>
                                            <p className="text-sm text-muted-foreground">
                                                Notify when new orders are placed
                                            </p>
                                        </div>
                                        <Switch defaultChecked/>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="font-medium">
                                                Order Shipped
                                            </span>
                                            <p className="text-sm text-muted-foreground">
                                                Notify when orders are shipped
                                            </p>
                                        </div>
                                        <Switch defaultChecked/>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="font-medium">
                                                Order Delivered
                                            </span>
                                            <p className="text-sm text-muted-foreground">
                                                Notify when orders are delivered
                                            </p>
                                        </div>
                                        <Switch defaultChecked/>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h4 className="font-medium">Inventory Notification</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="font-medium">
                                                Low Stock Alert
                                            </span>
                                            <p className="text-sm text-muted-foreground">
                                                Notify when products are low in stock
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="font-medium">
                                                Out of Stock Alert
                                            </span>
                                            <p className="text-sm text-muted-foreground">
                                                Notify when products are out of stock
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="lowStockThreshold">
                                        Low Stock Threshold
                                    </Label>
                                    <Input id="lowStockThreshold" type="number" defaultValue="10" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Shield className="mr-2 h-5 w-5" />
                                Security Settings
                            </CardTitle>
                            <CardDescription>
                                Manage security and access controls
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h4 className="font-medium">
                                    Authentication
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="font-medium">
                                                Two-Factor Authentication
                                            </span>
                                            <p className="text-sm text-muted-foreground">
                                                Require 2FA for admin access
                                            </p>
                                            <Switch />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="font-medium">
                                                    Session Timeout
                                                </span>
                                                <p className="text-sm text-muted-foreground">
                                                    Auto-logout after inactivity
                                                </p>
                                            </div>
                                            <Switch defaultChecked/>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="sessionTimeout">
                                            Session Timeout (minutes)
                                        </Label>
                                        <Input id="sessionTimeout" type="number" defaultValue="30" />
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h4 className="font-medium">
                                        Data Protection
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="font-medium">
                                                    Data Encryption
                                                </span>
                                                <p className="text-sm text-muted-foreground">
                                                    Encrypt sensitive customer data
                                                </p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="font-medium">
                                                    Audit Logging
                                                </span>
                                                <p className="text-sm text-muted-foreground">
                                                    Log all admin actions
                                                </p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
=======

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="font-serif text-3xl font-light mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Configure your store settings and preferences
          </p>
        </div>
        <Button onClick={handleSave} disabled={isLoading}>
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>
                  Basic configuration for your store
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input id="storeName" defaultValue="Vanguard Apparel" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeUrl">Store URL</Label>
                    <Input id="storeUrl" defaultValue="vanguardapparel.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="storeDescription">Store Description</Label>
                  <Textarea
                    id="storeDescription"
                    defaultValue="Redefining contemporary fashion with timeless elegance and bold innovation."
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="america/new_york">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="america/new_york">Eastern Time (ET)</SelectItem>
                        <SelectItem value="america/chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="america/denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="america/los_angeles">Pacific Time (PT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD - US Dollar</SelectItem>
                        <SelectItem value="eur">EUR - Euro</SelectItem>
                        <SelectItem value="gbp">GBP - British Pound</SelectItem>
                        <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Logo & Branding</CardTitle>
                <CardDescription>
                  Upload your store logo and customize branding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Store Logo</Label>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Logo</span>
                    </div>
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Logo
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <Input id="primaryColor" type="color" defaultValue="#000000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <Input id="secondaryColor" type="color" defaultValue="#6b7280" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="store">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>
                Contact information and business details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input id="contactEmail" type="email" defaultValue="info@vanguardapparel.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input id="supportEmail" type="email" defaultValue="support@vanguardapparel.com" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (212) 555-0123" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fax">Fax Number</Label>
                  <Input id="fax" defaultValue="+1 (212) 555-0124" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Textarea
                  id="address"
                  defaultValue="123 Fashion Avenue, SoHo, New York, NY 10012, United States"
                  rows={3}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Store Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Monday - Friday</Label>
                    <Input defaultValue="10:00 AM - 7:00 PM" />
                  </div>
                  <div className="space-y-2">
                    <Label>Saturday</Label>
                    <Input defaultValue="11:00 AM - 8:00 PM" />
                  </div>
                  <div className="space-y-2">
                    <Label>Sunday</Label>
                    <Input defaultValue="12:00 PM - 6:00 PM" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Payment Settings
              </CardTitle>
              <CardDescription>
                Configure payment methods and processing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Credit Cards</h4>
                    <p className="text-sm text-muted-foreground">Accept Visa, Mastercard, American Express</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">PayPal</h4>
                    <p className="text-sm text-muted-foreground">Accept PayPal payments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Apple Pay</h4>
                    <p className="text-sm text-muted-foreground">Accept Apple Pay payments</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Google Pay</h4>
                    <p className="text-sm text-muted-foreground">Accept Google Pay payments</p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">Payment Processing</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input id="taxRate" type="number" defaultValue="8.25" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="processingFee">Processing Fee (%)</Label>
                    <Input id="processingFee" type="number" defaultValue="2.9" step="0.1" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="mr-2 h-5 w-5" />
                Shipping Settings
              </CardTitle>
              <CardDescription>
                Configure shipping options and rates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Free Shipping</h4>
                    <p className="text-sm text-muted-foreground">Offer free shipping on orders over threshold</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="freeShippingThreshold">Free Shipping Threshold</Label>
                    <Input id="freeShippingThreshold" type="number" defaultValue="100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="standardShippingRate">Standard Shipping Rate</Label>
                    <Input id="standardShippingRate" type="number" defaultValue="15" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">Shipping Zones</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <span className="font-medium">Domestic (United States)</span>
                      <p className="text-sm text-muted-foreground">Standard: $15, Express: $25</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <span className="font-medium">International</span>
                      <p className="text-sm text-muted-foreground">Standard: $35, Express: $65</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure email notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Order Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">New Order</span>
                      <p className="text-sm text-muted-foreground">Notify when new orders are placed</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Order Shipped</span>
                      <p className="text-sm text-muted-foreground">Notify when orders are shipped</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Order Delivered</span>
                      <p className="text-sm text-muted-foreground">Notify when orders are delivered</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">Inventory Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Low Stock Alert</span>
                      <p className="text-sm text-muted-foreground">Notify when products are low in stock</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Out of Stock Alert</span>
                      <p className="text-sm text-muted-foreground">Notify when products are out of stock</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                  <Input id="lowStockThreshold" type="number" defaultValue="10" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage security and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Authentication</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Two-Factor Authentication</span>
                      <p className="text-sm text-muted-foreground">Require 2FA for admin access</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Session Timeout</span>
                      <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input id="sessionTimeout" type="number" defaultValue="30" />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">Data Protection</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Data Encryption</span>
                      <p className="text-sm text-muted-foreground">Encrypt sensitive customer data</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Audit Logging</span>
                      <p className="text-sm text-muted-foreground">Log all admin actions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
>>>>>>> 1c420b6c49c974881a23ac0add3a1419be2bcbf9
}