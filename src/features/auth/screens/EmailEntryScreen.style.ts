import { StyleSheet } from "react-native";

export const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background.primary,
    },

    content: {
      paddingHorizontal: 24,
      paddingTop: 16,
      paddingBottom: 28,
    },

    header: {
      marginTop: 16,
      marginBottom: 18,
      alignItems: "center",
    },

    title: {
      fontSize: 26,
      fontWeight: "800",
      color: theme.text.primary,
      marginBottom: 8,
    },

    subtitle: {
      fontSize: 13,
      color: theme.text.secondary,
    },

    form: {
      backgroundColor: theme.background.primary,
      borderRadius: 18,
    },

    label: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.text.primary,
      marginTop: 14,
      marginBottom: 8,
    },

    inputWrap: {
      position: "relative",
      borderWidth: 1,
      borderColor: theme.border.default,
      borderRadius: 12,
      backgroundColor: theme.background.primary,
    },

    input: {
      paddingHorizontal: 14,
      paddingVertical: 14,
      fontSize: 16,
      color: theme.text.primary,
      paddingRight: 44,
      borderRadius: 12,
    },

    eyeButton: {
      position: "absolute",
      right: 10,
      top: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      width: 34,
    },

    rules: {
      marginTop: 10,
      gap: 8,
    },

    matchText: {
      marginTop: 8,
      fontSize: 13,
    },
    matchOk: {
      color: "#16a34a",
      fontWeight: "600",
    },
    matchBad: {
      color: "#ef4444",
      fontWeight: "600",
    },

    submitButton: {
      marginTop: 18,
      height: 54,
      borderRadius: 12,
      backgroundColor: "#f79affff",
      alignItems: "center",
      justifyContent: "center",
    },

    submitButtonText: {
      fontSize: 16,
      fontWeight: "800",
      color: theme.text.primary,
    },

    notice: {
      marginTop: 14,
      fontSize: 12,
      color: theme.text.tertiary,
      lineHeight: 18,
    },

    agreeRow: {
      marginTop: 14,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },

    agreeText: {
      flex: 1,
      fontSize: 12,
      color: theme.text.secondary,
      lineHeight: 16,
    },

    dividerRow: {
      marginTop: 18,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },

    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.border.default,
    },

    dividerText: {
      fontSize: 12,
      color: theme.text.tertiary,
      fontWeight: "600",
    },

    socialRow: {
      marginTop: 14,
      flexDirection: "row",
      justifyContent: "center",
      gap: 14,
    },

    socialButton: {
      width: 48,
      height: 48,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: theme.border.default,
      backgroundColor: theme.background.secondary,
      justifyContent: "center",
      alignItems: "center",
    },

    socialK: {
      fontSize: 18,
      fontWeight: "900",
      color: theme.text.primary,
    },

    inputWrapError: {
  borderColor: "#ef4444",
},

errorText: {
  marginTop: 6,
  fontSize: 12,
  color: "#ef4444",
},





  });
