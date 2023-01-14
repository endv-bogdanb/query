import { Outlet } from "react-router-dom";
import { UsersTable } from "@components/UsersTable";
import { useUsersQuery } from "./store/api/api";

export function ToolkitUsers() {
  const { data, error, isLoading, refetch } = useUsersQuery();

  return (
    <>
      <UsersTable
        users={data}
        loading={isLoading}
        error={error}
        retry={refetch}
      />
      <Outlet />
    </>
  );
}
