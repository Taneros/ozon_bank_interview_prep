import type { User } from "@/components/UserTable/constants";
import { BASE_API } from "@/constants/api";
import { useQuery } from "@tanstack/react-query";

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(BASE_API + "users");

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, // 5 mins
  });
};
