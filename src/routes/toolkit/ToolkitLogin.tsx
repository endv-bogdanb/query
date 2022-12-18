import { Layout, Login } from "@components";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useLoginMutation } from "./store/api";

export function ToolkitLogin() {
  const [login, { error }] = useLoginMutation();

  return (
    <Layout>
      <Login
        title="Toolkit login"
        onLogin={async (value) => {
          try {
            await login(value).unwrap();
          } catch (e) {
            console.log("err", e);
          }
        }}
        error={(error as FetchBaseQueryError)?.data as { message: string }}
      />
    </Layout>
  );
}
