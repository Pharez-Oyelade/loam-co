import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Navbar from "@/components/ui/Navbar";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/landing/Hero";
import Pillars from "@/components/landing/Pillars";
import ProducerVideo from "@/components/landing/ProducerVideo";
import HowItWorks from "@/components/landing/HowItWorks";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      {/* <Navbar /> */}

      {/* Hero Section */}
      <Hero />

      {/* 3 Core Pillars */}
      <Pillars />
      {/* Producer video */}
      <ProducerVideo />
      <HowItWorks />

      {/* Subscription Tiers Teaser */}
      <section className="py-16 sm:py-20 border-t border-border bg-surface-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface rounded-3xl border border-border p-8 sm:p-12 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-xs font-bold tracking-widest uppercase text-primary">
                Flexible Plans
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mt-2">
                Taster, Everyday, or Household.
              </h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Whether you drink one cup on quiet mornings or run through a bag
                a week with family, choose your bag cadence and adjust grind
                anytime.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
              <Link href="/register" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
