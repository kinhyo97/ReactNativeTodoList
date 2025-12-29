import { StyleSheet } from "react-native";

export const createStyles = (theme: any) =>
  StyleSheet.create({
    root: {
      position: "relative",
      marginTop:16,
    },

    dayCell: {
      width: 44,
      minHeight: 40,
      paddingTop: 0,
      alignItems: "center",
    },

    dateBadge: {
      width: 28,
      height: 16,
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center",
    },

    dateText: {
      fontSize: 14,
    },

    holidayPill: {
      width: 60,
      height: 14,
      backgroundColor: "transparent",
      borderRadius: 4,
      justifyContent: "center",
      paddingHorizontal: 2,
      marginBottom: 2,
    },

    holidayText: {
      fontSize: 9,
      lineHeight: 10,
      color: "#ef4444",
      textAlign: "center",
      fontWeight: "600",
    },

    anniversaryText: {
      fontSize: 10,
      lineHeight: 12,
      color: "#f59e0b",
      fontWeight: "500",
    },

    todoPill: {
      width: 36,
      height: 14,
      borderRadius: 4,
      justifyContent: "center",
      paddingHorizontal: 2,
      marginBottom: 2,
    },

    todoText: {
      fontSize: 9,
      lineHeight: 10,
      color: theme.text.primary,
      textAlign: "center",
    },

    monthTouchOverlay: {
      position: "absolute",
      top: 0,
      left: 60,
      right: 60,
      height: 48,
      zIndex: 10,
    },
  });
