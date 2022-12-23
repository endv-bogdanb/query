import { UsersTable } from "@components/UsersTable";
import { usersSchema } from "@models";
import { TokenRegistry } from "@utils";
import { useQuery } from "react-query";

export function QueryUsers() {
  const { data, error } = useQuery(["users"], async ({ signal }) => {
    const response = await fetch("/api/users", {
      signal,
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
