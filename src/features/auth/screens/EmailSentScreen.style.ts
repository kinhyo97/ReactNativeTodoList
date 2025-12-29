import { StyleSheet } from "react-native";

export const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background.primary,
      paddingHorizontal: 24,
    },

    header: {
      paddingTop: 16,
      paddingHorizontal: 16,
    },

    content: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 24,
      paddingBottom: 24,
    },

    card: {
      backgroundColor: theme.background.secondary,
      borderRadius: 20,
      padding: 28,
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.border?.default ?? "transparent",
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 8 },
      elevation: 5,
    },

    iconWrapper: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: theme.primary + "20",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 18,
    },

    icon: {
      fontSize: 42,
    },

    title: {
      fontSize: 22,
      fontWeight: "700",
      color: theme.text.primary,
      marginBottom: 10,
      textAlign: "center",
    },

    description: {
      fontSize: 14,
      color: theme.text.secondary,
      lineHeight: 20,
      textAlign: "center",
      marginBottom: 14,
    },

    emailText: {
      fontSize: 13,
      color: theme.text.tertiary,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 999,
      backgroundColor: theme.background.primary,
      borderWidth: 1,
      borderColor: theme.border?.default ?? "transparent",
      marginBottom: 18,
      textAlign: "center",
    },

    buttonGroup: {
      width: "100%",
      gap: 10,
      marginTop: 4,
    },

    primaryButton: {
      width: "100%",
      height: 56,
      borderRadius: 14,
      backgroundColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
    },

    primaryButtonText: {
      color: theme.text.primary,
      fontSize: 16,
      fontWeight: "700",
    },

    secondaryButton: {
      width: "100%",
      height: 56,
      borderRadius: 14,
      backgroundColor: theme.background.primary,
      borderWidth: 1,
      borderColor: theme.border?.default ?? theme.primary,
      justifyContent: "center",
      alignItems: "center",
    },

    secondaryButtonText: {
      color: theme.text.primary,
      fontSize: 16,
      fontWeight: "700",
    },

    helperText: {
      marginTop: 16,
      fontSize: 13,
      color: theme.text.tertiary,
      textAlign: "center",
      lineHeight: 18,
    },
  });
