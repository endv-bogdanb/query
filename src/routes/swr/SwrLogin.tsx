import { Layout, Login } from "@components";
import useSWRMutation from "swr/mutation";

export function SwrLogin() {
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
      return data as { id: string; username: string; password: string };
    }
  );

  return (
    <Layout>
      <Login
        title="Swr login"
        onLogin={async (value) => {
          try {
            await trigger(value);
          } catch (e) {
            console.log("err", e);
          }
        }}
        error={error}
      />
    </Layout>
  );
}
