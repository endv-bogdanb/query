import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { UserProfile } from "@components";
import { userSchema } from "@models";
import { authHttpClient } from "@utils";

export function QueryUserProfile() {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["user_profile", { id }],
    queryFn: async ({ signal }) =>
      userSchema.parse(await authHttpClient(`/api/users/${id}`, { signal })),
  });

  return (
    <UserProfile
      user={data}
      loading={isLoading}
      error={error}
      retry={refetch}
    />
  );
}
