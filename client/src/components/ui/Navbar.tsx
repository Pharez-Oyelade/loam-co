"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import {
  Coffee,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  Shield,
  Sliders,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { logout, isLoggingOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomeHero = pathname === "/" && !isScrolled;
  const isTransparent = isHomeHero && !mobileMenuOpen;

  // Hide global navbar in admin routes to keep admin portal clean
  const isAdminRoute =
    pathname?.startsWith("/admin") && !pathname?.startsWith("/admin/login");
  if (isAdminRoute) {
    return null;
  }

  const navLinks = [
    { name: "The Roasts", href: "/roasts" },
    { name: "Origin Stories", href: "/stories" },
    { name: "Brewing Guides", href: "/brewing" },
    { name: "Subscribe", href: "/builder" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      setUserDropdownOpen(false);
      setMobileMenuOpen(false);
      router.push("/login");
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        isTransparent
          ? "bg-transparent text-white"
          : "bg-surface/95 backdrop-blur-md shadow-sm text-foreground",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
                <Coffee className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span
                  className={cn(
                    "font-serif font-bold text-xl sm:text-2xl tracking-tight leading-none transition-colors",
                    isTransparent ? "text-white" : "text-foreground",
                  )}
                >
                  Loam & Co.
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "text-primary font-semibold"
                        : isTransparent
                          ? "text-stone-200 hover:text-white hover:bg-white/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-surface-muted",
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Desktop Right Action Area */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors text-sm font-medium cursor-pointer",
                    isTransparent
                      ? "border-white/20 bg-white/10 hover:bg-white/20 text-white"
                      : "border-border bg-surface hover:bg-surface-muted text-foreground",
                  )}
                >
                  <div className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold uppercase">
                    {user.name?.charAt(0) || "U"}
                  </div>
                  <span className="max-w-[120px] truncate">{user.name}</span>
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5",
                      isTransparent
                        ? "text-stone-300"
                        : "text-muted-foreground",
                    )}
                  />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setUserDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 rounded-xl bg-surface border border-border shadow-lg py-1.5 z-20 animate-in fade-in zoom-in-95 duration-100">
                      <div className="px-3.5 py-2 border-b border-border-muted">
                        <p className="text-xs font-semibold text-foreground truncate">
                          {user.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate">
                          {user.email}
                        </p>
                        {user.role === "admin" && (
                          <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                            <Shield className="w-3 h-3" /> Admin
                          </span>
                        )}
                      </div>

                      {user.role === "admin" ? (
                        <Link
                          href="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-foreground hover:bg-surface-muted transition-colors"
                        >
                          <Shield className="w-4 h-4 text-primary" />
                          Admin Portal
                        </Link>
                      ) : (
                        <>
                          <Link
                            href="/dashboard"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-foreground hover:bg-surface-muted transition-colors"
                          >
                            <UserIcon className="w-4 h-4 text-muted-foreground" />
                            Member Dashboard
                          </Link>
                          <Link
                            href="/dashboard/subscription"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-foreground hover:bg-surface-muted transition-colors"
                          >
                            <Sliders className="w-4 h-4 text-muted-foreground" />
                            My Subscription
                          </Link>
                        </>
                      )}

                      <div className="border-t border-border-muted my-1" />

                      <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full text-left flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        {isLoggingOut ? "Signing out..." : "Sign Out"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "transition-colors",
                      isTransparent &&
                        "text-white hover:bg-white/10 hover:text-white",
                    )}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/builder">
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-muted",
              )}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-surface px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-surface-muted"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-border-muted flex flex-col gap-2">
            {isAuthenticated && user ? (
              <>
                <div className="px-3 py-1">
                  <p className="text-xs font-semibold text-foreground">
                    {user.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {user.email}
                  </p>
                </div>
                {user.role === "admin" ? (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-left"
                  >
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full justify-start gap-2"
                    >
                      <Shield className="w-4 h-4" /> Admin Portal
                    </Button>
                  </Link>
                ) : (
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-left"
                  >
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full justify-start gap-2"
                    >
                      <UserIcon className="w-4 h-4" /> Dashboard
                    </Button>
                  </Link>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  isLoading={isLoggingOut}
                  className="w-full justify-start gap-2 text-red-600 hover:text-red-700"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="md" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/builder" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="md" className="w-full">
                    Subscribe
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
