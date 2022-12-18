import { Layout, Login } from "@components";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { TokenRegistry } from "@utils";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "./store/api";

export function ToolkitLogin() {
  const navigate = useNavigate();
  const [login, { error }] = useLoginMutation();

  return (
    <Layout>
      <Login
        title="Toolkit login"
        onLogin={async (value) => {
          try {
            const { token } = await login(value).unwrap();
            TokenRegistry.token = token;
            navigate("/toolkit-query/users");
          } catch (e) {
            console.log("err", e);
          }
        }}
        error={(error as FetchBaseQueryError)?.data as { message: string }}
      />
    </Layout>
  );
}
