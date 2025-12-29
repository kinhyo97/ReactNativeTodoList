// AddTodoModal.tsx
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useTheme } from "@/styles/hooks/useTheme";
import { createComponentStyles } from "../styles/TodoComponents.styles";
import { createStyles as createAddTodoModalStyles } from "./AddTodoModal.style";
import { useEffect, useState } from "react";
import { CategoryTag } from "./CategoryTag";
import * as categoryApi from "../services/category.api";
import { Category } from "../types/category.types";
import { CategoryCreateModal } from "./CategoryCreateModal";
import { DatePickerModal } from "./DatePickerModal";
import { TimePickerModal } from "./TimePickerModal";

export function AddTodoModal({
  visible,
  title,
  onChangeTitle,
  onClose,
  onSave,
  selectedDate,
}) {
  const theme = useTheme();
  const styles = createComponentStyles(theme); // 기존 스타일(먹고있는거) 유지
  const modalStyles = createAddTodoModalStyles(theme); // 하드코딩 분리 스타일

  /* ======================
     Category
  ====================== */
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  /* ======================
     Date
  ====================== */
  const [startDate, setStartDate] = useState(selectedDate);
  const [endDate, setEndDate] = useState(selectedDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerType, setPickerType] = useState<"start" | "end" | null>(null);

  const openDatePicker = (type: "start" | "end") => {
    setPickerType(type);
    setShowDatePicker(true);
  };

  /* ======================
     Time (단일 저장용)
  ====================== */
  const [reminderTime, setReminderTime] = useState<Date | null>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);

  /* ======================
     Effects
  ====================== */
  useEffect(() => {
    if (!visible) return;

    setStartDate(selectedDate);
    setEndDate(selectedDate);
    setSelectedCategoryId(null);
    setReminderTime(null);

    categoryApi.getCategories().then(setCategories).catch(console.error);
  }, [visible, selectedDate]);

  /* ======================
     Render
  ====================== */
  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={modalStyles.flex1}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ paddingBottom: 30 }}
            >
              {/* ======================
                 Category
              ====================== */}
              <Text style={modalStyles.sectionTitle}>카테고리 선택</Text>

              <View style={modalStyles.categoryWrap}>
                {categories.map((cat) => (
                  <CategoryTag
                    key={cat.id}
                    label={cat.name}
                    color={cat.color}
                    selected={selectedCategoryId === cat.id}
                    onPress={() => setSelectedCategoryId(cat.id)}
                  />
                ))}

                <CategoryTag
                  label="+ 추가"
                  color={theme.text.secondary}
                  selected={false}
                  onPress={() => setShowCategoryModal(true)}
                />
              </View>

              <CategoryCreateModal
                visible={showCategoryModal}
                onClose={() => setShowCategoryModal(false)}
                onCreated={async () =>
                  setCategories(await categoryApi.getCategories())
                }
              />

              {/* ======================
                 Date
              ====================== */}
              <Text style={modalStyles.sectionTitle}>날짜</Text>

              <View style={modalStyles.dateRow}>
                <Pressable
                  onPress={() => openDatePicker("start")}
                  style={styles.dateBox}
                >
                  <Text style={modalStyles.dateText}>{startDate}</Text>
                </Pressable>

                <Text style={modalStyles.dateSeparator}>~</Text>

                <Pressable
                  onPress={() => openDatePicker("end")}
                  style={styles.dateBox}
                >
                  <Text style={modalStyles.dateText}>{endDate}</Text>
                </Pressable>
              </View>

              <DatePickerModal
                visible={showDatePicker}
                initialDate={pickerType === "start" ? startDate : endDate}
                onClose={() => setShowDatePicker(false)}
                onConfirm={(date) => {
                  if (pickerType === "start") {
                    setStartDate(date);
                    if (date > endDate) setEndDate(date);
                  } else {
                    setEndDate(date);
                  }
                  setShowDatePicker(false);
                }}
              />

              {/* ======================
                 Time (단일)
              ====================== */}
              <Text style={modalStyles.timeTitle}>시간</Text>

              <Pressable
                onPress={() => setShowTimePicker(true)}
                style={modalStyles.timeButton}
              >
                <Text
                  style={[
                    modalStyles.timeText,
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

              {/* ======================
                 Title
              ====================== */}
              <Text style={modalStyles.sectionTitle}>할 일 추가</Text>

              <TextInput
                value={title}
                onChangeText={onChangeTitle}
                placeholder="할 일 입력"
                placeholderTextColor={theme.text.tertiary}
                style={styles.input}
              />

              {/* ======================
                 Actions
              ====================== */}
              <View style={styles.modalActions}>
                <Pressable
                  onPress={onClose}
                  style={({ pressed }) => [
                    modalStyles.cancelButton,
                    { opacity: pressed ? 0.7 : 1 },
                  ]}
                >
                  <Text style={modalStyles.cancelText}>취소</Text>
                </Pressable>

                <Pressable
                  onPress={() =>
                    onSave({
                      title,
                      categoryId: selectedCategoryId,
                      startDate,
                      endDate,
                      isRange: startDate !== endDate,
                      reminderTime,
                    })
                  }
                  style={({ pressed }) => [
                    modalStyles.saveButton,
                    { opacity: pressed ? 0.8 : 1 },
                  ]}
                >
                  <Text style={modalStyles.saveText}>저장</Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </View>

        {showTimePicker && (
          <TimePickerModal
            visible
            initialTime={reminderTime ?? new Date()}
            onConfirm={(time) => {
              setReminderTime(time);
              setShowTimePicker(false);
            }}
            onClose={() => setShowTimePicker(false)}
          />
        )}
      </KeyboardAvoidingView>
    </Modal>
  );
}
