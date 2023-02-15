import { Outlet } from "react-router-dom";
import { createClient, Provider } from "urql";
import { TokenRegistry } from "@utils";

const client = createClient({
  url: "gql/",
  fetchOptions: () => {
    return {
      headers: {
        authorization: TokenRegistry.token
          ? `Bearer ${TokenRegistry.token}`
          : "",
      },
    };
  },
});

export function UrqlRoot() {
  return (
    <Provider value={client}>
      <Outlet />
    </Provider>
  );
}
