import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Login } from "@components";
import { loginResSchema, TLoginReq } from "@models";
import { httpClient, tokenSlice } from "@utils";

export function QueryLogin() {
  const navigate = useNavigate();

  const login = useMutation({
    mutationKey: ["login"],
    mutationFn: async (user: TLoginReq) => {
      const data = await httpClient("/api/login", {
        method: "POST",
        body: JSON.stringify(user),
      });

      return loginResSchema.parse(data);
    },
  });

  return (
    <Login
      title="Query login"
      onLogin={async (value) => {
        try {
          const data = await login.mutateAsync(value);

          tokenSlice.dispatch({
            type: "set",
            payload: {
              token: data.token,
              refreshToken: data.refreshToken,
              user: data.user,
            },
          });

          navigate("users");
        } catch (e) {
          console.log("err", e);
        }
      }}
      loading={login.isPending}
      error={login.error as { message: string }}
    />
  );
}
