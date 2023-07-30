import { useNavigate } from "react-router-dom";
import { useMutation } from "urql";
import { Login } from "@components";
import { tokenSlice } from "@utils";

const LoginMutation = `
      mutation Login($username: String!, $password: String!){
        Login(username: $username, password: $password){
          token
          refreshToken
        }
      }
`;

export function UrqlLogin() {
  const navigate = useNavigate();
  const [{ fetching, error }, login] = useMutation(LoginMutation);

  return (
    <Login
      title="Query login"
      onLogin={async (value) => {
        try {
          const { data, error } = await login(value);

          if (error) throw error;

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
      loading={fetching}
      error={error}
    />
  );
}
