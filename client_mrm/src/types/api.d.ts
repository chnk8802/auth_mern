interface Pagination {
  page: number;
  limit: number;
  sort: { createdAt: number };
  total: number;
}

interface Meta {
  code: number;
  status: string;
  pagination: Pagination;
  timestamp: string;
}

export interface ApiResponse<T> {
  data: T;
  dataCount?: number;
  message: string;
  meta: Meta;
}

export interface Address {
  street?: string;  // Made optional since some users may not have street/city/zip
  city?: string;
  state: string;
  country: string;
  zip?: string;
}