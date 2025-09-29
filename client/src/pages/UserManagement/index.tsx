import { useCallback, useMemo, useState } from "react";
import { Table } from "@/components/Table";
import { useColumns } from "@/pages/UserManagement/constants";
import type { User } from "@/types/interfaces";
import { EMPTY_USERS_ARRAY, useUsers } from "@/hooks/useUsers";
import { useUserFilters } from "@/hooks/useUserFilters";
import type { SortingState } from "@tanstack/react-table";
import { TableSearch } from "@/components/Table/components/TableSearch";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { ColumnFilterDropDown } from "@/components/Table/components/ColumnFilterDropDown";
import { useInfiniteUsers } from "@/hooks/useInfiniteUsers";
import { CustomTable } from "@/components/CustomTable";

export const PAGE_SIZE = 3;

export const UserManagement = () => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const {
    availableCities,
    availableProfessions,
    clearAllFilters,
    filters,
    hasActiveFilters,
    setCityFilter,
    setGlobalSearch,
    setProfessionFilter,
  } = useUserFilters();

  const sortBy = sorting[0]?.id;
  const sortOrder = sorting[0] ? (sorting[0].desc ? "desc" : "asc") : undefined;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteUsers(
    { pageSize: PAGE_SIZE },
    {
      sortBy,
      sortOrder,
    },
    filters
  );

  const allUsers = useMemo(
    () => data?.pages.flatMap((page) => page.users) || EMPTY_USERS_ARRAY,
    [data]
  );

  const totalCount = data?.pages[0]?.totalCount || 0;

  const columns = useColumns();

  const handleLoadMore = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <div className="space-y-4">
        <TableSearch
          searchValue={filters.globalSearch || ""}
          onSearchChange={setGlobalSearch}
          onClearFilters={clearAllFilters}
        />

        <div className="flex items-end gap-4 p-4 bg-muted/50 rounded-l">
          <ColumnFilterDropDown
            label="City"
            onChange={setCityFilter}
            options={availableCities}
            value={filters.city || ""}
            placeholder="All Cities"
          />
          <ColumnFilterDropDown
            label="Profession"
            onChange={setProfessionFilter}
            options={availableProfessions}
            value={filters.profession || ""}
            placeholder="All professions"
          />

          <Button
            className="flex items-center gap-2"
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            disabled={!hasActiveFilters}
          >
            <X className="h-4 w-4" />
            Clear Filters
          </Button>
        </div>
      </div>
      <CustomTable<User>
        data={allUsers}
        columns={columns}
        isLoading={isLoading}
        infiniteScrollOptions={{
          fetchNextPage: handleLoadMore,
          hasNextPage,
          isFetchingNextPage,
        }}
        errorHandling={{
          isError,
          error,
          onRetry: () => window.location.reload(),
        }}
        sortingOptions={{
          sorting,
          onSortingChange: setSorting,
        }}
      />
    </div>
  );
};
