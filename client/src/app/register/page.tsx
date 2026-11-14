"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { registerSchema, type RegisterFormValues } from "@/lib/validations/auth";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUserMutation, isRegistering } = useAuth();
  const { isAuthenticated, user } = useAuthStore();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
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

  const onSubmit = async (data: RegisterFormValues) => {
    setFormError(null);
    const parseResult = registerSchema.safeParse(data);
    if (!parseResult.success) {
      setFormError(parseResult.error.issues[0]?.message || "Invalid form data");
      return;
    }

    try {
      await registerUserMutation(parseResult.data);
    } catch (err: any) {
      setFormError(err?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground tracking-tight">
            Join Loam &amp; Co.
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Experience peak-freshness single-origin roasts, roasted in small batches and fully traceable to origin.
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
              label="Full name"
              type="text"
              placeholder="Jane Doe"
              autoComplete="name"
              error={errors.name?.message}
              {...register("name", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />

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

            <Input
              label="Password"
              type="password"
              placeholder="At least 6 characters"
              autoComplete="new-password"
              helperText="Must be at least 6 characters long"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full"
                isLoading={isRegistering}
              >
                Create Account
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-border-muted text-center">
            <p className="text-xs text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>No lock-in contracts. Pause or skip anytime.</span>
        </div>
      </div>
    </div>
  );
}
