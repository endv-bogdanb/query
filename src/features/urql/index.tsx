import { RouteObject } from "react-router";
import { ProtectedRoute } from "@features/ProtectedRoute";
import { UrqlRoot } from "./Urql";
import { UrqlLogin } from "./UrqlLogin";
import { UrqlUserProfile } from "./UrqlUserProfile";
import { UrqlUsers } from "./UrqlUsers";

export const urqlRoutes: RouteObject = {
  path: "urql",
  element: <UrqlRoot />,
  children: [
    {
      index: true,
      element: <UrqlLogin />,
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "users",
          element: <UrqlUsers />,
          children: [
            {
              path: ":id",
              element: <UrqlUserProfile />,
            },
          ],
        },
      ],
    },
  ],
};
