import type { User } from "@/types/interfaces";
import { API_BASE_URL } from "@/constants/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import type {
  TUserFilters,
  TPaginationOptions,
  TSortOptions,
} from "@/hooks/interfaces";
import { PAGE_SIZE } from "@/pages/UserManagement";

export const fetchUsers = async (
  pageParam: number,
  pageSize: number,
  sortOptions?: { sortBy?: string; sortOrder?: string },
  filters?: TUserFilters
): Promise<{ users: User[]; nextPage: number | null; totalCount: number }> => {
  const params = new URLSearchParams();

  const startPage = pageParam * pageSize;

  params.append("_start", startPage.toString());
  params.append("_limit", pageSize.toString());

  if (sortOptions?.sortBy) {
    params.append("_sort", sortOptions.sortBy);
  }

  if (sortOptions?.sortOrder) {
    params.append("_order", sortOptions.sortOrder);
  }

  if (filters?.globalSearch) {
    params.append("q", filters.globalSearch);
  }

  if (filters?.city) {
    params.append("city_like", filters.city);
  }

  if (filters?.profession) {
    params.append("profession_like", filters.profession);
  }

  const queryString = params.toString();

  const url = queryString
    ? `${API_BASE_URL}/users?${queryString}`
    : `${API_BASE_URL}/users`;

  const response = await fetch(url);

  if (!response) {
    throw new Error("Failed to fetch users");
  }

  const users = (await response.json()) as User[];

  const totalCountHeader = response.headers.get("x-total-count");

  const totalCount = totalCountHeader
    ? parseInt(totalCountHeader, 10)
    : users.length;

  const hasNextPage = startPage + users.length < totalCount;

  const nextPage = hasNextPage ? pageParam + 1 : null;

  return { users, nextPage, totalCount };
};

export const useInfiniteUsers = (
  paginationOptions: Pick<TPaginationOptions, "pageSize">,
  sortOptions?: TSortOptions,
  filters?: TUserFilters
) => {
  const { pageSize = PAGE_SIZE } = paginationOptions;

  return useInfiniteQuery({
    queryKey: ["users", "infinite", pageSize, sortOptions, filters],
    queryFn: ({ pageParam = 0 }) =>
      fetchUsers(pageParam as number, pageSize, sortOptions, filters),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
  });
};
