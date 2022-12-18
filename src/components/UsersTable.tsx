export interface IUserTable {
  users: {
    id: string;
    name: string;
    username: string;
  }[];
}

export function UsersTable({ users }: IUserTable) {
  return (
    <table>
      <thead>
        <tr>
          <th className="w-30">ID</th>
          <th className="w-30">Username</th>
          <th className="w-30">Name</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="text-right">{user.id}</td>
            <td className="text-right">{user.username}</td>
            <td className="text-right">{user.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
