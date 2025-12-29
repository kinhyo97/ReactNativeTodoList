import { View, Text, Pressable, Alert } from "react-native";
import { useTheme } from "@/styles/hooks/useTheme";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { createStyles } from "./account.style";

export default function AccountSettingsScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);

  const logout = useAuthStore((s) => s.logout);
  const inactiveAccount = useAuthStore((s) => s.inactiveAccount);

  const handleLogout = () => {
    Alert.alert("로그아웃", "로그아웃 하시겠어요?", [
      { text: "취소", style: "cancel" },
      {
        text: "로그아웃",
        style: "destructive",
        onPress: async () => {
          try {
            console.log("[AccountSettings] logout pressed");
            await logout();
            router.replace("/auth/login");
          } catch (err) {
            console.error("[AccountSettings] logout error", err);
            Alert.alert("실패", "로그아웃 중 오류가 발생했습니다.");
          }
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "계정 탈퇴",
      "정말로 계정을 탈퇴할까요?\n탈퇴하면 모든 데이터가 삭제되며 복구할 수 없습니다.",
      [
        { text: "취소", style: "cancel" },
        {
          text: "탈퇴",
          style: "destructive",
          onPress: async () => {
            try {
              console.log("[AccountSettings] delete account pressed");
              await inactiveAccount();
              Alert.alert("완료", "계정이 탈퇴되었습니다.");
              router.replace("/auth/login");
            } catch (err) {
              console.error("[AccountSettings] delete account error", err);
              Alert.alert("실패", "탈퇴 처리 중 오류가 발생했습니다.");
            }
          },
        },
      ]
    );
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

        <Text style={styles.title}>계정</Text>
      </View>

      {/* ✅ Data 톤으로: 섹션 카드 안에 버튼 2개 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>계정 관리</Text>
        <Text style={styles.sectionDesc}>
          로그아웃 또는 계정 탈퇴를 할 수 있습니다.
        </Text>

        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [
            styles.actionButton,
            { opacity: pressed ? 0.6 : 1 },
          ]}
        >
          <Text style={styles.actionText}>로그아웃</Text>
        </Pressable>

        <Pressable
          onPress={handleDeleteAccount}
          style={({ pressed }) => [
            styles.dangerButton,
            { opacity: pressed ? 0.6 : 1 },
          ]}
        >
          <Text style={styles.dangerText}>계정 탈퇴</Text>
        </Pressable>
      </View>
    </View>
  );
}
