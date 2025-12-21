import { create } from "zustand";
import * as todoApi from "../services/todo.api";
import { Todo } from "../types/todo.types";

interface TodoState {
  todos: Todo[];
  loading: boolean;
  summaryByDate: Record<string, number>;
  fetchTodos: (date: string) => Promise<void>;
  addTodo: (title: string, date: string) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  toggleTodoCompleted: (id: number) => Promise<void>;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  loading: false,

  fetchTodos: async (date) => {
    set({ loading: true });
    try {
      const todos = await todoApi.getTodos(date);
      set({ todos });
    } finally {
      set({ loading: false });
    }
  },

  addTodo: async (title, date) => {
    const newTodo = await todoApi.createTodo(title, date);
    set((state) => ({
      todos: [...state.todos, newTodo],
    }));
  },

  deleteTodo: async (id) => {
    await todoApi.deleteTodo(id);
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    }));
  },

  summaryByDate: {
  "2025-12-17": 2,
  "2025-12-18": 1,
  "2025-12-20": 3,
  },

  toggleTodoCompleted: async (id) => {
    const updatedTodo = await todoApi.toggleTodoCompleted(id);

    console.log(updatedTodo)
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      ),
    }));
  },

  





}));
