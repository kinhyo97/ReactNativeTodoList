import { StyleSheet } from "react-native";

export const createStyles = (theme: any) =>
  StyleSheet.create({
    // data.tsx 기준
    container: {
      flex: 1,
      backgroundColor: theme.background.primary,
      paddingHorizontal: 16,
      paddingTop: 16,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 16,
      marginTop: 24,
    },

    backButton: {
      width: 40,
      height: 40,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background.secondary,
    },

    title: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.text.primary,
    },

    content: {
      paddingBottom: 24,
    },

    // section 카드
    section: {
      backgroundColor: theme.background.secondary,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.border.default,
    },

    sectionHeaderRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 12,
    },

    sectionHeaderText: {
      flex: 1,
    },

    sectionTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.text.primary,
      marginBottom: 6,
    },

    sectionDesc: {
      fontSize: 13,
      color: theme.text.secondary,
      lineHeight: 18,
    },

    addButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      height: 36,
      paddingHorizontal: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border.default,
      backgroundColor: theme.background.primary,
    },

    addButtonText: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.text.primary,
    },

    loadingBox: {
      paddingVertical: 20,
      alignItems: "center",
    },

    emptyText: {
      marginTop: 12,
      fontSize: 13,
      color: theme.text.secondary,
    },

    list: {
      marginTop: 12,
      borderTopWidth: 1,
      borderTopColor: theme.border.default,
    },

    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.border.default,
    },

    left: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      flex: 1,
      paddingRight: 12,
    },

    colorPreview: {
      width: 14,
      height: 14,
      borderRadius: 7,
    },

    nameText: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.text.primary,
      flex: 1,
    },

    right: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
    },

    // ---- Modal styles (CategoryCreateModal 참고) ----
    backdrop: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 40,
      backgroundColor: "rgba(0,0,0,0.25)",
    },

    blurLayer: {
      ...StyleSheet.absoluteFillObject,
    },

    kav: {
      width: "100%",
      alignItems: "center",
    },

    modalBox: {
      width: "85%",
      padding: 16,
      borderRadius: 12,
      backgroundColor: theme.background.primary,
    },

    modalTitle: {
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
      gap: 10,
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

    disabled: {
      opacity: 0.6,
    },
  });
