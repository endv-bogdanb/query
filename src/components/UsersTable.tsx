import { TUsers } from "@models";
import { Label, Table } from "semantic-ui-react";

export interface IUserTable {
  users: TUsers;
}

export function UsersTable({ users }: IUserTable) {
  return (
    <Table selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Username</Table.HeaderCell>
          <Table.HeaderCell>First name</Table.HeaderCell>
          <Table.HeaderCell>Last name</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>
              <Label ribbon>{user.id}</Label>
            </Table.Cell>
            <Table.Cell>{user.username}</Table.Cell>
            <Table.Cell>{user.profile.firstName}</Table.Cell>
            <Table.Cell>{user.profile.lastName}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
