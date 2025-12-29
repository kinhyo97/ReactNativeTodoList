import { View, Text, Pressable, Alert, ActivityIndicator } from "react-native";
import { useMemo, useState } from "react";
import { useTheme } from "@/styles/hooks/useTheme";
import { createStyles } from "./EmailSentScreen.style";
import BackButton from "../components/BackButton";
import { router, useLocalSearchParams } from "expo-router";
import * as authApi from "@/features/auth/services/auth.api";

export default function EmailSentScreen() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { email } = useLocalSearchParams<{ email?: string }>();
  const safeEmail = String(email ?? "");

  const [sending, setSending] = useState(false);

  const onGoLogin = () => {
    router.replace("/auth/login");
  };

  const onResend = async () => {
    if (!safeEmail) {
      Alert.alert("오류", "이메일 정보가 없습니다. 회원가입 화면에서 다시 진행해 주세요.");
      return;
    }
    if (sending) return;

    try {
      setSending(true);
      await authApi.resendVerification(safeEmail.trim().toLowerCase());

      Alert.alert(
        "재전송 완료",
        "인증 메일을 다시 보냈습니다.\n메일함(스팸함 포함)을 확인해 주세요."
      );
    } catch (e: any) {
      const code = String(e?.message || "UNKNOWN_ERROR");

      if (code === "USER_NOT_FOUND") {
        Alert.alert("재전송 실패", "해당 이메일의 계정을 찾을 수 없습니다.");
      } else if (code === "EMAIL_REQUIRED") {
        Alert.alert("재전송 실패", "이메일이 올바르지 않습니다.");
      } else {
        Alert.alert("재전송 실패", code);
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔙 상단 BackButton */}
      <View style={styles.header}>
        <BackButton />
      </View>

      {/* 📦 가운데 컨텐츠 */}
      <View style={styles.content}>
        <View style={styles.card}>
          {/* 아이콘 */}
          <View style={styles.iconWrapper}>
            <Text style={styles.icon}>✉️</Text>
          </View>

          {/* 제목 */}
          <Text style={styles.title}>인증 메일이 발송되었습니다</Text>

          {/* 설명 */}
          <Text style={styles.description}>
            입력하신 이메일로 인증 링크를 보내드렸어요.
            {"\n"}메일함을 확인해 주세요.
          </Text>

          {/* 이메일 표시 */}
          {safeEmail ? <Text style={styles.emailText}>{safeEmail}</Text> : null}

          {/* 버튼들 */}
          <View style={styles.buttonGroup}>
            <Pressable style={styles.primaryButton} onPress={onGoLogin}>
              <Text style={styles.primaryButtonText}>로그인으로 이동</Text>
            </Pressable>

            <Pressable
              style={[styles.secondaryButton, sending ? { opacity: 0.6 } : null]}
              onPress={onResend}
              disabled={sending}
            >
              {sending ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.secondaryButtonText}>인증 메일 재전송</Text>
              )}
            </Pressable>
          </View>

          {/* 안내 문구 */}
          <Text style={styles.helperText}>
            메일이 보이지 않는다면 스팸함을 확인해 주세요.
            {"\n"}그래도 없으면 “인증 메일 재전송”을 눌러주세요.
          </Text>
        </View>
      </View>
    </View>
  );
}
