import { Link } from "react-router-dom";
import { TUsers } from "@models";
import { HttpError } from "@utils";

export interface IUserTable {
  users?: TUsers;
  loading: boolean;
  error?: unknown;
  retry: () => void;
}

export function UsersTable({ users, loading, error, retry }: IUserTable) {
  return (
    <>
      {loading && <progress />}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>First name</th>
            <th>Last name</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <Link to={`${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.profile.firstName}</td>
              <td>{user.profile.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {error ? (
        <div>
          <div>{HttpError.getErrorMessage(error)}</div>
          <button onClick={retry}>Retry</button>
        </div>
      ) : null}
    </>
  );
}
