import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  registerUser,
  loginUser,
  adminLoginUser,
  logoutUser,
  fetchCurrentUser,
  type LoginPayload,
  type RegisterPayload,
  type AuthResponse,
} from "@/api/auth";
import { notify } from "@/lib/toast";
import { useAuthStore } from "@/store/authStore";

export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
};

export function useCurrentUser() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const query = useQuery({
    queryKey: authKeys.user(),
    queryFn: fetchCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (query.data) setAuth(query.data.user);
  }, [query.data, setAuth]);

  useEffect(() => {
    if (query.isError) clearAuth();
  }, [query.isError, clearAuth]);

  return query;
}

export function useAuth() {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
    onSuccess: (data: AuthResponse) => {
      setAuth(data.user);
      queryClient.setQueryData(authKeys.user(), data);

      notify.success("Registration successful");

      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    },

    onError: (error: any) => {
      console.error(error);
      notify.error("Registration failed");
    },
  });

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
    onSuccess: (data: AuthResponse) => {
      setAuth(data.user);
      queryClient.setQueryData(authKeys.user(), data);

      notify.success(`Welcome back, ${data.user.name}`);

      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    },

    onError: (error: any) => {
      console.error(error);
      notify.error(error.message || "Login failed");
    },
  });

  const adminLoginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => adminLoginUser(payload),
    onSuccess: (data: AuthResponse) => {
      setAuth(data.user);
      queryClient.setQueryData(authKeys.user(), data);

      notify.success(`Welcome to Admin Portal, ${data.user.name}`);
      router.push("/admin");
    },
    onError: (error: any) => {
      console.error(error);
      notify.error(error.message || "Admin login failed");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      clearAuth();
      queryClient.removeQueries({ queryKey: authKeys.all });
    },
  });

  return {
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    adminLogin: adminLoginMutation.mutateAsync,
    isAdminLoggingIn: adminLoginMutation.isPending,
    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,
  };
}
