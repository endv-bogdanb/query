import { Outlet } from "react-router-dom";
import { useQuery } from "urql";
import { UsersTable } from "@components";

const GetUsersQuery = `
      query GetUsers {
        profile {
          __typename
          id
        }
      }
`;

export function UrqlUsers() {
  const [result, retry] = useQuery({ query: GetUsersQuery });

  const { data: users = [], fetching } = result;

  return (
    <>
      <UsersTable
        users={users}
        loading={fetching}
        retry={() => {
          retry({ requestPolicy: "network-only" });
        }}
        error={result.error}
      />
      <Outlet />
    </>
  );
}
