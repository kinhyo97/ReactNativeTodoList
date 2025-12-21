import { View, Text, Pressable, Modal } from "react-native";
import { Calendar } from "react-native-calendars";
import { useTheme } from "@/styles/hooks/useTheme";
import { useThemeStore } from "@/store/theme.store";
import { useMemo, useState } from "react";
import { YearMonthPickerModal } from "./YearMonthPickerModal";

export function TodoCalendar({
  selectedDate,
  markedDates,
  onSelectDate,
}) {
  const theme = useTheme();
  const mode = useThemeStore((s) => s.mode);
  const [showPicker, setShowPicker] = useState(false);
  const today = new Date();

const [selectedYear, setSelectedYear] = useState(today.getFullYear());
const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);

  const header = useMemo(() => {
    const d = new Date(selectedDate);
    return `${d.getFullYear()}년 ${String(d.getMonth() + 1).padStart(2, "0")}월`;
  }, [selectedDate]);


  return (
    <View style={{ position: "relative" }}>
      <Calendar
        key={`${mode}-${selectedDate.slice(0, 7)}`}
        current={selectedDate}
        onDayPress={(d) => onSelectDate(d.dateString)}
        markingType="dot"
        markedDates={markedDates}
        theme={{
          calendarBackground: theme.background.primary,
          dayTextColor: theme.text.primary,
          textDisabledColor: theme.text.tertiary,
          textSectionTitleColor: theme.text.secondary,
          monthTextColor: theme.text.primary,
          arrowColor: theme.text.primary,
          todayTextColor: "#60a5fa",
          selectedDayBackgroundColor: "#3b82f6",
          selectedDayTextColor: "#ffffff",
          dotColor: "#3b82f6",
          selectedDotColor: "#ffffff",
        }}
      />

      <Pressable
        onPress={() => setShowPicker(true)}
        style={{
          position: "absolute",
          top: 0,
          left: 60,
          right: 60,
          height: 48,
          zIndex: 10,
        }}
      />
      <YearMonthPickerModal
        visible={showPicker}
        initialYear={selectedYear}
        initialMonth={selectedMonth}
        onClose={() => setShowPicker(false)}
        onConfirm={(y, m) => {
          setSelectedYear(y);
          setSelectedMonth(m);
          const nextDate = `${y}-${String(m).padStart(2, "0")}-01`;
          onSelectDate(nextDate);
          setShowPicker(false);
        }}
      />
    </View>
  );
}
