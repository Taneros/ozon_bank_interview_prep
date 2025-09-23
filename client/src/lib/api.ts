const API_BASE_URL = 'http://localhost:3001'

export interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE_URL}/users`)
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  return response.json()
}

export const fetchUserCount = async (): Promise<number> => {
  const response = await fetch(`${API_BASE_URL}/users/count`)
  if (!response.ok) {
    throw new Error('Failed to fetch user count')
  }
  return response.json().then(data => data.count)
}