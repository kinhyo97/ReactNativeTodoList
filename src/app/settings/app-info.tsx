import { View, Text, Pressable, ScrollView, Linking } from "react-native";
import { useTheme } from "@/styles/hooks/useTheme";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { createStyles } from "./app-info.style";

export default function AppInfoScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);

  // TODO: 실제 이메일로 교체
  const CONTACT_EMAIL = "support@example.com";
  const APP_NAME = "하루로그";
  const OPERATOR = "김효상";

  const handlePressEmail = async () => {
    const url = `mailto:${CONTACT_EMAIL}`;
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      }
    } catch (e) {
      // 메일 앱 없거나 실패 시 무시
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          style={({ pressed }) => [
            styles.backButton,
            { opacity: pressed ? 0.5 : 1 },
          ]}
        >
          <Ionicons name="chevron-back" size={28} color={theme.text.primary} />
        </Pressable>

        <Text style={styles.title}>앱 정보</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>서비스 정보</Text>

          <View style={styles.row}>
            <Text style={styles.label}>서비스명</Text>
            <Text style={styles.value}>{APP_NAME}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>운영자</Text>
            <Text style={styles.value}>{OPERATOR}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>문의</Text>
            <Pressable
              onPress={handlePressEmail}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            >
              <Text style={[styles.value, styles.link]}>{CONTACT_EMAIL}</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>문서</Text>

          <Pressable
            onPress={() => router.push("/settings/tos")}
            style={({ pressed }) => [
              styles.menuItem,
              { opacity: pressed ? 0.6 : 1 },
            ]}
          >
            <Text style={styles.menuText}>이용약관</Text>
            <Ionicons name="chevron-forward" size={18} color={theme.text.secondary} />
          </Pressable>

          <Pressable
            onPress={() => router.push("/settings/privacy")}
            style={({ pressed }) => [
              styles.menuItem,
              { opacity: pressed ? 0.6 : 1 },
            ]}
          >
            <Text style={styles.menuText}>개인정보 처리방침</Text>
            <Ionicons name="chevron-forward" size={18} color={theme.text.secondary} />
          </Pressable>
        </View>

        <Text style={styles.note}>
          스토어 심사 대비용으로 운영자/문의처를 명확히 표시하는 화면입니다.
          이메일은 실제 운영 메일로 교체하세요.
        </Text>
      </ScrollView>
    </View>
  );
}
