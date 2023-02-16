import { Outlet } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { UsersTable } from "@components";

const GET_USERS_QUERY = gql`
  query GetUsers {
    profile {
      __typename
      id
    }
  }
`;

export function ApolloUsers() {
  const {
    data: users = [],
    loading,
    error,
    refetch,
  } = useQuery(GET_USERS_QUERY);

  return (
    <>
      <UsersTable
        users={users}
        loading={loading}
        retry={() => {
          refetch();
        }}
        error={error}
      />
      <Outlet />
    </>
  );
}
