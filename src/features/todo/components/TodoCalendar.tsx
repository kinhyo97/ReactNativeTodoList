import { View, Text, Pressable } from "react-native";
import { Calendar } from "react-native-calendars";
import { useTheme } from "@/styles/hooks/useTheme";
import { useThemeStore } from "@/store/theme.store";
import { useEffect, useMemo, useState } from "react";
import { YearMonthPickerModal } from "./YearMonthPickerModal";
import { HOLIDAYS } from "@/constants/holidays";
import { useTodoStore } from "../store/todo.store";

import { createStyles } from "./TodoCalendar.style";

interface TodoCalendarProps {
  selectedDate: string;
  markedDates: any;
  onSelectDate: (date: string) => void;

  previewTodos?: Record<
    string,
    {
      title: string;
      color?: string;
    }[]
  >;

  anniversaries?: Record<string, string[]>;
}

export function TodoCalendar({
  selectedDate,
  markedDates,
  onSelectDate,
  previewTodos = {},
  anniversaries = {},
}: TodoCalendarProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const mode = useThemeStore((s) => s.mode);
  const [showPicker, setShowPicker] = useState(false);
  const today = new Date();
  const fetchTodosByRange = useTodoStore((state) => state.fetchTodosByRange);

  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);

  const header = useMemo(() => {
    const d = new Date(selectedDate);
    return `${d.getFullYear()}년 ${String(d.getMonth() + 1).padStart(2, "0")}월`;
  }, [selectedDate]);

  useEffect(() => {
    console.log(previewTodos);
  }, [previewTodos]);

  return (
    <View style={styles.root}>
      <Calendar
        key={`${mode}-${selectedDate.slice(0, 7)}`}
        current={selectedDate}
        onDayPress={(d) => onSelectDate(d.dateString)}
        enableSwipeMonths
        markedDates={markedDates}
        hideExtraDays
        onMonthChange={(month) => {
          const y = month.year;
          const m = String(month.month).padStart(2, "0");
          fetchTodosByRange(`${y}-${m}-01`, `${y}-${m}-31`);
        }}
        dayComponent={({ date, state }) => {
          const dateString = date.dateString;

          const todosForDate = previewTodos?.[dateString]?.slice(0, 3) ?? [];

          const holidayName = HOLIDAYS[dateString];
          const isSunday = new Date(dateString).getDay() === 0;
          const isHoliday = !!holidayName || isSunday;
          const isSelected = dateString === selectedDate;

          const mmdd = dateString.slice(5);
          const anniversaryTitles = anniversaries[mmdd] ?? [];

          const dateTextColor = isHoliday
            ? "#ef4444"
            : state === "disabled"
            ? theme.text.tertiary
            : theme.text.primary;

          return (
            <Pressable
              onPress={() => onSelectDate(dateString)}
              style={styles.dayCell}
            >
              {/* 날짜 숫자 */}
              <View
                style={[
                  styles.dateBadge,
                  {
                    marginBottom:
                      todosForDate.length > 0 || anniversaryTitles.length > 0
                        ? 4
                        : 0,
                    backgroundColor: isSelected ? "#394353ff" : "transparent",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.dateText,
                    {
                      color: dateTextColor,
                      fontWeight: isHoliday ? "600" : "400",
                    },
                  ]}
                >
                  {date.day}
                </Text>
              </View>

              {/* 공휴일 */}
              {holidayName && (
                <View style={styles.holidayPill}>
                  <Text numberOfLines={1} style={styles.holidayText}>
                    {holidayName}
                  </Text>
                </View>
              )}

              {/* 기념일 */}
              {anniversaryTitles.map((title, idx) => (
                <Text
                  key={`anniv-${idx}`}
                  numberOfLines={1}
                  style={styles.anniversaryText}
                >
                  {title}
                </Text>
              ))}

              {/* 셀 밑 todo */}
              {todosForDate.map((todo, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.todoPill,
                    {
                      backgroundColor:
                        todo.color ?? theme.background.secondary,
                    },
                  ]}
                >
                  <Text numberOfLines={1} style={styles.todoText}>
                    {todo.title}
                  </Text>
                </View>
              ))}
            </Pressable>
          );
        }}
        theme={{
          calendarBackground: theme.background.primary,
          monthTextColor: theme.text.primary,
          arrowColor: theme.text.primary,
          textSectionTitleColor: theme.text.secondary,
        }}
      />

      {/* 월/년 선택 터치 영역 */}
      <Pressable
        onPress={() => setShowPicker(true)}
        style={styles.monthTouchOverlay}
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
