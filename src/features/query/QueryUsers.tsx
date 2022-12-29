import { UsersTable } from "@components/UsersTable";
import { usersSchema } from "@models";
import { authHttpClient, HttpError } from "@utils";
import { useQuery } from "react-query";

export function QueryUsers() {
  const { data, error } = useQuery(["users"], async ({ signal }) => {
    const data = await authHttpClient("/api/users", { signal });

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
