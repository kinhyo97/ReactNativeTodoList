import {
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
  Keyboard,
  ScrollView,
  Animated,
  PanResponder,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTheme } from "@/styles/hooks/useTheme";
import { Todo } from "../types/todo.types";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDebouncedEffect } from "@/utils/debounce";
import * as todoApi from "../services/todo.api";
import { TimePickerModal } from "../components/TimePickerModal";
import { useTodoStore } from "../store/todo.store";
import { registerTodoReminder, cancelTodoReminder } from "@/utils/notification";
import { createStyles } from "./TodoDetailModal.style";
import * as categoryApi from "../services/category.api";
import { Category } from "../types/category.types";
import { CategoryCreateModal } from "../components/CategoryCreateModal";
import { CategoryTag } from "./CategoryTag";

interface TodoDetailModalProps {
  visible: boolean;
  todo: Todo | null;
  onClose: () => void;
  onSaved?: () => void;
}

export function TodoDetailModal({
  visible,
  todo,
  onClose,
  onSaved,
}: TodoDetailModalProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [description, setDescription] = useState("");
  const [reminderTime, setReminderTime] = useState<Date | null>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [title, setTitle] = useState("");
  const lastSentRef = useRef<string>("");
  const dragOffsetY = useRef(0);
  const prevOffsetRef = useRef<number | null>(null);

  const [reminderOffset, setReminderOffset] = useState<number | null>(null);

  // 카테고리관련
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState<string>("불러오는 중...");
  const [categoryColor, setCategoryColor] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [tempCategoryId, setTempCategoryId] = useState<number | null>(null);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showCategoryCreate, setShowCategoryCreate] = useState(false);

  useEffect(() => {
    if (!visible || !todo) return;

    (async () => {
      try {
        const list = await categoryApi.getCategories();
        setCategories(list);

        const currentId = (todo as any).categoryId as number | null | undefined;
        setSelectedCategoryId(currentId ?? null);

        const found = currentId ? list.find((c) => c.id === currentId) : null;
        setCategoryName(found ? found.name : "없음");
        setCategoryColor(found ? found.color : null);
      } catch (e) {
        console.error(e);
        setCategories([]);
        setSelectedCategoryId(null);
        setCategoryName("없음");
        setCategoryColor(null);
      }
    })();
  }, [visible, todo]);

  useEffect(() => {
    if (!showCategoryPicker) return;
    setTempCategoryId(selectedCategoryId);
  }, [showCategoryPicker, selectedCategoryId]);

  useEffect(() => {
    if (!visible || !todo) return;
    setReminderOffset(todo.reminderOffset ?? null);
  }, [visible, todo]);

  const prevReminderRef = useRef<string | null>(null);
  useEffect(() => {
    if (!visible || !todo) return;
    prevReminderRef.current = todo.reminderTime ?? null;
    prevOffsetRef.current = todo.reminderOffset ?? null;
  }, [visible, todo]);

  const updateTodoState = useTodoStore((s) => s.updateTodoState);

  useEffect(() => {
    if (!visible || !todo) return;

    setTitle(todo.title);
    setDescription(todo.description ?? "");
    setReminderTime(todo.reminderTime ? new Date(todo.reminderTime) : null);

    lastSentRef.current = JSON.stringify({
      title: todo.title,
      description: todo.description ?? "",
      reminderTime: todo.reminderTime
        ? new Date(todo.reminderTime).toISOString()
        : null,
      reminderOffset: todo.reminderOffset ?? null,
      categoryId: (todo as any).categoryId ?? null,
    });
  }, [visible, todo]);

  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      translateY.setValue(500);
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const patchTodo = async () => {
    if (!todo) return;

    const currentReminderISO = reminderTime ? reminderTime.toISOString() : null;

    const reminderChanged =
      prevReminderRef.current !== currentReminderISO ||
      prevOffsetRef.current !== reminderOffset;

    let newNotificationId = todo.notificationId ?? null;

    if (reminderChanged) {
      if (todo.notificationId) {
        await cancelTodoReminder(todo.notificationId);
      }

      if (reminderTime) {
        newNotificationId = await registerTodoReminder(
          title,
          reminderTime,
          reminderOffset
        );
      } else {
        newNotificationId = null;
      }

      prevReminderRef.current = currentReminderISO;
      prevOffsetRef.current = reminderOffset;
    }

    const payload = {
      title,
      description,
      reminderOffset,
      reminderTime: currentReminderISO,
      notificationId: newNotificationId,
      categoryId: selectedCategoryId,
    };

    const serialized = JSON.stringify(payload);
    if (serialized === lastSentRef.current) return;

    lastSentRef.current = serialized;

    await todoApi.updateTodo(todo.id, payload);
    updateTodoState(todo.id, payload);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => !showTimePicker,
      onMoveShouldSetPanResponderCapture: () => !showTimePicker,
      onStartShouldSetPanResponder: () => !showTimePicker,
      onMoveShouldSetPanResponder: (_, g) =>
        !showTimePicker && Math.abs(g.dy) > Math.abs(g.dx),
      onPanResponderGrant: () => {
        dragOffsetY.current = 0;
      },
      onPanResponderMove: (_, g) => {
        if (g.dy > 0) {
          translateY.setValue(dragOffsetY.current + g.dy);
        }
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy > 120) {
          Animated.timing(translateY, {
            toValue: 500,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            onClose();
          });
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useDebouncedEffect(() => {
    if (!todo) return;
    patchTodo();
  }, [title, description], 700);

  useDebouncedEffect(() => {
    if (!todo) return;
    patchTodo();
  }, [reminderTime], 300);

  useDebouncedEffect(() => {
    if (!todo) return;
    patchTodo();
  }, [reminderOffset], 300);

  useDebouncedEffect(() => {
    if (!todo) return;
    patchTodo();
  }, [selectedCategoryId], 300);

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="none">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* backdrop */}
        <Pressable
          style={styles.backdrop}
          onPress={() => {
            Keyboard.dismiss();
            patchTodo();
            onClose();
          }}
        />

        {/* sheet를 레이아웃 흐름 안에서 하단 정렬 */}
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Animated.View
            style={[
              styles.sheet,
              {
                transform: [{ translateY }],
              },
            ]}
          >
            <View {...panResponder.panHandlers} style={styles.handleArea}>
              <View style={styles.handleBar} />
            </View>

            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ paddingBottom: 24 }}
            >
              <Text style={styles.label}>카테고리</Text>

              <Pressable
                onPress={() => setShowCategoryPicker(true)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 8,
                  marginBottom: 12,
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 999,
                    backgroundColor:
                      categoryColor ?? theme.background.secondary,
                    borderWidth: 1,
                    borderColor: theme.border.light,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "700",
                      color: categoryColor ? "#fff" : theme.text.secondary,
                    }}
                  >
                    {categoryName}
                  </Text>
                </View>
              </Pressable>

              {showCategoryPicker && (
                <Modal
                  visible
                  transparent
                  animationType="fade"
                  onRequestClose={() => setShowCategoryPicker(false)}
                >
                  <Pressable
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.35)" }}
                    onPress={() => setShowCategoryPicker(false)}
                  />

                  <View
                    style={{
                      position: "absolute",
                      left: 16,
                      right: 16,
                      top: "25%",
                      borderRadius: 18,
                      padding: 16,
                      borderWidth: 1,
                      borderColor: theme.border.light,
                      backgroundColor: theme.background.primary,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "800",
                        color: theme.text.primary,
                        marginBottom: 12,
                      }}
                    >
                      카테고리 선택
                    </Text>

                    <ScrollView
                      keyboardShouldPersistTaps="handled"
                      contentContainerStyle={{ paddingBottom: 12 }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          gap: 10,
                        }}
                      >
                        {categories.map((cat) => (
                          <CategoryTag
                            key={cat.id}
                            label={cat.name}
                            color={cat.color}
                            selected={tempCategoryId === cat.id}
                            onPress={() => setTempCategoryId(cat.id)}
                          />
                        ))}

                        <CategoryTag
                          label="+ 추가"
                          color={theme.text.secondary}
                          selected={false}
                          onPress={() => setShowCategoryCreate(true)}
                        />
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          gap: 10,
                          marginTop: 16,
                        }}
                      >
                        <Pressable
                          onPress={() => setShowCategoryPicker(false)}
                          style={{
                            paddingVertical: 10,
                            paddingHorizontal: 14,
                            borderRadius: 12,
                            backgroundColor: theme.background.secondary,
                            borderWidth: 1,
                            borderColor: theme.border.light,
                          }}
                        >
                          <Text
                            style={{
                              color: theme.text.primary,
                              fontWeight: "700",
                            }}
                          >
                            취소
                          </Text>
                        </Pressable>

                        <Pressable
                          onPress={() => {
                            const nextId = tempCategoryId ?? null;
                            setSelectedCategoryId(nextId);

                            const found = nextId
                              ? categories.find((c) => c.id === nextId)
                              : null;
                            setCategoryName(found ? found.name : "없음");
                            setCategoryColor(found ? found.color : null);

                            setShowCategoryPicker(false);
                            setTimeout(() => onSaved?.(), 800);
                          }}
                          style={{
                            paddingVertical: 10,
                            paddingHorizontal: 14,
                            borderRadius: 12,
                            backgroundColor: theme.background.tertiary,
                            borderWidth: 1,
                            borderColor: theme.border.light,
                          }}
                        >
                          <Text
                            style={{
                              color: theme.text.primary,
                              fontWeight: "800",
                            }}
                          >
                            저장
                          </Text>
                        </Pressable>
                      </View>
                    </ScrollView>
                  </View>

                  <CategoryCreateModal
                    visible={showCategoryCreate}
                    onClose={() => setShowCategoryCreate(false)}
                    onCreated={async () => {
                      const list = await categoryApi.getCategories();
                      setCategories(list);
                    }}
                  />
                </Modal>
              )}

              <Text style={styles.label}>제목</Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="상세 내용 입력 (선택)"
                placeholderTextColor={theme.text.tertiary}
                style={[styles.inputBase, styles.titleInput]}
                multiline
              />

              <Text style={styles.labelWithSpacing}>시간</Text>

              <Pressable
                onPress={() => setShowTimePicker(true)}
                style={styles.timeSectionWrap}
              >
                <Pressable
                  onPress={() => setShowTimePicker(true)}
                  style={styles.timeButton}
                >
                  <Text
                    style={[
                      styles.timeText,
                      {
                        color: reminderTime
                          ? theme.text.primary
                          : theme.text.tertiary,
                      },
                    ]}
                  >
                    {reminderTime
                      ? reminderTime.toLocaleTimeString("ko-KR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "⏰ 시간 선택"}
                  </Text>
                </Pressable>

                <Text style={styles.reminderLabel}>미리알림</Text>

                <View style={styles.chipRow}>
                  {[null, 10, 30, 60].map((v) => (
                    <Pressable
                      key={String(v)}
                      onPress={() => setReminderOffset(v)}
                      style={[
                        styles.chipBase,
                        {
                          backgroundColor:
                            reminderOffset === v
                              ? theme.background.tertiary
                              : theme.background.secondary,
                        },
                      ]}
                    >
                      <Text style={styles.chipText}>
                        {v === null ? "정각" : `${v}분 전`}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </Pressable>

              <Text style={styles.labelSection}>상세내용</Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="상세 내용 입력 (선택)"
                placeholderTextColor={theme.text.tertiary}
                style={[styles.inputBase, styles.descInput]}
                multiline
              />
            </ScrollView>
          </Animated.View>
        </View>

        {showTimePicker && (
          <TimePickerModal
            visible={true}
            initialTime={reminderTime ?? new Date()}
            onConfirm={(time) => setReminderTime(time)}
            onClose={() => setShowTimePicker(false)}
          />
        )}
      </KeyboardAvoidingView>
    </Modal>
  );
}
