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

    // ✅ DataSettingsScreen 기준
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 16,
      marginTop: 24,
    },

    // ✅ DataSettingsScreen 기준 (카드형 버튼)
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background.secondary,
    },

    // ✅ DataSettingsScreen 기준
    title: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.text.primary,
    },

    // 본문은 유지하되 살짝만 정리
    content: {
      paddingTop: 8,
      paddingBottom: 28,
    },

    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.text.primary,
      marginBottom: 6,
    },

    sectionDesc: {
      fontSize: 14,
      lineHeight: 20,
      color: theme.text.secondary,
      marginBottom: 14,
    },

    articleTitle: {
      fontSize: 15,
      fontWeight: "700",
      color: theme.text.primary,
      marginTop: 14,
      marginBottom: 6,
    },

    articleSubtitle: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.text.primary,
      marginTop: 10,
      marginBottom: 6,
    },

    articleText: {
      fontSize: 14,
      lineHeight: 20,
      color: theme.text.secondary,
    },
  });
