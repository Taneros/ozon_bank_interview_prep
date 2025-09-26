import { API_BASE_URL } from "@/constants/api";
import type { TUserFilters } from "@/hooks/interfaces";
import { apiFetch } from "@/lib/api";
import type { User } from "@/types/interfaces";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export const useUserFilters = () => {
  const [filters, setFilters] = useState<TUserFilters>({});
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

  const { data: allUsers = [] } = useQuery({
    queryKey: ["users", "all"],
    queryFn: () => apiFetch<User[]>(`${API_BASE_URL}/users`),
    staleTime: 10 * 60 * 1000,
  });

  const availableCities = useMemo(
    () => Array.from(new Set(allUsers.map((user) => user.city))),
    [allUsers]
  );


  const availableProfessions = useMemo(
    () => Array.from(new Set(allUsers.map((user) => user.profession))),
    [allUsers]
  );

  const setGlobalSearch = (search: string) => {
    setFilters((prev) => ({ ...prev, globalSearch: search || undefined }));
  };

  
  const setCityFilter = (city: string) => {
    setFilters((prev) => ({ ...prev, city: city || undefined }));
  };
  
  const setProfessionFilter = (profession: string) => {
    setFilters((prev) => ({ ...prev, profession: profession || undefined }));
  };

    const clearAllFilters = () => {
    setFilters({});
  };

  const hasActiveFilters = useMemo(() => {
    return filters.globalSearch !== undefined && filters.globalSearch !== "";
  }, [filters]);

  return {
    filters,
    setGlobalSearch,
    clearAllFilters,
    hasActiveFilters,
    setCityFilter,
    setProfessionFilter,
    availableCities,
    availableProfessions,
    isFiltersExpanded,
    setIsFiltersExpanded
  };
};
