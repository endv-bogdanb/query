import { TUsers } from "@models";
import { Table } from "@mantine/core";

export interface IUserTable {
  users: TUsers;
}

export function UsersTable({ users }: IUserTable) {
  return (
    <Table>
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
            <td>
              {user.id}
              {/* <Label ribbon>{user.id}</Label> */}
            </td>
            <td>{user.username}</td>
            <td>{user.profile.firstName}</td>
            <td>{user.profile.lastName}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
