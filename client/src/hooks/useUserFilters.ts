import type { TUserFilters } from "@/hooks/interfaces";
import { useMemo, useState } from "react";

export const useUserFilters = () => {
  const [filters, setFilters] = useState<TUserFilters>({});

  const setGlobalSearch = (search: string) => {
    setFilters((prev) => ({ ...prev, globalSearch: search || undefined }));
  };

  const clearAllFilters = () => {
    setFilters({});
  };

  const hasActiveFilters = useMemo(() => {
    return filters.globalSearch !== undefined && filters.globalSearch !== ''
  }, [filters])

  return {
    filters,
    setGlobalSearch,
    clearAllFilters,
    hasActiveFilters
  }
};