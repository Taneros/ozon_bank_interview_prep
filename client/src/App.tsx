import "./App.css";
import { UserTable } from "@/components/UserTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="mx-auto py-10">
        <h1 className="text-3xl font-light mb-6">User Management</h1>
        <UserTable />
      </div>
    </QueryClientProvider>
  );
}

export default App;
