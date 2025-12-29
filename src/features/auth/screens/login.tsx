// src/features/auth/screens/login.tsx

import { View, Text, Pressable } from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import { styles } from "./login.styles";
import { useAuthStore } from "@/features/auth/store/auth.store";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const loginWithGoogle = useAuthStore((s) => s.loginWithGoogle);

  // 🔥 Google OAuth (id_token용)
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID!,
  });

  // 디버깅용: redirectUri / clientId 확인
  useEffect(() => {
    if (request) {
      console.log("[LoginScreen] redirectUri:", request.redirectUri);
      console.log(
        "[LoginScreen] GOOGLE_WEB_CLIENT_ID =",
        process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID
      );
    }
  }, [request]);

  // 로그인 결과 처리
  useEffect(() => {
    if (response?.type === "success") {
      const idToken = (response as any).params?.id_token;

      console.log("[LoginScreen] google response:", response);
      console.log("[LoginScreen] idToken:", idToken);

      if (!idToken) {
        console.warn("[LoginScreen] idToken is missing in response");
        return;
      }

      // 1) 서버에 소셜 로그인 요청
      loginWithGoogle(idToken)
        .then(() => {
          console.log("[LoginScreen] google login success, go to todo");
          // 2) 투두 탭으로 이동
          router.replace("/todo"); // ← 여기서 투두 화면으로 보내는 부분
        })
        .catch((err) => {
          console.error("[LoginScreen] loginWithGoogle error", err);
        });
    }
  }, [response, loginWithGoogle]);

  return (
    <View style={styles.container}>
      {/* 로고 */}
      <View style={styles.logoBox}>
        <Text style={styles.logoText}>하루로그</Text>
      </View>

      {/* 설명 */}
      <Text style={styles.desc}>
        간편하게 로그인하고{"\n"}
        다양한 서비스를 이용해보세요.
      </Text>

      {/* 버튼 */}
      <View style={styles.buttonBox}>
        {/* Google 로그인 버튼 */}
        <Pressable
          style={[styles.button, styles.googleButton]}
          disabled={!request}
          onPress={() => {
            console.log("[LoginScreen] Google button pressed");
            promptAsync();
          }}
        >
          <Text style={styles.googleText}>Google로 로그인</Text>
        </Pressable>

        {/* 이메일 로그인 버튼 */}
        <Pressable
          style={[styles.button, styles.phoneButton]}
          onPress={() => router.push("/auth/email-login")}
        >
          <Text style={styles.phoneText}>이메일로 로그인</Text>
        </Pressable>
      </View>

      {/* 푸터 */}
      <Text style={styles.footerText}>
        로그인 시 서비스 이용약관 및{"\n"}
        개인정보 처리방침에 동의하게 됩니다.
      </Text>
    </View>
  );
}
