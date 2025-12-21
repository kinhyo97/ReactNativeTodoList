import { useEffect, useMemo, useState } from "react";
import { useTodoStore } from "../store/todo.store";

function toISODate(d: Date) {
  return d.toISOString().slice(0, 10);
}

// 날짜별 상태관리 Hook
export function useTodoByDate() {
  const {
    todos,
    loading,
    fetchTodos,
    addTodo,
    deleteTodo,
    summaryByDate,
    toggleTodoCompleted,
  } = useTodoStore();

  const [selectedDate, setSelectedDate] = useState(toISODate(new Date()));

  useEffect(() => {
    fetchTodos(selectedDate);
  }, [selectedDate]);

  // 완료 토글은 hook 레벨에
  const onCompleted = async (id: number) => {
    console.log("Toggling todo completed for id:", id);
    await toggleTodoCompleted(id);
    fetchTodos(selectedDate);
  };

  // useMemo는 값 계산만
  const markedDates = useMemo(() => {
    const marks: Record<string, any> = {};

    Object.entries(summaryByDate ?? {}).forEach(([date, count]) => {
      if (count > 0) {
        marks[date] = {
          marked: true,
          dotColor: "#3b82f6",
        };
      }
    });

    marks[selectedDate] = {
      ...(marks[selectedDate] ?? {}),
      selected: true,
      selectedColor: "#3b82f6",
    };

    return marks;
  }, [summaryByDate, selectedDate]);

  return {
    todos,
    loading,
    selectedDate,
    setSelectedDate,
    addTodo,
    deleteTodo,
    markedDates,
    onCompleted, 
  };
}
