import {
  Button,
  TextInput,
  Paper,
  Title,
  Space,
  Container,
  Center,
  Text,
  LoadingOverlay,
} from "@mantine/core";
import { loginReqSchema, TLoginReq } from "@models";

export interface ILogin {
  title: string;
  onLogin: (user: TLoginReq) => void;
  loading: boolean;
  error?: { message: string };
}

export function Login({ title, onLogin, loading, error }: ILogin) {
  return (
    <Container size="xs">
      <Paper shadow={"lg"} p="lg">
        <LoadingOverlay visible={loading} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.target as HTMLFormElement);
            const values = loginReqSchema.safeParse(
              Object.fromEntries(data.entries())
            );

            if (values.success) {
              onLogin(values.data);
            }
          }}
        >
          <Title order={4}>{title}</Title>
          <Space h="md" />
          <TextInput
            name="username"
            label="Username"
            type="text"
            defaultValue={"admin"}
            autoComplete="off"
          />
          <TextInput
            name="password"
            label="Password"
            type="password"
            autoComplete="off"
            defaultValue={"admin"}
          />
          <Space h="md" />
          <Center>
            <Button type="submit">Login !</Button>
          </Center>
          <Text c="red.9">{!!error ? error.message : null}</Text>
        </form>
      </Paper>
    </Container>
  );
}
