"use client";

import React from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/Button";
import {
  Users,
  Layers,
  Truck,
  TrendingUp,
  Play,
  ArrowUpRight,
} from "lucide-react";

export default function AdminOverviewPage() {
  const { user } = useAuthStore();

  const metrics = [
    {
      title: "Active Subscriptions",
      value: "0",
      change: "+0% this month",
      icon: Users,
    },
    {
      title: "Batches in Stock",
      value: "0",
      change: "Phase 2 seed pending",
      icon: Layers,
    },
    {
      title: "Pending Shipments",
      value: "0",
      change: "No orders due",
      icon: Truck,
    },
    {
      title: "Monthly Retention",
      value: "100%",
      change: "Initial baseline",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            Operational Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back, {user?.name || "Admin"}. System status and fulfillment pipeline.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-1.5" disabled>
            <Play className="w-3.5 h-3.5" />
            Run Assignment Engine
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.title}
              className="bg-surface rounded-xl border border-border p-5 shadow-xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  {m.title}
                </span>
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-foreground">{m.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{m.change}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action / Status Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface rounded-xl border border-border p-6 shadow-xs">
          <h2 className="text-base font-semibold text-foreground mb-2">
            Phase 1 Foundation Complete
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            User models, JWT cookie authentication, and role authorization are initialized. Next up: Catalog and Roast seed data in Phase 2.
          </p>
          <div className="p-3 bg-surface-muted rounded-lg border border-border text-xs text-muted-foreground">
            Current system role: <span className="font-semibold text-foreground">{user?.role}</span> ({user?.email})
          </div>
        </div>

        <div className="bg-surface rounded-xl border border-border p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-semibold text-foreground mb-2">
              Next Milestones
            </h2>
            <p className="text-sm text-muted-foreground">
              Configure inventory batches and traceability metadata once Phase 2 (Catalog & Storefront) is activated.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-border-muted flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Traceability engine: Standby</span>
            <Link href="/" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
              View storefront
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
