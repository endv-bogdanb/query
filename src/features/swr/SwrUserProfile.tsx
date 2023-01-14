import { useParams } from "react-router-dom";
import useSWR from "swr";
import { UserProfile } from "@components";
import { userSchema } from "@models";
import { authHttpClient } from "@utils";

export function SwrUserProfile() {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading, mutate } = useSWR(
    ["user_profile", { id }],
    async () => userSchema.parse(await authHttpClient(`/api/users/${id}`))
  );

  return (
    <UserProfile
      user={data}
      loading={isLoading}
      error={error}
      retry={() => {
        mutate();
      }}
    />
  );
}
