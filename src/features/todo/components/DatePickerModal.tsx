import { Modal, View, Text, Pressable } from "react-native";
import { Calendar } from "react-native-calendars";
import { useTheme } from "@/styles/hooks/useTheme";
import { useEffect, useState } from "react";
import { createStyles } from "./DatePickerModal.style";

interface Props {
  visible: boolean;
  initialDate: string;
  onClose: () => void;
  onConfirm: (date: string) => void;
}

export function DatePickerModal({
  visible,
  initialDate,
  onClose,
  onConfirm,
}: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  const [selected, setSelected] = useState(initialDate);

  useEffect(() => {
    if (visible) {
      setSelected(initialDate);
    }
  }, [initialDate, visible]);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Calendar
            key={selected}
            current={selected}
            onDayPress={(day) => setSelected(day.dateString)}
            markedDates={{
              [selected]: {
                selected: true,
                selectedColor: "#3b82f6",
              },
            }}
            // ✅ 다크모드 적용(로직 안 건드림)
            theme={{
              backgroundColor: theme.background.secondary,
              calendarBackground: theme.background.secondary,

              monthTextColor: theme.text.primary,
              dayTextColor: theme.text.primary,
              textSectionTitleColor: theme.text.secondary,
              textDisabledColor: theme.text.tertiary,

              arrowColor: theme.text.primary,

              // 선택 날짜 글자색(안 넣으면 다크에서 글자 죽는 경우 있음)
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#3b82f6",
            }}
          />

          <View style={styles.actions}>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.cancelButtonBase,
                { opacity: pressed ? 0.6 : 1 },
              ]}
            >
              <Text style={styles.cancelText}>취소</Text>
            </Pressable>

            <Pressable
              onPress={() => onConfirm(selected)}
              style={({ pressed }) => [
                styles.confirmButtonBase,
                { opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <Text style={styles.confirmText}>확인</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
