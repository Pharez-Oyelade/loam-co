"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthGuard from "@/components/auth/AuthGuard";
import { Coffee, Package, Sliders, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: Coffee },
  { name: "My Subscription", href: "/dashboard/subscription", icon: Sliders },
  { name: "Shipments", href: "/dashboard/orders", icon: Package },
  { name: "Account Details", href: "/dashboard/settings", icon: User },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AuthGuard allowedRoles={["customer"]}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Dashboard Header Tabs */}
        <div className="border-b border-border mb-8 pb-4">
          <nav className="flex space-x-2 sm:space-x-8 overflow-x-auto no-scrollbar">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 py-2 px-3 sm:px-1 border-b-2 text-sm font-medium whitespace-nowrap transition-colors",
                    isActive
                      ? "border-primary text-primary font-semibold"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Dashboard Content */}
        <div>{children}</div>
      </div>
    </AuthGuard>
  );
}
