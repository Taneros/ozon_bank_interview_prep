import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '../lib/api'
import type { User } from '../lib/api'

interface UseUsersOptions {
  search?: string;
  sortBy?: keyof User;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export const useUsers = (options?: UseUsersOptions) => {
  const { data, isLoading, error, refetch } = useQuery<User[], Error>({
    queryKey: ['users', options],
    queryFn: async () => {
      // Fetch all users
      const users = await fetchUsers();
      
      // Apply search filter if provided
      let filteredUsers = users;
      if (options?.search) {
        const searchLower = options.search.toLowerCase();
        filteredUsers = users.filter(user => 
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.role.toLowerCase().includes(searchLower)
        );
      }
      
      // Apply sorting if provided
      if (options?.sortBy) {
        filteredUsers = [...filteredUsers].sort((a, b) => {
          const aVal = a[options.sortBy!];
          const bVal = b[options.sortBy!];
          
          // Handle different data types
          if (typeof aVal === 'string' && typeof bVal === 'string') {
            const comparison = aVal.localeCompare(bVal);
            return options.sortOrder === 'desc' ? -comparison : comparison;
          }
          
          if (typeof aVal === 'number' && typeof bVal === 'number') {
            const comparison = aVal - bVal;
            return options.sortOrder === 'desc' ? -comparison : comparison;
          }
          
          return 0;
        });
      }
      
      // Apply pagination if provided
      if (options?.page && options?.limit) {
        const start = (options.page - 1) * options.limit;
        filteredUsers = filteredUsers.slice(start, start + options.limit);
      }
      
      return filteredUsers;
    },
  });

  return { users: data, isLoading, error, refetch };
};