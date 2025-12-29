import { StyleSheet } from "react-native";

export const createStyles = (theme: any) =>
  StyleSheet.create({
    backdrop: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0,0,0,0.4)",
    },

    sheet: {
      // position: "absolute",  // 제거
      // bottom: 0,             // 제거
      left: 0,
      right: 0,
      backgroundColor: theme.background.primary,
      padding: 16,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      minHeight: "90%",
    },

    handleArea: {
      alignItems: "center",
      paddingVertical: 16,
    },

    handleBar: {
      width: 36,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.text.tertiary,
    },

    label: {
      color: theme.text.primary,
      fontSize: 16,
      marginLeft: 4,
    },

    labelWithSpacing: {
      color: theme.text.primary,
      fontSize: 16,
      marginLeft: 4,
      marginBottom: 16,
    },

    labelSection: {
      color: theme.text.primary,
      fontSize: 16,
      marginLeft: 4,
      marginBottom: 8,
      marginTop: 24,
    },

    inputBase: {
      color: theme.text.primary,
      padding: 12,
      borderRadius: 8,
      backgroundColor: theme.background.secondary,
      marginVertical: 16,
    },

    titleInput: {
      minHeight: 40,
    },

    descInput: {
      minHeight: 80,
    },

    timeSectionWrap: {
      padding: 12,
      borderRadius: 8,
      backgroundColor: theme.background.secondary,
    },

    timeButton: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      backgroundColor: theme.background.primary,
      borderWidth: 1,
      borderColor:
        theme.border?.primary ?? theme.border?.default ?? theme.primary,
      alignItems: "center",
      justifyContent: "center",
    },

    timeText: {
      fontSize: 18,
      fontWeight: "600",
    },

    reminderLabel: {
      marginTop: 4,
      alignSelf: "flex-start",
      paddingVertical: 4,
      color: theme.text.primary,
      fontSize: 16,
      fontWeight: "500",
    },

    chipRow: {
      flexDirection: "row",
      gap: 8,
      marginTop: 12,
    },

    chipBase: {
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 16,
    },

    chipText: {
      color: theme.text.primary,
    },

    sectionTitle: {
      color: theme.text.primary,
      fontSize: 16,
      marginLeft: 4,
      marginBottom: 10,
      marginTop: 10,
    },

    categoryWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      marginTop: 6,
      marginBottom: 16,
    },
  });
