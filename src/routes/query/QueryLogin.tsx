import { useMutation } from "react-query";
import { Layout, Login, TLoginUser } from "@components";

export function QueryLogin() {
  const login = useMutation(["login"], async (user: TLoginUser) => {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(user),
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw data;
    }
    return data as { id: string; username: string; password: string };
  });

  return (
    <Layout>
      <Login
        title="Query login"
        onLogin={async (value) => {
          try {
            const user = await login.mutateAsync(value);
            console.log("value", value, user);
          } catch (e) {
            console.log("err", e);
          }
        }}
        error={login.error as { message: string }}
      />
    </Layout>
  );
}
