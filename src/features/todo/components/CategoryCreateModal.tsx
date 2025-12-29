import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";
import { useTheme } from "@/styles/hooks/useTheme";
import * as categoryApi from "../services/category.api";
import { CATEGORY_COLORS } from "@/constants/categoryColors";
import { createStyles } from "./CategoryCreateModal.style";
import { BlurView } from "expo-blur";

interface CategoryCreateModalProps {
  visible: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export function CategoryCreateModal({
  visible,
  onClose,
  onCreated,
}: CategoryCreateModalProps) {
  const theme = useTheme();
  const styles = createStyles(theme);

  const [name, setName] = useState("");
  const [color, setColor] = useState("#3b82f6");

  const handleCreate = async () => {
    if (!name.trim()) return;

    try {
      await categoryApi.createCategory({ name, color });
      setName("");
      onCreated();
      onClose();
    } catch (err) {
      console.error("카테고리 생성 실패", err);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* 바깥 터치하면 키보드 내려가게 */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.backdrop}>
          <BlurView intensity={30} tint="dark" style={styles.blurLayer} />

          {/* ✅ 키보드 올라오면 모달 박스 위로 */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
            style={styles.kav}
          >
            <View style={styles.modalBox}>
              <Text style={styles.title}>카테고리 추가</Text>

              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="카테고리 이름"
                placeholderTextColor={theme.text.tertiary}
                style={styles.input}
                returnKeyType="done"
              />

              <Text style={styles.colorLabel}>색상 선택</Text>

              <View style={styles.colorWrap}>
                {CATEGORY_COLORS.map((c) => {
                  const selected = color === c;

                  return (
                    <Pressable
                      key={c}
                      onPress={() => setColor(c)}
                      style={[
                        styles.colorDot,
                        {
                          backgroundColor: c,
                          borderWidth: selected ? 3 : 0,
                          borderColor: theme.text.primary,
                        },
                      ]}
                    >
                      {selected && <View style={styles.colorDotInner} />}
                    </Pressable>
                  );
                })}
              </View>

              <View style={styles.actions}>
                <Pressable onPress={onClose} style={styles.cancelButton}>
                  <Text style={styles.cancelText}>취소</Text>
                </Pressable>

                <Pressable onPress={handleCreate} style={styles.confirmButton}>
                  <Text style={styles.confirmText}>추가</Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
