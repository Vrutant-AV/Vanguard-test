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

export default function ProfilePage() { 
    const [isEditing, setIsEditing] = useState(false);
    
    return (
    <main className="min-h-screen bg-background pt-24">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-4 lg:gap-12">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  <Image
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                    alt="Profile picture"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className={styles.profileName}>Sarah Johnson</h2>
                  <p className={styles.profileEmail}>sarah@example.com</p>
                </div>
              </div>
              
              <Separator className={styles.navDivider} />
              
              <nav className={styles.nav}>
                <Button
                  variant="ghost"
                  className={styles.navButton}
                  asChild
                >
                  <Link href="/profile/orders">
                    <Package className={styles.navIcon} />
                    Orders
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className={styles.navButton}
                  asChild
                >
                  <Link href="/profile/wishlist">
                    <Heart className={styles.navIcon} />
                    Wishlist
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className={styles.navButton}
                  asChild
                >
                  <Link href="/profile/settings">
                    <Settings className={styles.navIcon} />
                    Settings
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className={`${styles.navButton} ${styles.navButtonRed}`}
                >
                  <LogOut className={styles.navIcon} />
                  Sign Out
                </Button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <Tabs defaultValue="profile" className={styles.tabs}>
              <TabsList className={styles.tabsList}>
                <TabsTrigger value="profile" className={styles.tabTrigger}>
                  Profile
                </TabsTrigger>
                <TabsTrigger value="addresses" className={styles.tabTrigger}>
                  Addresses
                </TabsTrigger>
                <TabsTrigger value="payment" className={styles.tabTrigger}>
                  Payment Methods
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className={styles.tabsContent}>
                <div className={styles.card}>
                  <div className={styles.formHeader}>
                    <h3 className={styles.formTitle}>Personal Information</h3>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(!isEditing)}
                      className={styles.editButton}
                    >
                      {isEditing ? "Cancel" : "Edit"}
                    </Button>
                  </div>

                  <form className={styles.form}>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <Label htmlFor="firstName" className={styles.formLabel}>
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          defaultValue="Sarah"
                          disabled={!isEditing}
                          className={styles.input}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <Label htmlFor="lastName" className={styles.formLabel}>
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          defaultValue="Johnson"
                          disabled={!isEditing}
                          className={styles.input}
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <Label htmlFor="email" className={styles.formLabel}>
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="sarah@example.com"
                        disabled={!isEditing}
                        className={styles.input}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <Label htmlFor="phone" className={styles.formLabel}>
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        disabled={!isEditing}
                        className={styles.input}
                      />
                    </div>

                    {isEditing && (
                      <div className={styles.formActions}>
                        <Button className={styles.saveButton}>Save Changes</Button>
                      </div>
                    )}
                  </form>
                </div>
              </TabsContent>

              <TabsContent value="addresses" className={styles.tabsContent}>
                <div className={styles.card}>
                  <div className={styles.formHeader}>
                    <h3 className={styles.formTitle}>Saved Addresses</h3>
                    <Button className={styles.addButton}>Add New Address</Button>
                  </div>

                  <div className={styles.addresses}>
                    <div className={styles.addressCard}>
                      <div className={styles.addressHeader}>
                        <div>
                          <p className={styles.addressTitle}>Home</p>
                          <p className={styles.addressDetails}>
                            123 Main Street, Apt 4B<br />
                            New York, NY 10001<br />
                            United States
                          </p>
                        </div>
                        <div className={styles.addressActions}>
                          <Button variant="outline" size="sm" className={styles.addressButton}>
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className={styles.addressButton}>
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className={styles.addressCard}>
                      <div className={styles.addressHeader}>
                        <div>
                          <p className={styles.addressTitle}>Office</p>
                          <p className={styles.addressDetails}>
                            456 Business Ave, Suite 200<br />
                            New York, NY 10002<br />
                            United States
                          </p>
                        </div>
                        <div className={styles.addressActions}>
                          <Button variant="outline" size="sm" className={styles.addressButton}>
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className={styles.addressButton}>
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="payment" className={styles.tabsContent}>
                <div className={styles.card}>
                  <div className={styles.formHeader}>
                    <h3 className={styles.formTitle}>Payment Methods</h3>
                    <Button className={styles.addButton}>Add New Card</Button>
                  </div>

                  <div className={styles.paymentMethods}>
                    <div className={styles.paymentCard}>
                      <div className={styles.paymentHeader}>
                        <div className={styles.paymentInfo}>
                          <div className={styles.paymentMethod} />
                          <div>
                            <p className={styles.cardNumber}>•••• •••• •••• 4242</p>
                            <p className={styles.expiryDate}>Expires 12/25</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className={styles.removeButton}>
                          Remove
                        </Button>
                      </div>
                    </div>

                    <div className={styles.paymentCard}>
                      <div className={styles.paymentHeader}>
                        <div className={styles.paymentInfo}>
                          <div className={styles.paymentMethod} />
                          <div>
                            <p className={styles.cardNumber}>•••• •••• •••• 8888</p>
                            <p className={styles.expiryDate}>Expires 08/24</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className={styles.removeButton}>
                          Remove
                        </Button>
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
  );
}