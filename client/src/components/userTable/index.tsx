import { useEffect, useState, type FC } from "react";
import { useColumns, type User } from "@/components/UserTable/constants";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUsers } from "@/hooks/useUsers";
import { PaginationControls } from "@/components/UserTable/components/PaginationControls";
import { useUserFilters } from "@/hooks/useUserFilters";
import { GlobalSearch } from "@/components/UserTable/components/GlobalSearch";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const PAGE_SIZE = 3;

//todo refactor into a hook useUsers + all necessary useStates

export const UserTable: FC = () => {
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
      <div className="rounded-md border border-red-200 bg-red-50 p-4">
        <div className="text-red-800 font-medium">Error loading users</div>
        <div className="text-red-600 text-sm mt-1">
          {error instanceof Error ? error.message : "Unknown error occurred"}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <GlobalSearch
          onChange={setGlobalSearch}
          value={filters.globalSearch || ""}
        />

        {hasActiveFilters && (
          <div>
            <Button
              className="flex items-center gap-2"
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
            >
              <X className="h-4 w-4" />
              Clear Search
            </Button>
          </div>
        )}

      </div>

      <div className="overflow-x-auto">
        <div className="rounded-md border">
          <Table className="w-full">
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
          </Table>

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
