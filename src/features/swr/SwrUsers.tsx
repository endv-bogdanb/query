import { UsersTable } from "@components/UsersTable";
import useSWR from "swr";
import { authHttpClient, httpClient, TokenRegistry } from "@utils";
import { usersSchema } from "@models";

export function SwrUsers() {
  const { data, error, isLoading, mutate } = useSWR(["users"], async () => {
    const data = await authHttpClient("/api/users");

    return usersSchema.parse(data);
  });

  return (
    <UsersTable
      users={data}
      loading={isLoading}
      error={error}
      retry={() => {
        mutate();
      }}
    />
  );
}
