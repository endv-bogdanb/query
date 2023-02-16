import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { Login } from "@components";
import { TokenRegistry } from "@utils";

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    Login(username: $username, password: $password) {
      token
      refreshToken
    }
  }
`;

export function ApolloLogin() {
  const navigate = useNavigate();
  const [login, { error, loading }] = useMutation(LOGIN_MUTATION);

  return (
    <Login
      title="Query login"
      onLogin={async (value) => {
        try {
          const { data } = await login({ variables: value });

          console.log(data);

          TokenRegistry.token = data.token;
          TokenRegistry.refreshToken = data.refreshToken;
          TokenRegistry.user = data.user;
          navigate("users");
        } catch (e) {
          console.log("err", e);
        }
      }}
      loading={loading}
      error={error}
    />
  );
}
