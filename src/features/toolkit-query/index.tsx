import { RouteObject } from "react-router";
import { ProtectedRoute } from "../ProtectedRoute";
import { ToolkitRoot } from "./Toolkit";
import { ToolkitLogin } from "./ToolkitLogin";
import { ToolkitUsers } from "./ToolkitUsers";

export const toolkitRoutes: RouteObject = {
  path: "toolkit-query",
  element: <ToolkitRoot />,
  children: [
    {
      index: true,
      element: <ToolkitLogin />,
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "users",
          element: <ToolkitUsers />,
        },
      ],
    },
  ],
};
