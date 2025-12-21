import { ViewStyle, TextStyle } from "react-native";

type Styles = {
  // todo list
  todoRow: ViewStyle;        // 카드 컨테이너
  todoContent: ViewStyle;   // 왼쪽 클릭 영역
  todoText: TextStyle;
  todoTextCompleted: TextStyle;

  actions: ViewStyle;
  deleteText: TextStyle;

  checkbox: ViewStyle;
  checkboxChecked: ViewStyle;

  // modal
  modalBackdrop: ViewStyle;
  modalBox: ViewStyle;
  input: TextStyle;
  modalActions: ViewStyle;
};

export const createComponentStyles = (theme): Styles => ({
  /* ======================
     Todo Card (리스트)
     ====================== */

  // 🔹 기존 todoRow → "카드" 역할
  todoRow: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: theme.background.secondary,
    borderRadius: 12,

    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,

    // Android shadow
    elevation: 3,
  },

  // 🔹 왼쪽 전체 클릭 영역
  todoContent: {
    flex: 1,
    paddingVertical: 4,
  },

  todoText: {
    color: theme.text.primary,
    fontSize: 16,
  },

  todoTextCompleted: {
    color: theme.text.tertiary,
    textDecorationLine: "line-through",
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  deleteText: {
    color: theme.text.tertiary,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: theme.border.medium,
    justifyContent: "center",
    alignItems: "center",
  },

  checkboxChecked: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },

  /* ======================
     Modal
     ====================== */

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    padding: 20,
  },

  modalBox: {
    backgroundColor: theme.background.secondary,
    borderRadius: 12,
    padding: 16,
  },

  input: {
    backgroundColor: theme.background.primary,
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    color: theme.text.primary,
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
});
