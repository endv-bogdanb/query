import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { UsersTable } from "@components";
import { TUsers } from "@models";
import { httpClient } from "@utils";

async function getUsers(signal: AbortSignal) {
  const { data } = (await httpClient("gql/", {
    method: "POST",
    body: JSON.stringify({
      query: `
      query GetUsers {
        profile {
          __typename
          id
        }
      }`,
      variables: {},
    }),
    signal,
  })) as any;
  return data;
}

export function GqlUsers() {
  const [users, setUsers] = useState<TUsers>([]);

  useEffect(() => {
    const ab = new AbortController();

    getUsers(ab.signal)
      .then((users) => setUsers(users))
      .catch(console.error);

    return () => {
      ab.abort();
    };
  }, []);

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
      <UsersTable users={users} loading={false} retry={() => {}} />
      <Outlet />
    </>
  );
}
