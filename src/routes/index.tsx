import { RouteObject } from "react-router";
import { ErrorPage } from "@components";
import { queryRoutes, Root, swrRoutes, toolkitRoutes } from "@features";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [queryRoutes, swrRoutes, toolkitRoutes],
  },
];
