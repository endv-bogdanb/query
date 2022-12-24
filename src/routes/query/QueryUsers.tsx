import { UsersTable } from "@components/UsersTable";
import { usersSchema } from "@models";
import { httpClient, HttpError, TokenRegistry } from "@utils";
import { useQuery } from "react-query";

export function QueryUsers() {
  const { data, error } = useQuery(["users"], async ({ signal }) => {
    const data = await httpClient("/api/users", {
      signal,
      headers: {
        Authorization: `Bearer ${TokenRegistry.token}`,
      },
    });

    return usersSchema.parse(data);
  });

  return (
    <>
      {!!data ? <UsersTable users={data} /> : null}
      {!!error ? (
        <pre>
          {JSON.stringify(HttpError.isHttpError(error) ? error.message : error)}
        </pre>
      ) : null}
    </>
  );
}
