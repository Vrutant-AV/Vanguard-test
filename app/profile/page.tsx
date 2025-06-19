"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Package, Heart, Settings, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Logout failed:", errorData.message || "Unknown error");
        return;
      }

      console.log("Logout successful");
      localStorage.removeItem("token");
      router.push("/auth/login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className={`container ${styles.container}`}>
        <div className={styles.mainGrid}>
          {/* Sidebar*/}
          <div className = {styles.sidebar}>
            <div className={styles.profileHeader}>
              <div className={styles.profileImage}>
                <Image
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                  alt="Profile picture"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className={styles.profileName}>Sarah Johnson</h2>
                <p className={styles.profileEmail}>sarah@gmail.com</p>
              </div>
            </div>

            <Separator />

            <nav className={styles.navigation}>
              <div className={styles.navList}>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/profile/orders">
                    <Package className="mr-2 h-4 w-4" />
                    Orders
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/wishlist">
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/profile/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className={styles.content}>
            <Tabs defaultValue="profile">
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="payment">Payment Methods</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6">
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>
                      Personal Information
                    </h3>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing (!isEditing)}
                    >
                      {isEditing ? "Cancel" : "Edit"}
                    </Button>
                  </div>

                  <form className={styles.form}>
                    <div className={styles.formRow}>
                      <div className={styles.fieldGroup}>
                        <Label htmlFor="firstNmae">First Name</Label>
                        <Input 
                          id="firstName"
                          defaultValue="Sarah"
                          disabled={!isEditing} />
                      </div>
                      <div className={styles.fieldGroup}>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          defaultValue="Johnson"
                          disabled={!isEditing} 
                        />
                      </div>
                    </div>

                    <div className={styles.fieldGroup}>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="sarah@example.com"
                        disabled={!isEditing}
                      />
                    </div>

                    <div className={styles.fieldGroup}>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        disabled={!isEditing}
                      />
                    </div>

                    {isEditing && (
                      <div className={styles.submitSection}>
                        <Button>Save Changes</Button>
                      </div>
                    )}
                  </form>

                </div>
              </TabsContent>

              <TabsContent value="addresses" className="mt-6">
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Saved Addresses</h3>
                    <Button>Add New Address</Button>
                  </div>

                  <div className="space-y-4">
                    <div className={styles.addressCard}>
                      <div className={styles.addressHeader}>
                        <div>
                          <p className={styles.addressName}>Home</p>
                          <p className={styles.addressDetails}>
                            123 Main Street, Apt 4B<br />
                            New York, NY 10001<br />
                            United States
                          </p>
                        </div>
                        <div className={styles.addressActions}>
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Delete</Button>
                        </div>
                      </div>
                    </div>

                    <div className={styles.addressCard}>
                      <div className={styles.addressHeader}>
                        <div>
                          <p className={styles.addressName}>Office</p>
                          <p className={styles.addressDetails}>
                            456 Business Ave, Suite 200<br />
                            New York, NY 10002<br />
                            United States
                          </p>
                        </div>
                        <div className={styles.addressActions}>
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Delete</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="payment" className="mt-6">
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Payment Methods</h3>
                    <Button>Add New Card</Button>
                  </div>

                  <div className="space-y-4">
                    <div className={styles.paymentCard}>
                      <div className={styles.paymentHeader}>
                        <div className={styles.paymentInfo}>
                          <div className={styles.cardIcon} />
                          <div>
                            <p className={styles.cardNumber}>•••• •••• •••• 4242</p>
                            <p className={styles.cardExpiry}>
                              Expires 12/25
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Remove</Button>
                      </div>
                    </div>

                    <div className={styles.paymentCard}>
                      <div className={styles.paymentHeader}>
                        <div className={styles.paymentInfo}>
                          <div className={styles.cardIcon} />
                          <div>
                            <p className={styles.cardNumber}>•••• •••• •••• 8888</p>
                            <p className={styles.cardExpiry}>
                              Expires 08/24
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Remove</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

            </Tabs>
          </div>

        </div>
      </div>
    </main>
  )
}

