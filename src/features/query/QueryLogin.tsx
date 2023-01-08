import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Login } from "@components";
import { loginResSchema, TLoginReq } from "@models";
import { httpClient, TokenRegistry } from "@utils";

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
    <Login
      title="Query login"
      onLogin={async (value) => {
        try {
          const data = await login.mutateAsync(value);

          TokenRegistry.token = data.token;
          TokenRegistry.refreshToken = data.refreshToken;
          TokenRegistry.user = data.user;

          navigate("users");
        } catch (e) {
          console.log("err", e);
        }
      }}
      loading={login.isLoading}
      error={login.error as { message: string }}
    />
  );
}
