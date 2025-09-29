import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginationControls } from "@/components/Table/components/PaginationControls";
import type { ITableProps } from "@/components/Table/interfaces";
import { TableError } from "@/components/Table/components/TableError";
import { InfiniteScrollObserver } from "@/components/Table/components/InfiniteScrollObserver/InfiniteScrollObserver";

export const Table = <T,>({
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
}: ITableProps<T>) => {
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
    manualPagination: true,
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
    <div className={`overflow-hidden rounded-md border ${className || ""}`}>
      <ShadcnTable className="w-full">
        <TableHeader>
          {headerGroups.map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-center relative"
                  colSpan={header.colSpan}
                  style={{
                    width: header.getSize(),
                    position: "relative",
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {/* Column resizer */}
                  <div
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={`absolute right-0 top-0 h-full w-1 bg-blue-500 opacity-0 hover:opacity-100 ${
                      header.column.getIsResizing()
                        ? "opacity-100 bg-blue-700"
                        : ""
                    }`}
                  />
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {pagination && isLoading && (
            <>
              <TableRow>
                <TableCell colSpan={columns.length} className="h-2 text-center">
                  Loading...
                </TableCell>
              </TableRow>
              {Array.from({ length: pagination.pageSize - 1 }).map(
                (_, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={columns.length} className="h-2" />
                  </TableRow>
                )
              )}
            </>
          )}

          {!isLoading &&
            rows.map((row) => (
              <TableRow className="h-2 text-center" key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const cellClassName =
                    (cell.column.columnDef as ColumnDef<T, unknown>).meta
                      ?.className || "";
                  return (
                    <TableCell
                      key={cell.id}
                      className={cellClassName}
                      style={{
                        width: cell.column.getSize(),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
        </TableBody>
      </ShadcnTable>

      <InfiniteScrollObserver
        onIntersect={fetchNextPage}
        isFetching={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />

      {/* {pagination && (
          <PaginationControls
            currentPage={pagination?.currentPage}
            totalPages={pagination?.totalPages}
            onPageChange={pagination?.onPageChange}
            pageSize={pagination.pageSize}
            totalCount={pagination.totalCount}
          />
        )} */}
    </div>
  );
};
