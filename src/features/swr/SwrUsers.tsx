import useSWR from "swr";
import { UsersTable } from "@components/UsersTable";
import { usersSchema } from "@models";
import { authHttpClient } from "@utils";

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
