import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Layout, Login, TLoginUser } from "@components";
import { TokenRegistry } from "@utils";

export function QueryLogin() {
  const navigate = useNavigate();

  const login = useMutation(["login"], async (user: TLoginUser) => {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(user),
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw data;
    }
    return data as {
      user: { id: string; username: string; password: string };
      token: string;
    };
  });

  return (
    <Layout>
      <Login
        title="Query login"
        onLogin={async (value) => {
          try {
            const { token } = await login.mutateAsync(value);
            TokenRegistry.token = token;
            navigate("/query/users");
          } catch (e) {
            console.log("err", e);
          }
        }}
        error={login.error as { message: string }}
      />
    </Layout>
  );
}
