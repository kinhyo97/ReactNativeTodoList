import { Platform } from "react-native";

// 실행중인 환경에 따라 api 서버 주소를 자동으로 바꿔주는 상수
export const BASE_URL =
  Platform.OS === "web"
    ? "http://localhost:8080"
    : "http://192.168.0.11:8080";
