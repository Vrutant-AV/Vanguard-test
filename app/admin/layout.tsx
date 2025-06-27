"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  BarChart3, 
  Settings, 
  FileText,
  Tag,
  Truck,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Orders",
        href: "/admin/orders",
        icon: ShoppingBag,
    },
    {
        title: "Products",
        href: "/admin/products",
        icon: Package,
    },
    {
        title: "Customers",
        href: "/admin/customers",
        icon: Users,
    },
    {
        title: "Analytics",
        href: "/admin/analytics",
        icon: BarChart3,
    },
    {
        title: "Categories",
        href: "/admin/categories",
        icon: Tag,
    },
    {
        title: "Shipping",
        href: "/admin/shipping",
        icon: Truck,
    },
    {
        title: "Reviews",
        href: "/admin/reviews",
        icon: MessageSquare,
    },
    {
        title: "Content",
        href: "/admin/content",
        icon: FileText,
    },
    {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
    },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="flex h-screen bg-background">

            {/* Mobile menu overlay */}
            {mobileMenuOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed left-0 top-0 z-50 h-full bg-card border-r border-border transition-all duration-300 lg:relative lg:translate-x-0",
                    sidebarCollapsed ? "w-16" : "w-64",
                    mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                <div className="flex h-16 items-center justify-between px-4 border-b border-border">
                    {!sidebarCollapsed && (
                        <Link href = "/admin" className="font-serif text-lg font-light tracking-wide">
                            Admin
                        </Link>
                    )}

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarCollapsed (!sidebarCollapsed)}
                        className="hidden lg:flex"
                    >
                        {sidebarCollapsed ? (
                            <ChevronRight className="h-4 w-4" />   
                        ) : (
                            <ChevronLeft className="h-4 w-4" />
                        )}
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(false)}
                        className="lg:hidden"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </div>

                <ScrollArea className="flex-1 px-3 py-4">
                    <nav className="space-y-2">
                        {sidebarItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                                        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                                        sidebarCollapsed && "justify-center px-2"
                                    )}
                                >
                                    <Icon className="h-4 w-4 flex-shrink-0" />
                                    {!sidebarCollapsed && <span>{item.title}</span>}
                                </Link>
                            );
                        })}
                    </nav>
                </ScrollArea>

                {/* Back to Store */}
                <div className="border-t border-border p-4">
                    <Link
                        href="/"
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-account-foreground",
                            sidebarCollapsed && "justify-center px-2"
                        )}
                    >
                        <ChevronLeft className="h-4 w-4 flex-shrink-0" />
                        {!sidebarCollapsed && <span>Back to Store</span>}
                    </Link>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">

                {/* Mobile header */}
                <div className="flex h-16 items-center justofy-between border-b border-border px-2 lg:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                    </Button>
                    <Link href="/admin" className="font-serif text-lg font-light tracking-wide">
                        Admin
                    </Link>
                    <div className="w-10" /> {/* makes space */}
                </div>

                {/* Page content */}
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}