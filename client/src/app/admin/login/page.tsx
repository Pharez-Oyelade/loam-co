"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { adminLoginSchema, type AdminLoginFormValues } from "@/lib/validations/auth";
import { Shield, ArrowRight, ArrowLeft } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { adminLogin, isAdminLoggingIn } = useAuth();
  const { isAuthenticated, user } = useAuthStore();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "admin") {
        router.replace("/admin");
      }
    }
  }, [isAuthenticated, user, router]);

  const onSubmit = async (data: AdminLoginFormValues) => {
    setFormError(null);
    const parseResult = adminLoginSchema.safeParse(data);
    if (!parseResult.success) {
      setFormError(parseResult.error.issues[0]?.message || "Invalid form data");
      return;
    }

    try {
      await adminLogin(parseResult.data);
    } catch (err: any) {
      setFormError(err?.message || "Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-surface-muted/60">
      <div className="w-full max-w-md">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
            <Shield className="w-6 h-6" />
          </div>
          <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 mb-2">
            Staff &amp; Operations
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground tracking-tight">
            Admin Portal
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Sign in with authorized administrator credentials.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-xs">
          {formError && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Admin email"
              type="email"
              placeholder="admin@loamandco.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email", {
                required: "Admin email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email address",
                },
              })}
            />

            <Input
              label="Admin password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
              })}
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full"
                isLoading={isAdminLoggingIn}
              >
                Access Admin Portal
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-border-muted text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to storefront
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
