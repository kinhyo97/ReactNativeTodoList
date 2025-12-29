import { useEffect, useMemo, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

import { useTheme } from "@/styles/hooks/useTheme";
import { TodoHeader } from "../components/TodoHeader";
import { TodoCalendar } from "../components/TodoCalendar";
import { TodoList } from "../components/TodoList";
import { AddTodoModal } from "../components/AddTodoModal";
import { createStyles } from "../components/TodoView.styles";
import { useTodoByDate } from "../hooks/useTodoByDate";
import { TodoDetailModal } from "../components/TodoDetailModal";
import { Todo } from "../types/todo.types";
import { createTodosByRange, getAnniversaries, getTodoById } from "../services/todo.api";
import { cancelTodoReminder } from "@/utils/notification";
import { DayTodosModal } from "../components/DayTodosModal";

// anniversary update
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";


export default function TodoView() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  // useTodoByDate Custom Hook으로 부터 받아온 변수
  const {
    todos,
    allTodos,
    loading,
    selectedDate,
    setSelectedDate,
    addTodo,
    deleteTodo,
    markedDates,
    onCompleted,
    refetchTodos
  } = useTodoByDate();

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [monthPickerVisible, setMonthPickerVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [title, setTitle] = useState("");
  const [anniversaries, setAnniversaries] =
  useState<Record<string, string[]>>({});
  // 모아보기
  const [dayModalVisible, setDayModalVisible] = useState(false);
  // RangeTodo 상태
  const [startDate, setStartDate] = useState(selectedDate);
  const [endDate, setEndDate] = useState(selectedDate);


  // 아이템 클릭시 Todo의 ID를 얻어서 todo객체를 통해서 selectedTodo 설정
  const handlePressItem = async (id: number) => {
    const todo = await getTodoById(id);
    setSelectedTodo(todo);
  };

  // 할 일 삭제 핸들러
  const handleDeleteTodo = async (id: number) => {
  const todo =
    todos.find((t) => t.id === id) ??
    allTodos.find((t) => t.id === id);

  if (!todo) return;

  if (todo.notificationId) {
    await cancelTodoReminder(todo.notificationId);
  }

  await deleteTodo(id);
  console.log("Todo 삭제")
};


  // 미리보기용 데이터 생성 
  const previewMap = useMemo(() => {
    const map: Record<string, {
      title: string;
      color?: string;
      }[]
    > = {};

      allTodos.forEach((todo) => {
        // 날짜부분만 slice
        const date = todo.date.slice(0, 10);

        if (!map[date]) map[date] = [];

        map[date].push({
          title: todo.title,
          color: todo.category?.color,
        });
      });

      return map;
    }, [allTodos]);

  const loadAnniversaries = useCallback(async () => {
  try {
    const res = await getAnniversaries();
    const list = (res as any).data ?? res;

    const map: Record<string, string[]> = {};
    list.forEach((a: any) => {
      const key = `${String(a.month).padStart(2, "0")}-${String(a.day).padStart(2, "0")}`;
      if (!map[key]) map[key] = [];
      map[key].push(a.title);
    });

    setAnniversaries(map);
  } catch (e) {
    console.error("[TodoView] loadAnniversaries error", e);
  }
}, []);

useEffect(() => {
  loadAnniversaries(); 
}, [loadAnniversaries]);

useFocusEffect(
  useCallback(() => {
    loadAnniversaries(); 
  }, [loadAnniversaries])
);

  return (
    <View style={styles.container}>
      <TodoHeader
        selectedDate={selectedDate}
        onSettings={() => router.push("/settings")}
      />

      <TodoCalendar
            selectedDate={selectedDate}
            markedDates={markedDates}
            onSelectDate={setSelectedDate}
            previewTodos={previewMap}
            anniversaries={anniversaries}
          />
        <Pressable
          onPress={() => setDayModalVisible(true)}
          style={{
            marginHorizontal: 12,
            marginTop: 8,
            marginBottom: 8,
            paddingVertical: 4,
            paddingHorizontal: 4,
            borderRadius: 12,
            backgroundColor: theme.background.secondary,

            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* 왼쪽 더미 (플러스 버튼과 같은 폭) */}
          <View style={{ width: 28 }} />

          {/* 가운데 텍스트 */}
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              color: theme.text.primary,
              fontSize: 14,
              fontWeight: "600",
            }}
          >
            모아보기
          </Text>

          {/* 오른쪽 + 버튼 */}
          <Pressable
            onPress={(e) => {
              e.stopPropagation();
              if (monthPickerVisible || selectedTodo) return;
              setAddModalVisible(true);
            }}
            style={({ pressed }) => ({
              width: 36,
              height: 36,
              borderRadius: 99,
              backgroundColor: theme.text.primary,
              justifyContent: "center",
              alignItems: "center",
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text
              style={{
                color: theme.text.inverse,
                fontSize: 20,
                lineHeight: 20,
                fontWeight: "600",
              }}
            >
              +
            </Text>
          </Pressable>
        </Pressable>

        <DayTodosModal
          visible={dayModalVisible}
          date={selectedDate}
          todos={todos}   
          onClose={() => setDayModalVisible(false)}
        />

      <TodoList
        todos={todos}
        onDelete={handleDeleteTodo}
        loading={loading}
        onCompleted={onCompleted}
        onPressItem={handlePressItem}
      />
      

      {/* ➕ 할 일 추가 */}
      <AddTodoModal
        visible={addModalVisible}
        title={title}
        selectedDate={selectedDate}
        onChangeTitle={setTitle}
        onClose={() => setAddModalVisible(false)}
        onSave={async ({ title, categoryId, startDate, endDate ,reminderTime, reminderOffset,}) => {
          const trimmedTitle = title.trim();
          if (!trimmedTitle) return;

          if (startDate === endDate) {
            await addTodo({
              title: trimmedTitle,
              date: startDate, 
              categoryId,
              reminderTime
            });
          } else {
            await createTodosByRange({
              title: trimmedTitle,
              categoryId,
              startDate,
              endDate,
              reminderTime: reminderTime
              ? reminderTime.toISOString()
              : null,
            });
          }
          await refetchTodos();

          setTitle("");
          setAddModalVisible(false);
        }}

      />

      <TodoDetailModal
        visible={selectedTodo != null}
        todo={selectedTodo}
        onClose={() => setSelectedTodo(null)}
        onSaved={refetchTodos}
      />
    </View>
  );
}
