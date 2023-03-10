import { RouteObject } from "react-router";
import { ProtectedRoute } from "@features/ProtectedRoute";
import { GqlRoot } from "./Gql";
import { GqlLogin } from "./GqlLogin";
import { GqlUserProfile } from "./GqlUserProfile";
import { GqlUsers } from "./GqlUsers";

export const gqlRoutes: RouteObject = {
  path: "gql",
  element: <GqlRoot />,
  children: [
    {
      index: true,
      element: <GqlLogin />,
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "users",
          element: <GqlUsers />,
          children: [
            {
              path: ":id",
              element: <GqlUserProfile />,
            },
          ],
        },
      ],
    },
  ],
};
