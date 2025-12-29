import { StyleSheet } from "react-native";

export const createStyles = (theme: any) =>
  StyleSheet.create({
    // ✅ Data 기준
    container: {
      flex: 1,
      backgroundColor: theme.background.primary,
      paddingHorizontal: 16,
      paddingTop: 16,
    },

    // ✅ Data 기준
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 16,
      marginTop: 24,
    },

    // ✅ Data 기준
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background.secondary,
    },

    // ✅ Data 기준
    title: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.text.primary,
    },

    content: {
      paddingTop: 8,
      paddingBottom: 28,
      gap: 12,
    },

    card: {
      backgroundColor: theme.background.secondary,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.border.default,
    },

    cardTitle: {
      fontSize: 15,
      fontWeight: "700",
      color: theme.text.primary,
      marginBottom: 12,
    },

    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: theme.border.default,
    },

    label: {
      fontSize: 14,
      color: theme.text.secondary,
      fontWeight: "500",
    },

    value: {
      fontSize: 14,
      color: theme.text.primary,
      fontWeight: "600",
    },

    link: {
      textDecorationLine: "underline",
    },

    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: theme.border.default,
    },

    menuText: {
      fontSize: 14,
      color: theme.text.primary,
      fontWeight: "600",
    },

    note: {
      marginTop: 8,
      fontSize: 12,
      lineHeight: 18,
      color: theme.text.tertiary,
    },
  });
