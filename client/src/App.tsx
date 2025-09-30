import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LineChart } from "./Components/LineChart";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      < LineChart />
    </QueryClientProvider>
  );
}

export default App;


