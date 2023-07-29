import { Outlet } from "react-router-dom";
import { cacheExchange, createClient, fetchExchange, Provider } from "urql";
import { TokenRegistry } from "@utils";

const client = createClient({
  url: "gql/",
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => {
    return {
      headers: {
        accept: "*/*", // NOTE: https://github.com/mswjs/msw/issues/1593#issuecomment-1509003528
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
