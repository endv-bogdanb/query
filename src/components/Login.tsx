import { Button, Form, Grid, Header, Input, Label } from "semantic-ui-react";
import { loginReqSchema, TLoginReq } from "@models";

export interface ILogin {
  title: string;
  onLogin: (user: TLoginReq) => void;
  error?: { message: string };
}

export function Login({ title, onLogin, error }: ILogin) {
  return (
    <Form
      className="flex flex-col w-md shadow-2xl p-6 bg-light-50 gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const values = loginReqSchema.safeParse({
          // @ts-expect-error
          username: e.target.username.value,
          // @ts-expect-error
          password: e.target.password.value,
        });

        if (values.success) {
          onLogin(values.data);
        }
      }}
    >
      <Header>{title}</Header>
      <Grid columns={1} centered>
        <Grid.Column>
          <Input
            name="username"
            label="Username"
            type="text"
            defaultValue={"admin"}
            fluid
          />
        </Grid.Column>
        <Grid.Column>
          <Input
            name="password"
            label="Password"
            type="password"
            autoComplete="off"
            defaultValue={"admin"}
            fluid
          />
        </Grid.Column>
        <Grid.Column textAlign="center">
          <Button type="submit">Login !</Button>
        </Grid.Column>
      </Grid>
      <div className="text-red-600 h-6">{!!error ? error.message : null}</div>
    </Form>
  );
}
