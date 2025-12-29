// src/services/tokenStore.ts

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  console.log("[tokenStore] setAccessToken:", token);
  accessToken = token;
}

export function getAccessToken() {
  console.log("[tokenStore] getAccessToken ->", accessToken);
  return accessToken;
}
