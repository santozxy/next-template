export interface ApiResponseError {
  message: string;
  code: number;
  status: string;
  timestamp: string;
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface ApiResponsePaginated<T> {
  status: number;
  message: string;
  data: T;
  pagination: Pagination;
}

export interface Pagination {
  lastPage: number;
  limit: number;
  total: number;
  page: number;
}

export interface PaginationParams {
  limit?: number;
  page: number;
}

export interface Filters {
  search?: string;
  status?: string;
  activeMunicipality?: boolean;
}
