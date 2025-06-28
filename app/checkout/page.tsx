"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CreditCard, Truck, Shield, Check } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/lib/cart-context";

interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { state, clearCart, getTotalItems, getTotalPrice } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
  });

  const [billingAddress, setBillingAddress] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Redirect if cart is empty
  useEffect(() => {
    if (state.items.length === 0 && !orderComplete) {
      router.push("/cart");
    }
  }, [state.items.length, orderComplete, router]);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      // Validate shipping address
      if (!shippingAddress.firstName) newErrors.firstName = "First name is required";
      if (!shippingAddress.lastName) newErrors.lastName = "Last name is required";
      if (!shippingAddress.email) newErrors.email = "Email is required";
      if (!shippingAddress.phone) newErrors.phone = "Phone is required";
      if (!shippingAddress.street) newErrors.street = "Street address is required";
      if (!shippingAddress.city) newErrors.city = "City is required";
      if (!shippingAddress.state) newErrors.state = "State is required";
      if (!shippingAddress.postalCode) newErrors.postalCode = "Postal code is required";
    }

    if (step === 2) {
      // Validate billing address if different from shipping
      if (!sameAsShipping) {
        if (!billingAddress.firstName) newErrors.billingFirstName = "First name is required";
        if (!billingAddress.lastName) newErrors.billingLastName = "Last name is required";
        if (!billingAddress.street) newErrors.billingStreet = "Street address is required";
        if (!billingAddress.city) newErrors.billingCity = "City is required";
        if (!billingAddress.state) newErrors.billingState = "State is required";
        if (!billingAddress.postalCode) newErrors.billingPostalCode = "Postal code is required";
      }

      // Validate payment info
      if (!paymentInfo.cardNumber) newErrors.cardNumber = "Card number is required";
      if (!paymentInfo.expiryDate) newErrors.expiryDate = "Expiry date is required";
      if (!paymentInfo.cvv) newErrors.cvv = "CVV is required";
      if (!paymentInfo.cardholderName) newErrors.cardholderName = "Cardholder name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handlePlaceOrder = async () => {
    if (!validateStep(2)) return;

    setIsProcessing(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/auth/login?redirect=/checkout");
        return;
      }

      const orderData = {
        items: state.items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
          size: item.size,
          color: item.color,
        })),
        shipping_address: {
          name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
          email: shippingAddress.email,
          phone: shippingAddress.phone,
          street: shippingAddress.street,
          city: shippingAddress.city,
          state: shippingAddress.state,
          postal_code: shippingAddress.postalCode,
          country: shippingAddress.country,
        },
        billing_address: sameAsShipping ? {
          name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
          email: shippingAddress.email,
          phone: shippingAddress.phone,
          street: shippingAddress.street,
          city: shippingAddress.city,
          state: shippingAddress.state,
          postal_code: shippingAddress.postalCode,
          country: shippingAddress.country,
        } : {
          name: `${billingAddress.firstName} ${billingAddress.lastName}`,
          email: billingAddress.email,
          phone: billingAddress.phone,
          street: billingAddress.street,
          city: billingAddress.city,
          state: billingAddress.state,
          postal_code: billingAddress.postalCode,
          country: billingAddress.country,
        },
        payment_info: paymentInfo,
        total_amount: total,
      };

      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const result = await response.json();
      setOrderId(result.order.id);
      setOrderComplete(true);
      clearCart();
    } catch (error) {
      console.error("Order creation failed:", error);
      setErrors({ general: "Failed to process order. Please try again." });
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderComplete) {
    return (
      <main className="min-h-screen bg-background pt-24">
        <div className="container py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="font-serif text-3xl font-light mb-2">Order Confirmed!</h1>
              <p className="text-muted-foreground">
                Thank you for your purchase. Your order has been successfully placed.
              </p>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Order Number:</span>
                    <span className="font-medium">#{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Delivery:</span>
                    <span className="font-medium">3-5 business days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 space-y-4">
              <Button asChild className="w-full">
                <Link href="/profile">View Order Details</Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (state.items.length === 0) {
    return null; // Will redirect in useEffect
  }

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="container py-8">
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="font-serif text-3xl font-light">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center space-x-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step <= currentStep
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step}
                    </div>
                    <span className="ml-2 text-sm">
                      {step === 1 && "Shipping"}
                      {step === 2 && "Payment"}
                      {step === 3 && "Review"}
                    </span>
                    {step < 3 && <div className="w-8 h-px bg-border ml-4" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="w-5 h-5 mr-2" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={shippingAddress.firstName}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, firstName: e.target.value })
                        }
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={shippingAddress.lastName}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, lastName: e.target.value })
                        }
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingAddress.email}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, email: e.target.value })
                        }
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={shippingAddress.phone}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, phone: e.target.value })
                        }
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      value={shippingAddress.street}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, street: e.target.value })
                      }
                      className={errors.street ? "border-red-500" : ""}
                    />
                    {errors.street && (
                      <p className="text-sm text-red-500 mt-1">{errors.street}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={shippingAddress.city}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, city: e.target.value })
                        }
                        className={errors.city ? "border-red-500" : ""}
                      />
                      {errors.city && (
                        <p className="text-sm text-red-500 mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={shippingAddress.state}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, state: e.target.value })
                        }
                        className={errors.state ? "border-red-500" : ""}
                      />
                      {errors.state && (
                        <p className="text-sm text-red-500 mt-1">{errors.state}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        value={shippingAddress.postalCode}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
                        }
                        className={errors.postalCode ? "border-red-500" : ""}
                      />
                      {errors.postalCode && (
                        <p className="text-sm text-red-500 mt-1">{errors.postalCode}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleNext}>Continue to Payment</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentInfo.cardNumber}
                        onChange={(e) =>
                          setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
                        }
                        className={errors.cardNumber ? "border-red-500" : ""}
                      />
                      {errors.cardNumber && (
                        <p className="text-sm text-red-500 mt-1">{errors.cardNumber}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        value={paymentInfo.cardholderName}
                        onChange={(e) =>
                          setPaymentInfo({ ...paymentInfo, cardholderName: e.target.value })
                        }
                        className={errors.cardholderName ? "border-red-500" : ""}
                      />
                      {errors.cardholderName && (
                        <p className="text-sm text-red-500 mt-1">{errors.cardholderName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={paymentInfo.expiryDate}
                          onChange={(e) =>
                            setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })
                          }
                          className={errors.expiryDate ? "border-red-500" : ""}
                        />
                        {errors.expiryDate && (
                          <p className="text-sm text-red-500 mt-1">{errors.expiryDate}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={paymentInfo.cvv}
                          onChange={(e) =>
                            setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
                          }
                          className={errors.cvv ? "border-red-500" : ""}
                        />
                        {errors.cvv && (
                          <p className="text-sm text-red-500 mt-1">{errors.cvv}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Billing Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="sameAsShipping"
                          checked={sameAsShipping}
                          onChange={(e) => setSameAsShipping(e.target.checked)}
                          className="rounded"
                        />
                        <Label htmlFor="sameAsShipping">Same as shipping address</Label>
                      </div>

                      {!sameAsShipping && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="billingFirstName">First Name</Label>
                              <Input
                                id="billingFirstName"
                                value={billingAddress.firstName}
                                onChange={(e) =>
                                  setBillingAddress({ ...billingAddress, firstName: e.target.value })
                                }
                                className={errors.billingFirstName ? "border-red-500" : ""}
                              />
                            </div>
                            <div>
                              <Label htmlFor="billingLastName">Last Name</Label>
                              <Input
                                id="billingLastName"
                                value={billingAddress.lastName}
                                onChange={(e) =>
                                  setBillingAddress({ ...billingAddress, lastName: e.target.value })
                                }
                                className={errors.billingLastName ? "border-red-500" : ""}
                              />
                            </div>
                          </div>
                          {/* Add more billing address fields as needed */}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button onClick={handleNext}>Review Order</Button>
                </div>
              </div>
            )}

            {/* Step 3: Review Order */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Review Your Order
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Order Items */}
                  <div>
                    <h3 className="font-medium mb-4">Order Items</h3>
                    <div className="space-y-4">
                      {state.items.map((item) => (
                        <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity}
                              {item.size && ` • Size: ${item.size}`}
                              {item.color && ` • Color: ${item.color}`}
                            </p>
                          </div>
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Shipping Address */}
                  <div>
                    <h3 className="font-medium mb-2">Shipping Address</h3>
                    <div className="text-sm text-muted-foreground">
                      <p>{shippingAddress.firstName} {shippingAddress.lastName}</p>
                      <p>{shippingAddress.street}</p>
                      <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}</p>
                      <p>{shippingAddress.country}</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Payment Method */}
                  <div>
                    <h3 className="font-medium mb-2">Payment Method</h3>
                    <p className="text-sm text-muted-foreground">
                      **** **** **** {paymentInfo.cardNumber.slice(-4)}
                    </p>
                  </div>

                  {errors.general && (
                    <div className="text-sm text-red-500">{errors.general}</div>
                  )}

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handleBack}>
                      Back
                    </Button>
                    <Button onClick={handlePlaceOrder} disabled={isProcessing}>
                      {isProcessing ? "Processing..." : `Place Order - $${total.toFixed(2)}`}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {shipping === 0 && (
                  <div className="text-sm text-green-600 flex items-center">
                    <Truck className="w-4 h-4 mr-2" />
                    Free shipping on orders over $100
                  </div>
                )}

                <div className="text-xs text-muted-foreground">
                  <p className="flex items-center mb-1">
                    <Shield className="w-3 h-3 mr-1" />
                    Secure checkout with SSL encryption
                  </p>
                  <p>30-day return policy</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}