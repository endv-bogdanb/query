import { RouteObject } from "react-router";
import { ProtectedRoute } from "../ProtectedRoute";
import { QueryRoot } from "./Query";
import { QueryLogin } from "./QueryLogin";
import { QueryUserProfile } from "./QueryUserProfile";
import { QueryUsers } from "./QueryUsers";

export const queryRoutes: RouteObject = {
  path: "query",
  element: <QueryRoot />,
  children: [
    {
      index: true,
      element: <QueryLogin />,
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "users",
          element: <QueryUsers />,
          children: [
            {
              path: ":id",
              element: <QueryUserProfile />,
            },
          ],
        },
      ],
    },
  ],
};
