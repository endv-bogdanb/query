import { RouteObject } from "react-router";
import { Root, queryRoutes, swrRoutes, toolkitRoutes } from "@features";
import { ErrorPage } from "@components";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [queryRoutes, swrRoutes, toolkitRoutes],
  },
];
