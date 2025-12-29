import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { router } from "expo-router";

import { useTheme } from "@/styles/hooks/useTheme";
import { createStyles } from "./EmailLoginScreen.style";
import BackButton from "../components/BackButton";
import { useAuthStore } from "@/features/auth/store/auth.store";

export default function EmailLoginScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);

  const login = useAuthStore((s) => s.login);
  const loading = useAuthStore((s) => s.loading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
  console.log("LOGIN BUTTON CLICKED");
  try {
    await login(email, password);                // 토큰 세팅 + user 상태 저장
    await useAuthStore.getState().fetchMe();    // 🔥 서버 기준 user 정보 가져오기
    router.replace("/todo");                         // 홈 화면 이동
  } catch (e) {
    alert("로그인 실패");
  }
};



  return (
    <View style={styles.container}>
      <BackButton />

      <Text style={styles.title}>로그인</Text>
      <Text style={styles.subtitle}>
        이메일과 비밀번호를 입력해{"\n"}
        계정에 로그인하세요.
      </Text>

      <View style={styles.card}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="이메일 주소"
          placeholderTextColor={theme.text.tertiary}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="비밀번호"
          placeholderTextColor={theme.text.tertiary}
          secureTextEntry
          style={styles.input}
        />

        <Pressable
          style={styles.primaryButton}
          onPress={onLogin}
          disabled={!email || !password || loading}
        >
          <Text style={styles.primaryButtonText}>
            {loading ? "로그인 중..." : "로그인"}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/auth/email-entry")}
          style={{ marginTop: 20, alignItems: "center" }}
        >
          <Text style={{ color: theme.text.secondary, fontSize: 14 }}>
            아직 계정이 없으신가요?{" "}
            <Text style={{ color: theme.text.primary, fontWeight: "600" }}>
              회원가입
            </Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
