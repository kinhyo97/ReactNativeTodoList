import { create } from "zustand";
import * as todoApi from "../services/todo.api";
import { Todo } from "../types/todo.types";
import { Anniversary } from "../services/todo.api";

// Todo 관련 CRUD 및 상태 관리 Store

/* summary 계산 함수 (추가) */
function buildSummaryByDate(todos: Todo[]) {
  const summary: Record<string, number> = {};

  for (const todo of todos) {
    const dateKey = todo.date.slice(0, 10);
    summary[dateKey] = (summary[dateKey] ?? 0) + 1;
  }

  return summary;
}

// Zustand Store 정의
interface TodoState {
  todos: Todo[];
  loading: boolean;
  summaryByDate: Record<string, number>;
  anniversaries: Anniversary[];
  fetchTodos: (date: string) => Promise<void>;
  addTodo: (payload: {
    title: string;
    date: string;
    categoryId: number | null;
    reminderTime?: Date | null;
  }) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  toggleTodoCompleted: (id: number) => Promise<void>;
  fetchTodosByRange: (start: string, end: string) => Promise<void>;
  updateTodoState: (id: number, patch: Partial<Todo>) => void;
  fetchAnniversaries: () => Promise<void>;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  loading: false,
  anniversaries: [],
  summaryByDate: {},

  // 전체 Todo 불러오기
  fetchTodos: async (date) => {
    set({ loading: true });
    try {
      const todos = await todoApi.getTodos(date);

      console.log("FETCHED TODOS =", todos);

      set({
        todos,
        summaryByDate: buildSummaryByDate(todos),
      });
    } finally {
      set({ loading: false });
    }
  },

  // Todo 추가
  addTodo: async ({ title, date, categoryId,reminderTime  }) => {
  const newTodo = await todoApi.createTodo({
    title,
    date,
    categoryId,
    reminderTime: reminderTime
      ? reminderTime.toISOString()
      : null,
  });
  console.log("NEW TODO FROM API =", newTodo);

  set((state) => {
    const todos = [...state.todos, newTodo];
    return {
      todos,
      summaryByDate: buildSummaryByDate(todos),
    };
    
  });
},



  // Todo 삭제
  deleteTodo: async (id) => {
    await todoApi.deleteTodo(id);

    set((state) => {
      const todos = state.todos.filter((t) => t.id !== id);
      return {
        todos,
        summaryByDate: buildSummaryByDate(todos),
      };
    });
  },

  // Todo 완료 토글
  toggleTodoCompleted: async (id) => {
    const updatedTodo = await todoApi.toggleTodoCompleted(id);

    set((state) => {
      const todos = state.todos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
      return {
        todos,
        summaryByDate: buildSummaryByDate(todos),
      };
    });
  },

  // 월별 Todo 데이터 불러오기
  fetchTodosByRange: async (start, end) => {
  set({ loading: true });
  try {
    const [todos, annRes] = await Promise.all([
      todoApi.getTodosByRange(start, end),
      todoApi.getAnniversaries(), // ✅ 기념일도 같이 새로고침
    ]);

    const anniversaries = (annRes as any).data ?? annRes;

    set({
      todos,
      anniversaries,
      summaryByDate: buildSummaryByDate(todos),
    });
  } finally {
    set({ loading: false });
  }
},

// 기념일 반영 후 업데이트
fetchAnniversaries: async () => {
  const res = await todoApi.getAnniversaries();
  const list = (res as any).data ?? res;
  set({ anniversaries: list });
},

  

// detail update시  리스트에 알려주는 key
updateTodoState: (id: number, patch: Partial<Todo>) =>
  set((state) => ({
    todos: state.todos.map((t) =>
      t.id === id ? { ...t, ...patch } : t
    ),
  })),
}));
