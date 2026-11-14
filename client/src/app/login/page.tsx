"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { Coffee, ArrowRight, Shield } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoggingIn } = useAuth();
  const { isAuthenticated, user } = useAuthStore();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/dashboard");
      }
    }
  }, [isAuthenticated, user, router]);

  const onSubmit = async (data: LoginFormValues) => {
    setFormError(null);
    const parseResult = loginSchema.safeParse(data);
    if (!parseResult.success) {
      setFormError(parseResult.error.issues[0]?.message || "Invalid form data");
      return;
    }

    try {
      await login(parseResult.data);
    } catch (err: any) {
      setFormError(err?.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
            <Coffee className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground tracking-tight">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to manage your roast selections, delivery cadence, and tasting notes.
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
              label="Email address"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email address",
                },
              })}
            />

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                  Password
                </label>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                error={errors.password?.message}
                {...register("password", {
                  required: "Password is required",
                })}
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full"
                isLoading={isLoggingIn}
              >
                Sign In
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-border-muted text-center">
            <p className="text-xs text-muted-foreground">
              New to Loam &amp; Co.?{" "}
              <Link
                href="/register"
                className="font-semibold text-primary hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Admin Link */}
        <div className="mt-6 text-center">
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Shield className="w-3.5 h-3.5" />
            Roaster &amp; Staff Admin Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
