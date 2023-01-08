import { UsersTable } from "@components/UsersTable";
import { usersSchema } from "@models";
import { authHttpClient, HttpError } from "@utils";
import { useQuery } from "react-query";

export function QueryUsers() {
  const { data, error, isLoading, refetch } = useQuery(
    ["users"],
    async ({ signal }) =>
      usersSchema.parse(await authHttpClient("/api/users", { signal }))
  );

  return (
    <UsersTable
      users={data}
      loading={isLoading}
      error={error}
      retry={refetch}
    />
  );
}