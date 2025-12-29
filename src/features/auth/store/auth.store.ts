// src/features/auth/store/auth.store.ts
import { create } from "zustand";
import * as authApi from "../services/auth.api";
import { setAccessToken } from "@/services/tokenStore";

// auth 관련 state type 설정
interface AuthState {
  accessToken: string | null;
  user: any | null;
  loading: boolean;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<void>;

  loginWithGoogle: (idToken: string) => Promise<void>;
  inactiveAccount: () => Promise<void>;
}

// user state를 관리하기위한 auth zustand store
export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

  // login method
  async login(email, password) {
    console.log("[Auth Store] login start", { email });
    set({ loading: true });

    try {
      const { accessToken, user } = await authApi.login(email, password);
      console.log("[Auth Store] login API returned", { accessToken, user });

      // 1) tokenStore 에 먼저 저장
      setAccessToken(accessToken);
      console.log("[Auth Store] accessToken set to tokenStore", accessToken);

      // 2) zustand state 에도 토큰 먼저 세팅
      set({ accessToken });

      // 3) /auth/me 로 서버 기준 유저 정보 다시 가져오기
      await get().fetchMe();
      console.log("[Auth Store] fetchMe completed");

      // 4) 백엔드에서 내려준 user 도 상태에 반영
      set({ user });
      console.log("[Auth Store] login state updated", { accessToken, user });
    } catch (err) {
      console.error("[Auth Store] login error", err);
      throw err;
    } finally {
      set({ loading: false });
      console.log("[Auth Store] login finished");
    }
  },

  async loginWithGoogle(idToken: string) {
    console.log("[Auth Store] google login start");
    set({ loading: true });

    try {
      const { accessToken, user } = await authApi.loginWithGoogle(idToken);
      console.log("[Auth Store] google login API returned", { accessToken, user });

      // 1) tokenStore + zustand 둘 다 토큰 세팅
      setAccessToken(accessToken);
      console.log("[Auth Store] accessToken set (google)", accessToken);
      set({ accessToken });

      // 2) 서버 기준 me 호출
      await get().fetchMe();
      console.log("[Auth Store] fetchMe completed (google)");

      // 3) user 상태 저장
      set({ user });
      console.log("[Auth Store] google login state updated", { accessToken, user });
    } catch (err) {
      console.error("[Auth Store] google login error", err);
      throw err;
    } finally {
      set({ loading: false });
      console.log("[Auth Store] google login finished");
    }
  },

  // accesstoken을 통해서 me를 호출해서 user 데이터를 뽑아냄
  async fetchMe() {
    const token = get().accessToken;
    console.log("[Auth Store] fetchMe start, accessToken:", token);

    // 토큰 없으면 굳이 /auth/me 호출 안 함
    if (!token) {
      console.log("[Auth Store] fetchMe skipped: no accessToken");
      return;
    }

    try {
      const user = await authApi.getMe();
      console.log("[Auth Store] fetchMe response", user);
      set({ user });
    } catch (err) {
      console.error("[Auth Store] fetchMe error", err);
    }
  },

  // logout시 accesstoken을 제거하고 user상태를 제거
  async logout() {
    console.log("[Auth Store] logout start");
    try {
      await authApi.logout();

      // tokenStore + zustand 상태 둘 다 비우기
      setAccessToken(null);
      set({ accessToken: null, user: null });

      console.log("[Auth Store] logout completed");
    } catch (err) {
      console.error("[Auth Store] logout error", err);
    }
  },

  async inactiveAccount() {
  console.log("[Auth Store] inactiveAccount start");
  set({ loading: true });

  try {
    // 1) 서버에 탈퇴(비활성화) 요청
    await authApi.inactiveUser();
    console.log("[Auth Store] inactiveUser completed");

    // 2) 토큰/유저 상태 정리 (중요)
    setAccessToken(null);
    set({ accessToken: null, user: null });

    console.log("[Auth Store] inactiveAccount finished");
  } catch (err) {
    console.error("[Auth Store] inactiveAccount error", err);
    throw err;
  } finally {
    set({ loading: false });
  }
},
}));
