import { UsersTable } from "@components/UsersTable";
import { useUsersQuery } from "./store/api";

export function ToolkitUsers() {
  const { data, error } = useUsersQuery();

  return (
    <>
      {!!data ? <UsersTable users={data} /> : null}
      {!!error ? <pre>{JSON.stringify(error)}</pre> : null}
    </>
  );
}
