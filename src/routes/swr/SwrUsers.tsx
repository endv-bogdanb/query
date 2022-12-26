import { UsersTable } from "@components/UsersTable";
import useSWR from "swr";
import { authHttpClient, httpClient, TokenRegistry } from "@utils";
import { usersSchema } from "@models";

export function SwrUsers() {
  const { data, error } = useSWR(["users"], async () => {
    const data = await authHttpClient("/api/users");

    return usersSchema.parse(data);
  });

  return (
    <>
      {!!data ? <UsersTable users={data} /> : null}
      {!!error ? <pre>{JSON.stringify(error)}</pre> : null}
    </>
  );
}
