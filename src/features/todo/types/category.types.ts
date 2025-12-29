/** Category 기본 도메인 타입 */
export interface Category {
  id: number;
  name: string;
  color: string;
  createdAt?: string;
  updatedAt?: string;
}

/** Category 생성 요청 */
export interface CreateCategoryRequest {
  name: string;
  color: string;
}

/** Category 수정 요청 */
export interface UpdateCategoryRequest {
  name?: string;
  color?: string;
}
