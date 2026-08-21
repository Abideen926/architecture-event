export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ApiEnvelope<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: PaginationMeta;
};

export type ApiErrorShape = {
  message: string;
  errors?: { field?: string; message: string }[];
  statusCode?: number;
};
