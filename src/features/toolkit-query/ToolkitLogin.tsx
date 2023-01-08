import { Layout, Login } from "@components";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { TokenRegistry } from "@utils";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "./store/api";

export function ToolkitLogin() {
  const navigate = useNavigate();

  const [login, { error, isLoading }] = useLoginMutation();

  return (
    <Login
      title="Toolkit login"
      onLogin={async (value) => {
        try {
          const { token, refreshToken, user } = await login(value).unwrap();

          TokenRegistry.token = token;
          TokenRegistry.refreshToken = refreshToken;
          TokenRegistry.user = user;

          navigate("users");
        } catch (e) {
          console.log("err", e);
        }
      }}
      loading={isLoading}
      error={(error as FetchBaseQueryError)?.data as { message: string }}
    />
  );
}
