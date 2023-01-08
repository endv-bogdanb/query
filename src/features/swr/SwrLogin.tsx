import { Layout, Login } from "@components";
import { loginResSchema } from "@models";
import { httpClient, TokenRegistry } from "@utils";
import { useNavigate } from "react-router-dom";
import useSWRMutation from "swr/mutation";

export function SwrLogin() {
  const navigate = useNavigate();

  const { trigger, error } = useSWRMutation(
    "/api/login",
    async (url, { arg: user }) => {
      const data = await httpClient(url, {
        method: "POST",
        body: JSON.stringify(user),
      });

      return loginResSchema.parse(data);
    }
  );

  return (
    <Layout>
      <Login
        title="Swr login"
        onLogin={async (value) => {
          try {
            const data = await trigger(value);

            if (!data) {
              throw data;
            }

            TokenRegistry.token = data.token;
            TokenRegistry.refreshToken = data.refreshToken;
            TokenRegistry.user = data.user;

            navigate("users");
          } catch (e) {
            console.log("err", e);
          }
        }}
        error={error}
      />
    </Layout>
  );
}
