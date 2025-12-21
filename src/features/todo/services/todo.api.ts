import { api } from "@/services/api";
import { Todo } from "../types/todo.types";

export const getTodos = (date?: string) => {
  return date
    ? api.get<Todo[]>(`/todos?date=${date}`)
    : api.get<Todo[]>("/todos");
};

export const createTodo = (title: string, date: string) =>
  api.post<Todo>("/todos", { title, date });

export const deleteTodo = (id: number) =>
  api.delete(`/todos/${id}`);

export const toggleTodoCompleted = (id: number) =>{
  console.log("API toggleTodoCompleted called with id:", id);
  return api.patch<Todo>(`/todos/${id}/toggle`);
}
  
export const updateTodo = (
  id: number,
  data: {
    description?: string;
    reminderTime?: string | null;
  }
) => {
  return api.patch(`/todos/${id}`, data);
};

export const getTodoById = (id: number) =>
  api.get<Todo>(`/todos/${id}`);