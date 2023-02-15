import { RouteObject } from "react-router";
import { ErrorPage } from "@components";
import {
  gqlRoutes,
  queryRoutes,
  Root,
  swrRoutes,
  toolkitRoutes,
} from "@features";
import { urqlRoutes } from "@features/urql";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [queryRoutes, swrRoutes, toolkitRoutes, gqlRoutes, urqlRoutes],
  },
];
