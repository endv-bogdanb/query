import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";

const client = new QueryClient();

export function QueryRoot() {
  return (
    <QueryClientProvider client={client}>
      <Outlet />
    </QueryClientProvider>
  );
}
