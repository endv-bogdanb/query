import { useParams } from "react-router-dom";
import { useQuery } from "urql";
import { UserProfile } from "@components";

const GetUser = `
      query GetUser($id: Int!) {
        GetUser(id: $id){
          user
        }
      }
      `;

export function UrqlUserProfile() {
  const { id } = useParams<{ id: string }>();

  const [result, retry] = useQuery({
    query: GetUser,
    variables: { id },
    pause: !id,
  });

  const { data: user, fetching, error } = result;

  return (
    <UserProfile
      user={user}
      loading={fetching}
      error={error}
      retry={() => {
        retry({ requestPolicy: "network-only" });
      }}
    />
  );
}
