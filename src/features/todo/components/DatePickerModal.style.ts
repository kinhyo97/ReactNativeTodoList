// DatePickerModal.style.ts
import { StyleSheet } from "react-native";

export const createStyles = (theme: any) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.4)",
    },

    sheet: {
      backgroundColor: theme.background.primary,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      padding: 16,
    },

    actions: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 12,
      marginBottom: 24,
      gap: 4,
    },

    cancelButtonBase: {
      flex: 1,
      height: 48,
      borderRadius: 12,

      backgroundColor: theme.background.secondary,
      borderWidth: 1,
      borderColor: theme.border.medium,

      justifyContent: "center",
      alignItems: "center",
    },

    cancelText: {
      color: theme.text.secondary,
      fontSize: 15,
      fontWeight: "500",
    },

    confirmButtonBase: {
      flex: 1,
      height: 48,
      borderRadius: 12,

      backgroundColor: theme.text.primary,

      justifyContent: "center",
      alignItems: "center",
    },

    confirmText: {
      color: theme.text.inverse,
      fontSize: 16,
      fontWeight: "600",
      letterSpacing: 0.3,
    },
  });
