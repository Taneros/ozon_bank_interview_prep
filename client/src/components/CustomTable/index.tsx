import { TableHeader } from "@/components/CustomTable/components/TableHeader";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

import { PaginationControls } from "@/components/Table/components/PaginationControls";
import type { ITableProps } from "@/components/Table/interfaces";
import { TableError } from "@/components/Table/components/TableError";
import { InfiniteScrollObserver } from "@/components/Table/components/InfiniteScrollObserver/InfiniteScrollObserver";
import { TableLoading } from "@/components/CustomTable/components/TableLoading";
import { TableBody } from "@/components/CustomTable/components/TableBody";
import type { ICustomTableProps } from "@/components/CustomTable/interfaces";

export const CustomTable = <T,>({
  data,
  columns,
  isLoading = false,
  pagination,
  errorHandling,
  sorting,
  className,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: ICustomTableProps<T>) => {
  const { isError = false, error, onRetry } = errorHandling;
  const { sorting: sortingState, onSortingChange } = sorting;

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sortingState,
    },
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: pagination && true,
    pageCount: pagination && pagination.totalPages,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
  });

  const { getHeaderGroups, getRowModel } = table;

  const headerGroups = getHeaderGroups();

  const { rows } = getRowModel();

  if (isError) {
    return (
      <TableError
        error={error}
        onRetry={onRetry || (() => window.location.reload())}
      />
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-lg border border-gray-200 bg-white ${
        className || ""
      }`}
    >
      <table className="w-full">
        <TableHeader headerGroups={headerGroups} />
        {isLoading &&<TableLoading columns={columns.length} />}
        {!isLoading && <TableBody rows={rows}/>}
      </table>

            <InfiniteScrollObserver
        onIntersect={fetchNextPage}
        isFetching={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />

      {pagination && (
          <PaginationControls
            currentPage={pagination?.currentPage}
            totalPages={pagination?.totalPages}
            onPageChange={pagination?.onPageChange}
            pageSize={pagination.pageSize}
            totalCount={pagination.totalCount}
          />
        )}
    </div>
  );
};
