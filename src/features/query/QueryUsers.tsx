import { useQuery } from "react-query";
import { Outlet } from "react-router-dom";
import { UsersTable } from "@components";
import { usersSchema } from "@models";
import { authHttpClient } from "@utils";

export function QueryUsers() {
  const { data, error, isLoading, refetch } = useQuery(
    ["users"],
    async ({ signal }) =>
      usersSchema.parse(await authHttpClient("/api/users", { signal }))
  );

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
