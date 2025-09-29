import type { FetchNextPageOptions } from "@tanstack/react-query";
import type {
  ColumnDef,
  SortingState,
  OnChangeFn,
} from "@tanstack/react-table";

export interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export interface IInfiniteScrollOptions<T> {
  fetchNextPage: (options?: FetchNextPageOptions) => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
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

export interface ICustomTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  paginationOptions?: IPaginationProps;
  infiniteScrollOptions?: IInfiniteScrollOptions<T>;
  errorHandling: IErrorProps;
  sortingOptions: ISortingProps;
  className?: string;
}