// src/features/auth/services/auth.api.ts
import { api } from "@/services/api";

/* =========================
   Types
========================= */
export interface User {
  id: number;
  email: string;
  name?: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

/* =========================
   Auth APIs
========================= */
export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  console.log("[Auth API] login called", { email });
  const res = await api.post<LoginResponse>("/auth/login", { email, password });
  console.log("[Auth API] login response", res);
  return res;
}

export const getMe = (): Promise<User> => {
  console.log("[Auth API] getMe called");
  return api.get<User>("/auth/me").then((res) => {
    console.log("[Auth API] getMe response", res);
    return res;
  });
};

export async function refresh() {
  console.log("[Auth API] refresh called");
  // access token을 포함해서 refresh
  const res = await api.post<{ accessToken: string }>("/auth/refresh", {});
  console.log("[Auth API] refresh response", res);
  return res.accessToken;
}

// logout 액션만 전달
export async function logout() {
  console.log("[Auth API] logout called");
  await api.post("/auth/logout", {});
  console.log("[Auth API] logout completed");
}

/* =========================
   GOOGLE SOCIAL LOGIN
========================= */
// 구글 로그인 요청 전달
export async function loginWithGoogle(idToken: string): Promise<LoginResponse> {
  console.log("[Auth API] loginWithGoogle called");
  const res = await api.post<LoginResponse>("/auth/google", { idToken });
  console.log("[Auth API] loginWithGoogle response", res);
  return res;
}

// user 비활성화

export const inactiveUser = () => {
  console.log("[Auth API] inactiveUser called");
  return api.patch("/auth/inactive"); // body 필요없음
};

// register 관련

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:8080";

type Json = Record<string, any>;

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  // 백엔드가 { message } 내려주는 형태
  const data = (await res.json().catch(() => ({}))) as Json;

  if (!res.ok) {
    const msg = String(data?.message || "UNKNOWN_ERROR");
    throw new Error(msg);
  }

  return data as T;
}

export async function register(email: string, password: string) {
  return api.post<{ message: string; email: string }>("/auth/register", {
    email,
    password,
  });
}

export async function resendVerification(email: string) {
  return api.post<{ message: string; email: string }>(
    "/auth/resend-verification",
    { email }
  );
}