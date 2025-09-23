import UserTable from './components/UserTable'
import { useUsers } from './hooks/useUsers'
import './App.css'

function App() {
  const { users, isLoading, error } = useUsers()

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen">Error: {error.message}</div>
  }

  return (
    <div className="mx-auto py-10">
      <h1 className="text-3xl font-light mb-6">User Management</h1>
      {users && <UserTable users={users} />}
    </div>
  )
}

export default App