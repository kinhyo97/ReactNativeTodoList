// src/services/api.ts
import { Platform } from "react-native";
import { getAccessToken } from "@/services/tokenStore";

// API 기본 URL 설정
const BASE_URL =
  Platform.OS === "web"
    ? "http://localhost:8080"
    : "http://192.168.0.11:8080";

/* =========================
   공통 request 함수
========================= */
async function request<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const token = getAccessToken();
  console.log("[API] request", url, "token:", token);

  const response = await fetch(`${BASE_URL}${url}`, {
    credentials: "include",
    ...options,
    headers: {
      ...(options?.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[API] error", response.status, errorText);
    throw new Error(`API Error ${response.status}: ${errorText}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    console.warn("[API] non-json response", contentType);
    return undefined as T;
  }

  const json = (await response.json()) as T;
  console.log("[API] response", url, json);
  return json;
}

/* =========================
   외부 노출 API
========================= */
export const api = {
  get: <T>(url: string) =>
    request<T>(url),

  post: <T>(url: string, body?: any) =>
    request<T>(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),

  put: <T>(url: string, body?: any) =>
    request<T>(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),

  patch: <T>(url: string, body?: any) =>
    request<T>(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),

  delete: (url: string) =>
    request<void>(url, {
      method: "DELETE",
    }),
};
