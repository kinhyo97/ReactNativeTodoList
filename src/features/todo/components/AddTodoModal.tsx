import { Modal, View, Text, TextInput, Pressable } from "react-native";
import { useTheme } from "@/styles/hooks/useTheme";

import { createComponentStyles } from "../styles/TodoComponents.styles";

export function AddTodoModal({
  visible,
  title,
  onChangeTitle,
  onClose,
  onSave,
}) {
  const theme = useTheme();
  const styles = createComponentStyles(theme);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackdrop}>
        <View style={styles.modalBox}>
          <Text style={{ color: theme.text.primary, marginBottom: 8 }}>
            할 일 추가
          </Text>

          <TextInput
            value={title}
            onChangeText={onChangeTitle}
            placeholder="할 일 입력"
            placeholderTextColor={theme.text.tertiary}
            style={styles.input}
          />

          <View style={styles.modalActions}>
            {/* 취소 */}
            <Pressable
              onPress={onClose}
              style={({ pressed }) => ({
                flex: 1,
                height: 48,
                borderRadius: 10,

                borderWidth: 1,
                borderColor: theme.border.medium,
                backgroundColor: theme.background.secondary,

                justifyContent: "center",
                alignItems: "center",

                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text style={{ color: theme.text.secondary, fontSize: 16 }}>
                취소
              </Text>
            </Pressable>

            {/* 저장 */}
            <Pressable
              onPress={onSave}
              style={({ pressed }) => ({
                flex: 1,
                height: 48,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: theme.border.medium,

                backgroundColor: theme.background.primary,

                justifyContent: "center",
                alignItems: "center",

                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text
                style={{
                  color: theme.text.primary,
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                저장
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
