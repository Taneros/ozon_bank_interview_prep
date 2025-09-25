import { useEffect, useState, type FC } from "react";
import { useColumns, type User } from "@/components/Table/constants";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
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
import { useUsers } from "@/hooks/useUsers";
import { useUserFilters } from "@/hooks/useUserFilters";
import { PaginationControls } from "@/components/Table/components/PaginationControls";
import { TableError } from "@/components/Table/components/TableError";
import { TableSearch } from "@/components/Table/components/TableSearch";

const PAGE_SIZE = 3;

interface ITableProps {
  className?: string;
}

export const Table: FC<ITableProps> = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const sortBy = sorting[0]?.id;
  const sortOrder = sorting[0] ? (sorting[0].desc ? "desc" : "asc") : undefined;

  const { clearAllFilters, filters, hasActiveFilters, setGlobalSearch } =
    useUserFilters();

  const { totalCount, users, isLoading, isError, error } = useUsers(
    { page: currentPage, pageSize: PAGE_SIZE },
    {
      sortBy,
      sortOrder,
    },
    filters
  );

  // Reset to first page when filters change
  useEffect(() => setCurrentPage(1), [filters]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const columns = useColumns();

  const table = useReactTable({
    data: users,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: totalPages,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
  });

  const { getHeaderGroups, getRowModel } = table;

  const headerGroups = getHeaderGroups();

  const { rows } = getRowModel();

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isError) {
    return (
      <TableError error={error} onRetry={() => window.location.reload()} />
    );
  }

  return (
    <div className="space-y-4">
      <TableSearch
        searchValue={filters.globalSearch || ""}
        onSearchChange={setGlobalSearch}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearAllFilters}
      />

      <div className="overflow-x-auto">
        <div className="rounded-md border">
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
              {isLoading && (
                <>
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-2 text-center"
                    >
                      Loading...
                    </TableCell>
                  </TableRow>
                  {Array.from({ length: PAGE_SIZE - 1 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell colSpan={columns.length} className="h-2" />
                    </TableRow>
                  ))}
                </>
              )}

              {!isLoading &&
                rows.map((row) => (
                  <TableRow className="h-2 text-center" key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      const cellClassName =
                        (cell.column.columnDef as ColumnDef<User, unknown>).meta
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

          {totalCount > 0 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              pageSize={PAGE_SIZE}
              totalCount={totalCount}
            />
          )}
        </div>
      </div>
    </div>
  );
};