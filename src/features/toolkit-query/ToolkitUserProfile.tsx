import { useParams } from "react-router-dom";
import { UserProfile } from "@components";
import { useUserByIdQuery } from "./store/api/api";

export function ToolkitUserProfile() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error, refetch } = useUserByIdQuery(
    { id: id! },
    { skip: !id },
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
