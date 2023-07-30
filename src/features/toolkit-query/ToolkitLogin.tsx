import { useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { Login } from "@components";
import { tokenSlice } from "@utils";
import { useLoginMutation } from "./store/api/api";

export function ToolkitLogin() {
  const navigate = useNavigate();

  const [login, { error, isLoading }] = useLoginMutation();

  return (
    <Login
      title="Toolkit login"
      onLogin={async (value) => {
        try {
          const { token, refreshToken, user } = await login(value).unwrap();

          tokenSlice.dispatch({
            type: "set",
            payload: {
              token,
              refreshToken,
              user,
            },
          });

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
