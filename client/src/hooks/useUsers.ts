import type { User } from "@/components/UserTable/constants";
import { API_BASE_URL } from "@/constants/api";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export const fetchUsers = async (
  sortBy?: string,
  sortOrder?: string
): Promise<User[]> => {
  const params = new URLSearchParams();

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

  return apiFetch<User[]>(url);
};

const EMPTY_ARRAY: User[] = [];

export const useUsers = (sortOptions?: {
  sortBy?: string;
  sortOrder?: string;
}) => {
  const { sortBy, sortOrder } = sortOptions || {};

  const query = useQuery({
    queryKey: ["users", sortBy, sortOrder],
    queryFn: () => fetchUsers(sortBy, sortOrder),
    // staleTime: 5 * 60 * 1000,
  });

  return {
    ...query,
    data: query.data || EMPTY_ARRAY,
  };
};
