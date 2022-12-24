import { UsersTable } from "@components/UsersTable";
import useSWR from "swr";
import { httpClient, TokenRegistry } from "@utils";
import { usersSchema } from "@models";

export function SwrUsers() {
  const { data, error } = useSWR(["users"], async () => {
    const data = await httpClient("/api/users", {
      headers: {
        Authorization: `Bearer ${TokenRegistry.token}`,
      },
    });

    return usersSchema.parse(data);
  });

  return (
    <>
      {!!data ? <UsersTable users={data} /> : null}
      {!!error ? <pre>{JSON.stringify(error)}</pre> : null}
    </>
  );
}
