// src/services/api.ts

import { Platform } from "react-native";

// API 기본 URL 설정 (개발 환경에 맞게 수정 필요)
const BASE_URL =
  Platform.OS === "web"
    ? "http://localhost:8080"
    : "http://192.168.0.11:8080"; // 네 PC IP

// 공통 요청 함수 ( 정상 응답인지 판별 )
// URL 합치기 + 인증 정보 포함 + 에러 판별 + 204 대응 + JSON 파싱 안전 처리 + 타입 보장

// 제네릭 타입 T를 사용하여 반환 타입을 지정할 수 있도록 함
async function request<T>(
  url: string,
  //fetch 표준 옵션 타입 ( method , headers, body 등 포함)
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`, {
    // 인증 정보 포함
    credentials: "include",
    ...options,
  });

  // HTTP 에러 처리 ( 200-299 이외의 상태 코드 )
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `API Error ${response.status}: ${errorText}`
    );
  }

  // 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  // Content-Type 검사 ( 런타임 타입 안전성 확보 )
  const contentType = response.headers.get("content-type");

  // JSON 아닌 경우 파싱 안 함
  if (!contentType || !contentType.includes("application/json")) {
    return undefined as T;
  }

  // http 성공 + json 응답 + 파싱 가능시 타입 T로 반환
  return (await response.json()) as T;
}

export const api = {
  // 응답타입 <T> , url은 상대경로
  get: <T>(url: string) => request<T>(url),

  // method = Post, body = Json , Content-Type 설정
  post: <T>(url: string, body?: any) =>
    request<T>(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),

  // method = Put, body = Json , Content-Type 설정
  put: <T>(url: string, body?: any) =>
    request<T>(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),

    // 응답타입 X , 
  delete: (url: string) =>
    request<void>(url, { method: "DELETE" }),

  patch: <T>(url: string, body?: any) =>
  request<T>(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }),
};
