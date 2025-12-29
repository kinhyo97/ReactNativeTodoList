import { StyleSheet } from "react-native";

export const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8,
      paddingHorizontal: 4,
    },

    hitSlop: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
    },

    icon: {
      fontSize: 18,
      color: theme.text.primary,
      marginRight: 6,
    },

    text: {
      fontSize: 15,
      fontWeight: "500",
      color: theme.text.primary,
    },
  });
