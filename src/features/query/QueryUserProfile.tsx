import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { UserProfile } from "@components";
import { userSchema } from "@models";
import { authHttpClient } from "@utils";

export function QueryUserProfile() {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading, refetch } = useQuery(
    ["user_profile", { id }],
    async ({ signal }) =>
      userSchema.parse(await authHttpClient(`/api/users/${id}`, { signal }))
  );

  return (
    <UserProfile
      user={data}
      loading={isLoading}
      error={error}
      retry={refetch}
    />
  );
}
