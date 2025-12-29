// anniversary.style.ts
import { StyleSheet } from "react-native";

export const createStyles = (theme: any) =>
  StyleSheet.create({
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

    // ✅ 여기 중요: flex + minHeight(안드로이드)
    content: {
      flex: 1,
      minHeight: 0,
      paddingBottom: 24,
      gap: 12,
    },

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
      marginBottom: 12,
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

    cancelEditButton: {
      height: 32,
      paddingHorizontal: 12,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: theme.border.default,
      backgroundColor: theme.background.primary,
      justifyContent: "center",
      alignItems: "center",
    },

    cancelEditText: {
      fontSize: 12,
      fontWeight: "700",
      color: theme.text.secondary,
    },

    fieldLabel: {
      fontSize: 12,
      color: theme.text.secondary,
      fontWeight: "700",
      marginBottom: 8,
      marginTop: 10,
    },

    textInputWrap: {
      borderWidth: 1,
      borderColor: theme.border.medium,
      borderRadius: 12,
      overflow: "hidden",
      backgroundColor: theme.background.primary,
    },

    textInput: {
      paddingHorizontal: 12,
      height: 44,
      color: theme.text.primary,
      fontSize: 14,
    },

    primaryButton: {
      marginTop: 16,
      height: 48,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.border.medium,
      backgroundColor: theme.background.primary,
    },

    primaryButtonText: {
      fontSize: 15,
      fontWeight: "700",
      color: theme.text.primary,
    },

    disabled: {
      opacity: 0.6,
    },

    loadingBox: {
      paddingVertical: 20,
      alignItems: "center",
    },

    emptyText: {
      marginTop: 10,
      fontSize: 13,
      color: theme.text.secondary,
    },

    // ✅ 목록 섹션이 남은 높이를 차지
    listSection: {
      flex: 1,
      minHeight: 0,
    },

    // ✅ FlatList 높이 확보 + 스크롤 활성화
    list: {
      marginTop: 12,
      borderTopWidth: 1,
      borderTopColor: theme.border.default,
      flex: 1,
      minHeight: 0,
    },

    listContent: {
      paddingBottom: 8,
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
      flex: 1,
      paddingRight: 12,
    },

    nameText: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.text.primary,
    },

    subText: {
      marginTop: 2,
      fontSize: 12,
      color: theme.text.secondary,
    },

    right: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
    },

    selectBox: {
      height: 44,
      borderWidth: 1,
      borderColor: theme.border.medium,
      borderRadius: 12,
      backgroundColor: theme.background.primary,
      paddingHorizontal: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    selectText: {
      fontSize: 14,
      color: theme.text.primary,
      fontWeight: "600",
    },

    // modal
    modalRoot: {
      flex: 1,
      justifyContent: "flex-end",
    },

    modalOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.45)",
    },

    modalSheet: {
      padding: 16,
    },

    modalCard: {
      backgroundColor: theme.background.secondary,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: theme.border.default,
      padding: 16,
    },

    modalTitle: {
      fontSize: 16,
      fontWeight: "800",
      color: theme.text.primary,
      marginBottom: 12,
    },

    modalPickerRow: {
      flexDirection: "row",
      gap: 10,
    },

    modalPickerCol: {
      flex: 1,
      minWidth: 0,
    },

    modalLabel: {
      fontSize: 12,
      color: theme.text.secondary,
      fontWeight: "700",
      marginBottom: 8,
    },

    modalPickerBox: {
      borderWidth: 1,
      borderColor: theme.border.medium,
      borderRadius: 12,
      backgroundColor: theme.background.primary,
      height: 180,
      justifyContent: "center",
    },

    modalPicker: {
      height: 180,
      width: "100%",
      color: theme.text.primary,
      backgroundColor: theme.background.primary,
    },

    modalPickerItem: {
      color: theme.text.primary,
    },

    modalActions: {
      marginTop: 14,
      flexDirection: "row",
      gap: 10,
    },

    modalBtn: {
      flex: 1,
      height: 46,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
    },

    modalBtnGhost: {
      borderColor: theme.border.default,
      backgroundColor: theme.background.primary,
    },

    modalBtnGhostText: {
      fontSize: 14,
      fontWeight: "800",
      color: theme.text.secondary,
    },

    modalBtnPrimary: {
      borderColor: theme.border.medium,
      backgroundColor: theme.background.primary,
    },

    modalBtnPrimaryText: {
      fontSize: 14,
      fontWeight: "900",
      color: theme.text.primary,
    },
  });
