export interface IPaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  totalCount: number;
}

export interface ITableErrorProps {
  error: unknown;
  onRetry: () => void;
}

export interface ITableSearchProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  hasActiveFilters?: boolean;
  onClearFilters: () => void;
}