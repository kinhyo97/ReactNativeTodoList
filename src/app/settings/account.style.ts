import { StyleSheet } from "react-native";

export const createStyles = (theme: any) =>
  StyleSheet.create({
    // ✅ DataSettingsScreen 기준
    container: {
      flex: 1,
      backgroundColor: theme.background.primary,
      paddingHorizontal: 16,
      paddingTop: 16,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 16,
      marginTop: 24,
    },

    backButton: {
      width: 40,
      height: 40,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background.secondary,
    },

    title: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.text.primary,
    },

    // ✅ Data 톤 섹션 카드
    section: {
      backgroundColor: theme.background.secondary,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.border.default,
    },

    sectionTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.text.primary,
      marginBottom: 6,
    },

    sectionDesc: {
      fontSize: 13,
      color: theme.text.secondary,
      lineHeight: 18,
      marginBottom: 14,
    },

    // ✅ 기본 액션 버튼(로그아웃) - data 버튼 톤
    actionButton: {
      height: 48,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.border.medium,
      backgroundColor: theme.background.primary,
    },

    actionText: {
      fontSize: 15,
      fontWeight: "700",
      color: theme.text.primary,
    },

    // ✅ 위험 버튼(계정 탈퇴) - data의 danger 스타일
    dangerButton: {
      marginTop: 12,
      height: 48,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.border.medium,
      backgroundColor: theme.background.primary,
    },

    dangerText: {
      fontSize: 15,
      fontWeight: "700",
      color: "#ef4444",
    },
  });
