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

    // ✅ DataSettingsScreen 기준
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

    // 본문 스타일은 기존 유지(필요하면 더 통일 가능)
    content: {
      paddingTop: 8,
      paddingBottom: 28,
    },

    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.text.primary,
      marginBottom: 8,
    },

    sectionDesc: {
      fontSize: 14,
      lineHeight: 20,
      color: theme.text.secondary,
      marginBottom: 16,
    },

    articleTitle: {
      fontSize: 15,
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

    note: {
      marginTop: 18,
      fontSize: 12,
      lineHeight: 18,
      color: theme.text.tertiary,
    },

    disabled: {
      opacity: 0.6,
    },
  });
