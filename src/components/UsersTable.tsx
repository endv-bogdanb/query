import { TUsers } from "@models";

export interface IUserTable {
  users: TUsers;
}

export function UsersTable({ users }: IUserTable) {
  return (
    <table className="w-1/2">
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>First name</th>
          <th>Last name</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="text-center">{user.id}</td>
            <td className="text-center">{user.username}</td>
            <td className="text-center">{user.profile.firstName}</td>
            <td className="text-center">{user.profile.lastName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
