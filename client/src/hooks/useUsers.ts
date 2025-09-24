import type { User } from "@/components/UserTable/constants";
import { API_BASE_URL } from "@/constants/api";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export const fetchUsers = async (
  page?: number,
  pageSize?: number,
  sortBy?: string,
  sortOrder?: string
): Promise<{ users: User[]; totalCount: number }> => {
  const params = new URLSearchParams();

  if (page && pageSize) {
    params.append("_page", page.toString());
    params.append("_limit", pageSize.toString());
  }

  if (sortBy) {
    params.append("_sort", sortBy);
  }

  if (sortOrder) {
    params.append("_order", sortOrder);
  }

  const queryString = params.toString();

  const url = queryString
    ? `${API_BASE_URL}/users?${queryString}`
    : `${API_BASE_URL}/users`;

  const response = await fetch(url);

  if (!response) {
    throw new Error("Failed to fetch users");
  }

  const totalCount = parseInt(response.headers.get("x-total-count") || "0", 10);

  const users = (await response.json()) as User[];

  return { users, totalCount };
};

const EMPTY_ARRAY: User[] = [];

export const useUsers = (
  paginationOptions: { page?: number; pageSize?: number },
  sortOptions?: {
    sortBy?: string;
    sortOrder?: string;
  }
) => {
  const { page, pageSize } = paginationOptions || {};
  const { sortBy, sortOrder } = sortOptions || {};

  const query = useQuery({
    queryKey: ["users", page, pageSize, sortBy, sortOrder],
    queryFn: () => fetchUsers(page, pageSize, sortBy, sortOrder),
    staleTime: 5 * 60 * 1000,
  });

  const { isLoading, isError, error, data } = query;

  return {
    isLoading,
    isError,
    error,
    users: data?.users || EMPTY_ARRAY,
    totalCount: data?.totalCount,
  };
};
