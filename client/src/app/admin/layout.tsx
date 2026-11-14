"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthGuard from "@/components/auth/AuthGuard";
import {
  LayoutDashboard,
  Users,
  Layers,
  Truck,
  BookOpen,
  BarChart3,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNavItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Subscriptions", href: "/admin/subscriptions", icon: Users },
  { name: "Batches & Stock", href: "/admin/batches", icon: Layers },
  { name: "Shipments", href: "/admin/orders", icon: Truck },
  { name: "Origin Stories & Blog", href: "/admin/blog", icon: BookOpen },
  { name: "Analytics & Churn", href: "/admin/analytics", icon: BarChart3 },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AuthGuard allowedRoles={["admin"]}>
      <div className="min-h-[calc(100vh-4rem)] flex flex-col md:flex-row bg-surface-muted">
        {/* Admin Sidebar */}
        <aside className="w-full md:w-64 bg-surface border-r border-border flex flex-col shrink-0">
          <div className="p-6 border-b border-border-muted flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="font-serif font-bold text-base tracking-tight text-foreground">
                Loam Admin
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-primary/10 text-primary">
              Portal
            </span>
          </div>

          <nav className="p-4 space-y-1 flex-1">
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface-muted",
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-border-muted">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Storefront
            </Link>
          </div>
        </aside>

        {/* Admin Content Area */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
