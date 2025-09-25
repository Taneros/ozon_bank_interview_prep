import type { ColumnDef, SortingState, OnChangeFn } from "@tanstack/react-table";

export interface ITableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  isError?: boolean;
  error?: unknown;
  onRetry?: () => void;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  className?: string;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
}