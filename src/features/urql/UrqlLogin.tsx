import { useNavigate } from "react-router-dom";
import { useMutation } from "urql";
import { Login } from "@components";
import { TokenRegistry } from "@utils";

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

          TokenRegistry.token = data.token;
          TokenRegistry.refreshToken = data.refreshToken;
          TokenRegistry.user = data.user;
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
