import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

export function QueryRoot() {
  return (
    <QueryClientProvider client={client}>
      <Outlet />
    </QueryClientProvider>
  );
}
