import { Layout, Login } from "@components";
import { TokenRegistry } from "@utils";
import { useNavigate } from "react-router-dom";
import useSWRMutation from "swr/mutation";

export function SwrLogin() {
  const navigate = useNavigate();

  const { trigger, error } = useSWRMutation(
    "/api/login",
    async (url, { arg: user }) => {
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
    }
  );

  return (
    <Layout>
      <Login
        title="Swr login"
        onLogin={async (value) => {
          try {
            const data = await trigger(value);
            TokenRegistry.token = data?.token ?? "";
            navigate("/swr/users");
          } catch (e) {
            console.log("err", e);
          }
        }}
        error={error}
      />
    </Layout>
  );
}
