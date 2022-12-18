import { UsersTable } from "@components/UsersTable";
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

    const users = (await response.json()) as {
      id: string;
      name: string;
      username: string;
    }[];

    if (response.status !== 200) {
      throw users;
    }

    return users;
  });

  return (
    <>
      {!!data ? <UsersTable users={data} /> : null}
      {!!error ? <pre>{JSON.stringify(error)}</pre> : null}
    </>
  );
}
