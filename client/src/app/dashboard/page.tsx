"use client";

import React from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/Button";
import { Coffee, Compass, Package, ArrowRight, Sparkles, MapPin } from "lucide-react";

export default function DashboardOverviewPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-surface border border-border p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Member Dashboard
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground mt-1">
              Welcome, {user?.name || "Coffee Lover"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-xl">
              Track your upcoming roast discovery, manage delivery cadence, and explore origin stories from smallholder coffee farms.
            </p>
          </div>
          <Link href="/builder">
            <Button size="md" className="gap-2">
              <Sparkles className="w-4 h-4" />
              Build Subscription
            </Button>
          </Link>
        </div>
      </div>

      {/* Grid of Status & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Subscription Status Card */}
        <div className="md:col-span-2 rounded-2xl bg-surface border border-border p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-border-muted">
              <div className="flex items-center gap-2.5">
                <Coffee className="w-5 h-5 text-primary" />
                <h2 className="text-base font-semibold text-foreground">Current Subscription</h2>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
                Not Subscribed
              </span>
            </div>

            <div className="py-8 text-center sm:text-left">
              <h3 className="font-serif text-xl font-semibold text-foreground">
                You haven&apos;t set up a coffee plan yet.
              </h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                Choose between curated discovery or fixed favorite roasts. Freshly roasted on demand and delivered on your schedule.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/builder">
                  <Button variant="primary" size="sm">
                    Start Custom Plan
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
                <Link href="/roasts">
                  <Button variant="secondary" size="sm">
                    Explore Catalog
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border-muted flex items-center justify-between text-xs text-muted-foreground">
            <span>Traceable to origin</span>
            <span>Pause, swap or cancel anytime</span>
          </div>
        </div>

        {/* Account Info Card */}
        <div className="rounded-2xl bg-surface border border-border p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 pb-4 border-b border-border-muted">
              <MapPin className="w-5 h-5 text-primary" />
              <h2 className="text-base font-semibold text-foreground">Account & Delivery</h2>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <span className="text-xs text-muted-foreground">Registered Email</span>
                <p className="text-sm font-medium text-foreground">{user?.email}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Membership Role</span>
                <p className="text-sm font-medium capitalize text-foreground">{user?.role || "Customer"}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Default Address</span>
                <p className="text-sm text-muted-foreground italic">No shipping address on file yet</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border-muted mt-6">
            <Link href="/dashboard/settings" className="text-xs text-primary hover:underline font-medium inline-flex items-center gap-1">
              Edit account settings
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
