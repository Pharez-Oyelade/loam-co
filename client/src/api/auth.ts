import api from "../lib/axios";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  user: User;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export async function registerUser(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  const res = await api.post("/auth/register", payload);
  return res.data;
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const res = await api.post("/auth/login", payload);
  return res.data;
}

export async function adminLoginUser(
  payload: LoginPayload,
): Promise<AuthResponse> {
  const res = await api.post("/auth/admin/login", payload);
  return res.data;
}

export async function logoutUser(): Promise<{ message: string }> {
  const res = await api.post("/auth/logout");
  return res.data;
}

export async function fetchCurrentUser(): Promise<AuthResponse> {
  // skip auth redirect
  const res = await api.get("/auth/me", { skipAuthRedirect: true });
  return res.data;
}
