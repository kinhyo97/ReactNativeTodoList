import { StyleSheet } from "react-native";

export const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },

    input: {
      borderWidth: 1,
      borderColor: theme.border.primary,
      padding: 8,
      marginBottom: 8,
      color: theme.text.primary,
      backgroundColor: theme.surface,
    },

    addButton: {
      padding: 10,
      backgroundColor: theme.primary,
      borderRadius: 4,
      marginBottom: 12,
    },

    addButtonText: {
      color: theme.onPrimary,
      textAlign: "center",
    },

    todoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 8,
      borderBottomWidth: 1,
      borderBottomColor: theme.border.primary,
      paddingBottom: 6,
    },

    deleteButton: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      backgroundColor: theme.danger,
      borderRadius: 4,
    },

    deleteButtonText: {
      color: theme.text.primary,
    },
  });
