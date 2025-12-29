import { StyleSheet } from "react-native";

export const createStyles = (theme: any) =>
  StyleSheet.create({
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

    dangerButton: {
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

    disabled: {
      opacity: 0.6,
    },
  });
