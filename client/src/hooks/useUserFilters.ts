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
    const isAllCities = city === "all";

    console.log(`hooks/useUserFilters.ts - line: 35 ->> city`, city);

    setFilters((prev) => ({
      ...prev,
      city: isAllCities ? "" : city || undefined,
    }));
  };

  const setProfessionFilter = (profession: string) => {
    const isAllProfessions = profession === "all";

    console.log(
      `hooks/useUserFilters.ts - line: 41 ->> profession`,
      profession
    );

    setFilters((prev) => ({
      ...prev,
      profession: isAllProfessions ? "" : profession || undefined,
    }));
  };

  const clearAllFilters = () => {
    setFilters({});
  };

  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some(
      (value) => value !== undefined && value !== ""
    );
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
    setIsFiltersExpanded,
  };
};
