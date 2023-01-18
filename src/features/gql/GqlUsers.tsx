import { useEffect, useState } from "react";
import { Table } from "@mantine/core";
import { httpClient } from "@utils";

export function GqlUsers() {
  const [users, setUsers] = useState<{ id: number; username: string }[]>([]);

  useEffect(() => {
    const ab = new AbortController();

    httpClient("gql/", {
      method: "POST",
      body: JSON.stringify({
        query: `query GetUsers {
            users {
                id
                username
            }
        }`,
        variables: {},
      }),
    })
      .then((json) => {
        setUsers((json as any).data.users);
      })
      .catch(console.error);

    return () => {
      ab.abort();
    };
  }, []);

  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.username}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
