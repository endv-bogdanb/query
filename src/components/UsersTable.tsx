import { Link } from "react-router-dom";
import {
  Button,
  Center,
  LoadingOverlay,
  Space,
  Table,
  Text,
} from "@mantine/core";
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
      <LoadingOverlay visible={loading} />
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
      </Table>
      {error ? (
        <Center>
          <Text c="red.9">{HttpError.getErrorMessage(error)}</Text>
          <Space w="xs" />
          <Button color="red" variant="subtle" onClick={retry}>
            Retry
          </Button>
        </Center>
      ) : null}
    </>
  );
}
