import { UsersTable } from "@components/UsersTable";
import useSWR from "swr";
import { TokenRegistry } from "@utils";
import { useQuery } from "react-query";

export function SwrUsers() {
  const { data, error } = useSWR(["users"], async () => {
    const response = await fetch("/api/users", {
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
