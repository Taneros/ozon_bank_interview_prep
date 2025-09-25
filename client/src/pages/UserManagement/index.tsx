import { useState } from "react";
import { Table } from "@/components/Table";
import { useColumns, type User } from "@/components/Table/constants";
import { useUsers } from "@/hooks/useUsers";
import { useUserFilters } from "@/hooks/useUserFilters";
import type { SortingState } from "@tanstack/react-table";
import { TableSearch } from "@/components/Table/components/TableSearch";

const PAGE_SIZE = 3;

export const UserManagement = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const { clearAllFilters, filters, hasActiveFilters, setGlobalSearch } = useUserFilters();
  
  const sortBy = sorting[0]?.id;
  const sortOrder = sorting[0] ? (sorting[0].desc ? "desc" : "asc") : undefined;

  const { totalCount, users, isLoading, isError, error } = useUsers(
    { page: currentPage, pageSize: PAGE_SIZE },
    {
      sortBy,
      sortOrder,
    },
    filters
  );

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  
  const columns = useColumns();

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const pagination = {
    currentPage,
    totalPages,
    totalCount,
    pageSize: PAGE_SIZE,
    onPageChange: handlePageChange,
  };

  const errorHandling = {
    isError,
    error,
    onRetry: () => window.location.reload(),
  };

  const sortingProps = {
    sorting,
    onSortingChange: setSorting,
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <TableSearch
        searchValue={filters.globalSearch || ""}
        onSearchChange={setGlobalSearch}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearAllFilters}
      />
      <Table<User>
        data={users}
        columns={columns}
        isLoading={isLoading}
        pagination={pagination}
        errorHandling={errorHandling}
        sorting={sortingProps}
      />
    </div>
  );
};