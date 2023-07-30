import { useNavigate } from "react-router-dom";
import { Login } from "@components";
import { loginResSchema, TLoginReq, TLoginRes } from "@models";
import { httpClient, tokenSlice } from "@utils";

async function login(variables: TLoginReq): Promise<TLoginRes> {
  const { data } = (await httpClient("gql/", {
    method: "POST",
    body: JSON.stringify({
      query: `
      mutation Login($username: String!, $password: String!){
        Login(username: $username, password: $password){
          token
          refreshToken
        }
      }`,
      variables,
    }),
  })) as any;
  return loginResSchema.parse(data);
}

export function GqlLogin() {
  const navigate = useNavigate();

  return (
    <Login
      title="Query login"
      onLogin={async (value) => {
        try {
          const data = await login(value);

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
      loading={false}
      error={undefined}
    />
  );
}
