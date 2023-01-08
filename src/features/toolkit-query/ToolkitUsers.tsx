import { UsersTable } from "@components/UsersTable";
import { useUsersQuery } from "./store/api";

export function ToolkitUsers() {
  const { data, error, isLoading, refetch } = useUsersQuery();

  return (
    <UsersTable
      users={data}
      loading={isLoading}
      error={error}
      retry={refetch}
    />
  );
}
