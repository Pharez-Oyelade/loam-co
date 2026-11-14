"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCurrentUser } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { Coffee, Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: ("customer" | "admin")[];
  redirectTo?: string;
}

export default function AuthGuard({
  children,
  allowedRoles = ["customer"],
  redirectTo,
}: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuthStore();
  const { isLoading, isError } = useCurrentUser();

  const defaultRedirect = allowedRoles.includes("admin")
    ? "/admin/login"
    : "/login";
  const targetRedirect = redirectTo || defaultRedirect;

  useEffect(() => {
    // If done loading or error encountered
    if (!isLoading) {
      if (!isAuthenticated || !user || isError) {
        router.replace(`${targetRedirect}?from=${encodeURIComponent(pathname)}`);
      } else if (!allowedRoles.includes(user.role as "customer" | "admin")) {
        // Role mismatch: redirect to appropriate portal
        if (user.role === "admin") {
          router.replace("/admin");
        } else {
          router.replace("/dashboard");
        }
      }
    }
  }, [isLoading, isAuthenticated, user, isError, router, pathname, targetRedirect, allowedRoles]);

  // Loading state
  if (isLoading || !isAuthenticated || !user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
        <div className="flex flex-col items-center gap-4 text-center max-w-sm">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-surface-muted border border-border">
            <Coffee className="w-8 h-8 text-primary animate-pulse" />
            <Loader2 className="absolute -bottom-1 -right-1 w-5 h-5 text-muted animate-spin" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground">
              Verifying your session
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Connecting with Loam & Co. authentication...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Verify role
  if (!allowedRoles.includes(user.role as "customer" | "admin")) {
    return null;
  }

  return <>{children}</>;
}
