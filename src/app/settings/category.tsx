import {
  View,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "@/styles/hooks/useTheme";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

import * as categoryApi from "@/features/todo/services/category.api"; // 필요시 경로 수정
import { CATEGORY_COLORS } from "@/constants/categoryColors";
import { createStyles } from "./category.style";

type Category = {
  id: number;
  name: string;
  color: string;
};

function CategoryFormModal({
  visible,
  mode,
  initialName,
  initialColor,
  onClose,
  onSubmit,
}: {
  visible: boolean;
  mode: "create" | "edit";
  initialName?: string;
  initialColor?: string;
  onClose: () => void;
  onSubmit: (payload: { name: string; color: string }) => Promise<void>;
}) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [name, setName] = useState(initialName ?? "");
  const [color, setColor] = useState(initialColor ?? "#3b82f6");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (visible) {
      setName(initialName ?? "");
      setColor(initialColor ?? "#3b82f6");
      setSubmitting(false);
    }
  }, [visible, initialName, initialColor]);

  const handleSubmit = async () => {
    if (!name.trim()) return;

    try {
      setSubmitting(true);
      await onSubmit({ name: name.trim(), color });
      onClose();
    } catch (err) {
      console.error("[CategoryFormModal] submit error", err);
      Alert.alert("실패", "처리 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.backdrop}>
          <BlurView intensity={30} tint="dark" style={styles.blurLayer} />

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
            style={styles.kav}
          >
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>
                {mode === "create" ? "카테고리 추가" : "카테고리 수정"}
              </Text>

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

                <Pressable
                  onPress={handleSubmit}
                  disabled={submitting}
                  style={[styles.confirmButton, submitting && styles.disabled]}
                >
                  {submitting ? (
                    <ActivityIndicator />
                  ) : (
                    <Text style={styles.confirmText}>
                      {mode === "create" ? "추가" : "저장"}
                    </Text>
                  )}
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default function CategorySettingsScreen() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Category[]>([]);

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      // ✅ 서비스 함수명 다르면 여기만 바꾸면 됨
      const list: Category[] = await categoryApi.getCategories();
      setItems(list);
    } catch (err) {
      console.error("[CategorySettings] fetch error", err);
      Alert.alert("실패", "카테고리를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (payload: { name: string; color: string }) => {
    // ✅ 서비스 함수명 다르면 여기만 바꾸면 됨
    await categoryApi.createCategory(payload);
    await fetchCategories();
  };

  const handleEdit = async (payload: { name: string; color: string }) => {
    if (!editing) return;
    // ✅ 서비스 함수명 다르면 여기만 바꾸면 됨
    await categoryApi.updateCategory(editing.id, payload);
    await fetchCategories();
  };

  const handleDelete = (c: Category) => {
    Alert.alert(
      "카테고리 삭제",
      `"${c.name}" 카테고리를 삭제할까요?\n삭제하면 복구할 수 없습니다.`,
      [
        { text: "취소", style: "cancel" },
        {
          text: "삭제",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              // ✅ 서비스 함수명 다르면 여기만 바꾸면 됨
              await categoryApi.deleteCategory(c.id);
              await fetchCategories();
            } catch (err) {
              console.error("[CategorySettings] delete error", err);
              Alert.alert("실패", "삭제 중 오류가 발생했습니다.");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* data.tsx 헤더 톤 */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          style={({ pressed }) => [styles.backButton, { opacity: pressed ? 0.5 : 1 }]}
        >
          <Ionicons name="chevron-back" size={28} color={theme.text.primary} />
        </Pressable>

        <Text style={styles.title}>카테고리</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionHeaderText}>
              <Text style={styles.sectionTitle}>카테고리 관리</Text>
              <Text style={styles.sectionDesc}>
                Todo에서 사용할 카테고리를 추가/수정/삭제할 수 있습니다.
              </Text>
            </View>

            <Pressable
              onPress={() => setCreateOpen(true)}
              style={({ pressed }) => [
                styles.addButton,
                { opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <Ionicons name="add" size={18} color={theme.text.primary} />
              <Text style={styles.addButtonText}>추가</Text>
            </Pressable>
          </View>

          {loading ? (
            <View style={styles.loadingBox}>
              <ActivityIndicator />
            </View>
          ) : items.length === 0 ? (
            <Text style={styles.emptyText}>카테고리가 없습니다. 추가해 주세요.</Text>
          ) : (
            <View style={styles.list}>
              {items.map((c) => (
                <View key={c.id} style={styles.row}>
                  <View style={styles.left}>
                    <View style={[styles.colorPreview, { backgroundColor: c.color }]} />
                    <Text style={styles.nameText} numberOfLines={1}>
                      {c.name}
                    </Text>
                  </View>

                  <View style={styles.right}>
                    <Pressable
                      onPress={() => {
                        setEditing(c);
                        setEditOpen(true);
                      }}
                      hitSlop={8}
                      style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
                    >
                      <Ionicons name="create-outline" size={18} color={theme.text.secondary} />
                    </Pressable>

                    <Pressable
                      onPress={() => handleDelete(c)}
                      hitSlop={8}
                      style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
                    >
                      <Ionicons name="trash-outline" size={18} color={"#ef4444"} />
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Create */}
      <CategoryFormModal
        visible={createOpen}
        mode="create"
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreate}
      />

      {/* Edit */}
      <CategoryFormModal
        visible={editOpen}
        mode="edit"
        initialName={editing?.name}
        initialColor={editing?.color}
        onClose={() => {
          setEditOpen(false);
          setEditing(null);
        }}
        onSubmit={handleEdit}
      />
    </View>
  );
}
