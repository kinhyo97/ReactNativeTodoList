import { create } from "zustand";

// 테마 모드 타입 정의
export type ThemeMode = "system" | "light" | "dark";

// 테마 상태 인터페이스 정의
interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

// zustand를 사용하여 테마 상태 관리 스토어 생성
export const useThemeStore = create<ThemeState>((set) => ({
  mode: "system", // 기본값: OS 설정 따름
  setMode: (mode) => set({ mode }),
}));
