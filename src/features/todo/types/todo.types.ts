// src/features/todo/types/todo.types.ts

/** Todo 기본 도메인 타입 */
export interface Todo {
  id: number;
  title: string;
  completed?: boolean; // 백엔드에 있으면 사용, 없으면 optional
  createdAt?: string;
  updatedAt?: string;
  description?: string;
  reminderTime?: string | null;
  date: string;
  reminderOffset?: number | null;
  notificationId?: string | null;
  category?: {
    id: number;
    name: string;
    color: string;
  };
}

/** Todo 생성 요청 */
export interface CreateTodoRequest {
  title: string;
}

/** Todo 수정 요청 */
export interface UpdateTodoRequest {
  title?: string;
  completed?: boolean;
}
