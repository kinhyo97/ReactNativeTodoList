import { api } from "@/services/api";
import { Todo } from "../types/todo.types";

// todolist를 받아오는 api
export const getTodos = (date?: string) => {
  return date
    ? api.get<Todo[]>(`/todos?date=${date}`)
    : api.get<Todo[]>("/todos");
};

// todo를 만드는 api
export async function createTodo(payload: {
  title: string;
  date: string;
  categoryId: number | null;
  reminderTime?: string | null;
}) {
  return await api.post<Todo>("/todos", payload);
}

// 여러날 todo 등록
export async function createTodosByRange(payload : {
  title : string;
  categoryId: number | null;
  startDate : string;
  endDate : string;
  reminderTime: Date | null;
}){
  return await api.post<{count:number}>(
    "/todos/range",
    payload
  );
}




export const deleteTodo = (id: number) =>
  api.delete(`/todos/${id}`);

export const deleteAllTodo = async () => {
  console.log("deleteAllTodo Api 호출");
  return api.delete("/todos/all");
};


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

export const getTodosByRange = (start: string, end: string) =>
  api.get<Todo[]>(`/todos/range?start=${start}&end=${end}`);


/* anniversary */

export interface Anniversary {
  id: number;
  title: string;
  month: number;
  day: number;
  color?: string;
}

/** 기념일 생성 */
export const createAnniversary = (data: {
  title: string;
  month: number;
  day: number;
  color?: string;
}) =>
  api.post<Anniversary>("/todos/anniversaries", data);

/** 기념일 조회 (월별 or 전체) */
export const getAnniversaries = (month?: number) =>
  month
    ? api.get<Anniversary[]>(`/todos/anniversaries?month=${month}`)
    : api.get<Anniversary[]>("/todos/anniversaries");

/** 기념일 수정 */
export const updateAnniversary = (
  id: number,
  data: {
    title?: string;
    month?: number;
    day?: number;
    color?: string;
  }
) =>
  api.put<Anniversary>(`/todos/anniversaries/${id}`, data);

/** 기념일 삭제 */
export const deleteAnniversary = (id: number) =>
  api.delete(`/todos/anniversaries/${id}`);


// =======================
// Calendar (Todo + Anniversary)
// =======================

export const getCalendarData = (start: string, end: string) =>
  api.get<{
    todos: Todo[];
    anniversaries: Anniversary[];
  }>(`/todos/calendar?start=${start}&end=${end}`);
