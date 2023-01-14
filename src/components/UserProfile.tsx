import { Button, Card, Center, Group, Image, Space, Text } from "@mantine/core";
import { TUser } from "@models";
import { HttpError } from "@utils";

export interface IUserProfile {
  user?: TUser;
  loading: boolean;
  error?: unknown;
  retry: () => void;
}

export function UserProfile({ user, loading, error, retry }: IUserProfile) {
  return (
    <Card withBorder radius="md" shadow="sm" p="lg">
      <Card.Section>
        {user && <Image src={user.profile.logo} height={160} alt="avatar" />}
      </Card.Section>{" "}
      <Group>
        {user && (
          <>
            <Text>{user.username}</Text>
            <Text>
              {user.profile.firstName} {user.profile.lastName}
            </Text>
          </>
        )}
      </Group>
      {loading ? "loading ..." : null}
      {error ? (
        <Center>
          <Text c="red.9">{HttpError.getErrorMessage(error)}</Text>
          <Space w="xs" />
          <Button color="red" variant="subtle" onClick={retry}>
            Retry
          </Button>
        </Center>
      ) : null}
    </Card>
  );
}
