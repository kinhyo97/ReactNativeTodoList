import { useMemo, useState } from "react";
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
import { getTodoById } from "../services/todo.api";

export default function TodoView() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const {
    todos,
    loading,
    selectedDate,
    setSelectedDate,
    addTodo,
    deleteTodo,
    markedDates,
    onCompleted,
  } = useTodoByDate();

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [monthPickerVisible, setMonthPickerVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [title, setTitle] = useState("");

  const handlePressItem = async (id: number) => {
    const todo = await getTodoById(id);
    setSelectedTodo(todo);
  };

  return (
    <View style={styles.container}>
      <TodoHeader
        selectedDate={selectedDate}
        onSettings={() => router.push("/settings")}
      />

      <TodoList
        todos={todos}
        header={
          <TodoCalendar
            selectedDate={selectedDate}
            markedDates={markedDates}
            onSelectDate={setSelectedDate}
          />
        }
        onDelete={deleteTodo}
        loading={loading}
        onCompleted={onCompleted}
        onPressItem={handlePressItem}
      />

      {/* ➕ 할 일 추가 */}
      <AddTodoModal
        visible={addModalVisible}
        title={title}
        onChangeTitle={setTitle}
        onClose={() => setAddModalVisible(false)}
        onSave={async () => {
          if (!title.trim()) return;
          await addTodo(title.trim(), selectedDate);
          setTitle("");
          setAddModalVisible(false);
        }}
      />

      {/* 📄 상세 */}
      <TodoDetailModal
        visible={selectedTodo != null}
        todo={selectedTodo}
        onClose={() => setSelectedTodo(null)}
      />

      {/* ➕ 버튼 */}
      <Pressable
        onPress={() => {
          if (monthPickerVisible || selectedTodo) return;
          setAddModalVisible(true);
        }}
        style={({ pressed }) => ({
          position: "absolute",
          right: 0,
          bottom: 10,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: theme.text.primary,
          justifyContent: "center",
          alignItems: "center",
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <Text style={{ color: theme.text.inverse, fontSize: 28 }}>＋</Text>
      </Pressable>
    </View>
  );
}
