import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserProfile } from "@components";
import { TUser } from "@models";
import { httpClient } from "@utils";

async function getUser(id: number, signal: AbortSignal) {
  const { data } = (await httpClient("gql/", {
    method: "POST",
    body: JSON.stringify({
      query: `
      query GetUser($id: Int!) {
        GetUser(id: $id){
          user
        }
      }`,
      variables: { id },
    }),
    signal,
  })) as any;
  return data;
}

export function GqlUserProfile() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<TUser | undefined>(undefined);

  useEffect(() => {
    if (!id) return;

    const ab = new AbortController();

    getUser(+id, ab.signal)
      .then((user) => setUser(user))
      .catch(console.error);

    return () => {
      ab.abort();
    };
  }, [id]);

  return (
    <UserProfile
      user={user}
      loading={false}
      error={undefined}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      retry={() => {}}
    />
  );
}
