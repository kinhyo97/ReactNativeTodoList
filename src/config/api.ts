import axios from "axios";
import { Platform } from "react-native";

const BASE_URL =
  Platform.OS === "web"
    ? "http://localhost:8080"
    : "http://192.168.0.11:8080";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

/** 🔑 토큰 주입용 함수 */
export const setAccessToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};
