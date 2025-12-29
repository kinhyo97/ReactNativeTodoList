// CategoryCreateModal.style.ts
import { StyleSheet } from "react-native";

export const createStyles = (theme: any) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 40,
    },

   modalBox: {
      width: "85%",
      padding: 16,
      borderRadius: 12,
      backgroundColor: theme.background.primary,
    },

    title: {
      color: theme.text.primary,
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 12,
    },

    input: {
      borderWidth: 1,
      borderColor: theme.border.medium,
      borderRadius: 8,
      paddingHorizontal: 12,
      height: 44,
      color: theme.text.primary,
      marginBottom: 12,
    },

    colorLabel: {
      color: theme.text.secondary,
      fontSize: 13,
      marginBottom: 8,
    },

    colorWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 16,
    },

    colorDot: {
      width: 32,
      height: 32,
      borderRadius: 16,
      marginRight: 8,
      marginBottom: 8,
      justifyContent: "center",
      alignItems: "center",
    },

    colorDotInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: "#fff",
    },

    actions: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: 10, // ✅ 버튼 사이 간격
    },

    cancelButton: {
      height: 44,
      paddingHorizontal: 14,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background.secondary,
      borderWidth: 1,
      borderColor: theme.border.default,
    },

    cancelText: {
      color: theme.text.secondary,
      fontSize: 14,
      fontWeight: "600",
    },

    // ✅ 추가 버튼 (새로 추가)
    confirmButton: {
      height: 44,
      paddingHorizontal: 14,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background.secondary,
      borderWidth: 1,
      borderColor: theme.border.default,
    },

    confirmText: {
      color: theme.text.primary,
      fontSize: 14,
      fontWeight: "700",
    },

    blurLayer: {
  ...StyleSheet.absoluteFillObject,
},
kav: {
      width: "100%",
      alignItems: "center",
    },

    
  });
