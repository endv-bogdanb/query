import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { UserProfile } from "@components";

const GET_USER = gql`
  query GetUser($id: Int!) {
    GetUser(id: $id) {
      user
    }
  }
`;

export function ApolloUserProfile() {
  const { id } = useParams<{ id: string }>();

  const {
    data: user,
    loading,
    error,
    refetch,
  } = useQuery(GET_USER, { variables: { id }, skip: !id });

  return (
    <UserProfile
      user={user}
      loading={loading}
      error={error}
      retry={() => {
        refetch();
      }}
    />
  );
}
