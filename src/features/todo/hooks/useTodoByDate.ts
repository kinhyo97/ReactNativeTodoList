import { useEffect, useMemo, useState } from "react";
import { useTodoStore } from "../store/todo.store";

function toISODate(d: Date) {
  return d.toISOString().slice(0, 10);
}

// 날짜별 상태관리 Hook
export function useTodoByDate() {
  const {
    todos,
    anniversaries,
    loading,
    fetchTodos,
    fetchTodosByRange,
    addTodo,
    deleteTodo,
    summaryByDate,
    toggleTodoCompleted,
  } = useTodoStore();

  const [selectedDate, setSelectedDate] = useState(toISODate(new Date()));

  // 완료 토글은 hook 레벨에
  const onCompleted = async (id: number) => {
    console.log("Toggling todo completed for id:", id);
    await toggleTodoCompleted(id);

    const base = new Date(selectedDate);
    const start = new Date(base.getFullYear(), base.getMonth() - 1, 25);
    const end = new Date(base.getFullYear(), base.getMonth() + 1, 7);

    fetchTodosByRange(toISODate(start), toISODate(end));
  };

  const allTodos = todos;


  // 계산 결과를 기억해서 todos또는 selectedDate가 바뀔때만 재계산
  const filteredTodos = useMemo(() => {
    return todos.filter(
      // 날짜부분만 slice
      (todo) => todo.date.slice(0, 10) === selectedDate
    );
  }, [todos, selectedDate]);



  // 선택한 날짜 강조 / point mark
  // summaryBydate, selectedDate 바뀔 때 재계산
  const markedDates = useMemo(() => {
    const marks: Record<string, any> = {};

    // 점 찍을 날짜 생성
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

  // Todo 등록후 refetch
  const refetchTodos = async () => {
  const base = new Date(selectedDate);

  // 캘린더용 넉넉한 범위
  const start = new Date(base.getFullYear(), base.getMonth() - 1, 25);
  const end = new Date(base.getFullYear(), base.getMonth() + 1, 7);

  await fetchTodosByRange(
    toISODate(start),
    toISODate(end)
  );
};

// 지난달 말 ~ 다음 달 초까지의 todo 데이터를 가져오는 loading용 effect
// 현재 사용 X
useEffect(() => {
  const base = new Date(selectedDate);

  const start = new Date(base.getFullYear(), base.getMonth() - 1, 25);
  const end = new Date(base.getFullYear(), base.getMonth() + 1, 7);

  fetchTodosByRange(
    toISODate(start),
    toISODate(end)
  );
}, []);

  // 날짜 관련 로직 전부 hook 안에 캡슐화
  return {
    todos: filteredTodos,
    allTodos,
    loading,
    selectedDate,
    setSelectedDate,
    addTodo,
    deleteTodo,
    markedDates,
    onCompleted, 
    refetchTodos,
  };
}
