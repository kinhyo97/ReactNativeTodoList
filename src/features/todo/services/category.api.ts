import { api } from "@/services/api";
import {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "../types/category.types";

// 카테고리 리스트
export const getCategories = () =>
  api.get<Category[]>("/categories");

// 카테고리 생성
export const createCategory = (data: CreateCategoryRequest) =>
  api.post<Category>("/categories", data);

// 카테고리 수정
export const updateCategory = (
  id: number,
  data: UpdateCategoryRequest
) =>
  api.put<Category>(`/categories/${id}`, data);

// 카테고리 삭제
export const deleteCategory = (id: number) =>
  api.delete(`/categories/${id}`);
