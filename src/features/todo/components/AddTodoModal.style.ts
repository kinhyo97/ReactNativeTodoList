// AddTodoModal.style.ts
import { StyleSheet } from "react-native";

export const createStyles = (theme: any) =>
  StyleSheet.create({
    flex1: {
      flex: 1,
    },

    sectionTitle: {
      color: theme.text.primary,
      marginBottom: 8,
    },

    categoryWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 16,
    },

    dateRow: {
      flexDirection: "row",
      gap: 8,
      marginBottom: 16,
    },

    dateText: {
      color: theme.text.primary,
    },

    dateSeparator: {
      color: theme.text.secondary,
    },

    timeTitle: {
      color: theme.text.primary,
      marginTop: 16,
      marginBottom: 8,
    },

    timeButton: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      backgroundColor: theme.background.secondary,
      borderWidth: 1,
      borderColor: theme.background.primary,
      alignItems: "center",
      marginBottom: 16,
    },

    timeText: {
      fontSize: 18,
      fontWeight: "600",
    },

    cancelButton: {
      flex: 1,
      height: 48,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.border.medium,
      backgroundColor: theme.background.secondary,
      justifyContent: "center",
      alignItems: "center",
    },

    cancelText: {
      color: theme.text.secondary,
      fontSize: 16,
    },

    saveButton: {
      flex: 1,
      height: 48,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.border.medium,
      backgroundColor: theme.background.primary,
      justifyContent: "center",
      alignItems: "center",
    },

    saveText: {
      color: theme.text.primary,
      fontSize: 16,
      fontWeight: "600",
    },
  });
