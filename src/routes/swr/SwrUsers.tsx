import { UsersTable } from "@components/UsersTable";
import useSWR from "swr";
import { TokenRegistry } from "@utils";
import { usersSchema } from "@models";

export function SwrUsers() {
  const { data, error } = useSWR(["users"], async () => {
    const response = await fetch("/api/users", {
      headers: {
        Authorization: `Bearer ${TokenRegistry.token}`,
      },
    });

    const data = await response.json();

    if (response.status !== 200) throw data;

    return usersSchema.parse(data);
  });

  return (
    <>
      {!!data ? <UsersTable users={data} /> : null}
      {!!error ? <pre>{JSON.stringify(error)}</pre> : null}
    </>
  );
}
