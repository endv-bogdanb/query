import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Layout, Login } from "@components";
import { TokenRegistry } from "@utils";
import { loginResSchema, TLoginReq } from "@models";

export function QueryLogin() {
  const navigate = useNavigate();

  const login = useMutation(["login"], async (user: TLoginReq) => {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (response.status !== 200) throw data;

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
