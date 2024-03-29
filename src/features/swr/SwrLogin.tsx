import { useNavigate } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import { Login } from "@components";
import { loginResSchema, TLoginReq } from "@models";
import { httpClient, tokenSlice } from "@utils";

export function SwrLogin() {
  const navigate = useNavigate();

  const { trigger, error, isMutating } = useSWRMutation(
    "/api/login",
    async (url, { arg: user }: { arg: TLoginReq }) => {
      const data = await httpClient(url, {
        method: "POST",
        body: JSON.stringify(user),
      });

      return loginResSchema.parse(data);
    },
  );

  return (
    <Login
      title="Swr login"
      onLogin={async (value) => {
        try {
          const data = await trigger(value);

          if (!data) {
            throw data;
          }

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
      loading={isMutating}
      error={error}
    />
  );
}
