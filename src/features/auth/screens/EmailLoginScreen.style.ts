import { StyleSheet } from "react-native";


const FIELD_HEIGHT = 56;

export const createStyles = (theme: any) =>
  StyleSheet.create({
    
    container: {
      flex: 1,
      backgroundColor: theme.background.primary,
      paddingHorizontal: 24,
    },

    title: {
      fontSize: 32,
      fontWeight: "700",
      color: theme.text.primary,
      marginBottom: 10,
    },

    subtitle: {
      fontSize: 15,
      color: theme.text.secondary,
      marginBottom: 40,
      lineHeight: 22,
    },

    card: {
      backgroundColor: theme.background.secondary,
      borderRadius: 18,
      padding: 20,
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 8 },
      elevation: 5,
    },

    input: {
      borderWidth: 1,
      borderColor: theme.border.default,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 16,
      fontSize: 16,
      color: theme.text.primary,
      backgroundColor: theme.background.primary,
      marginBottom: 16,
    },

    primaryButton: {
      height: FIELD_HEIGHT,
      backgroundColor: theme.primary,
      borderColor:theme.border.secondary,
      borderWidth:2,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
    },

    primaryButtonText: {
      color: theme.text.primary,
      fontSize: 16,
      fontWeight: "700",
    },

    helperText: {
      marginTop: 16,
      fontSize: 13,
      color: theme.text.tertiary,
      lineHeight: 18,
    },
  });
