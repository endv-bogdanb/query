import { Button, Form, Grid, Header, Input } from "semantic-ui-react";
import { loginReqSchema, TLoginReq } from "@models";

export interface ILogin {
  title: string;
  onLogin: (user: TLoginReq) => void;
  error?: { message: string };
}

export function Login({ title, onLogin, error }: ILogin) {
  return (
    <Form
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
      <Header>{title}</Header>
      <Grid columns={1} centered>
        <Grid.Column>
          <Input
            name="username"
            label="Username"
            type="text"
            defaultValue={"admin"}
            autoComplete="off"
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
      <div>{!!error ? error.message : null}</div>
    </Form>
  );
}
