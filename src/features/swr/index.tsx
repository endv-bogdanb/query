import { RouteObject } from "react-router";
import { ProtectedRoute } from "../ProtectedRoute";
import { SwrRoot } from "./Swr";
import { SwrLogin } from "./SwrLogin";
import { SwrUserProfile } from "./SwrUserProfile";
import { SwrUsers } from "./SwrUsers";

export const swrRoutes: RouteObject = {
  path: "swr",
  element: <SwrRoot />,
  children: [
    {
      index: true,
      element: <SwrLogin />,
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "users",
          element: <SwrUsers />,
          children: [
            {
              path: ":id",
              element: <SwrUserProfile />,
            },
          ],
        },
      ],
    },
  ],
};
