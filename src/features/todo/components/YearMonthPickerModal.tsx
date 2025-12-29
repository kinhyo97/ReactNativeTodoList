import { Modal, View, Text, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "@/styles/hooks/useTheme";
import { useState } from "react";

interface Props {
  visible: boolean;
  initialYear: number;
  initialMonth: number;
  onClose: () => void;
  onConfirm: (year: number, month: number) => void;
}

export function YearMonthPickerModal({
  visible,
  initialYear,
  initialMonth,
  onClose,
  onConfirm,
}: Props) {
  const theme = useTheme();

  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);

  const years = Array.from({ length: 20 }, (_, i) => 2018 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // 오늘로 가기 버튼
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      >
        <View
          style={{
            backgroundColor: theme.background.primary,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            paddingBottom: 24,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 16,
            }}
          >
            <Pressable onPress={onClose}>
              <Text style={{ color: theme.text.secondary }}>취소</Text>
            </Pressable>

            <Text style={{ color: theme.text.primary, fontWeight: "600" }}>
              월 선택
            </Text>

            <Pressable onPress={() => onConfirm(year, month)}>
              <Text style={{ color: "#0ea5e9", fontWeight: "600" }}>
                확인
              </Text>
            </Pressable>
          </View>

          <View style={{ alignItems: "center", marginBottom: 8 }}>
            <Pressable
              onPress={() => {
                const today = new Date();
                const y = today.getFullYear();
                const m = today.getMonth() + 1;

                setYear(y);
                setMonth(m);
                onConfirm(y, m); // ← 바로 이동
              }}
            >
              <Text style={{ color: "#0ea5e9", fontSize: 13 }}>
                오늘로 이동
              </Text>
            </Pressable>
          </View>

          {/* Picker */}
          <View style={{ flexDirection: "row" }}>
            <Picker
              style={{ flex: 1 }}
              selectedValue={year}
              onValueChange={setYear}
              itemStyle={{ color: theme.text.primary }}
            >
              {years.map((y) => (
                <Picker.Item key={y} label={`${y}`} value={y} />
              ))}
            </Picker>

            <Picker
              style={{ flex: 1 }}
              selectedValue={month}
              onValueChange={setMonth}
              itemStyle={{ color: theme.text.primary }}
            >
              {months.map((m) => (
                <Picker.Item key={m} label={`${m}`} value={m} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
    </Modal>
  );
}
