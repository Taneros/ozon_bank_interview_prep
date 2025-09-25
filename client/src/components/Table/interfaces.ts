import type { ColumnDef, SortingState, OnChangeFn } from "@tanstack/react-table";

export interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export interface IErrorProps {
  isError?: boolean;
  error?: unknown;
  onRetry?: () => void;
}

export interface ISortingProps {
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
}

export interface ITableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  pagination: IPaginationProps;
  errorHandling: IErrorProps;
  sorting: ISortingProps;
  className?: string;
}