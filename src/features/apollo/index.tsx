import { RouteObject } from "react-router";
import { ProtectedRoute } from "@features/ProtectedRoute";
import { ApolloRoot } from "./Apollo";
import { ApolloLogin } from "./ApolloLogin";
import { ApolloUserProfile } from "./ApolloUserProfile";
import { ApolloUsers } from "./ApolloUsers";

export const apolloRoutes: RouteObject = {
  path: "apollo",
  element: <ApolloRoot />,
  children: [
    {
      index: true,
      element: <ApolloLogin />,
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "users",
          element: <ApolloUsers />,
          children: [
            {
              path: ":id",
              element: <ApolloUserProfile />,
            },
          ],
        },
      ],
    },
  ],
};
