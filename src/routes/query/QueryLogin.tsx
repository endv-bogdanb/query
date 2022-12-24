import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Layout, Login } from "@components";
import { httpClient, TokenRegistry } from "@utils";
import { loginResSchema, TLoginReq } from "@models";

export function QueryLogin() {
  const navigate = useNavigate();

  const login = useMutation(["login"], async (user: TLoginReq) => {
    const data = await httpClient("/api/login", {
      method: "POST",
      body: JSON.stringify(user),
    });

    return loginResSchema.parse(data);
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
